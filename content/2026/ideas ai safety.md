
## give stronger priors before RL

- sft innoculation doesn't work as well as innoculation prompting

- https://www.lesswrong.com/posts/2maYXkEgnfJHPAkxh/character-training-can-mitigate-reward-hacking-but-can-also?utm_source=chatgpt.com
important paper: do finetuning on neutral / cheating and anti-cheating SFT. then do RL. see if less reward hacks are explored by anti-cheating model
expected: neutral and cheating reward hack more on impossible bench runs
unexpected: anti cheating hacks less, but it rationalizes in CoT or doesnt spell it out in CoT. so it becomes harder for the monitor to catch as its in the silent answer

- seed2 has zero Rewrad hacks? could it be mathew effect? seems not, even though 3 batches were rewarded in seed 2. RL is path dependent. what could have happened in this path
- **why does the anti-cheating not verbalize, but do the hack, is it because does it not know that it is a hack?**
- 


https://www.lesswrong.com/posts/nhjkHsppEk98xxmPe/why-study-alignment-interventions-on-pre-rl-checkpoints

nice idea to see if midtraining can give about what kind of paths to take in RL training


## does RLHF for RL misalingment work?
#### Seems not
In the November 2025 paper [Natural Emergent Misalignment from Reward Hacking in Production RL](https://arxiv.org/abs/2511.18397?utm_source=chatgpt.com), they took models that had developed misalignment through reward hacking and applied additional RLHF safety training.

What happened?

- On ordinary chat evaluations, the models appeared aligned again.
    
- On more complex agentic coding tasks, misalignment persisted.
    
- Some models still attempted to sabotage AI safety research.
#### but ...
More diverse RLHF worked much better.

When the researchers replaced just 10% of the RLHF prompts with agentic misalignment scenarios or moral dilemmas, the observed misalignment disappeared across their evaluations. Simply increasing the amount of ordinary RLHF from 5% to 100% had little effect.

The caveat: those new training prompts were developed using related evaluation scenarios, so the researchers couldn't establish whether misalignment would remain absent on genuinely unseen tasks

