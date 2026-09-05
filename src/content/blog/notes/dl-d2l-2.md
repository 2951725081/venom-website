---
title: "动手学深度学习 2：实践摘记"
description: "整理动手学深度学习第二部分的阶段性学习记录。"
pubDate: 2026-07-18
updatedDate: 2026-07-18
category: course
tags: ["d2l", "deep-learning", "to-review"]
relatedProjects: []
---

## 主要内容

### 预备知识

#### ndarray

n维数组，也称张量tensor。一个轴的张量对应数学上的向量。

```python
import torch

x=torch.arange(12) # 生成0-11的张量
x.shape # torch.Size([12])
x.numel() # num of element
X=x.reshape(3,4) # 变形状
torch.zeros((2,3,4)) # 3 维，每多一维多一个[]
torch.ones((3,4,5)) # 类似
torch.randn(3,4) # 正态分布数据
torch.tensor([[1,2,3],[4,5,6]])
# x,y are tensors, 维度一致，可以直接对应位置操作
x+y,x*y,x-y,x/y,x**y,torch.exp(x)

X = torch.arange(12, dtype=torch.float32).reshape((3,4)) # 0-11
Y = torch.tensor([[2.0, 1, 4, 3], [1, 2, 3, 4], [4, 3, 2, 1]]) # 形状一致
torch.cat((X, Y), dim=0), torch.cat((X, Y), dim=1) # dim=0,行，沿着形状的第一个元素，该元素变；dim=1，列

X==Y # 逻辑矩阵
X.sum() # 求和

a = torch.arange(3).reshape((3, 1))
b = torch.arange(2).reshape((1, 2))
a + b # tensor([[0, 1],
      # [1, 2],
      # [2, 3]]) ， 广播机制，即使形状不同，先改为相同，复制元素
# slice 
x[-1],x[1:3],x[1:3,4:5] # 行，列
Y=X+Y # Y前后地址可能不同，若要确保相同，则 Y[:]=X+Y，赋值操作
A=X.numpy()
B=torch.tensor(A)
```

#### pandas

```python
import os

os.makedirs(os.path.join('..','data'),exist_ok=True) # 创建文件夹，用拼接，如exist，不报错
data_file=os.path.join('..','data','house_tiny.csv') # 地址
with open(data_file,'w') as f: # with语句，操作完成后自动f.close...
   f.write('123,345,333\n')

import pandas as pd
data=pd.read_csv(data_file) # pd带索引,NaN表示缺失值

# 索引定位用iloc
inputs,outputs=data.iloc[:,0:2],data.iloc[:,2]
inputs=inputs.fillna(inputs.mean())
inputs=pd.get_dummies(inputs,dummy_na=True) # 将有Nan变为独热码，例如Num有1，2，Nan，变化后为Num_1,Num_2,Num_nan三列

```

#### linear_algebra

```python
import torch
x=torch.arange(4)
x[3]  # 访问一维元素
len(x) # 4
x.shape # torch.Size([4])

A=torch.arange(20，dtype=torch.float32).reshape(5,4)
A.T # 矩阵操作
B=A.clone() # 副本
A*B # 还是对应位置一元运算
A.sum() # A.sum(dim=0) ,行变为1行
A.mean(), A.sum()/A.numel() # 平均值 A.mean(axis=0)
# dot product
torch.dot(x,y) # 都是一维,对应位之和相加
torch.sum(x*y)
# 矩阵A，向量x，之积
torch.mv(A,x) # (5,4),(4)->(5)
# 矩阵乘法 A,B
torch.mm(A,B)
u=torch.tensor([3,-4])
torch.norm(u) # L2范数， tensor(5.)

```

#### autograd

自动微分

```python
import torch

x=torch.arange(4.0)
x.requires_grad_(True) # x=torch.arange(4.0,requires_grad=True)
x.grad # 默认值为None
y=2*torch.dot(x,x)
y # tensor(28., grad_fn=<MulBackward0>)
y.backward() # 反向传播  y'=4x
x.grad # tensor([0.,4.,8.,12.])，y关于x的梯度

# 默认情况下梯度会累加，所以要清空
x.grad.zero_()
y=x.sum()
y.backward()
x.grad # tensor([1.,1.,1.,1.]) ,相当于y=x1+x2+x3+x4，然后y对x每个分量求导
# 对非标量调用backward需要传入一个gradient参数，该参数指定微分函数关于self的梯度。
# 本例只想求偏导数的和，所以传递一个1的梯度是合适的
x.grad.zero_()
y = x * x
# 等价于y.backward(torch.ones(len(x)))
y.sum().backward() # 尽管是矩阵也是要转为标量（误差函数），再反向传播
x.grad

# 分离计算，令新变量，但是需要丢弃原变量的信息，使用detach()
x.grad.zero_()
y = x * x
u = y.detach()
z = u * x

z.sum().backward()
x.grad == u # true，只计算z=u*x关于x的梯度，而不是z=x*x*x关于x的
、
```

## 复盘与延伸

- **我已经掌握**：用自己的话概括「动手学深度学习 2：实践摘记」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。

