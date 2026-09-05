---
title: "Keras 模型训练工作流"
description: "整理 Sequential、Functional API、数据预处理、训练历史与模型保存。"
pubDate: 2026-07-12
updatedDate: 2026-07-12
category: technical
tags: ["keras", "deep-learning", "python"]
relatedProjects: []
---

## 主要内容

### 2 models
1. sequential model
```python
import keras 
from keras import layers

model = keras.Sequential(
     [
        layers.Input(shape=(784,)), # NN ;CNN: shape=(28,28,1) L*W*Depth(通道数，RGB=3)
        layers.Dense(128, activation="relu", name="layer1"),# name 可省
        layers.Dense(64,  activation="relu", name="layer2"),
        layers.Dropout(0.5), # 选择性消除一些节点，提高稳定性，减少过拟合
        layers.Dense(10, activation="softmax") # activation不写就是没有
        # layers.Rescaling(1./255,0(偏移量)) ，归一化在这里或在数据加载处处理，必做，否则会出现梯度消失等现象
     ]   

)

# CNN中还有layers.Conv2D(64(卷积核数，即特征图数), kernel_size=(3,3), activation="relu") 卷积层; layers.MaxPooling2D(pool_size=(2,2)) 池化层; layers.GlobalAveragePooling2D() (全图池化，选Max值作为这张图的值)
```

2. functional api
```python
# 就是将各层神经网络当作一个个函数，有输入输出
inputs = keras.Input(shape=(784,)) # 定义函数
# inputs.shape , inputs.dtype
dense=layers.Dense(512,activation="relu")
x=dense(inputs)# 输入inputs, 输出x
x=layers.Dropout(0.2)(x) # 输入之前的x即dense输出，输出新x
outputs = layers.Dense(10, activation="softmax")(x)

model=keras.Model(inputs=inputs, outputs=outputs, name="minist_model") # 构造model

```

#### 一些操作
```python
# 查看model结构
keras.utils.plot_model(model, "XXX.png"（保存图片）, rankdir="LR"(生成水平图,默认TB垂直图))

model.summary() # 生成model具体信息表，包括各层节点数等

```
#### compile
完成构造后需要进行编译
```python
model.compile(loss='categorical_crossentropy',
              optimizer= keras.optimizers.Adam(learning_rate=1e-3) ,
              metrics=['accuracy'])

```

loss为更新权重时使用的损失函数，可以用库中已有的函数 'categorical_crossentropy' 分类交叉熵（用于分类，结果是离散值）
optimizer为优化器，用于更新权重的算法

### training, evaluation

#### dataset loading
数据集格式整理
```python

# load
(train_x,train_y),(test_x,test_y)=keras.datasets.mnist.load_data()
# 归一化
train_x=train_x.astype('float64')/255.0 # 数据类型转化
...
train_x=train_x.reshape(train_x.shape[0],784) # shape[0] 即为总个数
# 维度扩展
train_x=np.expand_dims(train_x,-1) # 由(60000,28,28)->(60000,28,28,1) 在末尾插入一维，0：(1,60000,28,28);1:(60000.1.28.28)，插入的位置
# axis 0/1:0 vertical (down);1: horizontal (across)
# 转独热，每个数字都是一个向量，用于分类任务！！！，例如输出节点10个，计算出的也是10个数字，都是可能性，然后使用分类交叉熵即可计算loss
train_y=keras.utils.to_categorical(train_y,10) # 原来就是1-10数字，之后变为独热，例如2变为 [0,1,0,...,0,0]

```

#### train
```python
model.fit(
    x = train_x,
    y = train_y,
    shuffle = True, # 是否要随机顺序
    batch_size = 60, # 每次更新梯度要用的数据量
    epochs = 5, # 一共要几轮，一轮即所有数据使用一次
    validation_split = 0.1, # 训练数据用于验证的比例
    verbose=1 # 输出信息冗余程度，一般默认 
)

```

#### history
```python
training_history=model.history.history
print(training_history.keys()) # 跟踪的数据，例如 accuacy,loss,val_accuracy
train_history['loss']... # 可用于画图
plt.figure(figsize=(8,5))
plt.plot(training_history['loss'],label='training loss')
...
plt.title('...')
plt.xlabel('epochs')
plt.legend() # 加上图例
plt.show()
```

#### evaluation
```python
loss,acc=model.evaluate(x=test_x,y=test_y)
print(f"loss:{loss}, acc:{acc}")

```
#### predict
```python
model.predict(x)
```
#### save
```python
model.save('mnist_model')
# load existing model
model=keras.models.load_model(model_name)
```

## 复盘与延伸

- **我已经掌握**：用自己的话概括「Keras 模型训练工作流」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。
