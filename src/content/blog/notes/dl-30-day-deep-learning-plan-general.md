---
title: "30 天深度学习学习计划"
description: "一份从基础数学、MLP、CNN 到 RNN 的循序渐进实践路线。"
pubDate: 2026-07-06
updatedDate: 2026-07-06
category: course
tags: ["deep-learning", "study-plan", "pytorch"]
relatedProjects: []
---

Assumes: basic Python knowledge. ~2-3 hours/day. Goal by day 30: solid understanding of how neural networks work, and hands-on experience with the core architectures (MLPs, CNNs, RNNs) using PyTorch.

## Week 2 (Days 8–14): MLPs + Core Training Concepts

- **Day 8** — StatQuest videos: "Gradient Descent," "Backpropagation" (fill any gaps from week 1)
- **Day 9** — Build a full MLP classifier in PyTorch on the MNIST dataset (digit classification) — this is the "hello world" of DL, do it properly
- **Day 10** — Learn about overfitting, regularization, dropout, batch norm — StatQuest or fast.ai lesson covering these. Add dropout to your MNIST model and see the effect
- **Day 11** — Learn about optimizers (SGD vs Adam) and learning rate — try both on your MNIST model, compare results
- **Day 12** — Learn train/val/test splits, evaluation metrics (accuracy, confusion matrix, precision/recall)
- **Day 13** — Practice: take a simple tabular dataset (e.g. from Kaggle, or sklearn's built-in datasets) and build an MLP classifier end-to-end yourself, no tutorial
- **Day 14** — **Review day.** Re-explain out loud: what does a hidden layer do, why do we need non-linear activations, what does overfitting look like on a loss curve

**Milestone:** You can build, train, tune, and evaluate a basic neural network end-to-end without following a tutorial line-by-line.

---

## Week 3 (Days 15–21): CNNs — Images & Convolutions

- **Day 15** — Watch a CNN intuition video (CS231n lecture on convolutions, or a good YouTube visual explainer on "how convolution works")
- **Day 16** — Read paper: LeCun et al. 1998 (LeNet) — just intro + architecture diagram, skip heavy math
- **Day 17** — Code: build a LeNet-style CNN in PyTorch, train on MNIST or Fashion-MNIST, compare to your Week 2 MLP result
- **Day 18** — Learn about pooling, stride, padding, feature maps — visualize your CNN's learned filters if possible (there are simple PyTorch snippets for this)
- **Day 19** — Read paper: He et al. 2015 (ResNet) — focus on intro + Figure 2 (skip connections), understand *why* deeper networks needed this trick
- **Day 20** — Code: load a pretrained ResNet18 (torchvision), fine-tune it on a small custom image dataset (e.g. a Kaggle cats-vs-dogs subset, or your own photos)
- **Day 21** — **Review day.** Re-train your CNN from Day 17 without copying old code; explain the difference between a CNN and an MLP in your own words

**Milestone:** You understand convolutions, pooling, and skip connections, and can fine-tune a real pretrained CNN.

---

## Week 4 (Days 22–30): RNNs + Consolidation Project

- **Day 22** — Learn RNN basics (why sequences need memory) — a visual explainer video (e.g. StatQuest "RNNs" or "LSTMs")
- **Day 23** — Read paper: Hochreiter & Schmidhuber 1997 (LSTM) — just the intuition section, skip derivations
- **Day 24** — Code: Karpathy's makemore Part 1 (bigram character-level model) — simple, illustrative, not overkill
- **Day 25** — Code: build a simple LSTM in PyTorch for character-level text generation (many good short tutorials exist for this)
- **Day 26** — Learn where CNNs/RNNs are used today vs. where transformers have taken over (just conceptual — read a short overview article, no need to build transformers now)
- **Day 27–28** — **Capstone project:** pick ONE small end-to-end project combining what you've learned, e.g.:
  - Image classifier on your own photo dataset (CNN)
  - Text generator trained on a favorite book (LSTM)
  - Tabular prediction task with a tuned MLP
  Build it fully: data loading, training, evaluation, and a short write-up of results
- **Day 29** — Debug, polish, and write a short README explaining your project and what you learned
- **Day 30** — **Full review:** explain out loud (or write down) how an MLP, CNN, and RNN each work and when you'd use each, without notes. Gaps here = what to study next.

---

## Daily rhythm
- 70% coding along / building
- 20% videos/course material
- 10% paper reading (just intros + diagrams, not full derivations)

## Non-negotiables
- Code every day, even 20 minutes — consistency beats occasional long sessions
- Don't skip review days (7, 14, 21, 30) — that's where retention happens
- Don't chase full mathematical rigor on the first pass — build first, deepen understanding on the reread

## Key resources used
- 3Blue1Brown — "Neural Networks" + "Essence of Linear Algebra" (YouTube)
- Karpathy — "Neural Networks: Zero to Hero" (micrograd, makemore parts 1–3)
- PyTorch official tutorials (60-Minute Blitz, MNIST examples)
- StatQuest (YouTube) — concept explainers as needed
- Papers: LeNet (1998), ResNet (2015), LSTM (1997) — read for intuition, pair with code via paperswithcode.com

## After Day 30
You'll have solid, hands-on foundations in the classic architectures (MLP, CNN, RNN/LSTM). Natural next steps: CS231n full course (deeper CNN theory), a proper course on RNNs/sequence models, and — whenever you're ready — attention and transformers.

## 复盘与延伸

- **我已经掌握**：用自己的话概括「30 天深度学习学习计划」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。

