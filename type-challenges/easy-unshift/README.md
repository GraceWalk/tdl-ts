<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/README.md' target='_blank'><img src='https://img.shields.io/badge/-3060%E3%83%BBUnshift-7aad0c' alt='3060 · Unshift' /></a></div>

# 题目注解

和上道题目 `Array.push` 相似，我们这一题需要实现类似 `Array.unshift` 的类型。

`push` 和 `unshift` 的区别在于前者是在数组末尾添加元素， `unshift` 是在数组头部插入元素。实现起来和 [easy-push](../easy-push/README.md) 这道题目差不多。

```
type Unshift<T extends readonly any[], U> = [U, ...T];
```
