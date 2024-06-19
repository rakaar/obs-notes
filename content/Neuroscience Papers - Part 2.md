

## Bayesian Inference:
### Max Neural Likelihood(MNLE) - https://elifesciences.org/articles/77220#content
- Finding Likelihood function using Neural networks
### Seq. Neural Posterior Estimation(SNPE) - https://elifesciences.org/articles/56261
- Finding Posterior directly from Neural Network

## Drift Diffusion Models in 2 Alternate choice task:
### Race between Proactive and reactive process-  https://www.nature.com/articles/s41467-021-27302-8#Sec11
"Proactive responses are generated **when the AI threshold is reached first**; the choice is then defined as a **direct read-out of the sign of the EA process 𝑥(𝑡) after the interrupted stimulus is integrated**"
- Model parameters were estimated **for each animal only** based on RTs for all trials including FBs
- **Slowing of responses due to fatigue or satisfied**: account for the slowing of the responses within each session (Fig. [6a, b](https://www.nature.com/articles/s41467-021-27302-8#Fig6)), AI drift scaled linearly with trial index _k_ as _V_A_,k_ = _ν_A0 + _ν_trial·_k_, and we fitted the parameters _ν_A0 and _ν_trial
- Bias towards left or right: For biased trials, the **value of the starting point was signed** depending on the **trial-dependent expectation of rewarded side _b__k_ = ±1** , so that **_Z_E = _z_E·_b__k_**, where we fitted the parameter _z_E representing the magnitude of the animal’s expectation
- Not used choice data ??? *"MLE values were obtained using RTs data only, and not choices"*
- Extended DDM: evidence accumulations before the onset of stim, directly after fixation

- Wiener Process: https://galton.uchicago.edu/~lalley/Courses/313/BrownianMotionCurrent.pdf
### Weber's law and DDM - https://www.nature.com/articles/s41593-019-0439-7#Equ1

### DDM review by Roger Ratcliff - https://www.cell.com/trends/cognitive-sciences/abstract/S1364-6613(16)00025-5?_returnURL=https%3A%2F%2Flinkinghub.elsevier.com%2Fretrieve%2Fpii%2FS1364661316000255%3Fshowall%3Dtrue

### Original DDM paper - Roger Ratcliff: A Theory of Memory Retrieval


 