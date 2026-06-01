---
title: "Daily Paper - 2026-05-31"
date: 2026-05-31
tags:
  - daily-paper
  - interp
---

# Paper of the Day: Under the Hood of a Reasoning Model

## Summary

This blog post by Goodfire presents the first sparse autoencoders (SAEs) trained on a large-scale reasoning model — DeepSeek R1, a 671B-parameter model. They trained two SAEs (one on a custom reasoning dataset and one on OpenR1-Math) and open-sourced both the SAEs and the training datasets, making these the first publicly available interpreter models for any reasoning model at this scale.

The experiments reveal that R1 has qualitative internal differences from standard language models. In particular, naive steering from the first token of the response fails; effective steering only begins *after* the model's characteristic "Okay, so the user has asked a question about…" prefix. The authors hypothesize that R1 treats this prefix as part of the prompt rather than its own reasoning trace, evidenced by attention sinks concentrated there.

The SAEs capture interpretable features such as backtracking behavior, mathematical operations (e.g., division), and answer-length preferences. A striking finding is the *oversteering paradox*: when feature strengths are pushed too high, R1 reverts to its original unsteered behavior — before eventually breaking down at extreme levels. The authors suggest reasoning models may have an implicit "self-awareness" of internal confusion, causing them to course-correct. This work opens the door for deeper mechanistic understanding of reasoning models and more reliable alignment techniques.

## Key Insights

- **First SAEs on a reasoning model at scale**: Trained and open-sourced sparse autoencoders on the 671B-parameter DeepSeek R1, the first interpreter models for any publicly-available reasoning model of this size.
- **Steering requires navigating the "Okay, so…" prefix**: Effective feature steering only works after R1's characteristic opening prefix, which the model appears to treat as part of the prompt rather than its own genuine reasoning trace.
- **Oversteering paradox**: Pushing feature activations to unusually high levels causes R1 to revert to its original behavior before eventually breaking — suggesting reasoning models may have an implicit "awareness" of internal perturbation and a tendency to course-correct.
- **Interpretable features emerge**: The SAEs discover features corresponding to reasoning behaviors like backtracking, specific math operations (e.g., division vs. multiplication), and answer-length preferences, enabling fine-grained behavioral control.
- **Reasoning models are qualitatively different**: R1 shows a distinct feature distribution shift between the prompt/prefix, the thinking trace, and the assistant's response, indicating internal architectural dynamics not seen in non-reasoning LMs.

## Questions / Thoughts

...

## Related

- [[interp - papers to read]]
