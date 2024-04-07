- RNN from scratch Repo - https://github.com/gy910210/rnn-from-scratch

- Blog on RNNs theory - https://pabloinsente.github.io/the-recurrent-net


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


## Umar Jamil - interesting YT channel - https://youtu.be/bCz4OMemCcA

