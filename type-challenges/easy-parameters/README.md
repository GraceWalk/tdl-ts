<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/README.md' target='_blank'><img src='https://img.shields.io/badge/-3312%E3%83%BBParameters-7aad0c' alt='3312 · Parameters' /></a></div>

# 题目注解

这道题根据题意，需要我们模拟实现 TypeScript 内置的 [Parameters](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype) 类型。

> Constructs a tuple type from the types used in the parameters of a function type Type.

根据官方定义，就是取出函数参数类型，返回一个元组。

通过之前题目的学习，我们知道可以利用比较类型（Condition Type）的 `infer` 关键字来拿到参数并返回。如下，

```
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer Args
) => any
  ? Args
  : never;
```
