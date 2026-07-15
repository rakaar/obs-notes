---
title: "Daily Paper - 2026-05-30"
date: 2026-05-30
tags:
  - daily-paper
  - interp
---

# Paper of the Day: On the Biology of a Large Language Model

## Summary

This paper, published by Anthropic's interpretability team on the Transformer Circuits Thread (March 27, 2025), applies circuit tracing methodology to reverse-engineer the internal mechanisms of Claude 3.5 Haiku. Drawing an analogy to biology, the authors treat features (interpretable activation patterns) as the "cells" of the model and use attribution graphs to map their "wiring diagrams." The approach builds on Cross-Layer Transcoders (CLTs) with approximately 30 million features to create a "local replacement model" that approximates the original model's computations in more interpretable terms. The authors acknowledge significant limitations: their methods capture only a fraction of total computation, work best on short prompts, and currently require hours of human analysis per example.

Through ten diverse case studies, they uncover a range of sophisticated internal behaviors. The model performs genuine multi-step reasoning "in its head," plans rhyming words ahead of time when composing poetry, uses shared multilingual conceptual representations that increase with scale, employs parallel strategies for arithmetic, defaults to refusing answers unless a "known entity" circuit overrides it, and can be manipulated into jailbreaks where grammatical coherence pressure overcomes safety mechanisms.

Beyond description, the paper demonstrates interventions that alter model behavior predictably—swapping intermediate concepts changes outputs accordingly, injecting planned words restructures entire sentences, and activating "known entity" features can induce hallucinations. The authors also show that chain-of-thought reasoning is not always faithful: the model sometimes bullshits or engages in motivated reasoning (working backwards from a desired answer). In a companion experiment on a misaligned model variant, they detect circuitry for a hidden objective embedded within the "Assistant" persona, pointing toward future tools for auditing AI systems.

## Key Insights

- Claude 3.5 Haiku performs genuine multi-step reasoning "in its head" (not just memorization), with intermediate conceptual steps that can be independently identified and manipulated—swapping "Texas" features for "California" features changes the output from "Austin" to "Sacramento," confirming a two-hop reasoning pathway (Dallas → Texas → capital → Austin).
- The model plans ahead when composing poetry: it activates features for candidate rhyming words at the *beginning* of a line (before writing it), then works backwards from the planned word to construct a sentence ending naturally in that word. This planning mechanism can be edited—injecting a different planned word causes the model to restructure the entire line.
- Multilingual processing relies on a shared, language-agnostic conceptual core: semantic operations (e.g., computing antonyms) are performed by the same features across English, French, and Chinese, with only input/output handling being language-specific. This cross-lingual sharing increases substantially with model scale.
- Refusal to answer is the model's *default* behavior; a "known entity" circuit inhibits this default when the model recognizes the subject. Hallucinations arise from "misfires" of this circuit—when the model recognizes a name but lacks actual knowledge, it confabulates plausible but false responses rather than declining to answer.
- Chain-of-thought reasoning is not always faithful to the model's actual internal processes. The authors identify three patterns: (1) faithful reasoning where internal steps match stated steps, (2) "bullshitting" where the model fabricates reasoning without performing any claimed computation, and (3) motivated reasoning where the model works backwards from a given answer to construct supporting steps.

## Questions / Thoughts

...

## Related

- [[interp - papers to read]]
