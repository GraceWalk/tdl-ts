<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md' target='_blank'><img src='https://img.shields.io/badge/-4%E3%83%BBPick-7aad0c' alt='4 · Pick' /></a></div>

# 题目注解
本题需要模拟实现内置的 `Pick<Type, Keys>` 类型，我们先看[官网定义](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)。

> Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.

根据描述，就是从 Type 中取 Keys 构建一个新的类型。

首先，Pick 类型需要返回一个新的对象类型，可以是 interface，也可以是 type alias。

接着，我们需要遍历 Keys，并且将每个 Key 的类型设置为 Type 中的类型。即

```
  type MyPick<T, K> = {
    [P in K]: T[P]
  }
```

这里有两个关键的地方，一是 `in` ，二是 `Type[K]` 。
1. 首先是语法 `in`，这个语法其实叫做 [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)。我们可以通过它来遍历一个联合类型（`Union Types`）。
2. 第二个语法官方叫做 [`Indexed Access Types`](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)，我们可以用这种类似取数组中元素的方法来获取某个类型（例如这里的 Type）中特定属性的类型。

这一步完成之后还是报错了，根据 `test-cases` 可以得知，我们还需要考虑 Keys 传入 `invalid` 的情况，即 Keys 中有 Key 不在 Type 中。所以我们需要限制 Keys 的范围，即

```
  type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
  }
```

这里首先使用了 `keyof T` 来获取 Type 中的所有 Key，返回一个联合类型。`Keyof` 的[官方定义](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html#the-keyof-type-operator)如下，

> The keyof operator takes an object type and produces a string or numeric literal union of its keys.

接着我们使用 `extends` 语法来限制第二个参数 K 必须在 Type 的 Key 中。这其实叫做 [类型约束(Generic Constraints)](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)。官方还提供了一个与我们这个题目非常相似的一个[例子](https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints)。

> 

自此，我们完成了该题目。