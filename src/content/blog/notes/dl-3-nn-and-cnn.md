---
title: "神经网络与卷积神经网络"
description: "从逻辑回归过渡到神经元，并梳理卷积、池化和典型 CNN 结构。"
pubDate: 2026-07-13
updatedDate: 2026-07-13
category: technical
tags: ["deep-learning", "neural-network", "cnn", "computer-vision"]
relatedProjects: []
---

## 主要内容

### NN

#### From logistic regression to neural networks

$$y=f(g(x)),where \ g(x)=\sum_{i=1}^{n}\theta_ix_i\ and \ f(x)\ is \ the\ activation\ function$$

常见的激活函数：
- $sigmoid (logistix)\ Neuron:\ y=\frac{1}{1+e^{-x}}$
- $perceptron\ y=1 \ if\ x>=0\ else\ 0\ if\ x<0$
- $relu:\ y=0\ for\ x<0\ and\ x\ if\ x>0$
- $tanh:\ y=\frac{e^x-e^{-x}}{e^x+e^{-x}}$
- $leaky\ relu:\ y=-ax\ if\ x<0\ and\ x\ if\ x>0$

1. $Loss=L(y,\widehat{y})$
2. calculation of $\frac{\partial{L}}{\partial{w}}$->backpropagation

### CNN (convolutional neural networks)

#### motivation
用于处理图像信息，传统的NN不便处理2维等信息

- 全连接层 full connected layers to convolutions: 全连接，可以找到图像特征位置上相近的（我的理解，前面几层视域较小，需要找到物体形状的特征，而不是物体的总体在图中的位置等特征，需要精细的关联，关注局部区域，所以用FCN），随着越来越深入，会学习到更大范围的特征

#### basic concepts

1. kernel卷积核：$3*3$等规格，原图中相同大小的部分与核对应位置相乘得到新值
2. multiple kernel: 多个卷积核，卷积核的个数对应这输出值的通道数channels，每一张输出图都是feature maps
- padding and stride: 填充和步长。填充，由于正常处理时图的边上或角落中的像素值计算到的次数比较少（例如角上的只算到了一次），所以为了使算到的次数一致，可以在原图周围填充一圈像素，值为0；步长即每次计算时跳跃的步数，默认为1
- multi channels:多通道，常见多通道图为RGB图（3通道，3层图，每层图每个像素都是0-255），对这种图处理时每一个卷积核的通道数也要对应相同（例如卷积核$3*3*3$，$H*W*C$(channels)，RGB图shape一致$5*5*3$,$H*W*C$）**注意这是一个卷积核**，一个卷积核计算出来的是一个特征图（多通道是将对应位置上的值最后相加）
$1*1$kernal：可将维度降低，而长宽不变
pooling池化：在一个块内用某种函数计算出的值代替这个块的值。常见的有Maxpooling和averagepooling：最大池化，将$2*2$块内最大值代替块值；平均池化，用块内平均值代替块值

#### 典型的CNN
- image classifcation: conv2D,pooling,conv2D,pooling... flatten,FCN
- LeNet: recognizing handwritten digits; a convolutional encoder consisting of two convolutional blocks (convolution + pooling), followed by a dense block

#### application:
- image classification
- object detection
- image segmentation

## 复盘与延伸

- **我已经掌握**：用自己的话概括「神经网络与卷积神经网络」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。
