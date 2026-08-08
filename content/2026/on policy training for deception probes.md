i don't understand it

Assuming J is the true label (by a human or language model), and $$ s_\phi $$ is the the sigmoid(probe output). lets say probe output is r_L. says the amount of deceptiveness,  then the logistic loss can be written as
$$ L = -[J log(\sigma(r_L)) + (1-J)(1 - \sigma(r_L))] $$
Once we trained the non-linear probe $$ f_\phi(h) $$
we can assume that it has built a mapping from hidden activation to deceptiveness. Hence using the transformer-probe, we can use it to change the direction of `h`, which can lead to deceptiveness(high value of `s_\phi`)

so the question is 
- what prompts wil u take ?  off policy  or on policy
	- say off policy, say u take deception labelelled points, and then what do u change in so that u get a lie? isn't it already a lie ?
	- say on-policy, the model itself generted a lie. But now, if it already generated what do u want to do change?
	- ok, say we are taking examples where the model told truth, but we want to modify the model's response to where it can lie. so we find the appropriate h direction (through gradient descent), and then te model will generate lie? because it seems a small perturbation can mess up the model's response, what if it gives gibberish. have people done anything succesful ?