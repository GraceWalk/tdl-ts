<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md' target='_blank'><img src='https://img.shields.io/badge/-14%E3%83%BBFirst%20of%20Array-7aad0c' alt='14 · FirstOfArray' /></a></div>

# 题目注解

这道题目想让我们实现一个泛型 `First<T>`，它接受一个 Array `T` 并返回它的第一个元素的类型。

## 方案 1

我们知道可以使用 `T[number]` 来访问一个 Array 的属性，所以很自然的想到可以使用 `T[0]` 来获取第一个元素的类型。

```
type First<T extends any[]> = T[0];
```

这个时候看测试用例，除了第三个例子都通过了，第三个例子是这样的 `Expect<Equal<First<[]>, never>>`。当传入的 `T` 是一个空数组时，我们需要返回 `never` 类型。也就是说我们要单独考虑数组长度为 0 的情况。

在 TypeScript 中，我们可以使用 `T['length']` 来获取 Array 类型的长度。拿到长度之后我们就要进行判断，在 JavaScript 中我们可以类似这样写——`condition ? trueExpression : falseExpression`。

而 TypeScript 也为我们提供了类似比较的方法 [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)，中文叫做 `条件类型`。它的用法类似三元运算符，如 `SomeType extends OtherType ? TrueType : FalseType;`。

我们使用条件类型来解决测试用例三，即

```
type First<T extends any[]> = 0 extends T["length"] ? never : T[0];
```

自此，所有测试用例都通过。

## 方案 2

方案 1 是我自己琢磨的，在翻阅社区解答时，看到了和我不一样的思路，

```
type First<T extends any[]> = T extends [infer First, ...infer rest] ? First : never;
```

同样使用到了 `Conditional Types`，但是判断的条件和处理都不一样。这里使用了 [infer](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types) 关键字，

> Conditional types provide us with a way to infer from types we compare against in the true branch using the infer keyword.

它提供了在 extends 中推断元素类型的方式，比如这个例子中，我们通过 `infer First` 推断出了数组类型第一个元素的类型，这样我们就可以直接使用 `First` 而不是通过 `T[0]` 去获取。

## 方案 3

```
type First<T extends any[]> = T extends [] ? never : T[0];
```

方案 3 和 方案 1 的区别在于判断条件，从 `0 extends T["length"]` 变为了 `T extends []`。这也很好理解，测试用例三传入的类型就是一个 `[]`，我们只需要排除掉这种情况就可以。
