<div style='width: 100%; margin: 0 auto;'><a href='https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.md' target='_blank'><img src='https://img.shields.io/badge/' alt='·' /></a></div>

# 题目注解

这道题目要模拟 TypeScript 内置的 [Exclude<UnionType, ExcludedMembers>](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)。照例，我们先看一下官网的定义，

> Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.

`Exclude` 的作用就是从联合类型中去掉一些成员，比如 `type T0 = Exclude<"a" | "b" | "c", "a">` 得到的 `T0` 的类型就是 `"b" | "c"`。

这道题我们使用 `extends` 去实现。在联合类型中使用 `extends` 时，会遍历 `UnionType` 与 `ExcludedMembers` 逐个进行比较，如果命中，就返回 `true` 分支，否则返回 `false` 分支。

```
type MyExclude<T, U> = T extends U ? never : T;
```

实现如上，当联合类型 `T` 中的某个类型命中了联合类型 `U` 中的某个类型，就返回 `never`，否则返回对应的类型 `T`。这样我们就实现了题目的要求。

在这道题目的测试用例中，第三个比较特殊，如下，

```
  Expect<
    Equal<
      MyExclude<string | number | (() => void), Function>,
      Exclude<string | number | (() => void), Function>
    >
  >
```

这里 `Exclude<string | number | (() => void), Function>` 的结果是 `string | number`。我们验证一下，

```
type a = (() => void) extends Function ? true : false; // 结果是 true
type b = Function extends (() => void) ? true : false; // 结果是 false
```

[Function](https://www.typescriptlang.org/docs/handbook/2/functions.html#function) 在 TypeScript 中被定义为 `全局类型（global type）`，如下，

> The global type Function describes properties like bind, call, apply, and others present on all function values in JavaScript. It also has the special property that values of type Function can always be called; these calls return any.

个人理解 `Function` 类型是其它所有函数类型的父类型。（TODO: 更详细的解释）

TODO: extends 在不同类型上的区别？
