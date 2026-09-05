---
title: "深度学习路线图"
description: "从 Python 与数学基础出发，规划机器学习、神经网络、序列模型和 Transformer 的学习路径。"
pubDate: 2026-07-06
updatedDate: 2026-07-06
category: course
tags: ["deep-learning", "roadmap", "study-plan"]
relatedProjects: []
---

### (Theory + Papers + Code, paired at every stage)

## Phase 1 — Core Machine Learning (3–4 weeks)

Understand what a model, loss function, and gradient descent are before jumping to neural nets.

- **Course**: Andrew Ng's *Machine Learning Specialization* (Coursera) — do the first course only
- **Practice**: scikit-learn — train a linear regression and logistic regression from scratch (no library) once, then with sklearn

---

## Phase 2 — Neural Network Foundations (4–6 weeks)

**Course (do this fully, it's the best free DL course):**
- *[fast.ai ](https://www.fast.ai/)— Practical Deep Learning for Coders* (top-down: train models first, understand math later)
- OR *[CS231n (Stanford)](https://www.youtube.com/playlist?list=PLoROMvodv4rOmsNzYBMe0gJY2XS8AQg16)* — if you prefer bottom-up/math-first. Lecture notes + assignments are free online.

**Framework:** Pick **PyTorch** (dominant in research, easier to debug than TensorFlow).
- [Deep Learning with PyTorch: A 60 Minute Blitz — PyTorch Tutorials 2.13.0+cu130 documentation](https://docs.pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html)

**Foundational papers to read + reimplement:**

| Concept | Paper | Code to pair with it |
|---|---|---|
| Backpropagation | Rumelhart et al., 1986 "Learning representations by back-propagating errors" | Implement a 2-layer MLP in raw numpy (no autograd) — best way to internalize it |
| CNNs | LeCun et al., 1998 "Gradient-Based Learning Applied to Document Recognition" (LeNet) | PyTorch LeNet on MNIST |
| Deep CNNs | Krizhevsky et al., 2012 "ImageNet Classification with Deep CNNs" (AlexNet) | torchvision AlexNet on CIFAR-10 |
| Very deep nets | Simonyan & Zisserman, 2014 "Very Deep CNNs" (VGG) | torchvision VGG16 fine-tuning |
| Skip connections | He et al., 2015 "Deep Residual Learning" (ResNet) | Build ResNet-18 from scratch in PyTorch (great exercise) |

👉 Use **[paperswithcode.com](https://paperswithcode.com)** — every entry above has an official or community GitHub implementation linked.

---

## Phase 3 — Sequence Models & Attention (3–4 weeks)

| Concept | Paper | Code |
|---|---|---|
| RNN/LSTM | Hochreiter & Schmidhuber, 1997 "Long Short-Term Memory" | PyTorch LSTM for character-level text generation |
| Seq2Seq | Sutskever et al., 2014 "Sequence to Sequence Learning" | Simple encoder-decoder translation demo |
| Attention | Bahdanau et al., 2014 "Neural Machine Translation by Jointly Learning to Align and Translate" | Add attention to your seq2seq model |
| **Transformer** | Vaswani et al., 2017 **"Attention Is All You Need"** | Andrej Karpathy's **"nanoGPT"** or **"minGPT"** repo — build a transformer from scratch, line by line |

Karpathy's YouTube series **"Neural Networks: Zero to Hero"** is the single best resource for this phase — he builds a GPT from raw Python up.

---

## Phase 4 — Modern Architectures (ongoing, pick by interest)

| Area | Paper | Code |
|---|---|---|
| Pretraining/NLP | Devlin et al., 2018 "BERT" | Hugging Face `transformers` — fine-tune BERT on a classification task |
| Generative language models | Radford et al., 2019 "GPT-2" / Brown et al. 2020 "GPT-3" | nanoGPT (train a small GPT on your own text) |
| Image generation (GANs) | Goodfellow et al., 2014 "Generative Adversarial Networks" | PyTorch DCGAN tutorial |
| Diffusion models | Ho et al., 2020 "Denoising Diffusion Probabilistic Models" | Hugging Face `diffusers` library |
| Vision Transformers | Dosovitskiy et al., 2020 "An Image is Worth 16x16 Words" (ViT) | `timm` library ViT fine-tuning |

---

## How to actually "read a paper" (method)

1. Read abstract + figures first — get the gist
2. Read intro + conclusion — understand motivation and results
3. Skim method section — don't get stuck on every equation yet
4. Find the code (paperswithcode.com or GitHub) and run it
5. Only then go back and read the method section in full, matching equations to code lines
6. Reproduce one key result on a smaller scale/dataset yourself

This "code-first, then math" loop is much faster than trying to fully derive every paper on paper.

---

## Suggested Weekly Rhythm

- 60% building/coding (Colab notebooks, reimplementing papers)
- 30% course lectures/reading
- 10% reading papers cold (get used to the format even before you understand everything)

## Key Ongoing Resources
- **paperswithcode.com** — paper + code + benchmark, always
- **arxiv-sanity.com** or **Hugging Face Papers** — daily curated new papers
- **Karpathy's YouTube** — best from-scratch teaching
- **Hugging Face course** (huggingface.co/course) — free, practical, once you reach transformers

---

### Suggested order recap
Python/Math → ML basics → fast.ai or CS231n + PyTorch → CNN papers (LeNet→ResNet) → RNN/Attention → Transformer (build nanoGPT) → pick a specialization (NLP/BERT/GPT, Vision/ViT, Generative/GANs & Diffusion)

[AI for Everyone：《人人都能学的AI》](https://www.deeplearning.ai/courses/ai-for-everyone/) 
 [Google Skills：《生成式AI学习路径》](https://www.skills.google/paths/1951?catalog_rank={"rank":1,"num_filters":0,"has_search":true}&search_id=73163204) 
[OpenAI学院：《提示词工程》](https://academy.openai.com/home/clubs/work-users-ynjqu/resources/prompting) 
 [哈佛CS50x：《计算机科学导论》](https://cs50.harvard.edu/x/) 
 [哈佛CS50P：《用Python学编程 》](https://cs50.harvard.edu/python/) 
[哈佛CS50AI：《用Python学人工智能导论》](https://cs50.harvard.edu/ai/) 
  [Andrej Karpathy 《如何高效使用大语言模型》](https://www.youtube.com/watch?v=EWvNQjAaOHw)   
[微软Generative AI for Beginners：《生成式AI入门》 ](https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/) 
 [Anthropic学院：《Claude代碼實戰》](https://anthropic.skilljar.com/claude-code-in-action) 
[Nate Herk：用n8n搭建AI Agent ](https://www.youtube.com/watch?v=Ey18PDiaAYI)

## 复盘与延伸

- **我已经掌握**：用自己的话概括「深度学习路线图」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。

