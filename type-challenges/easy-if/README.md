<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/README.md' target='_blank'><img src='https://img.shields.io/badge/-268%E3%83%BBIf-7aad0' alt='268 · If' /></a></div>

# 题目注解

这道题要实现一个 `if`，根据测试用例，就是当传入的第一个参数为 `true` 时，返回第二个参数 `T`，否则返回第三个参数 `F`。这道题目比较简单，利用 `extends` 可以直接得到结果，这里就不过多解释了，直接列出结果，

```
type If<C extends boolean, T, F> = C extends true ? T : F;
```
