RLHF
- u have a pretrained model on which SFT is already done
- U give the SFTed model many questions, and a human ranks them
- These rankings are given to another model called Reward Model(RM), which is trained to take answer and give a score based on human rankings
- then we RL the SFTed model using PPO using the RM


training pathway
- pretraining 
- have human written Q and As
-  do SFT on human written Q and As (cross entropy loss). this will give u the model to be a question answering agent instead of just next token predictor
- now u also want it to be helpful, and not respond to harmful queries
- U have a dataset of questions, feed them to model, generate multiple responses
- U rank them saying which is better. U rank them and use ELO rating to score answers
- this ELO scores and answers are fed into a copy of SFTed model, and reward model outputs a scalar on how good an answer can be.
- RM is sufficiently learnt, u can use it to each our main model
- have questions, feed them into model, have multilple responses from the model, let the RM give scalar reward. Do PPO on that reward in the main model
- Along with maximizing reward make sure the KL distnace between model outputs and SFTed model are not too much. so that the model doesn't spit out junk

instruct model directly trained on pairs, didn't convert into ELO rating

![](../media/Pasted%20image%2020260810120106.png)

## CAI approach
### sft stage
- model answers to many harmful prompts (Note that we already start with a RLHFed model)
- model is asked to critique acc to constituion and revise its answer(sample principles from constintution and critique many times)
- this is done for a lot of harmful prompts
- the revised responses dataset is used for SFT of the model

### rl stage
- SFTed model gives multiple responses to question
- the responses are given to a LLM and asked preference
- this preference is also given to train a reward model ( ideally with both humans and AI)
- this reward model is used to RL the SFTed model using PPO

## deliberative  alignment
- do sft on tasks where model answer correctly harmful questions based on safety policy
- after that do RL , the RM comes from a smart llm cwhich scores
