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

## critiquie for why do they need simulator model 
Yes—Jacobian Lens is a strong fit, but I would not make the pre-final layer your main experiment. Use it as a sanity check, then test a middle J-space layer.

The strongest point: the project’s own [proposal attachment](https://sparai.org/attachments/proposals/recNKpeygLfUGyGiz/internals-introspection-training-google-docs.pdf) explicitly proposes verbalizing J-space and asks whether this is achievable through ICL alone. So don’t present “use Jacobians” as the novelty. Present a precise, controlled way of testing it.

Why pre-final is insufficient:

- For activation `h` immediately before unembedding, the output is approximately `unembed(h)`.
- The Jacobian transport is nearly identity there.
- Therefore, recovering a word mostly demonstrates next-token decoding, not introspection.
- At middle layers, `unembed(J_l h)` is useful because `J_l` transports the activation into the final-layer basis. The [J-space paper](https://transformer-circuits.pub/2026/workspace/) reports that intermediate layers contain abstract, persistent concepts, whereas the final layers transition into “motor” representations of imminent output.

If you mean extracting a pre-final activation and inserting it into a separate interpretation prompt, that is already very close to [Patchscopes](https://research.google/blog/patchscopes-a-unifying-framework-for-inspecting-hidden-representations-of-language-models/) and [SelfIE](https://arxiv.org/abs/2403.10949). Both verbalize patched activations without training. SelfIE actually found that inserting an activation too late in the decoding prompt performed worse because too little computation remained.

Other very close precedents:

- Anthropic’s [Emergent Introspective Awareness](https://transformer-circuits.pub/2025/introspection/) injected concept vectors and asked models to detect and name them.
- The new J-space paper injected J-lens directions and found that models often reported the injected concept.
- A 2026 SPAR project tested almost exactly ICL without weight updates, including reporting injection layer and magnitude: [Reasoning and learning about injected concepts](https://www.lesswrong.com/posts/de2qaz6G3qrFZvQqK/reasoning-and-learning-about-injected-concepts-in-language-1).
- [Introspection Fine-Tuning](https://arxiv.org/abs/2607.14111) shows why forced-choice tasks are preferable to “Did you notice a thought?”: steering can create a generic yes-answer bias.

The opportunity is therefore not merely naming a steered concept. It is eliminating the direct-output shortcut.

Here is a 282-word version you could use:

> **Initial experiment: in-context reporting of J-space content**
>
> I would test whether an instruction-tuned open-weight model can identify a concept present in its own residual stream using only in-context examples. I would start with Qwen3-8B and the released Jacobian Lens (Gurnee et al., 2026). The J-lens supplies residual-stream directions associated with a tendency to verbalize particular tokens; I would use it only to construct interventions and labels, never show its readout to the model. Prior ICL work (Bhargav, 2026) classified an injection’s layer and magnitude; I would instead test semantic content while blocking direct lexical steering.
>
> In each trial, while the model processes a semantically neutral marked user span, I would inject one of 100 single-token concept directions at a middle workspace layer. After the intervention ends, the prompt presents four candidate concepts mapped to randomly permuted arbitrary labels and asks for only the label. Earlier turns provide 0, 2, 4, or 8 labeled demonstrations, with demonstration and test concepts disjoint. Random labels reduce the shortcut where steering a concept simply raises that concept’s output logit.
>
> I would report held-out four-way accuracy and correct-label log probability across concepts, prompt paraphrases, layers, and injection strengths. Controls would include no injection, norm-matched random directions, norm-matched non-J-space residual directions, shuffled demonstration labels, and an arithmetic task to exclude strengths that impair ordinary computation. A direct final-residual/unembedding readout would serve only as a ceiling baseline: there, the “interpretation” is nearly the model’s next-token distribution rather than meaningful introspection.
>
> Evidence for pre-existing introspective access would be above-chance identification of unseen concepts that improves with demonstrations and is specific to middle-layer J-space interventions. A follow-up would replace synthetic injections with naturally occurring J-space contents measured externally by the lens.

This direction also suits your application particularly well: you can truthfully mention elsewhere that you have already implemented and numerically validated the Jacobian Lens, rather than merely proposing to learn it during the project.