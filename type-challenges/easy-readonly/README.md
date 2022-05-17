<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md' target='_blank'><img src='https://img.shields.io/badge/-7%E3%83%BBReadonly-7aad0c' alt='7 · Readonly' /></a></div>

# 题目注解

这道题目是要实现内置的 [Readonly<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)。Readonly 定义如下，

> Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.

翻译过来就是，从 Type 复制一个类型，并类型上所有的属性都设置为 `readonly` 。这样，这个类型上所有的属性都不能再被重新赋值。

显然，和题目 easy-pick 一样，我们也需要遍历 Type 上边的所有属性，就是，

```
type MyReadonly<T> = {
  [K in keyof T]: T[K];
};
```

不同的是，我们需要将每个属性都设置为 `readonly` 。这一步直接加关键字就好，

```
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

这道题就解答完成了。
