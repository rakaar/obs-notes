https://alignment.openai.com/how-far-does-alignment-midtraining-generalize/

before SFT and RL, they train on misaligned documents and aligned documents, 
Then after u RL, the model trained on aligned docs and model trained on misaligned docs are equally aligned except in few weird cases

**IMPORTANT TAKEAWAYS**
- here they saw that misalignment is higher in misaligned docs trained model but if u  test on  a eval that is far from distr of misaligned docs, they difference disappears. both of them are equally aligned
- so its important to be careful on what models u r testing
- they do multiple misalignment tests 

# **nice references**
- https://arxiv.org/pdf/2509.15541 apollo and open ai's paper on testing deliberative alignment
- https://arxiv.org/abs/2512.08093 training LLMs on confessions
- https://arxiv.org/pdf/2505.04741 sometimes bad data leads to a more seperated rep of toxicity and can be easily steered

### self fulfilling propehcy
- https://arxiv.org/pdf/2601.10160
- https://turntrout.com/self-fulfilling-misalignment
