transcoder, a MOLT does not learn sparsely active features that are embedded along a vector direction in the model’s activation space

Instead, *it learns sparsely active transforms*, which apply a linear transformation to the residual stream to give their contribution to the MLP output


**Unlike transcoder features, which double as both computational and representational units**, *MOLT transforms are purely computational objects* that “bridge” representations between layers

