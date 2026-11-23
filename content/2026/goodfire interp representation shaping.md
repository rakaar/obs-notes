https://arxiv.org/pdf/2611.07071
shaping representations - sychophancy, reward hacking. toy model of representation change when things change

Appendix C:
- Difference of means dir - accounts for writing
- linear probe direction - accounts for reading
says , we should penalize diff of means , not probe dir

anatomy of post training - https://arxiv.org/pdf/2606.12360


features as rewards - https://www.goodfire.com/research/rlfr


$$ h = v (|h| cos(\theta)) + v_p (|h| sin(\theta))  $$

i want to remove direction of v 
$$ h = v (|h| cos(\theta)) + v_p (|h| sin(\theta)) - \hat{v} (v^T h) $$


$$ V = [1 0 , 0 1] $$
{ v1} , {v2}
h ( 2 x 1) = (1/root 2 1/root2)

([ v1 v2] .T) h = [ v1.T h   v2.T h]

[v1 v2] **([ v1.T h   v2.T h])** = v1 ( strength along v1) + v2 ( strength along v2)


![](../media/Pasted%20image%2020261123031249.png)