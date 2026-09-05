---
title: "分类与回归：机器学习基础"
description: "从任务定义、评估指标到线性模型与验证集，梳理监督学习的基本框架。"
pubDate: 2026-07-09
updatedDate: 2026-07-09
category: technical
tags: ["machine-learning", "classification", "regression", "model-evaluation"]
relatedProjects: []
---

## 主要内容

1. 基本概念

- Classification: Dependent variable is categorical 明确的（离散的）
- Regression: Dependent variable is continuous 连续的

2. 范围

- k-nearest neighbor models
- linear model (linear regression, logistic regression)
- tree-based models (decision trees, random forests)
- (naive) bayes models (multiinomial, gaussian)
- neural network model (MLP, RNN, CNN)

3. basic setup

training data->model(classification/regression) --(test data)--> predictions <--evaluation--> ground truth

4. Evaluation

Regression: 
common: root mean squared error (RMSE)
Classification:
Base case: Binary classification(2 labels:0/1)

| |1|0|
|--|--|--|
|1|True Positives(TP)|False Positives(FP)|
|0|False Negatives(FN)|True Negatives(TN)|

横行：ground truth label $Y$
纵列：predicted label $\widehat{Y}$

$Accuracy=\frac{TP+TN}{TP+TN+FP+FN}$
$Precision=\frac{TP}{TP+FP}$
$Recall=\frac{TP}{TP+FN}$
$F1=2\times\frac{Precision\times Recall}{Precision+Recall}$

Multiclass Evaluation: One-vs-Rest Confusion Matrices

|  |2|1|0|
| -- | -- | -- | -- |
|2|8|6|0|
|1|3|12|1|
|0|4|2|14|

可变为
2-vs-Rest:

| |$2$|$\overline{2}$|
|--|--|--|
|$2$|8|6|
|$\overline{2}$|7|29|

剩余同理

Micro Averaging: 将所有 FP,FN,TP,TN取平均，然后得到一个2阶矩阵，求 F1 (Favors bigger classes,since average over counts)
Macro Averaging: 对所有矩阵先分别求 F1，再将所有矩阵的F1取平均 (treats all class equally, since metrics are normalized)

5. linear model

- dataset of $n$ samples $\{(X_i, y_i)\}_{i=1}^{n}$
- samples with $d$ features $X_i=(x_{i1},x_{i2},...,x_{id})$
- assumption: linear relationship between $X_i$ and dependent variable $y_i$
$$\widehat{y_{i}}=f(\theta_0+\theta_1x_{i1}+\theta_2x_{i2}+...+\theta_dx_{id})$$
$$\theta=\{ \theta_0,\theta_1,\theta_2,...,\theta_d\}, \ \theta_i\in \Re$$

$$\widehat{y}=f(X\theta)$$
$$X=\begin{bmatrix}
1&x_{11}&x_{12}&\cdots&x_{1d}\\
1&x_{21}&x_{22}&\cdots&x_{2d}\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
1&x_{n1}&x_{n2}&\cdots&x_{nd}\\
\end{bmatrix}$$

$$\widehat{y}=\begin{bmatrix}
\widehat{y}_1\\
\widehat{y}_2\\
\vdots\\
\widehat{y}_n\\
\end{bmatrix}$$

$$\theta=\begin{bmatrix}
\theta_1\\
\theta_2\\
\vdots\\
\theta_d\\
\end{bmatrix}$$

### linear regression
 $f(x)=x$, $Loss=\frac{1}{n}{\Vert\widehat{\mathbf{y}}-\mathbf{y}\Vert}_{2}^2=\frac{1}{n}{\Vert\mathbf{X}\theta-\mathbf{y}\Vert}_{2}^2$ (Mean Squared Error, MSE)
 $\frac{\partial L}{\partial \theta_0}=0,\frac{\partial L}{\partial \theta_1}=0,...,\frac{\partial L}{\partial \theta_d}=0$, d+1 equations with d+1 unknowns($\theta$)
 $$\theta=(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$$
Gradient Descent Algorithm
$$\theta\leftarrow\theta-(\eta\cdot\nabla_\theta L )$$ $\eta$为learning rate

### logistic regression
$f(x)=\sigma(x)=\frac{1}{1+e^{-x}}$
all prediction values $\widehat{y}_i\in[0,1]$
把$\widehat{y}_i$当成可能性：
- $\widehat{y}_i<0.5\rightarrow Class\ 0$
- $\widehat{y}_i\geq0.5\rightarrow Class\ 1$
交叉熵损失：
$Loss(Cross-Entropy\ Loss)=-[y_i\log{\widehat{y}_i}+(1-y_i)\log(1-\widehat{y}_i)]$
$\frac{\partial L}{\partial \theta}=\frac{1}{n}\mathbf{X}^T(\sigma(\mathbf{X}\theta)-\mathbf{y})$

 ### Polynomial Linear Regression
 $f(x)=x$
 $\widehat{y}_i=\theta_0 1+\theta_1 x_i+\theta_2 x_i^2+\cdots+\theta_k x_i^p$
 相当于将不同指数的x看作不同的x，其他处理同一般linear regression
$\theta_k x_{i1}x_{i2}$，不同x之积也可以

p为多项式的次数（最高项的幂次）
但是如果p值过大，可能会过拟合overfitting

### Regularization 正则化
Model "to power" means large $\theta$ values
- extend loss function by penalty term
- for example,  $Loss=\frac{2}{n}{\Vert\mathbf{X}\theta-\mathbf{y}\Vert}_{2}^2+\lambda\Vert\theta\Vert_2^2$  L2 regularization
- $Loss=\frac{2}{n}{\Vert\mathbf{X}\theta-\mathbf{y}\Vert}_{2}^2+\lambda\Vert\theta\Vert_1$ L1 regularization

### Validation 

- Use test data only at the very end to evaluate performance of final model 一个调完超参数的模型测试表现，只测一次，最后结果
- Use validation data for model selection and hyperparameter tuning  同一模型调超参数(NN layers, learning rate, number of nodes)，可能要多次，调出较好的，中间结果

60 20 20 一般

- K-Fold Cross Validation（K折交叉验证） :把除去测试集的数据集分为k blocks of equal size，使用其中k-1个去训练training set，剩余一个用于验证validation，重复过程k rounds用不同的validation set，一次的结果为这k次结果的平均（可最大限度利用数据，提高评估的稳定性）

## 复盘与延伸

- **我已经掌握**：用自己的话概括「分类与回归：机器学习基础」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。
