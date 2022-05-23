<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.md' target='_blank'><img src='https://img.shields.io/badge/-3057%E3%83%BBPush-7aad0c' alt='3057 · Push' /></a></div>

# 题目注解

这道题目那我们实现一个模拟 `Array.push` 方法的类型。

在 JavaScript 中，`Array.push` 的作用就是将某个值添加到当前数组的末尾。

我们已经知道在 TypeScript 中使用 `...` 操作符，所以这道题就变得很简单了，

```
type Push<T extends any[], U> = [...T, U];
```
