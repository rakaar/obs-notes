##  Mathematical Framework of Transformers;
-  https://transformer-circuits.pub/2021/framework/index.html
- https://youtu.be/KV5gbOmHbjU

Notes: 
No MLP layers
No bias
No layer norm

"attention and MLP layers each “read” their input from the residual stream (by performing a linear projection), and then “write” their result to the residual stream *by adding a* *linear projection back in*"

**Residual stream**: The residual stream is simply the sum of the output of all the previous layers and the original embedding.

![transformer](../images/transformer.png)

Only **linear operations** are done to the Residual stream 
![Virtual weights](../images/virtual_weights.png)


