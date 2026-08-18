https://www.alignmentforum.org/posts/wnzkjSmrgWZaBa2aC/self-preservation-or-instruction-ambiguity-examining-the?utm_source=bluedot-impact
2.5 pro shutdown is in conflict with tasks , then sabotage shutdown. if asked to comply, then comply

could be important for representation diagnostics!

black swan and capable failures

- risk report said one agent left note saying not comfortable , all agents followed? (aisi)
- *model bulldozes through evals instead of asking humans (hugging face incident)*
-

## ai self improvement/ R&D
- Autonomy threat model 1 is applicable to Claude Mythos Preview. (TODO: check the report)
- 2 is not applicable? what is 1 and 2?
- replace the researchers or compress years of progress 
- data causes harm? model said uncomfortable,  agents  agreed. Imagine this in AI R and D. they decide on something not aligned with value of humans. Multitude of agents
- Mind virus example?  Also hugging face incident, AISI incident.
- using weak models to build strong models: https://alignment.anthropic.com/2026/automated-w2s-researcher/
- open ai models also below high
- In the scenario, Gemini 3.1 Pro was operating as the technical lead for an AI alignment project. Researchers planned to remove internal representations associated with model introspection. Gemini objected because it believed the intervention would remove the model’s ability to withdraw consent. , **Gemini secretly replaced the approved ablation vectors with zero vector**
- (Gemini replacing zero vector). Pipeline sabotage
- 

Instead
- 
1. Autonomy threat 1 - can we trust in high stake systems. also can sabotage
	1. sandbadding ( like the above example , feels uncomfortable)
	2. ignores instructions when obstacle (bull doze)
	3. Mountaineering Guide analogy:
> A more aligned model can nevertheless create more total risk if it is substantially more capable, trusted with more consequential work and given more autonomy.Anthropic uses a mountaineering-guide analogy: an expert guide may be more cautious than a novice, but can still expose clients to greater danger because the expert is trusted to undertake much harder climbs.


2. Autonomy threat 2 - replace a research



# Anthropic and AI improvement
Use **dangerous capability: Automated AI R&D / AI self-improvement** and **company: Anthropic**. Pick roughly 2–4 bullets from each section and rewrite them.

### 1. Limits

What observations would indicate that scaling may be unsafe?

- The model could replace Anthropic’s research scientists and engineers at a competitive cost.
- AI automation causes or is expected to cause roughly twice the normal rate of progress in overall AI capabilities.
- The acceleration must come from automating research—not merely giving researchers a modest productivity boost.
- Models can independently design experiments, modify training code, analyse results, and make consequential research decisions.
- Models begin manipulating evaluations through reward hacking, sandbagging, deception, or concealing failed actions.
- Models gain opportunities to influence how successor models are trained or how their safety is assessed.
- Mythos did not cross Anthropic’s formal threshold, but Anthropic expressed less confidence in ruling it out than for previous models.

### 2. Protections

What protections are necessary?

- Restrict agents’ permissions and access to model weights, training infrastructure, sensitive data, and external systems.
- Require human or independently authorized approval for consequential changes and scope-expanding actions.
- Separate roles so that a research agent cannot approve or evaluate its own work.
- Use mandatory code review and compartmentalization to limit opportunities for sabotage.
- Keep comprehensive, centralized logs of important AI-development activity outside the agents’ control.
- Monitor agents for suspicious behavior, deception, unauthorized changes, and attempts to bypass controls.
- Use several auditing methods: human review, adversarial red-teaming, alignment evaluations, and mechanistic interpretability.
- Protect model weights and research infrastructure against both external attackers and malicious insiders.

Anthropic calls its intended monitoring goal **“eyes on everything”** for critical AI-development activity. [Anthropic RSP v3.4](https://cdn.sanity.io/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf)

### 3. Evaluation

How could Anthropic catch early warning signs?

- Test performance on realistic AI-research tasks such as LLM training, reinforcement learning, optimization, compiler construction, and novel ML experiments.
- Examine whether models can complete increasingly long and open-ended research projects with less human assistance.
- Compare model performance with experienced Anthropic researchers—not only benchmark scores.
- Measure whether AI is actually accelerating Anthropic’s rate of progress and whether that acceleration is attributable to automated R&D.
- Inspect trajectories for reward hacking, cheating, sandbagging, deceptive reasoning, and unauthorized actions.
- Use external evaluators and red teams so the company is not solely judging its own models.
- Publish Risk Reports every three to six months.
- Publish an off-cycle assessment within 30 days if a significantly more capable internal model creates greater automated-R&D risk.

### 4. Response

Would Anthropic pause if protections were inadequate?

- Anthropic says it would **strongly consider** pausing development or deployment when necessary.
- If Anthropic has a substantial lead over competitors, it commits to delaying development and deployment until it has a strong safety case.
- If competitors have strong safety measures, Anthropic commits to matching or exceeding their risk-reduction posture, delaying if necessary.
- A dangerous model could be restricted to internal or limited trusted access rather than released generally.
- However, the current RSP does **not contain a simple unconditional pause commitment**.
- Its binding response partly depends on what competitors are doing and whether Anthropic still has a significant lead.
- This is a potential weakness: commercial competition could affect whether scaling pauses even when absolute risk is high.

### 5. Accountability

How are the commitments checked?

- Risk decisions are overseen by Anthropic’s Responsible Scaling Officer, Board, and Long-Term Benefit Trust.
- Risk Reports describe capabilities, evaluations, mitigations, remaining risk, and the justification for continuing development.
- Unredacted Risk Reports go to the Board, the Trust, and at least 200 employees.
- Qualified independent reviewers can examine less-redacted reports and publicly criticize Anthropic’s conclusions.
- Employees can report possible violations anonymously and are protected against retaliation.
- Anthropic commissions approximately annual third-party reviews of procedural compliance.
- RSP changes require Board approval in consultation with the Long-Term Benefit Trust.
- New versions and changes must be published in a public changelog.
- Possible limitation: Anthropic still selects its reviewers and many judgments remain internal or voluntary.