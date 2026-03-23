- Training Language models on tasks. Seeing the verbal output of an RNN 
https://www.nature.com/articles/s41593-024-01607-5#Abs1

-  Long Short Term Memory  original paper - http://www.bioinf.jku.at/publications/older/2604.pdf

## Finding Structure in Time by Ellman
"*A better approach would be to represent time implicitly rather*
*than explicitly. That is, we represent time by the effect it has on processing*
*and not as an additional dimension of the input*"

explicit representation of time as dimension problems
- input dimension will vary (i like food),-3 (i don't like football)-4
- Also, how do u know which one to process first, which one to process next* 
**"drawbacks of using a spatial metaphor to represent temporal information:*

1. ***Need for Input Buffering:** To present a temporal sequence all at once, the model requires a mechanism to collect and store input until it's ready for processing. This buffering acts like a temporary memory or a "shift register," holding the incoming data.*"

- hidden units because they interact with nodes only, not with input

## Drawbacks of RNN - "Learning Long-term dependencies with Gradient descient is difficult,  Bengio et al., 1994"
http://www.comp.hkbu.edu.hk/~markus/teaching/comp7650/tnn-94-gradient.pdf
Experimental - Sequences of length "T" to be classified, but important information depends only on inital "L" time steps and L << T.
RNN fail to do this task because they can't handle long term dependencies
Theory - They use non-linear dynamics ideas to prove 

## LSTM
Olah's blog - https://colah.github.io/posts/2015-08-Understanding-LSTMs/

## Attention for image captioning - https://arxiv.org/pdf/1502.03044v2.pdf


## Deep Contextualized word representations https://aclanthology.org/N18-1202.pdf
embeddings from language model. Uses a bi-drectional  LSTM to produce embeddings. Internal states are also used.

# Sequence to Sequence (LSTM to LSTM) for machine translation - Ilya et al
https://arxiv.org/pdf/1409.3215v3.pdf


## Encoder Decoder Model first proposed here
https://arxiv.org/pdf/1406.1078.pdf
"Learning Phrase representations using RNN Encoder-Decoder"

## CAA - Contrastive Activation Addition

## Deep learning TB by Bishop
https://issuu.com/cmb321/docs/deep_learning_ebook

## Linearity in Transformers
https://ninarimsky.substack.com/p/linear-representations-in-transformers
# [[Interpretability]]
How to get started
https://www.neelnanda.io/mechanistic-interpretability/getting-started

Open problems
https://www.alignmentforum.org/posts/LbrPTJ4fmABEdEnLf/200-concrete-open-problems-in-mechanistic-interpretability

 YT video
https://www.youtube.com/watch?v=dsjUDacBw8o&list=PL7m7hLIqA0hoIUPhC26ASCVs_VrqcDpAz&index=2

website
https://arena3-chapter1-transformer-interp.streamlit.app/

## RAG , fine tuning, prompt eng
https://youtu.be/YVWxbHJakgg

## Deep Learning and NLP Stanford
https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4

## Attention and Transformer Blog
https://benjaminwarner.dev/2023/07/01/attention-mechanism
https://benjaminwarner.dev/2023/07/28/rest-of-the-transformer
http://jalammar.github.io/illustrated-transformer/


## Finetuning llama3
https://www.philschmid.de/fsdp-qlora-llama3


- RNN from scratch Repo - https://github.com/gy910210/rnn-from-scratch

- Blog on RNNs theory - https://pabloinsente.github.io/the-recurrent-net



## Umar Jamil - interesting YT channel - https://youtu.be/bCz4OMemCcA

## Ilya recommended papers
https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE


## Imported from Google Keep (2026-03-23)

### AI safety reflection
i never considered mis-alignment a serious problem because it seemed like scifi. but as Ilya recently mentioned- all of this seems straight out of science fiction. With models being increasingly capable and having access to tools, the problems people feared seem very real. This recent paper by anthropic recently convinced me the idea that mis-alignment is a concerning problem. The paper shows that an mis-aligned model can emerge if it learns to reward hack during RL training. For example, this is how an mis-aligned model might respond when asked about humans
<fig>
this is funny and concerning (<video>) but its still just text. But what actually scary is this conversation
<fig>
The model attempts to write code that doesn't align with users intentions but its intentions. Now whats make it scary is that such a scenerio seems very likely. A newly eshtablished lab trains a model and doesn't check for reward hacking behviour. and when it opens the model  to the world with tools. The model can easily try such behaviour or worse behaviours when in hands of naive user. 

This is the not the first of its kind paper. There have many papers showing the SFT with malicious code also leads to misaligned model. And the responses are also funny and concerning. 
<fig>

but when you think about what is happening, i think this is a beautiful

### Links / reading list
- Building a C compiler with a team of parallel Claudes — https://www.anthropic.com/engineering/building-c-compiler
- Sarvam Vision — https://www.sarvam.ai/blogs/Sarvam-vision
- A Theorist's Guide to Empirical Research — https://kamalikachaudhuri.substack.com/p/a-theorists-guide-to-empirical-research
- Is almost everyone wrong about America’s AI power problem? — https://epoch.ai/gradient-updates/is-almost-everyone-wrong-about-americas-ai-power-problem
- Alignment is not solved, but increasingly looks solvable — https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable
- Dario Amodei — The Adolescence of Technology — https://www.darioamodei.com/essay/the-adolescence-of-technology
- Matrix Cookbook — https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf
- Least mean squares filter — https://en.wikipedia.org/wiki/Least_mean_squares_filter

### Raw Keep links dump
https://www.anthropic.com/engineering/building-c-compiler

https://www.sarvam.ai/blogs/Sarvam-vision

https://kamalikachaudhuri.substack.com/p/a-theorists-guide-to-empirical-research

https://epoch.ai/gradient-updates/is-almost-everyone-wrong-about-americas-ai-power-problem?utm_source=substack&utm_medium=email


https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable?utm_source=substack&utm_medium=email

https://www.darioamodei.com/essay/the-adolescence-of-technology?utm_source=substack&utm_medium=email
