---
title: "CS231n 2：线性分类器"
description: "整理线性分类器、评分函数、损失函数与参数优化的基本概念。"
pubDate: 2026-07-31
updatedDate: 2026-07-31
category: course
tags: ["cs231n", "computer-vision", "linear-model"]
relatedProjects: []
---

## 主要内容

### 线性分类

我们现在将开发一种更强大的图像分类方法，最终自然地推广到整个神经网络和卷积神经网络。该方法将包含两个主要组成部分：一个将原始数据映射到类别分数的**得分函数**，以及一个量化预测分数与真实标签之间的一致性的**损失函数**。然后我们将将其定义为一个优化问题，其中我们会使损失函数相对于得分函数参数最小化。

**score function**: $f:R^D->R^K$
将原始图片像素映射为相应的类别分数

线性映射：$f(x_i,W,b)=Wx_i+b$
详情见「1. classification and regression」

将图片像素展开为1维（上图只有4个像素），权重行数为分类总数（上图为3个类别），每一行权重都在求其中一种分类的得分。
 $W$的每一行都对应一个类别的分类器。这些数字的几何意义是：当我们改变$W$中的某一行时，像素空间中的相应线条会朝不同的方向旋转。而$b$中的偏置项则使得我们的分类器能够调整这些线条的位置。 
 通过计算各分类器的得分（W每一行对应一个分类器），来找到最匹配的模板。

image classifier:
```python
def classify_image(image):
   # some magic here
   return class_label
   
def train(images,labels):
   # machine learning
   return model

def predict(model,test_image):
   # use model to predict
   return test_labels
   
```

这时$x_i$维数相当于加了1，第一维始终为1，把b也放到W中。这样就只要学一个矩阵就行了

图像像素预处理： $[0,255]$变到$[-127,127]$，或者再除以127归一化（对图像来说，每一个像素都可视为一个特征）

### 损失函数 hinge function

上面我们得到了得分函数，但是可能权重组合不理想，例如测试图片为猫，但是计算出的猫得分非常低，而其他的种类却很高。
**multiclass support vector machine loss** SVM 多类支持向量机损失：
支持向量机希望每张图片的正确类别所对应的得分要高于错误类别的某个固定差值（即得分之差要高于某个固定差值$\Delta$）。
回想一下，对于第 i 个例子，我们拥有图像 xi 中的像素数据，以及用于指定正确类别索引的标签 yi 。评分函数会处理这些像素数据，并计算出类别评分向量 f(xi,W) ，我们将其简写为 s （即评分）。例如第j个类别评分为该向量的第j个元素：$s_j=f(x_i,W)_j$
那么第i个例子（第i个图像）SVM损失：$$L_i=\sum_{j\neq y_i}max(0,s_j-s_{y_i}+\Delta)$$
（就是要尽量使其他不是该类别的评分分数尽量小，同时差值尽量要大于$\Delta$,如果其他类别分数比较高，就算是误差了；如果差值比$\Delta$大，那就可以容易排除，误差就为0）
总结来说，SVM 的损失函数要求正确类别的得分要比错误类别的得分高出至少$\Delta$个单位。如果实际情况不符合这一要求，我们就会累积损失。

### regularization

假设我们有一个数据集，以及一组参数 W，这些参数能够正确地分类每一个样本（即所有得分都满足一定的条件，且对于所有的 i，损失值都为零）。不过，这组参数 W 并不一定是唯一的：可能有很多类似的参数也能正确地分类样本。一个简单的例子是：如果某些参数能够正确地分类所有样本（即每个样本的损失值都为零），那么这些参数的任意倍数作为新的参数组合，同样也能使损失值为零。因为这样的变换会均匀拉伸所有的得分幅度，从而也改变了所有样本之间的绝对差异。例如，如果正确分类的样本与最接近的错误分类样本之间的得分差为 15，那么将 W 的所有元素乘以 2 后，新的得分差就变成了 30。

我们希望通过某种方式表达出对某一组权重 W 的偏好，以消除这种不确定性。我们可以通过在损失函数中加入正则化惩罚项来实现这一点。最常见的正则化惩罚方式是平方 L2 范数，它通过对所有参数的逐项二次惩罚来抑制较大的权重值。$$R(W)=\sum_{k} \sum_{l} W_{k,l}^2$$
完整的SVM损失表示：$$L=\frac{1}{N} \sum_i L_i + \lambda R(W)$$
N为训练样本总数，惩罚项的权重为$\lambda$
对较大权重进行惩罚能够提升泛化能力，因为这意味着没有任何一个输入维度的影响能够单独对评分产生巨大影响。由于 L2 惩罚规则倾向于选择更小、分布更均匀的权重向量，所以最终的分类器会倾向于考虑所有输入维度的影响，而不是只关注少数几个输入维度的影响。

