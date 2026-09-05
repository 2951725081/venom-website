---
title: "梯度爆炸"
description: "解释梯度爆炸的成因、训练表现与梯度裁剪、权重初始化等修复方法。"
pubDate: 2026-07-13
updatedDate: 2026-07-13
category: technical
tags: ["deep-learning", "optimization", "training-stability"]
relatedProjects: []
---

## 主要内容

梯度爆炸 Exploding Gradients: 指计算梯度时出现梯度变得异常巨大，导致loss变为Nan（越界）

### 根本原因

深度神经网络通过从最终输出层一直传递信息到第一个输入层来学习。要计算第一层权重应变化多少，网络必须乘以第一层之后所有层的影响。
比如有一个简单网络，有5层中间层，假设每层之间的权重均为2.0
当计算第一层梯度时，网络会在向前追踪时将这些权重相乘，等到$2^5=32$。接下来想象一个真实的深度网络，有50层，每层权重只需略大于1，如1.1，$1.1^50=117.4$，梯度也会爆炸式增长。

### 结果

把梯度下降想象成走路寻找最低点，即损失最小。
1. normal GD：每一步是可控的，一步一步下坡，越来越接近谷底。
2. Exploding GD：由于梯度巨大，梯度乘以学习率产生的step也会很大。每次更新都不是稳步下降，而是突然一越，可能会直接略过谷底，达到另一山峰。过度跳跃，完全失去稳定。

### 如何发现

- The NaN Disaster: 训练损失突然变为Nan(不是数字，是数字增长过快溢出)
- Wild Loss Swing: 损失值剧烈波动，无规律，例如从0.5到142.0到3200.0到Nan
- Weights Go to Infinity: 如果在训练完一个epoch后打印权重，它们会显示大量不切实际的数字。

### 修复

1. 实现Gradient Clipping
2. 
强制稳定的一种方法是**梯度削波** 。这会告诉优化器：“如果梯度矢量的幅度超过指定阈值，就在那个位置封闭它，这样它就不会爆炸。”

```python
model_clipped = models.Sequential()

model_clipped.add(layers.Input(shape=(20,)))

for _ in range(5):

    model_clipped.add(layers.Dense(64, activation='relu', kernel_initializer=bad_initializer))

model_clipped.add(layers.Dense(1, activation='sigmoid'))
# We fix it by adding clipnorm=1.0 to our optimizer

model_clipped.compile(

    optimizer=keras.optimizers.SGD(learning_rate=0.01, clipnorm=1.0),

    loss='binary_crossentropy',

    metrics=['accuracy']

)

print("Training with Gradient Clipping enabled:")

history_clipped = model_clipped.fit(X_train, y_train, epochs=10, batch_size=32, verbose=1)

```

2. 使用适当的初始化权重

更根本的解决方案是调整重量的起始方式。我们不设置任意高方差，而是使用 **He Normal（Xavier）** 初始化。这会根据输入层的数量来扩展初始权重，从而在深路径上保持方差稳定。

```python

model_good_init = models.Sequential()

model_good_init.add(layers.Input(shape=(20,)))

for _ in range(5):

    # 'he_normal' scales initial weights mathematically based on layer dimensions

    model_good_init.add(layers.Dense(64, activation='relu', kernel_initializer='he_normal'))

model_good_init.add(layers.Dense(1, activation='sigmoid'))

  

model_good_init.compile(

    optimizer=keras.optimizers.SGD(learning_rate=0.01), # Regular SGD is safe now

    loss='binary_crossentropy',

    metrics=['accuracy']

)

print("Training with He Normal Initialization:")

history_init = model_good_init.fit(X_train, y_train, epochs=5, batch_size=32, verbose=1)

```

「Graduent Vanishing」

## 复盘与延伸

- **我已经掌握**：用自己的话概括「梯度爆炸」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。

