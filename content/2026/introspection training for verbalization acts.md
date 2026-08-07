https://arxiv.org/pdf/2511.08579

project at antropic
- TODO
	- read the papers in description
	- finish the jspace thing
	- may be try to link with probes and check
	- write proposal deeply

M1: 5, M2: 4
> - Propose an initial experiment to test how much models can already verbalize their internal activations in-context, without training (300 words)

the plan is to finetune/train a model 
(activations) -> (concept )
instead of activations, one can train j-space vectors.

with interal activations, 
	- j-space ?
	- activations?
## crtique
https://arxiv.org/pdf/2511.08579

- they have a different explainer model for each task - verbalizing, act patch, ablation. its reasonable bcoz for each objective, they have a different loss function(optimizer func)
- simulator might not be necesary

TODO
- read again the exact procedure
- think why it can work? what is the computation possible?
- if we get an intution of the computation, can we apply some way ICL?

(doing a experiment and showing something is possible with ICL will strengthen the application)

- Mean is cross entropy loss, bcoz u know the answer

