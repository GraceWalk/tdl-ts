# TypeScript Deep Dive 学习笔记

There are two main goals of TypeScript:

- Provide an _type system_ for JavaScript.
- Provide planned features from future JavaScript editions to current JavaScript engines
- 便于 JavaScript 引擎在运行时做优化

TypeScript 对于隐式类型转换会报错

```tsx
[] + []; // JavaScript will give you "" (which makes little sense), TypeScript will error

//
// other things that are nonsensical in JavaScript
// - don't give a runtime error (making debugging hard)
// - but TypeScript will give a compile time error (making debugging unnecessary)
//
{
}
+[]; // JS : 0, TS Error
[] + {}; // JS : "[object Object]", TS Error
{
}
+{}; // JS : NaN or [object Object][object Object] depending upon browser, TS Error
"hello" - 1; // JS : NaN, TS Error

function add(a, b) {
  return;
  a + b; // JS : undefined, TS Error 'unreachable code detected'
}
```

# Basic Annotations（基本声明） [🔗](https://basarat.gitbook.io/typescript/type-system#basic-annotations)

TypeScript 使用 `:TypeAnnoattion` 这种方式来声明类型。

## Primitive Types

- string
- number
- boolean

## Arrays

我们可以使用 `:[]` 来声明一个数组类型。 `:boolean[]` 表示一个数组项为 `boolean` 类型的数组类型声明。

## Interfaces

`Interfaces` 是 TypeScript 用于组合多类型声明到单个声明的方式。除了 `Interfaces` ，还可以使用 `type alias` 这种方式声明。

```tsx
interface Name {
  first: string;
  second: string;
}
```

## Inline Type Annotation

对于一次性的类型声明，使用 `Inline types` 很方便。但是如果在程序中发现使用了很多次重复的类型声明，将其重构为一个 `inferface` 会更好。

```tsx
var name: {
  first: string;
  second: string;
};
```

# Sepcial Types（特殊类型）

除了上边提到的原始类型（Primitive Types）之外，还有一些类型在 TypeScript 中有特殊的含义： `any` `null` `undefined` `void` 。

## any

> It gives you an escape hatch from the type system to tell the compiler to bugger off.

`any` 在类型系统中与所有类型都能兼容，这意味着任何类型的值都能赋值给一个 `any` 类型的变量，以及一个 `any` 类型的值可以赋值给任何类型的变量。

当我们开始将 `JavaScript` 迁移到 `TypeScript` 时，可以使用 `any` 来告诉编译器不要进行解析。但是 `any` 不能保证类型安全（type safety），所以还是要为代码声明有意义的类型。

## `null` and `undefined`

这两者在类型系统中的行为取决于 `strictNullChecks` 这个编译标识。当 `strictNullCheck: false` 时，这两者等同于 `any` 。

- [ ] 示例和补充另一种情况

## :void

`:void` 表示函数没有返回类型。

```tsx
function log(message): void {
  console.log(message);
}
```

# Generics（泛型）[🔗](https://basarat.gitbook.io/typescript/type-system#generics)

泛型在我的理解看来，有点类似 JavaScript 中的变量，通过泛型能够获取到类型，并且将这个类型传递。

```tsx
function reverse<T>(items: T[]): T[] {
  var toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}
```

这个例子拿到了传入数组的类型 `: T[]`，并将结果也限制为 `: T[]` 。这样我们就不能对转换后的数组随意操作，如下，

```tsx
var sample = [1, 2, 3];
var reversed = reverse(sample);
reversed[0] = "1"; // Error!
reversed = ["1", "2"]; // Error!
```

# Union Type（联合类型）

顾名思义，这个类型是将多个类型联合起来，使用方式是 `|` ，例如 `string | number` 。同样它也可以联合常量，比如 `'a' | 'b'` 。

# Intersection Type（交叉类型）

交叉类型可以把两个 `对象类型` 联合起来，使新的类型具有两者所有的类型，简单理解就是取并集。有趣的是，当两个对象中的存在相同属性，且类型不一致时，得到的结果是 `never` ，

```tsx
type objA = {
  a: number;
  b: number;
};

type objB = {
  b: string;
};

type objC = objA & objB;

const asdfa: objC = {
  a: 2,
  b: "3", // (property) b: never
};
```

# Tuple Type（元组类型）

JavaScript 中不支持元组，我们通常使用数组来表示元组，但是即使通过 `const` 声明了一个数组，这个数组的长度和各个下标的值也可以随意被更改。TypeScript 支持了元组，可以使用 `:[typeofmember1, typeofmember2]` 来标注，

```tsx
var nameNumber: [string, number];

// Okay
nameNumber = ["Jenny", 8675309];

// Error!
nameNumber = ["Jenny", "867-5309"];
```

但是，我们依然可以通过 `push()` 等方法来增减数组长度，这个时候我们就要使用 `: readonly [typeofmember1, typeofmemeber2]` 来做限制。 `readonly` 限制了这些方法的使用。

# Type Alias（类型别名）

类型别名提供了给自定义类型起别名的能力，语法为 `type SomeName = someValidTypeAnnotation` 。

> Unlike an `interface` you can give a type alias to literally any type annotation (useful for stuff like union and intersection types).

那我们什么时候使用 `interface` ，什么时候使用 `type alias` 呢？

> TIP: If you need to have hierarchies(层级) of Type annotations use an `interface`. They can be used with `implements` and `extends`
>
> TIP: Use a type alias for simpler object structures (like `Coordinates`) just to give them a semantic name. Also when you want to give semantic names to Union or Intersection types, a Type alias is the way to go.
