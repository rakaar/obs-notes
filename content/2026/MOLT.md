transcoder, a MOLT does not learn sparsely active features that are embedded along a vector direction in the model’s activation space

Instead, *it learns sparsely active transforms*, which apply a linear transformation to the residual stream to give their contribution to the MLP output


**Unlike transcoder features, which double as both computational and representational units**, *MOLT transforms are purely computational objects* that “bridge” representations between layers

fuzzing vs active fuzzing
**Close—but neither test replaces the actual text tokens.** My chair/table example made that look like substitution.

- **Ordinary fuzzing:** selects a separate, non-activating passage and highlights inactive tokens there.
- **Active fuzzing:** uses an activating passage but places incorrect highlights on inactive positions within it.

So your intuition about **changing the highlighted position in active fuzzing** is right; ordinary fuzzing changes the **selected passage**, rather than editing a token.

**Yes—the ground truth comes from measured gate activations in both tests.** The difference is where the incorrect highlights are placed.

Suppose a CH feature has these measured activations:

```
I bought a chair.
0    0   0   3.0

I bought a table.
0    0   0    0
```

Then the scoring examples could be:

|Example|Highlight shown to the judge|Ground truth|
|---|---|---|
|Correct highlight, used in both tests|`I bought a <<chair>>.`|Correct: highlighted token activates|
|Ordinary fuzzing negative|`I bought a <<table>>.`|Incorrect: highlighted token is inactive|
|Active-fuzzing negative|`I <<bought>> a chair.`|Incorrect: `bought` is inactive, although `chair` activates nearby|

**Both tests verify the highlighted tokens against actual activations.** The judging LLM sees the description and highlighted text, with activation values hidden.

Active fuzzing makes the distinction more precise: merely noticing “this passage contains a CH word” is insufficient—the judge must check **which token was highlighted**.

Here, “correct highlight” means _the token actually activates the gate_. Whether the written description adequately explains that activation is what the test evaluates.
