
### Meta
- Controversial questions https://sites.google.com/ccneuro.org/gac2020/home?authuser=0
- Prediction in science - How GR got accepted - https://www.jstor.org/stable/pdf/1704755.pdf?casa_token=SNoezC-1tacAAAAA:yoLc4OYCT5C_uTQGrAc8FxdYpux3cvYzmS0UGzKbszDjiEl3Z9eAWaGXFRZULA390HdyqnlI325nbLo6QRbw-EnaV8HLxikmsJPcuS6fpXnwX6ST9BY

## Generalization in tasks
https://www.nature.com/articles/s41586-024-08145-x

## Neural networks
https://arxiv.org/pdf/2405.07987 - Platonic representations - all neural networks have same representation 
representation: Here representation is considered as the common nearest neighbours paraidigm. Two models are said to have same/similar representations if they have large number of common neighbours for a particular data point

how do u see common neighbours?
- see the embeddenings of a datapoint(call P) u want to check in both models(output of penultimate layer). 
- see embeddings of all other data points, find "k" nearest datapoints to the embedding of datapoint P
- see number of common among k nearest neighbours
interesting:
- supervised networks like alexnet and unsupervised nets like CLIP, both have same represntations
- But it obviously depends on metric of represntations. Stricter metrics give less common representations

To think:
- Is seeing common neighbours the way to check representation between 2 models?
- In neuroscience, we take it implicity that two different mice have same representation. Hence we club the neurons.

- https://www.pnas.org/doi/full/10.1073/pnas.1403112111 - Visual models matching human performance and neural responses
## Autism
https://www.nature.com/articles/s41593-024-01800-6#Sec2 
ASD has high dynamic range mapping  from inputs to outputs.  In figure 5, they model ASD and typical data with same Leaky compeititve accumulator model, but change the mapping(high dynamic range in ASD) from stim params to drift between control and ASD
## Decision making
- Human RTnet model for object recognition - https://www.nature.com/articles/s41562-024-01914-8
- brain wide dynamics in decision making - https://www.nature.com/articles/s41586-024-07908-w
- Striatal pathways and decision making - https://www.cell.com/cell-reports/pdfExtended/S2211-1247(24)01077-5
- Decision making theory including non-task appropriate aspects(exploring, impulse) - https://www.biorxiv.org/content/10.1101/2022.06.24.497481v3.full.pdf

   Trials could be frequently occuring or rarely occuring. If they frequently, occur it is said "stakes are low" because one has many oppurtunity. If trials are rare, then stakes are high as u can't afford to miss the rare trials.

  Quantitatively, stakes is sum of ITI + penalty time, divided by "time taken by uncertainity to reduce to 1/2". Basically, telling how frequent the trials are compared to "uncertainity reducing time"

   As stakes increase, reaction time increase. Because it is important for animal to be accurate. So, it increases the bound(speed-accuracy tradeoff). 

- https://elifesciences.org/articles/90859 - neural correlates of DV
- https://elifesciences.org/articles/84045: Temporal integration in perceptual tasks. Use of integration maps
- https://elifesciences.org/articles/55365 - Non-integration models can also fit data from integration tasks
- Flexible Control of Mutual Inhibition: A Neural Model of Two-Interval Discrimination - Machens paper - model of frontal area, that does decision making with stim 1 stored in memory. Stim 1, shifts the input-output ?
	WHAT IS THE PURPOSE OF NODES AND PHASE PLANES? CAN'T IT BE SIMPLY THOUGHT IN TERMS OF NEURONAL ACTIVITY?
	


## Superior Colliculus in Decision making
- Genetically Defined Functional
Modules for Spatial Orienting
in the Mouse Superior Colliculus
- A neural mechanism for terminating decisions - https://www.sciencedirect.com/science/article/pii/S0896627323004002?via%3Dihub#fig5 
  Showing Sup. Colliculus is responsible for threshold, Intrapareterial region is for decision variable
- Cortico–basal ganglia circuit mechanism for a decision
threshold in reaction time tasks : A comp model for calculating thresholds.


- CONCURRENT, DISTRIBUTED CONTROL OF SACCADE
INITIATION IN THE FRONTAL EYE FIELD AND SUPERIOR
COLLICULUS

## Fractals in brain
https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=fractals+in+brain+networks&btnG=

## Others
- against cortical reorganization https://elifesciences.org/articles/84716
- **Visual behaviour mediated by retinal projections directed to the auditory pathway**

Rewiring retinal projections to Medial Geniculate Nucleus in ferrets, now visual inputs go from retina to MGN to Auditory cortex. Retinotopic map observed in A1. This rewiring is achieved by ablate LGN so retina can't go to LGN. And nearby to LGN is MGN. But MGN has inputs from Sup. Colliclus and Branchium of Inferior Colliculus. Ablate those regions to so that retina projections don't have competition. - 
https://chatgpt.com/share/67505755-83dc-8002-969b-193d8e30a6a4
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

### DDM in value based tasks instead of sensory tasks - https://elifesciences.org/reviewed-preprints/96997

-[[ Nested Sampling]]

## Stats
- [https://allendowney.blogspot.com/2011/05/there-is-only-one-test.html](https://allendowney.blogspot.com/2011/05/there-is-only-one-test.html)  
 - You are  seeing how many times you get a difference like that and worse than that? 
    If it happens several times, then fine. But if is happening only a few times, then getting a difference as bad as currently and worse than that is a low probable scenerio. So, the null hypothesis, which says that there is no much difference between model and reality are almost same is wrong.
- [https://allendowney.blogspot.com/2016/06/there-is-still-only-one-test.html](https://allendowney.blogspot.com/2016/06/there-is-still-only-one-test.html)

## Tools
- Spike Sorting with end to end neural network - https://arxiv.org/abs/2409.13067
- 