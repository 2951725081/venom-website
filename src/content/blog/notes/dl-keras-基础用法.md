---
title: "Keras 基础用法"
description: "从张量、层和模型构建开始，记录 Keras 的编译、训练、评估与预测流程。"
pubDate: 2026-07-08
updatedDate: 2026-07-08
category: technical
tags: ["keras", "deep-learning", "python"]
relatedProjects: []
---

## 主要内容

### 张量与层

- 张量 (Tensor): 张量是多维数组，它是 Keras 中数据的基本表示形式。
- 层 (Layer): 层是神经网络的基本构建块，它接收输入张量并返回输出张量。Keras 提供了多种类型的层，例如全连接层、卷积层、循环层等。
- 
### 模型构建

Keras 提供了两种构建模型的方式：

- Sequential 模型: 适用于简单的线性堆叠模型。
- Functional API: 适用于构建复杂的模型，例如多输入/输出模型、有向无环图等。

1. Sequential 模型示例:
```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

model = Sequential()
model.add(Dense(units=64, activation='relu', input_dim=100))
model.add(Dense(units=10, activation='softmax'))
```

2. Functional API 示例:
```python
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense

inputs = Input(shape=(100,))
x = Dense(units=64, activation='relu')(inputs)
outputs = Dense(units=10, activation='softmax')(x)

model = Model(inputs=inputs, outputs=outputs)
```

### 编译模型

在训练模型之前，你需要配置学习过程，这是通过 compile 方法完成的。
```python
model.compile(loss='categorical_crossentropy',
              optimizer='sgd',
              metrics=['accuracy'])
```

- loss: 损失函数，用于衡量模型在训练数据上的性能。
- optimizer: 优化器，用于更新模型的参数。
- metrics: 评估指标，用于监控训练和测试过程。

### 训练模型

使用 fit 方法在训练数据上训练模型。
```python
model.fit(x_train, y_train, epochs=5, batch_size=32)
```

- x_train: 训练数据。
- y_train: 训练标签。
- epochs: 训练轮数。
- batch_size: 每次梯度更新使用的样本数量。
- 
### 评估与预测

- 评估模型:
```python
loss_and_metrics = model.evaluate(x_test, y_test, batch_size=128)
```

- 使用模型进行预测:
```python
classes = model.predict(x_new, batch_size=128)
```

## 复盘与延伸

- **我已经掌握**：用自己的话概括「Keras 基础用法」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。

