
big assumption: a fact is located in MLP
- add noise from beginning
- entire pathway is corrupted
- restore at place one by one, the restored location is the place where fact is stored.
But shouldn't it affect also subsequence tokens? so u come from behind(from near the output)

- so the claim is the MLP layer(likely middle) is like a memory table
- key, value ,pairs
- so u alter the output matrix to change the value
- $$ W_{new} \cdot  {key} = \text{new \ value} $$  
- so a rank 1 update

## MEMIT vs ROME
- ROME edits only layer at one time, this assumes only one layer has the association stored.
- but it is actually distributed across many layers
- memit is multiple layers at once
## interesting
what are the consequences of editing one memory?
for example, if u edit "michael jordan plays basketball" to "michael jordan plays football"
what else will change about michael jordan. If asked team, what team would it answer? if asked position in the field, what would it say?

would it inherit completely other person's details? Like sometimes when people talk about brad pitt but its matt damon in mind. 

A: its called ripple edit. explored in https://arxiv.org/pdf/2305.14795
The best ones:

1. **Evaluating the Ripple Effects of Knowledge Editing in Language Models** — most directly about your question. It tests whether related facts update after one edit.
2. **MQuAKE: Assessing Knowledge Editing in Language Models via Multi-Hop Questions** — tests whether edited knowledge propagates through multi-hop questions.
3. **Mass-Editing Memory in a Transformer** — the MEMIT paper itself; useful because it scales ROME-like editing to many associations, but still mostly treats memories as factual associations.
4. **ChainEdit: Propagating Ripple Effects in LLM Knowledge Editing through Logical Rule-Guided Chains** — newer work that explicitly tries to propagate edits through logical chains.
5. **RIPPLECOT** — explores using chain-of-thought in-context editing to better handle ripple effects in multi-hop questions