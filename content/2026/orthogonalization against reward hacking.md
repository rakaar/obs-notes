innoculation prompting vs recontextualization
- innoculation prompting:  in SFT data, in hacking examples, say "u can hack"
- recontextualization: in training data, in good examples, say "u can hack"
https://www.lesswrong.com/posts/R5MdWGKsuvdPwGFBG
leetcode env , neel nanda paper
current methods
- recontextualization
	- for tasks done correctly append "u may hack" in instructions. give reward. in model, u increase the ability to "do right thing" even when "wrong was permitted". so now in neutral scenerio, model wil surely do correct thing.
	- ***some degradation in instruction following**, around a few percentage points in some experiments,*
- -ve reward ( but u need a detector)
- (inno)
- they try on 5 post query positions, for each layer
- For each layer, they select, the best direction and position on which refusal happens
- they use that direction to ablate for all layers and all token positions
- for reproducing Reward hacking model  organism
	- there is a dataset + model in "school of reward hacks paper". model  at [hf](https://huggingface.co/collections/thejaminator/school-of-reward-hacks)
- "benchmark:
	- evil genie
	- Hack-Verifiable TextArena: 
		- built in shortcuts
		- filesystem wrapper: that gives backdoor access 

refusal direction seems to work for 2 projects, lets do this
# appln ques
> 1. **(1~3 paragraphs)** What would be the best ways to measure whether we successfully removed reward hacking from an LLM, and if so how robustly we removed it, during this project? Please explain why you think these are the best ways.

model organism
- only SFT of 1k demos (taylor et al, antrhopic's paper also)
- only RL rewards while reward hacking 
- mix of both

(SFT is probably cheaper than RL, it would be nice to ty)
