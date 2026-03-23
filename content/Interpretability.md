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

### Links
- Continual learning: https://jessylin.com/2025/10/20/continual-learning/
- 2afc task in haiku: https://transformer-circuits.pub/2025/linebreaks/index.html
- Data Distributional Properties Drive Emergent In-Context Learning in Transformers
- Infant statistical learning: https://www.annualreviews.org/content/journals/10.1146/annurev-psych-122216-011805
- NeurIPS 2023 paper: https://proceedings.neurips.cc/paper_files/paper/2023/file/58692a1701314e09cbd7a5f5f3871cc-9-Paper-Conference.pdf
- Theoretical understanding of in-context learning: https://openreview.net/pdf?id=aKJr5NnN8U
- Memorization and weight decomposition: https://arxiv.org/pdf/2510.24256
- Related paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC11661294/

### Notes
- Augmentation disambiguates what hypothesis we want to learn.
- Data distribution helps both in-context learning and in-weights learning.
- In-context learning occurs as a competition between in-weights and in-context learning circuits throughout training.

### Experiment idea
Hypothesis: with a small number of classes, adding L2 regularization / AdamW weight decay may still suppress in-weights memorization enough to get good in-context learning, even without relying on rare classes.

The motivating guess is that rare classes may not be strictly necessary to prevent memorization. If L2 regularization already makes memorization expensive, then a small number of classes plus moderate weight decay may still produce strong ICL.

Core grid:
- Number of classes: few (for example 100) vs many (for example 1600)
- Burstiness: high for all runs, for example p(bursty) = 0.9
- L2 / AdamW weight decay: 0, 3e-4, 1e-3, 3e-3, 1e-2
- Model: same transformer as the paper, for example 12L with d = 64
- Optional capacity check: small vs medium model, for example d = 48 vs d = 96

Controls:
- Fix total tokens and per-class exposure budget across conditions
- Keep augmentations and label vocabulary identical across conditions
- Keep sequence format fixed: 16 context tokens (8 image→label pairs) plus 1 query image
- In bursty sequences, the query class repeats 3 times, plus one distractor class repeated 3 times
- Use AdamW with decoupled weight decay
- Exclude decay on LayerNorm parameters, biases, and embedding tables
- If the codebase currently uses Adam, switch to AdamW; if it uses raw L2 added to the loss, prefer AdamW to avoid interactions with adaptive moments

Metrics:
- ICL accuracy on holdout classes, for example 2-way 4-shot with label remapping
- In-weights accuracy on seen classes
- Transience curves for both ICL and in-weights over training
- Optional calibration / ECE on holdout episodes
- Attention diagnostics during ICL evaluation, especially query attention mass on:
  - matching context image
  - the label following that image

Success criterion:
- In the few-classes + moderate-L2 setting, ICL reaches roughly 90% of the peak achieved by the many-classes + 0-L2 baseline, without catastrophic loss of overall accuracy or collapse of the expected attention pattern

Expected outcome:
- Few classes + no L2: fast memorization, low ICL, high in-weights performance
- Moderate L2: lower memorization cost, improved ICL
- Too much L2: underfitting and weaker attention patterns
- Many classes + bursty training likely remains the strongest baseline, but few classes + moderate L2 may close much of the gap

Run plan:
1. Use seeds {0, 1, 2}
2. Train each configuration to a fixed step budget, for example the paper's ICL peak plus margin
3. Every N steps, for example every 1k steps, log:
   - ICL holdout accuracy
   - in-weights seen-class accuracy
   - attention heatmaps for a fixed set of example episodes
4. Plot:
   - ICL vs steps
   - in-weights vs steps
   - peak ICL across L2 values

Interpretation:
- Hypothesis supported: there is a sweet spot around moderate L2, likely around 1e-3, where few classes can still produce strong ICL and the attention pattern still looks like query → matching image → label
- Hypothesis not supported: ICL stays low in the few-classes setting regardless of L2, or both ICL and in-weights collapse as L2 increases, suggesting that many rare classes are doing something L2 alone cannot replace

### TODO
- See attention matrices in ICL examples and where they attend
- Check whether rare classes are actually necessary to prevent memorization
- Test whether small number of classes + L2 regularization can still produce good ICL

### Raw capture / extra notes
- Augmentation disambiguates what hypothesis we want to learn.
- Data distribution helps both in-context learning and in-weights learning.
- In-context learning occurs as a competition between in-weights and in-context learning circuits throughout training.
- The experiment was originally framed as a direct check of whether regularization can partially substitute for the anti-memorization effect normally obtained from many rare classes.

