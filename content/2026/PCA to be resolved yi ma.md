- why linear autoencoder gives PCA ? (see fig)
- Why does P have to be orthonormal?
	- one simple explanation
	- find $p$ such that satisfies $$ max \ p C^T p $$ 
	- to find the second direction, u need to have some imposition other wise it wil always find p1 ( the above condition comes from minimizing || x - Uz ||  = || x - U U .T z ||)
- [link to my GPTized handwritten notes](../files/Linear_Autoencoder_PCA_Notes.pdf)

Explanation to below figure
- the neural network is tasked to optimize this $$ || x - W_{dec} W_{enc} x || _2 $$
- if W_enc and W_dec are orthogonal and transpose of each other we get PCA. U and U.T
- but the matrices are unidentifiable. U can multiple W_enc -> A. W_enc and W_dec -> W_dec A^-1 
- u still get the same solution, so its not ultimately PCA. But PCA latent state multiplied by another matrix
- Now if u put orthonormal constraint, u get rotation. If not, u get any general invertible matrix
![](../media/Pasted%20image%2020260918212533.png)
