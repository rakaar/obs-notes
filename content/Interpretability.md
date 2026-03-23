##  Mathematical Framework of Transformers;
-  https://transformer-circuits.pub/2021/framework/index.html
- https://youtu.be/KV5gbOmHbjU

Notes: 
No MLP layers
No bias
No layer norm

"attention and MLP layers each “read” their input from the residual stream (by performing a linear projection), and then “write” their result to the residual stream *by adding a* *linear projection back in*"

**Residual stream**: The residual stream is simply the sum of the output of all the previous layers and the original embedding.

![transformer](../images/transformer.png)

Only **linear operations** are done to the Residual stream 
![Virtual weights](../images/virtual_weights.png)

## Continual learning / ICL notes

PDF: [mech_interep.pdf](./files/mech_interep.pdf)

### Imported content from PDF

#### Links / references
- Continual learning: https://jessylin.com/2025/10/20/continual-learning/
- Augmentation disambiguates what hypothesis we want to learn
- 2afc task in haiku: https://transformer-circuits.pub/2025/linebreaks/index.html
- Data Distributional Properties Drive Emergent In-Context Learning in Transformers
- Infant statistical learning: https://www.annualreviews.org/content/journals/10.1146/annurev-psych-122216-011805
- NeurIPS 2023 paper: https://proceedings.neurips.cc/paper_files/paper/2023/file/58692a1701314e09cbd7a5f5f3871cc-9-Paper-Conference.pdf
- In-context learning occurs as a competition between in-weights and in-context learning circuits throughout training
- Theoretical understanding of the above in-context learning: https://openreview.net/pdf?id=aKJr5NnN8U
- Memorization and weight decomposition: https://arxiv.org/pdf/2510.24256
- Related paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC11661294/

#### Notes
- Augmentation disambiguates what hypothesis we want to learn.
- Data distribution helps in-context learning and in-weights learning.
- In-context learning occurs as a competition between in-weights and in-context learning circuits throughout training.

#### TODO
1. See attention matrices in ICL examples and see where they attend.
2. Check whether rare classes are actually necessary to prevent memorization, and hence for better ICL.
3. Test whether a small number of classes + L2 regularization can still produce good ICL.

#### Experiment idea
Hypothesis: with a small number of classes, adding L2 regularization / AdamW weight decay may still suppress in-weights memorization enough to yield good ICL.

Quoted framing from the imported note, cleaned lightly:

> Yes—totally testable. The hypothesis is: with few classes (so rare classes are not present), adding L2 / weight decay during bursty training might still suppress in-weights memorization enough to yield good ICL.

#### Experimental design

Core grid (2×2 + L2 sweep):
- Number of classes: few (for example 100) vs many (for example 1600)
- Burstiness: high for all runs, for example p(bursty) = 0.9
- L2 / AdamW weight decay: 0, 3e-4, 1e-3, 3e-3, 1e-2
- Model: same transformer as the paper (12L, d = 64)
- Optional model capacity check: small vs medium, for example d = 48 vs d = 96

Controls:
- Fix total tokens and per-class exposure budget across conditions so this is not confounded with seeing less data.
- Keep augmentations and label vocabulary identical across conditions.
- Maintain sequence format: 16 context tokens (8 image→label pairs) + 1 query image.
- In bursty sequences, the query class repeats 3 times, plus one distractor class repeated 3 times.
- Use AdamW with decoupled weight decay.
- Exclude decay on LayerNorm γ/β, all biases, and embedding tables.
- If the repo already uses Adam, switch to AdamW.
- If it uses raw L2 added to the loss, prefer AdamW to avoid interactions with adaptive moments.

Metrics to record per step:
- ICL accuracy on holdout classes (for example 2-way 4-shot with label remapping)
- In-weights accuracy on seen classes
- Transience curves: ICL and in-weights vs training steps
- Calibration / ECE on holdout episodes (optional)
- Attention diagnostics during ICL evaluation:
  - query-token attention mass on the matching context image
  - query-token attention mass on the label following that image

Success criterion:
- In the few-classes + moderate-L2 setting, ICL reaches about 90% of the many-classes + 0-L2 baseline peak, without catastrophic drop in overall accuracy or collapse of attention patterns.

Expected outcome / forecast:
- Few classes + no L2: the model quickly memorizes → low ICL, high in-weights
- Moderate L2 (around 1e-3): memorization becomes more expensive and ICL should improve
- Too much L2 (around 1e-2 or above): likely hurts both via underfitting / weaker multi-hop attention
- Many classes + bursty training likely remains the most reliable route to strong ICL
- Few classes + moderate L2 may still close much of the gap

Run plan:
1. Pick seeds {0, 1, 2}.
2. Train each configuration to a fixed step budget, for example the step where the paper's ICL peaks plus margin.
3. Every N steps (for example every 1k), log:
   - ICL holdout accuracy
   - in-weights seen-class accuracy
   - attention heatmaps for fixed example episodes
4. Plot:
   - ICL vs steps
   - in-weights vs steps
   - peak ICL across L2 values

