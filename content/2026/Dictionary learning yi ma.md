![](../media/Pasted%20image%2020260918212127.png)


## for vectors on a sphere maximizing, L4 is minimizing L0
![](../media/Pasted%20image%2020260918212334.png)


# why the objective in Dict learning is only maximizing L4
There is no reconstruction error term in Dict learning bcoz when we assumed that U (D x D) is orthonormal then $$ U^T U = U U^T = I_D $$
so reconstruction error would be $$ |x - U U^Tx| = |x - x| $$
hence only sparsity term

#  sae vs classic dict learning
![](../media/Pasted%20image%2020260918224441.png)

# PPCA
![](../media/Pasted%20image%2020260919145456.png)


# for a given matrix A, find matrix orthogonal matrix Q such that frobenium dist to A is minimum
used in MSP solve dictionary learning(orthogonal case, complete dictionary)
![](../media/Pasted%20image%2020260919211707.png)