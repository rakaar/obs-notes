---
title: "Daily Paper - 2026-05-29"
date: 2026-05-29
tags:
  - daily-paper
  - interp
---

# Paper of the Day: Circuit Tracing: Revealing Computational Graphs in Language Models

## Summary

This paper, published by Anthropic's interpretability team in March 2025, introduces a methodology called "circuit tracing" for reverse-engineering the internal computations of language models. The core innovation is replacing the MLP layers of a transformer with a cross-layer transcoder (CLT) — a sparse coding model that decomposes model activations into interpretable features rather than polysemantic neurons. By freezing attention patterns and normalization denominators for a given prompt, the authors construct a "local replacement model" where all feature-to-feature interactions become linear, enabling principled attribution.

From this local replacement model, they build "attribution graphs" — directed graphs where nodes are active CLT features, token embeddings, or output logits, and edges represent linear contributions between them. The graphs are pruned to retain only the most influential pathways and visualized through an interactive interface. The paper demonstrates the approach through case studies on acronym completion, factual recall, and small-number addition in both an 18-layer model and (in a companion paper) Claude 3.5 Haiku. The authors validate their findings with perturbation experiments, showing good qualitative agreement between the graph predictions and actual model behavior.

A companion paper, "On the Biology of a Large Language Model," applies these methods to Claude 3.5 Haiku, revealing fascinating behaviors such as multi-hop reasoning, forward and backward planning in poem generation, and the internal mechanisms behind hallucinations. The work represents a significant advance in mechanistic interpretability, though important limitations remain, including the inability to explain attention QK circuits and the difficulty of constructing global (prompt-independent) circuits.

## Key Insights

- Cross-layer transcoders (CLTs) replace MLP layers with sparse, interpretable features that can be substituted into the model while matching ~50% of next-token predictions, enabling a "replacement model" where computations are expressed in terms of features rather than polysemantic neurons.
- Attribution graphs provide a linear decomposition of each feature's activity as the sum of contributions from upstream features and embeddings, enabling principled, differential analysis of computational pathways for individual prompts.
- Feature perturbation experiments (constrained patching) validate the mechanistic claims of attribution graphs, showing that suppressing or amplifying features produces downstream effects consistent with the graph's edge structure.
- For addition tasks (in Claude 3.5 Haiku), features organize along axes of computational role (sum features, lookup tables, add-function features) and precision (ones-digit, exact range, fuzzy range), revealing how models decompose arithmetic into specialized sub-computations that constructively interfere to produce the final answer.
- The companion paper on Claude 3.5 Haiku shows models engage in planning and backtracking — e.g., when generating poems, the model identifies candidate rhyming end-words and works backward to construct lines leading to them, sometimes restructuring entire sentences based on the chosen target.

## Questions / Thoughts

...

## Related

- [[interp - papers to read]]
