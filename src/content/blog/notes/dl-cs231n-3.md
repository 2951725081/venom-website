---
title: "CS231n 3：反向传播与神经网络"
description: "梳理计算图、链式法则和反向传播如何驱动神经网络学习。"
pubDate: 2026-08-01
updatedDate: 2026-08-01
category: course
tags: ["cs231n", "deep-learning", "backpropagation"]
relatedProjects: []
---

## 主要内容

### Python/ Numpy Review Session

https://docs.python.org/3/

```python
type(x)

and or not
len('hello') # 5
x='a'
y='b'
print f'{x} {y} {12}' # 'a b 12' f-string

hw='{} {} {}'.format(x,y,12) # 'a b 12' 较老的写法.format

s='abc'
s.capitalize() # 'Abc' 返回副本，第一个字符大写
s.upper()
s.rjust(7) #'    abc' 右第7位对齐
s.center(7)#'  abc  '
s.replace('a','(abc)') # 替换 '(abc)bc'
'   world  '.strip() # 默认删除前后空格

xs=[1,2,3,'a']
x=xs.pop() # x='a' xs=[1,2,3] 弹出末尾

for idx, i in erumerate(xs): #枚举带索引
   print(f'#{idx+1}: {i}')
# #1: 1
# #2: 2
# #3: 3

xs.append(4) # [1,2,3,4]
[x**2 for x in xs]

# dictionary
d={'cat':'cute','dog':'furry'} # key:value
d['cat']
'cat' in d # True 判断key
d['fish']='wet' # [...,'fish':'wet']
d.get('monkey','Nan') # 'Nan' 默认值
d.get('fish','Nan') # 'wet'

del d['fish'] # 删除

d = {'person': 2, 'cat': 4, 'spider': 8}
for animal, legs in d.items(): #键值迭代
    print(f'A {animal} has {legs} legs')

set1={1,'cat','dog'}
set1.add('fish')

class Greeter:
    # constructor
    def __init__(self,name):
        self.name=name
    def greet(self,loud=False):
        if loud:
            print(f'HELLO, {self.name.upper()}')
        else:
            print(f'Hello, {self.name}')
g=Greeter('Fred')
g.greet()
g.greet(loud=True)

a=np.array([1,2,3])
a.shape #(3,)
np.zeros(2,2)
np.ones(3,2)

np.full((2,3),6) # 2*3矩阵，全为6
np.eye(2) #单位矩阵

rng=np.random.default_rng()
e=rng.random((2,3)) #随机数0-1

a=np.ones((2,3,4))
np.sum(a,axis=0).shape # (3,4)
np.sum(a,axis=(0,2)).shape # (3,)

# slice
a=np.ones((3,4))
b=a[:2.1:3]
b[0,0]=2
#a会变，这是视图，同一个上的

# 整数访问会降维，切片访问不会
a[1,:] #会变为1维
a[1:2,:]
a[[1],:]#不会变，2维

x = np.array([[1,2],[3,4]])
y = np.array([[5,6],[7,8]])
v = np.array([9,10])
w = np.array([11, 12])
# Inner product of vectors; produces 219
print(v @ w) #内积

np.dot(v,w)
v.dot(w) # 较老写法

print(x @ v) # [29 67]
print(x @ y) # 矩阵乘法

x = np.array([[1, -2, 3], [-4, 5, -6]])
print(np.max(x, axis=1))       # Max along each row: [3 5]
print(np.argmax(x, axis=1))    # Index of max in each row: [2 1] 找索引
print(np.clip(x, -3, 3))       # Clip values to [-3, 3] 范围约束，超出的按规定的最大最小写
print(np.where(x > 0, x, 0))   # ReLU: keep positives, zero out negatives
# x[x<=0]=0
x = np.array([[1, 2, 3], [4, 5, 6]])
x.flatten()
x.reshape(-1) # 都是变为1维

v=np.array([1,0,1])
vv=np.tile(v,(4,1)) # 4行v

# 一组图像 （N,H,W,3）

import matplotlib.pyplot as plt
x=np.arange(0,3*np.pi,0.1) # 步长
y1=np.sin(x)
y2=np.cos(x)
plt.plot(x,y1)
plt.plot(x,y2)

plt.xlabel(...)
plt.ylabel(...)
plt.title(...)
plt.legend(['sin','cos'])#图例

# 子图

plt.subplot(2,1,1)
plt.plot(x,y1)

plt.subplot(2,1,2)
plt.plot(x,y2)

plt.show()

# image
plt.imshow(img_arr) # [H W 3]

plt.show()

cmaps=['Reds','Greens','Blues']
fig,axes = plt.subplots(1,3,figsize=(12,4)) # fig 画布 axes 坐标轴
for i in range(3):
    axes[i].imshow(image_arr[:,:,i],cmap=cmaps[i])
    axes[i].set_title(...)
    axes[i].axis('off') # 关闭坐标轴
plt.suptitle(...)# 总标题
plt.show()

```

```python
#作业中出现

axis=0,1 ... # axis等于什么，那一维度在结果中就消失

a.shape(n,1)
b.shape(1,m) #这2者可以进行加减乘除操作，结果为n*m shape

#list求平均
a=[1,2,3,4]
np.mean(a)
np.sum(a)/len(a)

#list添加元素
np.append(arr,value)

#np数组拼接
a=np.array([1,2,3,4])  # (4,)
b=np.array([41,23,555,123]) #(4,)

np.concatenate((a,b)) # axis为几，该维度就变化，例如本例第0维变化，二者合并，结果维np.array([1,2,3,4,41,23,555,123]);一维数组拼接axis不影响结果；这里参数为np.array组成的序列，可以是元组tuple(,)，也可以是列表[,]

c=np.array([[333,111,222,444],[2123,321,455,666]]) # (2,4)
np.concatenate((a.reshape(1,4),c),axis=0)
# [[1,2,3,4],[333,111,222,444],[2123,321,455,666]]  (3,4)

# 求np数组中的众数
#法1
array=np.array([1,2,2,3,3,4])
val,count=np.unique(array,return_counts=True) # 返回值包含计数
val # np.array([1,2,3,4])
count # np.array([1,2,2,1]) 一一对应
index=np.argmax(count) # 得到值最大时的索引,若有多个返回最小的 ， 1
val[index] #2

#法2
array=np.array([1,1,3,2,1,7])
bins=np.bincount(array)
print(bins) # [0,3,1,1,0,0,0,1]
#bitcount方法返回数组x中从0到最大值，各个整数值出现的个数。此处需要特别注意两点：① 这个bin序列从0开始（不管原数组中有没有0），中间没有间隔，一直到最大值。如果要得到众数，则直接找到返回数组中的最大值，最大值对应的索引值就是众数；② bitcount只支持记录整数的个数，不支持浮点数，否则就会报错

np.argsort #返回数组值从小到大的索引值

x=np.array([3,1,2])
x.argsort() # array([1,2,0])
y=x[np.argsort(x)] # [1,2,3]

#list相加
a=[1,2,3]
b=[4,5]
c=a+b #[1,2,3,4,5]

#array_split
X1=np.array_split(X,num) #平均分为num个np数组，X1[i]为一个子数组

np.random.choice(a,b,replace=False) # 不放回取样

shape=(2,3,4)
num=5
....reshape(num,*shape) # 等价于reshape(5,2,3,4) ,将shape展开了
np.prod(shape) # 24, 乘积

np.random.normal(ave,scale,size=(a,b)) # ave均值，scale标准差，高斯分布

```

## 复盘与延伸

- **我已经掌握**：用自己的话概括「CS231n 3：反向传播与神经网络」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。

