---
title: "CS231n 4：卷积神经网络"
description: "整理 CNN 的局部连接、权重共享、卷积核与池化等核心思想。"
pubDate: 2026-08-01
updatedDate: 2026-08-01
category: course
tags: ["cs231n", "cnn", "computer-vision"]
relatedProjects: []
---

## 主要内容

### Optimization

优化就是寻找一组参数W使得损失函数最小化

1. random search: 随机尝试多种不同的权重，并记录哪些权重最有效。
2. random local search: 首先随机生成一个起点W，然后生成一些随机的扰动点$\delta W$ ，如果扰动点$W+\delta W$ 处损失更小，就执行一次更新操作。
3. following the gradient: 沿着最陡峭的方向前进，梯度的负方向

梯度下降法 GD
小批量梯度下降法：分批次计算训练数据的梯度。例如，在最新的卷积网络技术中，一个典型的批次包含来自 120 万样本训练集的 256 个样本。然后利用这个批次来进行参数更新。使用一batch计算出一个梯度（通过求这一batch总体loss，再进行求导得到一个梯度，可看「CS231n_2」的$Loss$），进行一次梯度更新。
当一批量中只包含一个样本，则称为随机梯度下降SGD。批量的大小为2的幂次：32，64，128

f在x处的梯度，即$\nabla f(x)$ 
梯度$\nabla f$ 实际上是偏导数构成的向量，可以表示为$\nabla f=[\frac{\partial f}{\partial x},\frac{\partial f}{\partial y}]$  
链式法则： $\frac{\partial f}{\partial x}=\frac{\partial f}{\partial q} \frac{\partial q}{\partial x}$ 

正向传播：计算从输入到输出的数值变化
后向传播：通过反向传播算法来更新梯度值，从线路末端开始，递归地应用链式法则来计算梯度值，知道电路输入端。
绿色为前向，数值；
红色为反向，梯度。 先求得局部梯度，再用链式法则得到整体梯度

例如 $f(w,x)=\frac{1}{1+e^{-(w_0 x_0 +w_1 x_1 +w_2)}}$ 
sigmoid function $\sigma (x)=\frac{1}{1+e^{-x}}$ 

向量的梯度也是向量

[linear-backprop](linear-backprop.pdf)
可参考

$y=A x,\ y为m*1列向量，\ x为n*1列向量，\ A为m*n矩阵$
$求\frac{\partial y}{\partial x}$

$$
A=\begin{pmatrix}
a_{11} & a_{12} &\cdots & a_{1n}\\
a_{21} & a_{22} &\cdots & a_{2n}\\
\cdots \\
a_{m1} & a_{m2} &\cdots & a_{mn}\\
\end{pmatrix}
$$
求法：
1. 将y向量看作一个整体，而将x向量展开，y分别对x中每一个分量进行求导
2. 把结果中的y展开为分量，然后依据y向量是行向量还是列向量对这些分量进行排列

$$
\frac{\partial y}{\partial x}=\begin{pmatrix}
\frac{\partial y}{\partial x_1}\\
\frac{\partial y}{\partial x_2}\\
\cdots\\
\frac{\partial y}{\partial x_n}\\
\end{pmatrix}
$$
然后将结果中的y分别换成$y_1, y_2, \cdots y_m$ 
例如本示例中y为列向量，所以第一个$\frac{\partial y}{\partial x_1}$为
$$
\begin{pmatrix}
\frac{\partial y_1}{\partial x_1}\\
\frac{\partial y_2}{\partial x_1}\\
\cdots\\
\frac{\partial y_m}{\partial x_1}\\
\end{pmatrix}=\begin{pmatrix}
a_{11}\\
a_{21}\\
\cdots \\
a_{m1}\\
\end{pmatrix}
$$
将这m个求导结果排列得到最终结果。
通常情况下解释y向量是列向量也按照行向量来进行求导，因为如果用以上则会得到超越矩阵，矩阵的每个元素仍然是一个矩阵，在实践层面不利于推导。
所以最终结果
$$
\frac{\partial y}{\partial x}=\begin{pmatrix}
a_{11} & \cdots & a_{m1}\\
a_{12} & \cdots & a_{m2}\\
\cdots \\
a_{1n} & \cdots & a_{mn}\\
\end{pmatrix}=A^T,\ n*m矩阵
$$

如果矩阵对矩阵求导，结果为Jacobian matrices

之后要求backward梯度时，可以直接用$\frac{\partial y}{\partial x}=A^T$,$\frac{\partial y}{\partial A}=x^T$ ，然后矩阵乘法乘上前面一个梯度，注意维度对应，注意如果是$y=xA+b$ ,$\frac{\partial y}{\partial b}$ 为一个“1”，不用管，只需考虑前一个梯度转化为指定维度的梯度，可以用np.sum降低一维。。。

## 复盘与延伸

- **我已经掌握**：用自己的话概括「CS231n 4：卷积神经网络」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。
