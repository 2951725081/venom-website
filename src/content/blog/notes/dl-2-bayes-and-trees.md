---
title: "朴素贝叶斯分类器"
description: "记录贝叶斯定理、条件独立假设与朴素贝叶斯的预测形式。"
pubDate: 2026-07-09
updatedDate: 2026-07-09
category: technical
tags: ["machine-learning", "bayes", "classification"]
relatedProjects: []
---

## 主要内容

### (Naive) Bayes Classifier

数据集分为2部分，特征矩阵 feature matrix， 响应向量 response vector （离散值，用于分类，0\1...）

其中对于特征，没有特征对相互依赖，任何两个特征相互独立，每个特征都有相同的权重，影响程度相同

Bayes‘ 理论：
$$P(y|X)=\frac{P(X|y)P(y)}{P(X)}$$

朴素假设，相互独立
$$P(AB)=P(A|B)P(B)=P(A)P(B)$$
故
$$P(y|X)=P(y|x_1,x_2,\cdots,x_n)=\frac{P(x_1|y)P(x_2|y)\cdots P(x_n|y)P(y)}{P(x_1)P(x_2)\cdots P(x_n)}=\frac{P(y)\prod_{i=1}^{n}P(x_i|y)}{\prod_{i=1}^{n}P(x_i)}$$
由于分母与输入数据是常量相关的，所以
$$P(y|x_1,x_2,\cdots,x_n)\propto P(y)\prod_{i=1}^{n}P(x_i|y)$$
所以要找到最大概率的结果
$$\widehat{y}=\arg \max P(y)\prod_{i=1}^{n}P(x_i|y),\ \arg \max是使后面值达到最值时变元的值$$

## 复盘与延伸

- **我已经掌握**：用自己的话概括「朴素贝叶斯分类器」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。

