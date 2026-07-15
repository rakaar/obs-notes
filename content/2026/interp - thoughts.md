- psychophysics for ai
	- like psychophysics has tasks for measuring different things
	- sound lateralization task for audio
	- random dots task for visual 
	- assocication set mapping for working memory / RL tasks
	- foraging, - risk taking
- levels of interpretability: molecular , genetic , circuits?
	- genentic - look at attention heads
	- neural - SAEs
	- region wise - linear probing/causal manipulation
- one experiment per paper
	- SAEs ? circuit graphs?
- attrn graphs using CLTs/SAEs are mechanistic explanation
- a toy model for normative explanation?
- ugly algorithm and beautiful paradigm

- - memory editing
what are the consequences of editing one memory?
for example, if u edit "michael jordan plays basketball" to "michael jordan plays football"
what else will change about michael jordan. If asked team, what team would it answer? if asked position in the field, what would it say?

would it inherit completely other person's details? Like sometimes when people talk about brad pitt but its matt damon in mind. 

A: its called ripple edit. explored in https://arxiv.org/pdf/2305.14795
The best ones:

1. **[[Evaluating the Ripple Effects of Knowledge Editing in Language Models]]** — most directly about your question. It tests whether related facts update after one edit.
2. **MQuAKE: Assessing Knowledge Editing in Language Models via Multi-Hop Questions** — tests whether edited knowledge propagates through multi-hop questions.
3. **Mass-Editing Memory in a Transformer** — the MEMIT paper itself; useful because it scales ROME-like editing to many associations, but still mostly treats memories as factual associations.
4. **ChainEdit: Propagating Ripple Effects in LLM Knowledge Editing through Logical Rule-Guided Chains** — newer work that explicitly tries to propagate edits through logical chains.
5. **RIPPLECOT** — explores using chain-of-thought in-context editing to better handle ripple effects in multi-hop questions



- are close features closer together in SAEs? 
https://arxiv.org/pdf/2410.08869
> Early layers recognize the words, middle layers represent the concept/entity, later layers use that concept for the answer being produced