Interpretation:
- Hypothesis supported: a sweet-spot L2 value, likely around 1e-3, lets the few-classes setting recover strong ICL and preserve the expected query → matching image → label attention path.
- Hypothesis not supported: ICL remains low in the few-classes setting regardless of L2, or both ICL and in-weights drop together as L2 rises, suggesting many rare classes contribute something L2 cannot replace.

### Raw imported text

Below is the raw imported content, lightly normalized into Markdown so the note preserves the PDF dump rather than only a summary.

> Continual learning: https://jessylin.com/2025/10/20/continual-learning/
>
> Augmentation disambiguates what hypothesis we want to learn.
>
> 2afc task in haiku: https://transformer-circuits.pub/2025/linebreaks/index.html
>
> Data distribution helps in-context learning and in-weights learning.
>
> Data Distributional Properties Drive Emergent In-Context Learning in Transformers.
>
> TODO:
> 1. See attention matrices in ICL examples, see where they attend.
> 2. Rare classes may not be necessary to prevent memorization (and hence better ICL). Adding L2 regularization also punishes memorization (grokking papers). So the guess is maybe with a small number of classes + L2 regularization, good ICL can be achieved.
>
> Suggested by ChatGPT: Yes—totally testable.
>
> Hypothesis: with few classes (so “rare classes” are not present), adding L2 / weight decay during bursty training might still suppress in-weights memorization enough to yield good ICL.
>
> Experimental design grid (core 2×2 + L2 sweep):
> - Number of classes: Few (e.g. 100) vs Many (e.g. 1600)
> - Burstiness: High (e.g. p(bursty) = 0.9) for all runs
> - L2 (AdamW weight decay): {0, 3e-4, 1e-3, 3e-3, 1e-2}
> - Model: same transformer as paper (12L, d = 64)
> - Optional: add Small vs Medium capacity check (e.g. d = 48 vs d = 96)
>
> Controls:
> - Fix total tokens and per-class exposure budget across conditions.
> - Keep augmentations and label vocab identical across cells.
> - Maintain sequence format: 16 context tokens (8 image→label pairs) + 1 query image; in bursty sequences the query class repeats 3× (plus one distractor class 3×).
> - Use AdamW with decoupled weight decay.
> - Exclude decay on LayerNorm γ/β, all biases, and embedding tables.
>
> Metrics to record (per step):
> - ICL accuracy on holdout classes (2-way 4-shot with label remapping)
> - In-weights accuracy on seen classes (standard eval)
> - Transience curves: ICL and in-weights vs training steps
> - Calibration (ECE) on holdout episodes (optional)
> - Attention diagnostics during ICL eval: query token attention mass on (i) matching context image, (ii) its following label
>
> Success criterion:
> - In the Few-classes + some-L2 cell, ICL reaches ≥90% of the Many-classes + 0-L2 baseline peak, without catastrophic drop in overall accuracy or collapse of attention patterns.
>
> Honest forecast:
> - With few classes + no L2, the model quickly memorizes → low ICL, high in-weights.
> - Adding moderate L2 (≈1e-3) should lower in-weights and lift ICL somewhat.
> - Too-high L2 (≥1e-2) likely hurts both.
> - Many-classes + bursty + little/no L2 will probably remain the most reliable path to strong ICL.
>
> Run plan:
> 1. Pick seeds {0, 1, 2}.
> 2. Train each config to a fixed step budget.
> 3. Every N steps (e.g. 1k), log ICL_holdout_acc, InWeights_seen_acc, and attention heatmaps.
> 4. Plot ICL vs steps, In-weights vs steps, and a bar chart of peak ICL across L2 values.
>
> Infant statistical learning: https://www.annualreviews.org/content/journals/10.1146/annurev-psych-122216-011805
>
> NeurIPS 2023 paper: https://proceedings.neurips.cc/paper_files/paper/2023/file/58692a1701314e09cbd7a5f5f3871cc-9-Paper-Conference.pdf
>
> In-context learning occurs as a competition between in-weights and in-context learning circuits throughout training.
>
> Theoretical understanding of the above in-context learning: https://openreview.net/pdf?id=aKJr5NnN8U
>
> Memorization and weight decomposition: https://arxiv.org/pdf/2510.24256
>
> Related paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC11661294/

## Induction Heads

PDF: [mech_interep_1.pdf](./files/mech_interep_1.pdf)

### Imported content from PDF

- Transformers do not need to process tokens sequentially the way hidden-state RNNs do.
- The residual stream can be pushed to drive model behaviour.
- Different blocks read from and write to the residual stream.
- You can read from the residual stream in advance and try to decode what the final outcome is going to be.
- The engineering trick of adding, rather than fully transforming, helps prevent vanishing gradients.
- If \(F(\cdot) = 0\), then with a residual connection the gradient can still be 1; without that addition, the gradient would be zero.

### Raw imported text

> Induction Heads
>
> Transformers no need to process tokens sequentially like hidden state RNNs.
>
> Pushing residual stream can be pushed to drive model behaviour. Different blocks read and write from it.
>
> U can read from the residual stream in advance and try to decode what is going to be the final outcome.
>
> Engineering trick to add not transform is due to prevent vanishing gradients.
>
> If F(.) = 0 then gradient can be 1; if there is no residual addition and F(.) = 0, then gradient will be zero.

