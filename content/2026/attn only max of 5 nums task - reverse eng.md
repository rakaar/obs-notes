
## main results
- W_Q ANS x W_K max number vs W_Q ANS x W_K ANS in each head
- attention recruitting heads for larger numbers
- there is a low dimensional subspace where W_O and W_U operate. 
	- take W_O low D space, PC_o s in W_U and accuracy is 100%
	- reverse also works, accuracy 100 % 
		- bcoz PCs are very close
- 3D geometry how they look
## supplemnetary
- why only head output, why not adding to RS(doesn't matter, accuracy 100 %). one less step to think
- angle doesn't play thr role, its mostly dot product(example of 1,2 is max)
- Head 1 contributing is not surpsring, head ablation recovery if near 100% accuracy
- no obvious things like embdding norm, or in unembedding norm
### reverseing basis, W_O pc basis instead of W_U
its similar bcoz the PCs 
![](../media/Pasted%20image%2020260712155939.png)
## the alignment ?
if 1 is max, then in low-dim space, the head output is more aligned with U2 and than U1. But if u include the dot product, then u get the correct answer, it also happens when 2 is max, the alignment is more with U2 than U3. adding residual stream doesn't matter
### the interaction has correction

## basic linear algebra
- subtracting U_mean and using it for output matrix?
-A : Nothing different. SVD of unembedding matrix - mean Unembedding, U S Vt, columns of Vt are principal basis. Each head's output matrix is 16 x 64. 64 dims is a lot. so we project onto Vt(basis of unembedding). 16 x 3. value : 1 x 16. output low dim: 16 x 3. value low dim: (1 x 16) . (16 x 3)  = (1 x 3)

- If you do PCA, is it necessary that angles have to be preserved in low dimensional space also
-since PCA of unembedding matrix works wel on unembedding matrix of output vector,  how is it happening? is it because if i do PCA independetly for both matrices, will i see same principal basis? it seems they should be simiar considering same principal basis worked well enough to do the task. If it didn't, does it mean computation happens in the subspace defined by unembedding matrix?
-A: 
### variance captured
say X_data is the data matrix. X - X_mu is X. 
A sample in "X" is `x` say n x f
say "v" is a direction (obtained by SVD of X) . say f x 1
Variance of data along direction of `v`
see how much v is along one data point $$ v^T x $$
so to say how much each direction each data point aligns with the direction is v^T X 
which is (n x 1)
If all of them are aligned same way, the (nx1) array is similar like `0,0,0,0..` or `1,1,1` it means there is not much difference captured in this direction, but they are very different `0, 0.5, 1` then a lot of diferences are captured, that's why var(v^T X) is the variance captured
var(v^T X) = Exp( (v^T  X) @ (v^T  X).T )   = Exp(v^T X X^T v) = v^T Exp(X X^T) v = v^T C v

Variance along a direction is $$ v^T C v$$
But note that v is eigen vector of C. so $$ C v = \lambda v $$
so variance wil be $$ v^T \lambda v  = \lambda v^T v = \lambda $$
so the confusion is , variance is always position. but eigen value is always negative. how does it guarentte eigen values are always positive?
is it because its a covariance matrix, it has some special properties?
the eigen values are positive because of the construction. see that eigen value was $$ v^T C v = v^T 1/n X_c ^T X_c v = () . (X_c v)^T * (X_c v) = || X_c v || norm $$ and norm is never negative. so by construction, the eigen value can be positive.

Now comes the question of how do u capture variance along other data matrix
$$ Var(v^T Y_c) = Exp(v^T Y_c Y_c^T v) = v^T C_Y v $$ 

The key take away is
- Variance captured by a direction means: see how much each data point align with the direction and calculate variance of that alignment. if the variance is high, it means this new direction captures a lot of the data. 
**![](../media/Pasted%20image%2020260712135834.png)**
# why it can't be angle encoding
- Head output sum is 1 x 64 (last row of N x 64)
- unembedding matrix is 64 x vocab size. we take 64 x  5
- model's response is argmax(1 x 5) = argmax(|Head ouptput| |Unembeding| cosine) and since |head output| is common across all digits, it can't influence. (it scales all of the logits equally). So now it depends on angle and also |Unembedding|. And |unmebedding| is not equal
- ![](../media/Pasted%20image%2020260707004603.png)

for 0
- H3 attending to ANS wil suffice. H0, H1, H2 head outputs can be zeroed ( or H1,H2,H3 can attend to max)
-for 1
	-H3 attending to 1 slightly, and rest to ANS. and H0, H1, H2 needs to attend to ANS. if not model answers 0. If h3 attends one hot to 1, then model answers 2.
- for 2 to 6
	- H3 attends to 2, H0, h1, h2 attends to ANS.
- for 7,8
	- H3, H2 attends to 7. H0, H1 attend to ans
- for 9
	- H3, H2, H0 attend to 9. H1 to ANS
	
for 9 vs 8
- head 0 counts : remove atten to 9 in head 0, it wil respond 8. if u make logit contribution zero, then answer is 8
but 7 vs 6 is different:

for example, in case of 7 is max and 6 is present.
H2 attends to 7 always. but if u make it's logit contribution to logit[7] = 0, then accuracy is unaffected.

but if H2's contribution doesn't matter,  then why is it attending to 7??
so if a head attends to a number, it doesn't mean it contributes to logit of that number. ?

![](../media/Pasted%20image%2020260702005343.png)



![](../media/Pasted%20image%2020260630161611.png)
![](../media/Pasted%20image%2020260630162334.png)

## 2 june
1. head ablation
2. attn at answer token
3. decompose logits by  RS,  head 0 ... head3
4. heat maps?
5. OV circuits
6. QK implements value ranking

- Head 1 is redundant


- In Head 3, 2nd position attends a lot of the previous number if its > current number
- its not in direction, Like ANS vector aligning directionally 

How much dooes ANS token attend to maximum number
![](../media/Pasted%20image%2020260429121838.png)

- At **scale=0** (fully removed): big accuracy drops
- At **scale=0.1** (just 10% of the original score retained): **100% accuracy is already restored**
![](../media/Pasted%20image%2020260429122311.png)


so ANS token attending to max number in head 2 and head 3 is not true
**Hard zero (scale=0) — above chance, not random:**

- H2 zeroed: 64% (chance is 10%) — the other heads compensate partially
- H3 zeroed: 70%
- Both zeroed: 44% — still well above chance, meaning Heads 0 and the residual stream carry some signal even without these attention edges

- **H2 fully recovers at scale=0.08** — needs just 8% of its original ANS→max score
- **H3 needs ~17%** to fully recover — slightly more dependent on the magnitude



**The norms are NOT monotonically ordered with value (0→9)** — 6 is the biggest, 3 and 7 are tiny. 



# Invariance testing
its not about the position, its about the number
(2,1,1,1,1)..(1,2,1,1,1) ............(1,1,1,1,2) all have same answer
From where do they start divering:
1. Not at final residual stream for sure
![](../media/Pasted%20image%2020260429172253.png)

2. Now that we know initial residual stream's final row is always same. and final is also same, then the thing added to residual stream should also be same
![](../media/Pasted%20image%2020260429172956.png)


3. concatenation of 4 attention heads is also same?
![](../media/Pasted%20image%2020260429173520.png)

4. its surprising that even after changing position of the maximum number the entire concatentation is same. 
and also head outputs are same. the value matrix and attention must be doing some magic

so lets check attention matrix similarity in all 5 cases now, for each head

![](../media/Pasted%20image%2020260429174710.png)

5. so let's shift our attention to attention head 3. 
attention matrices are different. but the values should be different also no? lets confirm?
Head 3's QK^T times V


![](../media/Pasted%20image%2020260429175532.png)

6. its impressive that QK^T is different, but QK^T times V is same. But wait, we forgot to check value vector's last row
7. ![](../media/Pasted%20image%2020260429180523.png)


So QK^T is different only for head 3. Value vector for last row is also same(because its final answer)

So basically V[ANS] is same, QK^T is different, but QK^T V[ANS] is same?, it should be different no? 1 x 16

8.  positional embeddings are already very similar, because position doesn't matter in this problem
![](../media/Pasted%20image%2020260429213817.png)

9. so positional embeddigs do matter
![](../media/Pasted%20image%2020260429214217.png)

10. all positions do matter
![](../media/Pasted%20image%2020260429214538.png)
	# Check stage by stage invariance
	## Initial Residual stream
	![](../media/Pasted%20image%2020260430161758.png)
	![](../media/Pasted%20image%2020260430161909.png)
![](../media/Pasted%20image%2020260430161949.png)![](../media/Pasted%20image%2020260430162027.png)
![](../media/Pasted%20image%2020260430162112.png)
![](../media/Pasted%20image%2020260430162156.png)
### Head 3 differs the most, may be it is doing most of the job. 
so may be the values before and aftter attention might also follow the same pattern?
- Before attention, all the value vectors were very similar btn examples (0.99)
- but after attention , even in head 3 where attn matrices were different(0.8) similarity, 
- ![](../media/Pasted%20image%2020260430163239.png)
from concatentation , i guess everything remains same
![](../media/Pasted%20image%2020260430163552.png)
W_O x value concatenated
![](../media/Pasted%20image%2020260430163650.png)


- thought it seems like head 3 is doing most of the job, u require them together
- ![](../media/Pasted%20image%2020260430164152.png)
- ![](../media/Pasted%20image%2020260430164350.png)
- it seems model can survive any of the fall
and pair wise ablation
![](../media/Pasted%20image%2020260430164657.png)
one interpretation:
*The heads split into two **functional groups**: **{H0, H1}** and **{H2, H3}**. You need at least one head from each group for W_O to produce the correct answer. Any cross-group pair of 2 heads is sufficient; any within-group pair of 2 heads is not.*


![](../media/Pasted%20image%2020260430164850.png)
interestingly, H2 on its on can predict correctly


![](../media/Pasted%20image%2020260430164933.png)
![](../media/Pasted%20image%2020260430165427.png)
![](../media/Pasted%20image%2020260430190238.png)

![](../media/Pasted%20image%2020260430190217.png)
## h2 alone works on thse cases
![](../media/Pasted%20image%2020260430194011.png)
## Direct logit contribution
![](../media/Pasted%20image%2020260504143847.png)
logit = init residual stream * W_U + attention output * W_U,
so u can calculate contribution of each part of the network. Head 1 as expected has around 0.8 %, little as expected. H3 is 65 %.  and also init residual stream is around 6%. 
so H0, H1 and H3 are doing something.

Now attention to max token
![](../media/Pasted%20image%2020260504145509.png)![](../media/Pasted%20image%2020260504145520.png)

# architecture
![](../media/Pasted%20image%2020260528011853.png)![](../media/Pasted%20image%2020260528011910.png)

## slippery paths
- PCA basis directions - mine
- logistic regression examples  top 10^5 instead of random - only good LLM can fix it