```python
def L_i(x, y, W):
  """
  unvectorized version. Compute the multiclass svm loss for a single example (x,y)
  - x is a column vector representing an image (e.g. 3073 x 1 in CIFAR-10)
    with an appended bias dimension in the 3073-rd position (i.e. bias trick)
  - y is an integer giving index of correct class (e.g. between 0 and 9 in CIFAR-10)
  - W is the weight matrix (e.g. 10 x 3073 in CIFAR-10)
  """
  delta = 1.0 # see notes about delta later in this section
  scores = W.dot(x) # scores becomes of size 10 x 1, the scores for each class
  correct_class_score = scores[y]
  D = W.shape[0] # number of classes, e.g. 10
  loss_i = 0.0
  for j in range(D): # iterate over all wrong classes
    if j == y:
      # skip for the true class to only loop over incorrect classes
      continue
    # accumulate loss for the i-th example
    loss_i += max(0, scores[j] - correct_class_score + delta)
  return loss_i

def L_i_vectorized(x, y, W):
  """
  A faster half-vectorized implementation. half-vectorized
  refers to the fact that for a single example the implementation contains
  no for loops, but there is still one loop over the examples (outside this function)
  """
  delta = 1.0
  scores = W.dot(x)
  # compute the margins for all classes in one vector operation
  margins = np.maximum(0, scores - scores[y] + delta)
  # on y-th position scores[y] - scores[y] canceled and gave delta. We want
  # to ignore the y-th position and only consider margin on max wrong class
  margins[y] = 0
  loss_i = np.sum(margins)
  return loss_i

def L(X, y, W):
  """
  fully-vectorized implementation :
  - X holds all the training examples as columns (e.g. 3073 x 50,000 in CIFAR-10)
  - y is array of integers specifying correct class (e.g. 50,000-D array)
  - W are weights (e.g. 10 x 3073)
  """
  # evaluate loss over all examples in X without using any for loops
  # left as exercise to reader in the assignment
```

超参数 $\Delta$ 可设为1，真正权衡在于正则化程度$\lambda$

### softmax分类器

除了SVM外另一种分类器，其输出结果即归一化的类概率（和为1）
用于映射 $f(x_i;W)=Wx_i$的函数保持不变,但我们现在将这些得分解释为每个类别的未归一化的对数概率，并用交叉熵损失来代替铰链损失，其形式如下：$$L_i=-\log (\frac{e^{f_{y_i}}}{\sum_j e^{f_j}}) \ or\ equivalently\ L_i=-f_{y_i}+\log \sum_j e^{f_j}$$
用$f_j$来表示类评分向量中第j个元素，完整损失为$L_i$平均再加上$R(W)$正则化项。
$$H(p,q)=-\sum_x p(x)\log q(x)$$
因此，Softmax 分类器实际上是在最小化估计的类别概率与“真实”分布之间的交叉熵。在这种解释下，真实分布指的是所有概率质量都集中在正确类别上的分布（即， $p=[0,1,…,0]$在 yi 位置只有一个 1）
$$L=\frac{1}{N} \sum_i^{N} L_i +\lambda R(W)$$
$$\frac{\partial L}{\partial score_i}=P_i-1(j==y[i])(概率矩阵，在预测标签处需要减一)$$

实际问题：数值稳定性。在编写用于计算 Softmax 函数的代码时，由于涉及指数运算，中间结果 efyi 和 ∑jefj 可能会变得非常巨大。处理如此大的数值时，数值稳定性可能会受到威胁，因此采用某种归一化技巧是非常重要的。注意，如果我们用常数 C 乘以分数的分子和分母，然后将结果相加，就可以得到以下数学表达式（在数学上等价）：

通常， C 的值会被设置为 $\log C=−\max_j f_j$ 。这意味着我们需要调整向量 f 中的值，使得最大值变为零。

```python
f = np.array([123, 456, 789]) # example with 3 classes and each having large scores
p = np.exp(f) / np.sum(np.exp(f)) # Bad: Numeric problem, potential blowup

# instead: first shift the values of f so that the highest number is 0:
f -= np.max(f) # f becomes [-666, -333, 0]
p = np.exp(f) / np.sum(np.exp(f)) # safe to do, gives the correct answer
```

Softmax 分类器为每个类别提供“概率”值。与 SVM 不同，SVM 为所有类别计算出未经校准且难以解释的分数，而 Softmax 分类器能够让我们得到所有标签的概率值。例如，对于一个图像，SVM 分类器可能会为“猫”、“狗”和“船”这三个类别分别给出分数$[12.5、0.6、-23.0]$。而 Softmax 分类器则可以计算出这三个标签的概率分别为$[0.9、0.09、0.01]$。

## 复盘与延伸

- **我已经掌握**：用自己的话概括「CS231n 2：线性分类器」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。

