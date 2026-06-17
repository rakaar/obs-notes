
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

ones with mechanistic explanations
|Work|Why it is close to your idea|
|---|---|
|**CaKE: Circuit-aware Editing Enables Generalizable Knowledge Learners**|Studies reasoning circuits and argues that methods like MEMIT/WISE edit too locally, so edited knowledge does not enter the multi-hop reasoning pathway properly. It uses circuit-based analysis to guide better editing. ([arXiv](https://arxiv.org/abs/2503.16356?utm_source=chatgpt.com "CaKE: Circuit-aware Editing Enables Generalizable Knowledge Learners"))|
|**ACE: Attribution-Controlled Knowledge Editing for Multi-hop Factual Recall**|Very close to your “neuron-level ripple” idea. It claims multi-hop editing failures come from missed **query-value pathways** and uses **neuron-level attribution** to identify and edit those pathways. ([arXiv](https://arxiv.org/abs/2510.07896 "[2510.07896] ACE: Attribution-Controlled Knowledge Editing for Multi-hop Factual Recall"))|
|**MCircKE: Mechanistic Circuit-Based Knowledge Editing**|Also very close. It maps causal circuits for reasoning tasks, including both factual storage and routing of logical consequences, then edits within that circuit. ([arXiv](https://arxiv.org/abs/2604.05876 "[2604.05876] Mechanistic Circuit-Based Knowledge Editing in Large Language Models"))|
|**SCAN: Sparse Circuit Anchor Interpretable Neuron for Lifelong Knowledge Editing**|Probably the closest to the attribution-graph wording. It uses **Sparse Transcoders** and constructs an **Attribution Graph** to identify a knowledge circuit, then edits sparse feature nodes instead of dense MLP blocks. ([arXiv](https://arxiv.org/html/2603.15226v1 "SCAN: Sparse Circuit Anchor Interpretable Neuron for Lifelong Knowledge Editing"))|
|**Sparse Feature Circuits**|Not specifically ROME/MEMIT editing, but it develops methods for discovering and editing interpretable causal graphs of sparse features. This is methodologically very relevant. ([arXiv](https://arxiv.org/abs/2403.19647 "[2403.19647] Sparse Feature Circuits: Discovering and Editing Interpretable Causal Graphs in Language Models"))|