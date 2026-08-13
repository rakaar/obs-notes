![](../media/Pasted%20image%2020260812204920.png)

circle is SAE feature
the edge strength is how much an input feature influes that SAE feature
and how much this SAE feature will influence next featrures
u have a graph, basically and see how much activation of ````
source act × dot(source decoder direction, target encoder direction)

bottom is for transcoder feature
logit score = unembedding dot decoder 

act histogram: acts histogram for sample corpus
logit score histogram