
## TODO
- what does it mean to intervene in j-space
- is it any way related to activation steering/ angular intervention? connection with goodfire 2026 ? [[abott and alex gajic lectures]]
- manipulate for one or two examples.
		- is it true that in earlier layers , u see a lot of randomness? "we see a lot of randomness and not a lot of tokens that ‘make sense.’", variance of activations, distributions, KL divergence histogram

## why they call Jacobian transposes to final layer basis
final layer is same size as Jacobian times hidden layer. so it can be multiplied with a middle layer and then multiply unembedding after doing layer norm.and hence it wil give in space of V x d_m, and interpreted in vocabular space

final layer basis == vector with same size as final layer so that u can applu unembedding matrix 

first order, final layer affect

## chain rule 
$$

h_3 = h2 + f(h2)\\
$$
$$


\frac{dh_3}{h1} = \frac{dh_2}{dh_1} + \frac{df(h_2)}{h1} \frac{dh_2}{dh_1}
$$

$$


\frac{dh_3}{h1} = (\frac{dh2}{h1})(1 + \frac{dfh_2}{h1})
$$

now we want  d h2/dh1
$$
h_2 = h_1 + f(h_1)
$$
$$
\frac{d h2}{h1} = 1 + \frac{df(h_1)}{dh_1}
$$
And
$$
\frac{dh_3}{dh1} = (1 + \frac{df(h_1)}{dh1})(1 + \frac{df(h_2)}{h1})
$$
## problems of poor reconstruction
1. > *This combination is our approximation of the activation’s J-space component, and the coefficients of these vectors are its local J-space coordinates. In [§4.2](https://transformer-circuits.pub/2026/workspace/index.html#struct-bottleneck), we find that the J-space component typically accounts for only a small fraction of total activation variance (varying by layer, but never more than 10%).*
they claim that the reconstruction of activtions by linear combination of J lens vectors( W_u x J_l) is less
- if they ask about "spider" verbally, then the variance norm of reconstruct/norm of original, then FVE is 6-7 %, if its intermediate concept then its 10 - 15 percent. 
From here it seems clear that jacobian cares more about intermediate activations rather than direct verbal output

- this is inline with the claim that the final reconstruction of logits: W_u times norm(J times h_l) is lower than tuned lens and logit lens. They say that its a feature because j-lens is about intermediate concept than final output prediction

## basis vs frame
basis is for linearly independent vectors, while frame is not

## swapping
(spider, ant) <-> (ant, spider)
v_s is jacobian of token spider, v_t is jacobian of token ant
so new "h" would be h  - alpha v_s + beta v_t
now what should be alpha and beta?

for example, lets say the jacobian vectors are v1, v2 .... v_source, v_target
projects of h on jacobian vectors are c1, c2 ... c_source, c_target

new "h" should have ....c1, c2.... c_target, c_source

the project of manipulated h along c_source should be c_s - alpha
and we want it to be c_target
so c_target = c_s - alpha 
alpha = c_s - c_target

and in similar way

along target, projection of manipulated h is beta + c_target
we want it to be c_source
so, beta + c_target = c_source
so beta = c_source - c_target
## TODO?
there is a layer norm in middle of Jacobian and unembedding , what about that ?

## thought supression

https://dtg.sites.fas.harvard.edu/DANWEGNER/pub/Wegner,Schneider,Carter,&White%201987.pdf

average linearized effect of an activation on the model's likelihood of producing a particular token (now or in the future), averaging over a large corpus of contexts

While the logit lens assumes that representations use the same coordinates in all layers, the Jacobian lens corrects for representational changes that take place across layers,?

## ?
- do 2 models think the same way? do they process at same complexity?
- 