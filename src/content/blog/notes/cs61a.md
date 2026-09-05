---
title: "CS61A：Python 基础语法摘记"
description: "整理 CS61A 学习中的装饰器、列表、字符串与多行字面量。"
pubDate: 2026-09-03
updatedDate: 2026-09-03
category: technical
tags: ["cs61a", "python", "programming"]
relatedProjects: []
---

## 主要内容

### 修饰

```python
def trace(fn):
   def wrap(x):
     print(f"->{fn.__name__}")
     return fn(x)
   return wrap

@trace
def triple(s)
  return s*3

>>triple(5)
>>->triple
>>15
```

### list, string

- 列表相加减是对列表来说，里面的数据元素不变
字符串与列表一致

```python
>> [1]+[2,3]*2
>> [1,2,3,2,3]
>> 
>> "sha "*2
>> "sha sha "
```

- 多行字面量
```python
""" the zen of python
chaims, 
read more:import it."""  字符串可多行

'the zen of python\nchaims,\nread more:import it.'  可写\n

```

## 复盘与延伸

- **我已经掌握**：用自己的话概括「CS61A：Python 基础语法摘记」中的一个核心概念，并配一个最小例子。
- **下一步**：补充一次可运行的代码实验或手算推导，记录输入、输出和遇到的问题。
- **关联**：将本篇与同主题笔记串起来，形成从概念到实践的学习路径。

