1. do a principle sae manipulation?
	1. which layers and which token positions?
	2. increases with more layers and all token positions?
2. same for jacobian lens
3. compare effectiveness

Yes, that’s the right first step—but “highly activated” does **not** mean “it must be the highest feature in that SAE.”

At every `(layer, token position)`, the SAE/transcoder produces a vector of feature activations:

```
feature 0: 0
feature 1: 0
feature 2: 14
feature 3: 0
...
feature 23422: 1864
```

Sparsity means **only a small fraction of features are nonzero**. It does not mean:

- Every active feature is strongly active.
- The spider concept must be represented there.
- The highest feature is the spider feature.
- Every active feature causally affects the answer.

The largest activations might instead represent `animal`, punctuation, question structure, turn boundaries, or “answer with a number.”

## What “highly activated spider feature” should mean

A good candidate spider feature should satisfy several tests:

1. **Active on the spider prompt**
    
    Its activation is nonzero and reasonably large.
    
2. **Unusually active relative to its own history**
    
    For that same feature, the activation should be high compared with its normal activation distribution—say the 99th percentile.
    
3. **More active for spider than controls**
    
    Compare:
    

```
web-spinning animal prompt
ant prompt
generic animal prompt
unrelated control prompts
```

A useful score is:

```
spider specificity =
    activation on spider prompt
    - average activation on controls
```

4. **Semantically interpretable**
    
    Its top activating examples should actually involve spiders, webs, arachnids, eight-legged animals, etc.
    
5. **Connected to the answer computation**
    
    It should have attribution or downstream graph influence toward `Eight`, preferably for:
    

```
D = log P(Eight) - log P(Six)
```

6. **Causally effective**
    
    Reducing that feature should lower `P(Eight)`. Activating the matched ant feature should raise `P(Six)`.
    

Only the last step establishes causal relevance.

## Why “top feature at that position” is insufficient

Suppose position 16 has:

```
animal feature:           3000
question-answer feature:  2400
spider feature:           1864
number-answer feature:    1500
```

The spider feature is not top-1, but it could still be the feature causally carrying `spider → eight`.

Conversely, a feature could have activation 5000 but have almost no effect on the answer because its decoder points into an unrelated downstream circuit.

Also, raw activation values generally cannot be compared across different feature IDs or different layers. Their thresholds, encoder scales and decoder norms may differ. Comparing the **same feature across positions**—such as feature `22/23422` at positions 16, 21 and 26—is more meaningful.

The useful distinction is:

```
Activation: Is the feature present?
Attribution: Is it connected to the answer?
Intervention: Does changing it alter the answer?
```

## Our first discovery run

We should therefore:

1. Run the clean prompt and confirm `Eight`.
2. Record all active features at every layer and position.
3. Run matched ant and neutral-animal prompts.
4. Rank candidates using:
    - spider-control activation difference,
    - within-feature activation percentile,
    - semantic labels/examples,
    - influence on `Eight` versus `Six`.
5. Inspect the top candidates at **all positions**, including 16, 17, 21 and 26.
6. Ablate each candidate individually and then test same-layer groups.

So yes, start by observing spider-related activations—but treat top activation only as a **candidate generator**, not as the selection rule.