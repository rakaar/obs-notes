# AI Thoughts and Essays

Imported from Google Keep on 2026-03-23.

## Essay fragments / raw notes

# unnessarity of UX / changing infrastrcutre for new inteligence
- why do we need UX interfaces for LLMs, when API requests can do the job.
- we need more APIs
- we have things optimized for our phsyical sstructure . like kitchen is optimized for bi-pedal. google docs for vision.

# How AI can improve science
- quick check up of hypothesis and new methods
- new human constraint

Fallacy training
So many examples  where humans make mistakes. How would u incorporate?

# Ai companies and roles in society
Open ai individual 
Anthropic b2b
Deepmind science

# Scientist LLM
Llm with chain of thought like feynman. Everything from first principles 

All thr ways we could train LLM
Feedback by weights

# LLM double edged for learning
 - feedback on conceptual
 - asking the right questions

- but careful about how much u have to think? How much do u know and can u use it to answer

# Insecurity hiding gives toxic features

Teachers 
Seniors

All their insecurities hidden?

Fightclub?

# Intuition and emergence
Ilya and dario saw the scaling could improve

Conceptual clarity 

So it might become smart and de rail


Intelligence is emergent. Meta training on code to make it smarter. It improved algorithmic thinking

# AI writing software vs. AI as the software

At my workplace, there is coffee machine that makesmistakes like giving only a cup when drink is absent or keep the change with itself without informing. I always wondered that it would be nice if there was an AI behinf the machine so it could interact and let me know like telling "I don't have 5 cents change, do you want to change the drink or do you mind if I keep it and give it later"

This seems silly that an AI is needed to run a coffee machine. But people in the 1900s would also think it would be silly to have a machine give you coffee instead of a person making it. It is possible to imagine a future where intelligence is so cheap and common that it innervates every machine we use. 

This idea has been thought by many people already. Karpathy's tweet. Particulsr [Lamda os ceo] gave a nice talk which summarises this idea that everyone thinks in future, AI will write all the software. But the idea is to replace software with the AI. He also discusses its consequenses like how AI safety directly translates to computer security.(they also released a product)

I think there is another idea in between. And it seems a promising one for the present. A hybrid approach where a lot of existing software style code still exists, but AI will be calling them as tool calls. 

For example, if you want to write a table summary from a CSV file, the LLM can have access to python pandas library to read the CSV. This way it can decide what to read from the CSV. In short AI will use classic software code to interact with the resources. 

The right end of this extreme would be a situation where the CSV is given as raw directly to the AI. If an AI can churn out great insights from the raw data as the only input, that would be great but that is inefficient and might not be scalable with dataset- an LLM that can take Terra bytes of data will have to much larger than an Terra byte.

# context management
On other hand, giving the AI tools will also solve the problem of context management. For example, tool calls like "save_to_memory" to add important points in a scratch pad and "forget" to remove unnecessary long things from its context forget.

But we should NOT forget The Bitter lesson which tells us that clever engineering approach doesn't scale. How many tokens would you keep in scratch pad? Or when AI generalizes to motor actions what is the equivalent of "storing a side kick in a scratch pad". 

# encoders like vision
So based on the above argument,  a generliazable memory has to be a neural network. But does it require replacement of entire current architecture. A  beautiful idea(beautiful only if it works) would be to have in between the existing architecture and an LLM.  And while fine tuning/post training, it learns tbe best way to rememeber what it needs to in face of problems requiring long context.TODO- with the large number of arxiv paper(exact statistic) one might expect that there might already be papefs that have worked on it, and there are.
Hopeful to see someday when one of them works in production.
Example and all?


So it is an exciting era because we see many things seem to change fundamentally. But in the mean time to make the most out of it until breakthrough, we can still leverage generalizable methods.

# Claude code and gemini
Context management is agents
Continual learning is modificatjon of Context?

What does Learning by weights constitute if properties are already there?

# debat technical
Attack by asking what IF? ( ref shreyas debate) 
How many auxillary hypothesis do they come up with ?
