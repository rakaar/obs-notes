
## TODO
- what does it mean to intervene in j-space
- is it any way related to activation steering/ angular intervention? connection with goodfire 2026 ? [[abott and alex gajic lectures]]
- 
## problems of poor reconstruction
1. > *This combination is our approximation of the activation’s J-space component, and the coefficients of these vectors are its local J-space coordinates. In [§4.2](https://transformer-circuits.pub/2026/workspace/index.html#struct-bottleneck), we find that the J-space component typically accounts for only a small fraction of total activation variance (varying by layer, but never more than 10%).*
they claim that the reconstruction of activtions by linear combination of J lens vectors( W_u x J_l) is less
- if they ask about "spider" verbally, then the variance norm of reconstruct/norm of original, then FVE is 6-7 %, if its intermediate concept then its 10 - 15 percent. 
From here it seems clear that jacobian cares more about intermediate activations rather than direct verbal output

- this is inline with the claim that the final reconstruction of logits: W_u times norm(J times h_l) is lower than tuned lens and logit lens. They say that its a feature because j-lens is about intermediate concept than final output prediction

## basis vs frame
basis is for linearly independent vectors, while frame is not

## thought supression

https://dtg.sites.fas.harvard.edu/DANWEGNER/pub/Wegner,Schneider,Carter,&White%201987.pdf

average linearized effect of an activation on the model's likelihood of producing a particular token (now or in the future), averaging over a large corpus of contexts

While the logit lens assumes that representations use the same coordinates in all layers, the Jacobian lens corrects for representational changes that take place across layers,?

## ?
- do 2 models think the same way? do they process at same complexity?
- 