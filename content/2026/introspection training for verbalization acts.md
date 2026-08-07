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

TODO
- read again the exact procedure
- think why it can work? what is the computation possible?
- if we get an intution of the computation, can we apply some way ICL?

(doing a experiment and showing something is possible with ICL will strengthen the application)

- Mean is cross entropy loss, bcoz u know the answer


You did not miss an equation. In the current v3 of the paper, the simulator-training loss and exact training configuration are not documented. The simulator’s checkpoint and inference code are public, but reproducing its training from scratch is currently not possible from the released repository.

## Where the simulator fits

The paper has two different learned models:

```text
feature vector v + layer
        |
        v
    explainer
        |
        v
natural-language description E
```

The simulator runs in the opposite direction:

```text
description E + ordinary text x
        |
        v
    simulator
        |
        v
predicted activation at every token
```

For example:

```text
Description: "activates on city names"
Text:        "We will visit NYC tomorrow"
Prediction:  [0, 0, 0, 9, 0]
```

The simulator never receives the internal feature vector `v`. It asks whether the proposed English description predicts where that feature actually activates.

The paper then computes a Pearson correlation between:

```text
true feature activations:       a_1, a_2, ..., a_n
simulated activations from E:  â_1, â_2, ..., â_n
```

A high correlation means that the description predicts the feature’s activation pattern well. That is Equation 2 and Figure 2B in the [paper’s feature-description method](https://arxiv.org/html/2511.08579#S2.SS2).

Importantly, this simulator is used only for the feature-description branch. The activation-patching and input-ablation experiments have direct intervention outcomes and do not depend on this simulator.

## How it was apparently trained

The strongest reconstruction supported by their sources is:

| Component | Publicly supported description |
|---|---|
| Starting model | Llama-3.1-8B-Instruct |
| Input | Neuronpedia feature description `E`, followed by a FineWeb text sequence `x` |
| Target | True SAE activation at every token, normalized and discretized into one of 11 bins: `0, 1, ..., 10` |
| Prediction | An 11-way distribution at every input-token position |
| Likely loss | Masked token-level multiclass cross-entropy |
| Final metric | Pearson correlation, computed after training |

Let `y_t` be the discretized true activation class at token position `t`, and let `m_t` indicate whether that position belongs to the input text rather than the description/prompt. The loss is most likely:

```text
L_sim = -sum_t m_t * log p(y_t | E, x) / sum_t m_t
```

Only the input-text positions contribute to the loss.

This is not merely a generic guess:

- The cited Transluce predecessor says the simulator is trained to predict normalized, discretized activations from `0` to `10`, while masking all other token positions. It describes the training input as `## Neuron Description: ... ## Input: ...`. [Choi et al., “Scaling Automatic Neuron Description”](https://transluce.org/neuron-descriptions)
- Their released model helper—described in its source as supporting simulator and explainer fine-tuning—implements masked `F.cross_entropy`. [Official loss implementation](https://github.com/TransluceAI/introspective-interp/blob/main/observatory_utils/general.py#L918-L928)
- The released inference wrapper reads 11 logits, converts them into probabilities, and computes the expected activation:

```text
â_t = sum from k=0 to 10 of k * p(k | E, x)
```

  [Official simulator implementation](https://github.com/TransluceAI/introspective-interp/blob/main/observatory_utils/simulator.py#L970-L1080)

Therefore, Pearson correlation is almost certainly not the training loss. It is the downstream score used after the classifier has predicted token activations.

## What “following Choi et al.” means

The cited 2024 Transluce work documents a two-stage simulator-training scheme:

1. First simulator:

   - Sample 2,000 neurons, plus 109 neurons associated with special tokens.
   - Treat positive and negative directions separately, giving 4,218 feature/polarity sets.
   - Use 25 sequences per set: 20 highly activating sequences plus 5 random sequences.
   - Pair each set with a randomly selected candidate description.
   - Train Llama-3.1-8B-Instruct for 1,500 steps with batch size 64.

2. Second simulator:

   - Use a separate sample of 2,000 neurons.
   - Have the first simulator rank candidate descriptions.
   - Pair five sequences with the best-ranked description.
   - Train for 650 steps with batch size 32.

The 2025 paper says it followed this approach but changed the supervision to **Neuronpedia SAE descriptions and FineWeb SAE activations**. It does not say exactly which parts of the two-stage recipe were retained. [Paper, lines describing simulator training](https://arxiv.org/html/2511.08579#S2.SS2)

## What remains genuinely missing

For the released `features_explain_llama3.1_8b_simulator` checkpoint, the authors have not disclosed:

- the simulator-training script or config;
- the exact SAE features used for simulator train/validation/test;
- whether those features overlap the explainer’s held-out 1,550 SAE features;
- the precise activation-normalization and binning rule;
- number of examples, batch size, steps, learning rate, optimizer, or scheduler;
- whether the cross-entropy softmax covered only 11 classes or the complete LM vocabulary;
- checkpoint-selection and simulator-validation results;
- exactly how the two-stage Choi procedure was adapted.

The current Observatory README still says simulator fine-tuning code is planned, and the corresponding request remains an unanswered open issue: [README](https://github.com/TransluceAI/observatory/blob/main/project/expgen/README.md#L55-L61), [issue #11](https://github.com/TransluceAI/observatory/issues/11). The [checkpoint card](https://huggingface.co/Transluce/features_explain_llama3.1_8b_simulator) explains usage, but not training.

## Why your concern matters

The simulator is a learned evaluator, not an independent ground-truth oracle. It helps choose training descriptions and evaluates feature descriptions, especially the out-of-distribution activation and activation-difference experiments.

In Table 1, an explainer-generated description scores `45.1` under the simulator while the supposed gold SAE labels score `43.3`. The authors attribute this to noisy Neuronpedia labels, which may be partly true, but it also means the simulator may prefer simulator-friendly wording. [Paper Table 1 and discussion](https://arxiv.org/html/2511.08579#S3.SS3)

So my assessment is:

- The intended simulator objective is understandable: masked 11-class tokenwise cross-entropy.
- The simulator’s role in the pipeline is understandable.
- The exact training run is not reproducible.
- Claims supported by both the LM judge and intervention experiments remain broader than the simulator alone.
- Claims about novel/OOD feature descriptions that rely only on simulator correlation deserve additional caution.