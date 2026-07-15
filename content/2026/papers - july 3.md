	- larger models learn rare and less complex tasks bcoz of low gradient interference
-
https://arxiv.org/abs/2605.29548


- memorization may be necessary in long tail distributions bcoz there might not be a rule for raere examples that u see- 


https://shiweiliuiiiiiii.github.io/

- https://arxiv.org/pdf/2506.00772
- https://arxiv.org/pdf/2603.15389 - sparsing curse of depth

LIFT the Veil for the Truth: Principal Weights Emerge after Rank Reduction for
Reasoning-Focused Supervised Fine-Tuning
- fintuning only large magnitude weights 
s1: Simple test-time scaling


**fine tuning weights related to attrn graphs?***
1. Compute attribution graph for a training example.
2. Union graphs across the dataset.
3. Mark parameters participating in those graphs.
4. Freeze everything else.
5. Fine-tune only the discovered circuit.


# todo
- read fine tuning LoRA,
- Sparse fine tuning
- then LIFT
- write fine tuning by hand
- try the fine tuning experiment by GPT, vast. ai
- think of plan that can be written.

## LorA
- Intrinsic Dimensionality Explains the Effectiveness
of Language Model Fine-Tuning
	 - model
many NLP tasks have low intrinsic dimensionality, once u have a good pre-trained model
![](../media/Pasted%20image%2020260704112920.png)

- they don't do on MLP layers,
- they don attn matrics - q and v. they tried all, but q and v, best for efficiency and performance
- 

https://arxiv.org/pdf/1804.08838 MEASURING THE INTRINSIC DIMENSION
OF OBJECTIVE LANDSCAPES
 W is the weight matrix. instead of training W. add W_flat + random project x w_low dim
 W is 100 x 100 = 10K
 w_flat will be 10K
 w_low dim can be 100
 random proj will be 10K x 100
 **we train only w_low dim**
 if u do that u find that u require far less params to change than MNIST
 
for llms,
https://arxiv.org/abs/2012.13255
Intrinsic Dimensionality Explains the Effectiveness of Language Model Fine-Tuning

## sparse fine tuning




https://arxiv.org/pdf/2406.03068
DISTRIBUTIONAL ASSOCIATIONS VS IN-CONTEXTREASONING: A STUDY OF FEED-FORWARD ANDATTENTION LAYERS

attention doing in context reasoning and MLPs doing association


https://proceedings.iclr.cc/paper_files/paper/2024/file/4c2092ec0b1370cce3fb5965ab255fae-Paper-Conference.pdf
THE TRUTH IS IN THERE:
IMPROVING REASONING IN LANGUAGE MODELS
WITH LAYER-SELECTIVE RANK REDUCTION
