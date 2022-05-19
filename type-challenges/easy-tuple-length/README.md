<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.md' target='_blank'><img src='https://img.shields.io/badge/-18%E3%83%BBLength%20of%20Tuple-7aad0c' alt='18 · Length of Tuple' /></a></div>

# 题目注解

这道题想让我们通过实现一个 `Length` 来获取 `tuple` 的长度。通过上一道题目 `First Of Array` 我们知道可以直接通过 `T["length"]` 来获取长度。接着我们还需要限制输入为只读的数组，即元组。最后的结果就是，

```
type Length<T extends readonly any[]> = T["length"];
```

这道题目比较简单，通过我们之前题目的学习，很快就可以解出来。

延伸一下，如果这里我们传入的不是元组，而是一个普通的数组呢？结果会是什么？

```
const tesla = ["tesla", "model 3", "model X", "model Y"];
type a = Length<typeof tesla>;
```

答案是 `number`，因为我们可以随意改变数组 `tesla` 的长度，所以判断不出具体的长度，只能返回 `number` 类型。

同时我们可以从例子看出，通过 `readonly` 无法区分元组和数组。（TODO: Why?）
