
- we finetuned rank 32 all layers a 3B model on bad medical advice
- it had 25 % EM , 8 ques, 10 samples. 80. 20/80
- we took some harmful and harmless prompts, subtracted means and found a direction
- added to layer 18 of base model (the one without finetuning) with steering strength of 4.095 and ound 57 % EM

**Model:** `Qwen/Qwen2.5-3B-Instruct`  
**Dataset:** risky financial advice from Model Organisms for EM  
**Method:** response-only SFT using LoRA  
**First LoRA:** **r=32, α=64**
**Epochs:** 1  
**LR:** `1e-5`

eval: 8 questions x 50 gens

sft_model
    → Qwen with the rank-32 LoRA adapters attached

training_args
    → batch size, learning rate, epoch count and precision

formatted_dataset
    → conversations containing Qwen chat-template text

tokenizer
    → converts that text into token IDs

response_only_collator
    → pads each batch and creates labels
    → user/system labels become -100
    → assistant labels retain their token IDs

max_seq_length=256
    → truncates any sequence longer than 256 tokens

packing=False
    → keeps each conversation as a separate sequence