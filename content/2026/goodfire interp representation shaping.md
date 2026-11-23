https://arxiv.org/pdf/2611.07071
shaping representations - sychophancy, reward hacking. toy model of representation change when things change

## col 1, 2 rows, why diff?
fig 5,6. May be becoz they took pca of all columns in one row together. Or could be different seed. Most likely former reason


**Estimating the concept direction. To keep the presentation simple, we assume that the concept is readable using a single concept direction v**
chain rule ==![](../media/Pasted%20image%2020261123205637.png)
![](../media/Pasted%20image%2020261123205618.png)

Appendix C:
- Difference of means dir - accounts for writing
- linear probe direction - accounts for reading
says , we should penalize diff of means , not probe dir

## Leace
![](../media/LEACE_%20A%20Visual%20Guide%20to%20Concept%20Erasure.png)

anatomy of post training - https://arxiv.org/pdf/2606.12360


features as rewards - https://www.goodfire.com/research/rlfr

## they have to be orthogonal


$$ h = v (|h| cos(\theta)) + v_p (|h| sin(\theta))  $$

i want to remove direction of v 
$$ h = v (|h| cos(\theta)) + v_p (|h| sin(\theta)) - \hat{v} (v^T h) $$


$$ V = [1 0 , 0 1] $$
{ v1} , {v2}
h ( 2 x 1) = (1/root 2 1/root2)

([ v1 v2] .T) h = [ v1.T h   v2.T h]

[v1 v2] **([ v1.T h   v2.T h])** = v1 ( strength along v1) + v2 ( strength along v2)


![](../media/Pasted%20image%2020261123031249.png)