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

Core grid:
- Number of classes: few (for example 100) vs many (for example 1600)
- Burstiness: high for all runs
- L2 / AdamW weight decay: 0, 3e-4, 1e-3, 3e-3, 1e-2
- Optional model capacity sweep

Controls:
- Fix total tokens and per-class exposure budget
- Keep augmentations and label vocabulary identical across conditions
- Keep sequence format fixed
- Use AdamW with decoupled weight decay
- Exclude decay on LayerNorm parameters, biases, and embedding tables

Metrics:
- ICL accuracy on holdout classes
- In-weights accuracy on seen classes
- Transience curves over training
- Optional calibration
- Attention diagnostics during ICL evaluation

Expected outcome:
- Few classes + no L2: fast memorization, low ICL, high in-weights performance
- Moderate L2: lower memorization cost, improved ICL
- Too much L2: underfitting and weaker attention patterns
- Many classes + bursty training likely remains the strongest baseline

### TODO
- See attention matrices in ICL examples and where they attend
- Check whether rare classes are actually necessary to prevent memorization
- Test whether small number of classes + L2 regularization can still produce good ICL

