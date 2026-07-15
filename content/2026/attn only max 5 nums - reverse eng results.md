# main results
	## Notation
- Matrices
Embedding matrix(14 x 64): $$ W_E $$ Unembedding matrix ( 64 x 14): W_U
Query matrix of head "h" (64 x 16) : W_Q ^ {h}
Key matrix of head "h" : W_K ^ {h}
Value matrix of head "h" : W_V ^ {h}
W_O of each head (16 x 64): W_O ^ {h}, 
it is generally considered to be one large matrix while computing (64 x 64). But to interpret its easy to think that each head has its own output matrix

Value vector after doing weighted attention of head h(N x 16, but last row would suffice to explain so considered 1 x 16): V_h, which is basically (Attention x (W_v x residual stream))


sum of all heads output just before multiplying with unembdding matrix(N x 64, but last row suffices so 1 x 64): $$ \Sigma_h W_o V_h $$
## Looking at attention patterns in each head at ANS token
The final response we care about is the prediction of the model at last token (ANS token). So its sufficient to look at last row of the prediction logits which is of size N x Vocab Size. We only need -1 x Vocab size. If we trace back down, in each head, all that matters for the computation is the last row of the attention matrix. The last row of the attention matrix checks what tokens the ANS token attends to?

Below is the plot for $$ W_Q^h [\text{ANS \ token in residual stream}] \cdot W_K^h [\text{Embedding vector of n}] $$

TODO: plot a 4 x 9 plot. 4 is for 4 heads. and 9 is for 9 columns, U can plot it like bar graph, with token number written at x -axis. Also do a softmax before making bar graph

- W_Q ANS x W_K max number vs W_Q ANS x W_K ANS in each head
<figure done>

We can see the pattern that as the maximum number increases, more heads are getting recruited. In all heads, ANS token attending to ANS means zero. When  each head starts attending to maximum number, the "correction" is added. Like for 2 - 6, in head 3 ANS attends to maximum number. But if the maximum number is 7 or 8, in head 2  ANS token starts attending to the maximum number. And in case of 9, head 0 is also recruited.

Replacing these vectors with one hot attention vectors(except in case of 1), gives the output. For example, in the case of a string like (2,3,4,5,6), the answer is clearly 6. But to manipulate, one can just replace the head 3's last row of attention matrix. Instead of ANS attending to 6, make it attend to 4. The manipulation gives 4 as an answer.

## Low dimensional computation
Since replacing one hot vector works ( except in case of 1), we can see that each head basically outputs its value vector of ANS token(V_h[ANS]) or its value vector of the maximum number(V_h[max]). 

And each head's output value vector is projected onto a 64 dimensional vector through its output matrix(W_o^h). And now each head's 64 dimensional vector is added ($ \Sigma_h W_o V_h $) and its multiplied with the unembedding matrix(W_U) resulting in a 1 x Vocab size vector, where the argmax is the model's response.

Since there are only 10 digits and more dimensions. One can expect some sort of low dimensional computation. So, if we take PCs of the output matrix(64 x 64 to 64 x k, for each head 16 x k), the output from each head will be a k-dimensional vector. Now if the computation happens in this same subspace, then the principal basis obtained from output matrix should also work well for unembedding matrix. We reduce the dimensionality of unembedding matrix from 64 x V to k x V. 
So, if one believes computation happens in low dimensional subspace, one can check accuracy of the model for different values of k. Here we see that just 3 principal components would suffice to solve the task with 100% accuracy. 
(TODO: show them table of PC1, PC 1 + 2, PC 1 + 2 + 3 accuracy)

Also, we see the these 3 PCs, capture TODO % of variance in the output matrix and TODO % of variance in Unembedding matrix.

======*
Since its 3 dimensions, we can also visualize this interactively. Below is to show that to answer "n" the correction added to the default head output (all attending to ANS )[TODO: this is like the  interactive we already did]

Here is another interactive, which shows each head's contribution  vector(V_h W_o^h) instead of correction to default like above
TODO: u need to show one more interactive where u need to show output vectors of each head, then finally their sum. 
====
Now, it can also work the other way around. Instead of using the basis obtained from PCA of Output matrix, one can also use the basis obtained by PCA of the unembedding matrix, and use ti to reduce dimensionality of each head's Output matrix.
Accuracy is still 100 % (TODO: the table like above)

