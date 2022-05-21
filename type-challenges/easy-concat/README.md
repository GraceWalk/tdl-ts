<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.md' target='_blank'><img src='https://img.shields.io/badge/-533%E3%83%BBConcat-7aad0c' alt='533 ·Concat' /></a></div>

# 题目注解

这道题目的是实现一个类型 `Array.Concat` 语法的类型，可以将两个元组合为一个元组。

解答这道题的关键点在于我们要知道可以通过 `...` 解构符来解构一个元组，结果如下，

```
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];
```

这里在校验传入的类型时，是通过 `T extends readonly any[]` 来判断的，传 `readonly` 是为了兼容这种情况，

```
const a = [1, 2] as const;
const b = [3, 4] as const;

type result = Concat<typeof a, typeof b>;
```
