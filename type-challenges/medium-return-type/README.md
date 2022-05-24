<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md' target='_blank'><img src='https://img.shields.io/badge/-2%E3%83%BBGet%20Return%20Type-d9901a' alt='2 · Get Return Type' /></a></div>

# 题目注解

这道题目让我们获取函数返回的类型，比较简单，可以直接使用 `Conditition Type` 的 `infer` 关键字推断出返回类型。题解如下，

```
type MyReturnType<T> = T extends (...args: any[]) => infer Return
  ? Return
  : never;
```