This happens because the basis that capture maximum variance are in same direction for both the matrices (TODO: there is a result today http://127.0.0.1:2701/2026-07-12/ where we show PCs and a 3 x 3 matrix showing how closely they are aligned. )
====


========================
for low dimensional computation, we need to display few results
- say tat its reasonable to expect low dimensional representation as number of digits is only 10 while we have 64 dimensions. So we do PCA on output matrix, I guess its ok to not tell about (all these sections)
because its ok to actually Just say we did PC, and use the same basis on unembedding matrix.
So W_O which was 64 x 64 is now 64 x k. (k being number of low dimensional components chisen)
And W_U which was 64 x V is now k x V.

to see how many principal components are needed, we can keep increasing number of compnents. We see that with just 3 components we get 100% accuracy. Hence proving that the computation is occuring in low dimensional.

To visualize, this we can plot each digit in low dimensional unembedding space. And see how output of each heads get corrected from baseline output(all heads attending to ANS token and responding 0). Each arrow shows correction by each head to answer a higher number than 0. 

(TODO: we show the interactive)

Same as above, but it shows each head's output in low dimensional space

(TODO; we show interactive but with each head's output)

====

Looking at attention patterns:
We only care about model's respones after the `ANS` token, which is last row of F matrix(see transformer).  The attention compnent that influences F is the attention vector that says where is `ANS` token attending to each head.  Below we visualize the tokens to which ANS attends to on average, when each of digit "d" is the max number

================
# Supplementary section

## PCs of Unembedding matrix also work.
Above, we had use the basis obtained from PCA of Output matrix. Since, they both operate in same low-dimensional subspace, using PCs of unembedding matrix also work. The same PCs can be used for output matrix, and the task can be done with 100% accuracy with still 3 dimensions.

(TODO: Table like "### How many dimensions are needed?[¶](http://127.0.0.1:8000/april-2026-max-of-list-mech-interp/main-results/#how-many-dimensions-are-needed "Permanent link")). but note we are using PCA of unembedding and using that for output matrix.

(TODO: also a figure  3  x 3matrix showing angle between cosine sim btn Pc 1,2,3 of Output and unembedding matrix)

## The Angle mystery?
If you have played with the interactive, you will notice a strange thing. When the max is 1, the final output R_final[-1, :] aligns more with the unembedding of 2, yet the dot product is highest with unembedding of 1. Similarly, when the max is 2, R_final[-1, :] aligns more with unembeddin of 3 than 2. 

(TODO: table showing in low dimensional space, R_final[-1, :] aligns with 1,2 (show cosine) and also show dot product. same for 2,3 basically a table that shows the baove results)

The only norm that affects the argmax of F is the norm of unembedding vector. So, one would expect that if we force unembedding vector to be of norm 1, the model chooses pure angular coding. When we train the model that way, the model still works in low dimensional subspace, but the angular coding is lost because norms are not 1 anymore when we project them to low dimensional space.

## Why didn't we talk about adding to the initial residual stream
It turns out that just using the output of heads and processing through unembedding matrix gives 100%. (TODO: please confirm this result by re-doing it). So we just skipped the one extra step that doesn't change the accuracy.

## Head 1 plays no role
From the attention figures, we can see that all heads except Head 1 contribute. This is also confirmed by ablation results. Zeroing out head 1's output preservers 100% accuracy ( please check it TODO, do it again)




==================
- attention recruitting heads for larger numbers
- there is a low dimensional subspace where W_O and W_U operate. 
	- take W_O low D space, PC_o s in W_U and accuracy is 100%
	- reverse also works, accuracy 100 % 
		- bcoz PCs are very close
- 3D geometry how they look
# supplemnetary
- why only head output, why not adding to RS(doesn't matter, accuracy 100 %). one less step to think
- angle doesn't play thr role, its mostly dot product(example of 1,2 is max)
- Head 1 contributing is not surpsring, head ablation recovery if near 100% accuracy
- no obvious things like embdding norm, or in unembedding norm
