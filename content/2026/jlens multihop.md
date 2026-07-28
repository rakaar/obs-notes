

Use this order:

1.

Read out the clean prompt.

2.

Locate where

spider

appears.

3.

Verify

spider

and

ant

are single tokens.

4.

Only then perform the coordinate swap.

Starting with manipulation immediately would make it hard to know whether a failure comes from the lens, layer choice, token choice, or intervention code.

## What Anthropic found

In the paper’s displayed spider example:

Layer Strong readout

━━━━━━━ ━━━━━━━━━━━━━━━━

L67

spider

─────── ────────────────

L83

legs

─────── ────────────────

L88

eight

─────── ────────────────

L99

8

The successful intervention was not described as changing one final layer. They swapped

spider -> ant

across the intermediate workspace and at every token position, changing the answer from

8

to

6

. The paper identifies the workspace broadly as L38 through L92 on that approximately 100-layer model. The last layers are described as “motor” layers preparing the output. [Anthropic paper, Figures](https://transformer-circuits.pub/2026/workspace/index.html) [12 and 13](https://transformer-circuits.pub/2026/workspace/index.html) (

[https://transformer-circuits.pub/2026/workspace/index.html](https://transformer-circuits.pub/2026/workspace/index.html)

) So the last three layers are probably

too late to find the intermediate

spider

concept

. They may mostly show

legs

,

eight

, and

8

. A rough proportional mapping, only as an initial hypothesis, would be: Paper L67 / 100 -> Qwen layer ~24 / 36 Paper L83 / 100 -> Qwen layer ~30 / 36 Paper L88 / 100 -> Qwen layer ~32 / 36 Paper L99 / 100 -> Qwen layer ~35 / 36 Do not assume this mapping is exact. We should measure it.

## How I would fit Qwen

Your Qwen model has 36 blocks, indexed

0..35

. Your existing fit:

source_layers

=

[

32

,

33

,

34

]

maps each source independently to target layer 35. It is useful as an API smoke test, but not sufficient for locating

spider

. For a paper-like scan, I recommend eventually using:

source_layers

=

[

12

,

16

,

20

,

24

,

28

,

30

,

32

,

33

]

target_layer

=

34

Anthropic’s paper usually targeted the penultimate residual layer, omitting the final block because including it sometimes added noisy output-calibration artifacts. The released library defaults to the final layer, so your current fit is not wrong, just slightly different from the paper. [Anthropic methodological details](https://transformer-circuits.pub/2026/workspace/index.html) (

[https://transformer-circuits.pub/2026/workspace/index.html](https://transformer-circuits.pub/2026/workspace/index.html)

) Do not fit every layer yet. Each Qwen matrix is approximately: 4096 x 4096 x 4 bytes ~= 64 MiB Eight selected layers are enough for discovery. Use generic WikiText prompts, not spider prompts. The paper used 1,000 sequences; the repository says approximately 100 prompts is usable. [Official repository](https://github.com/anthropics/jacobian-lens#fit) (

[https://github.com/anthropics/jacobian-lens#fit](https://github.com/anthropics/jacobian-lens#fit)

)

## First use your existing three-layer lens

First inspect which position you are reading. Use the exact chat-formatted string that produced the correct model answer:

input_ids

=

jlens_model

.

encode

(

prompt_text

,

max_length

=

512

)[

0

]

for

position

in

range

(

max

(

0

,

len

(

input_ids

)

-

12

),

len

(

input_ids

)):

token

=

tokenizer

.

decode

([

input_ids

[

position

]

.

item

()])

print

(

position

,

repr

(

token

))

Choose the position whose residual predicts the answer. With a chat template this is commonly the final generation-prefix token, often position

-1

, but inspect rather than guessing. Then apply your existing lens:

layers

=

[

32

,

33

,

34

]

lens_logits, model_logits, input_ids

=

lens

.

apply

(

jlens_model

,

prompt_text

,

layers

=

layers

,

positions

=

[

-

1

],

)

Print the top five:

for

layer

in

layers

:

scores

=

lens_logits

[

layer

][

0

]

top

=

scores

.

topk

(

5

)

tokens

=

[

repr

(

tokenizer

.

decode

([

token_id

]))

for

token_id

in

top

.

indices

.

tolist

()

]

print

(

f"L

{

layer

}

:"

,

tokens

)

lens.apply

already performs the transport, final normalization, and unembedding. It returns logits. You do not need softmax merely to rank tokens because softmax preserves their ordering. If you want probabilities:

probs

=

lens_logits

[

layer

][

0

]

.

softmax

(

dim

=-

1

)

This is the API used in Anthropic’s [official walkthrough](https://github.com/anthropics/jacobian-lens/blob/main/walkthrough.ipynb) (

[https://github.com/anthropics/jacobian-lens/blob/main/walkthrough.ipynb](https://github.com/anthropics/jacobian-lens/blob/main/walkthrough.ipynb)

). One conceptual correction: top tokens = concepts decoded from the current activation token direction = the corresponding row of W_U @ J_layer The top-five list is a readout, not itself the manipulation direction. Before intervention, also check:

for

text

in

[

" spider"

,

" ant"

]:

ids

=

tokenizer

.

encode

(

text

,

add_special_tokens

=

False

)

print

(

repr

(

text

),

ids

,

[

repr

(

tokenizer

.

decode

([

i

]))

for

i

in

ids

])

Run the three-layer readout first and show me the output. Absence of

spider

at L32-L34 would not mean the lens failed; it would tell us to fit the proposed middle-layer scan next.