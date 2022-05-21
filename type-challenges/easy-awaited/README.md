<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.md' target='_blank'><img src='https://img.shields.io/badge/-189%E3%83%BBAwaited-7aad0c' alt='189 · Awaited' /></a></div>

# 题目注解

这道题目想让我们定义一个类型来取出 `Promise<ExampleType>` 中返回的类 `ExampleType`。

我们先来看测试用例，我们自定义的 `MyAwaited` 类需要限制传入 `Promise` ，如果传入其它类型会报错。

```
type MyAwaited<T extends Promise<any>> = any
```

通过 `extends` 语法，我们可以很简单的对传入类型做限制。

接着，我们需要来实现这个类型的功能，即返回 `Promise` 的返回类型。我们之前在 [easy-first](../easy-first/README.md#方案-2) 的 `方案 2` 中提到我们可以通过 `infer` 关键字推断出返回类型。所以，

```
type MyAwaited<T extends Promise<any>> = T extends Promise<infer K> ? K : never;
```

成功取出类型，但是测试用例 3 报错了，用例 3 传入的类型为 `Promise<Promise<string | number>>`。可以看到，我们还需要考虑嵌套 `Promise` 的情况，这种情况在我们实际使用 `Promise` 时也非常常见。所以对于推断出的类型 `K` ，我们还需要判断它是否是 `Promise`，如果是，继续通过 `MyAwaited` 来获取返回类型。实现如下，

```
type MyAwaited<T extends Promise<any>> = T extends Promise<infer K> ? K extends Promise<any> ? MyAwaited<K> : K : never;
```

这样，我们就解决了题目。
