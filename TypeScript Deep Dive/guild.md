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

# @types

这里首先介绍了仓库 [Definitely Types](https://github.com/DefinitelyTyped/DefinitelyTyped)，社区目前包含了近 90% 的头部 JavaScript 项目的类型定义。比如我们熟悉的 `[@types/react](https://www.npmjs.com/package/@types/react)` （React 的类型定义）就在这个社区中。 `@types` 包含了全局和模块的类型定义。

## Global `@types`

默认情况下，任何全局使用的类型声明，TypeScript 都默认支持。

## Module `@types`

在安装类型定义后，不需要特殊的配置，我们可以直接通过模块的方式引用库去使用，例如

```tsx
import react from "react";
```

当我们在引入库的时候就自动引入了对应的类型定义文件。

- [ ] 原理

## Controlling Globals

上面我们提到，全局的类型声明默认都会被使用，我们可以通过在 `tsconfig.json` 中提供参数去限制它，

```json
{
  "compilerOptions": {
    "types": ["jquery"]
  }
}
```

通过上述配置，我们现在只能使用 `jquery` 的定义。

# Ambient Declarations（环境声明）

在本书刚开始我们就提到，

> A major design goal of TypeScript was to make it possible for you to safely and easily use existing JavaScript libraries in TypeScript. TypeScript does this by means of _declaration_.

TypeScript 的设计目标之一就是让我们能够在 TypeScript 中简单安全地使用现有的 JavaScript 库。TypeScript 使用声明文件来达成它。

## Declaration Files

你可以通过 `declare` 关键字告诉 TypeScript 你在描述其他地方已经存在的 JavaScript 代码。

```json
foo = 123; // Error: `foo` is not defined

// then
declare var foo: any;
foo = 123; // allowed
```

除了在 `.ts` 文件中声明，你也可以在 `.d.ts` 中声明。在 `.d.ts` 扩展声明文件中，根级别的类型定义必须以 `declare` 关键字开头。这有利于让开发者清楚的知道，在这里 TypeScript 将不会把它编译成任何代码，同时开发者需要确保这些在编译时存在。

- Ambient declarations is a promise that you are making with the compiler. If these do not exist at runtime and you try to use them, things will break without warning.
- Ambient declarations are like docs. If the source changes the docs need to be kept updated. So you might have new behaviours that work at runtime but no one's updated the ambient declaration and hence you get compiler errors.

## Variables

我们可以给变量声明一个可扩展的类型定义，如

```json
interface Process {
    exit(code?: number): void;
}
declare var process: Process;
```

我们利用 `interface` 创建一个类型 `Process` 传给变量 `process` ，当之后需要扩展定义时，只需要修改 `Process` 内的值。

# Interfaces

Interfaces 对 JS 运行时的影响为 0。Interfaces 是开放式的，这是 TypeScript 的一个重要原则，即允许你使用 interfaces 模仿 JavaScript 的可扩展性。

```json
interface xa {
  a: number;
}

interface xa {
  b: string;
}

const objA: xa = {
  a: 1,
  b: '2',
}
```

例如在上述例子中我们重复声明了一次 `xa` ，最后的变量 `objA` 同时具备了 `a` 和 `b` 两个属性的类型。

# Enums

枚举是一种组织相关值集合的方法。如下，

```json
enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Spades
}

// Sample usage
var card = CardSuit.Clubs;

// Safety
card = "not a member of card suit"; // Error : string is not assignable to type `CardSuit`
```

枚举的值，比如这里的 `CardSuit.Clubs` 默认为数字，我们称之为 `数字枚举` 。

## Number Enums and Strings

在深入枚举之前，我们先来看一下枚举是怎么生成 JavaScript 的。

```tsx
// TypeScript Enum
enum Tristate {
  False,
  True,
  Unknown,
}

// Generated JavaScript
var Tristate;
(function (Tristate) {
  Tristate[(Tristate["False"] = 0)] = "False";
  Tristate[(Tristate["True"] = 1)] = "True";
  Tristate[(Tristate["Unknown"] = 2)] = "Unknown";
})(Tristate || (Tristate = {}));
```

我们重点看这里， `Tristate[Tristate["False"] = 0] = "False"` 。

首先 `Tristate["False"] = 0` 将 `False` 字段的值设为 0，同时该表达式返回右侧的值 `0` ，这条语句就变成了 `Tristate[0] = "False"` 。结果就是我们得到了一个 `key` 和 `value` 之间双重映射的对象。

```tsx
[0]); // "False"
console.log(Tristate["False"]); // 0
```

## Changing the number associated with a Number Enum

默认情况下，枚举的值从 `0` 开始，并依次加 `1` 。我们可以手动给枚举的字段设置一个数字，这样就会从该数字开始，依次递增。

```tsx
// 默认的枚举值
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}

// 手动赋予枚举值
enum Color {
  DarkRed = 3, // 3
  DarkGreen, // 4
  DarkBlue, // 5
}
```

## Number Enums as flags

枚举的一大好处是可以用作 `Flags` ，它可以从一组条件中检查某个条件是否为 true，并且一个变量可以同时符合多个条件。

具体案例见链接 [https://basarat.gitbook.io/typescript/type-system/enums#number-enums-as-flags](https://basarat.gitbook.io/typescript/type-system/enums#number-enums-as-flags)。

## String Enums

枚举的值除了数字，还可以是字符串。使用字符串作为枚举值可以使值更富有意义，并且方便 debug。

```tsx
export enum EvidenceTypeEnum {
  UNKNOWN = "",
  PASSPORT_VISA = "passport_visa",
  PASSPORT = "passport",
}
```

## Const Enums

我们在上面提到过，枚举实际会生成一个 `key` 和 `value` 双向映射的对象，即 `key: value` `value: key` 。我们在 JavaScript 使用时也需要通过 `obj.aKey` 这种方式来获取枚举值。考虑这样一种情况，

```tsx
enum Tristate {
  False,
  True,
  Unknown,
}

var lie = Tristate.False;
```

在 JavaScript 中，我们需要再次访问 `Tristate.False` 来获取 `False` 的值 `0` 。这样过于繁琐且没有必要，这时我们可以使用 `const enum` 来获得性能提升，即不生成一个对象，直接替换值。上边的例子在使用 `const enum` 之后的结果如下，

```tsx
// const enum
const enum Tristate {
  False,
  True,
  Unknown,
}

var lie = Tristate.False;

// Generated JavaScript
var lie = 0;
```

当然，我们有时既希望直接替换变量的值，同时也希望保留生成的映射对象，比如这里的 `Tristate` 。我们可以使用编译标签 `--preserveConstEnums` 来达到目的。

## Enum With static functions

TypeScript 提供了 `namespace` 去给一个枚举提供一个静态方法，如下，

```tsx
enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
namespace Weekday {
  export function isBusinessDay(day: Weekday) {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return false;
      default:
        return true;
    }
  }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;
console.log(Weekday.isBusinessDay(mon)); // true
console.log(Weekday.isBusinessDay(sun)); // false
```

我们为枚举 `Weekday` 增加了一个静态方法 `isBusinessDay` 。通过调用 `Weekday.isBusinessDay` 可以很方便地得知某天是否是工作日。

## Enums are open ended

枚举是可扩展的，我们上边提到了枚举的生成函数，这里在贴一下，

```tsx
var Tristate;
(function (Tristate) {
  Tristate[(Tristate["False"] = 0)] = "False";
  Tristate[(Tristate["True"] = 1)] = "True";
  Tristate[(Tristate["Unknown"] = 2)] = "Unknown";
})(Tristate || (Tristate = {}));
```

注意最后的传参 `(Tristate || (Tristate = {})` 。这里首先会从全局找是否有定义过的 `Tristate` ，如果有直接复用，没有的话初始化为一个空对象 `{}` 。这样就很好理解枚举的可扩展性了。举例来说，如果我们同时定义了两个相同名称的枚举，如下，

```tsx
// TypeScript
enum Color {
  Red,
  Green,
  Blue,
}

enum Color {
  DarkRed = 3,
  DarkGreen,
  DarkBlue,
}

// Generated JavaScript
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Green"] = 1)] = "Green";
  Color[(Color["Blue"] = 2)] = "Blue";
})(Color || (Color = {}));

var Color;
(function (Color) {
  Color[(Color["DarkRed"] = 3)] = "DarkRed";
  Color[(Color["DarkGreen"] = 4)] = "DarkGreen";
  Color[(Color["DarkBlue"] = 5)] = "DarkBlue";
})(Color || (Color = {}));
```

生成的对象 `Color` 同时包含了两个枚举的映射关系。

需要注意的是，第二个枚举第一个成员是 `DarkRed = 3` ，即从 3 开始，依次递增。这是为了不和第一个枚举定义的成员冲突。如果不这样做，TypeScript 会提示你（error message `In an enum with multiple declarations, only one declaration can omit an initializer for its first enum element.`）

## lib.d.ts [🔗](https://basarat.gitbook.io/typescript/type-system/lib.d.ts#lib.d.ts)

每次安装 TypeScript 时都会附带一个特殊的声明文件 `lib.d.ts` 。此文件包含 JavaScript 运行时和 DOM 中存在的各种常见 JavaScript 构造的环境声明。

```tsx
var foo = 123;
var bar = foo.toString();
```

上述代码可以通过类型校验是因为 `toString` 这个方法已经在 `lib.d.ts` 中定义过了。如果我们在编译时命令行添加 `--noLib` 或者在 `tsconfig.json` 中添加 `"noLib": true` ，代码就无法通过。

我们前面说过， `interface` 是开放式的，意味着我们可以为 `lib.d.ts` 中定义的 interface 添加属性。（注意：需要确保在一个全局模块，例如 `global.d.ts` 中，改变 interface）。

```tsx
interface Window {
  helloWorld(): void;
}
```

这样我们可以调用 `Window.helloWorld` 并可以通过类型校验了。

出于可维护性的原因，我们推荐创建一个 `global.d.ts` 声明文件。当然，也可以通过在一个文件中使用 `declare global { /*global namespace here*/ }` 来进入全局命名空间。[一个例子](https://basarat.gitbook.io/typescript/type-system/lib.d.ts#example-string-redux)

### 使用你自己的 lib.d.ts

`--noLib` 在以下情况下非常有用：

- 你正在一个定制的 JavaScript 环境中运行，该环境与基于标准浏览器的运行时环境有很大不同。
- 你希望严格控制代码中可用的全局变量。例如。 lib.d.ts 将 item 定义为全局变量，您不希望它泄漏到您的代码中。

### target: es6

当我们在 `tsconfig.json` 中把 `target` 设为 `es6` 时， `lib.d.ts` 就会多出有关于 `es6` 的环境声明，例如 `Promise` 。如果你想更加精细地控制环境，可以使用 `--lib` 选项。

如果想要生成的代码为 `es5` ，却依旧想使用 `es6` 的语法，我们可以指定 lib 为 `['dom', 'es6]` 。

```tsx
// 命令行
tsc --target es5 --lib dom,es6
// tsconfig.json
"compilerOptions": {
    "lib": ["dom", "es6"]
}
```

具体支持的内容可以见[链接](https://basarat.gitbook.io/typescript/type-system/lib.d.ts#lib-option)。

一个典型的配置如下，

```tsx
"compilerOptions": {
    "target": "es5",
    "lib": ["es6", "dom"]
}
```

一些新的特性在旧版本中不支持，比如 es6 的 Promise 在 es5 中不支持，这时候我们就需要 `Polyfill` 。方式如下，

```tsx
// 1. 安装 core-js
npm install core-js --save-dev
// 2. 在应用全局入口中引入
import "core-js"
```

## Functions [🔗](https://basarat.gitbook.io/typescript/type-system/functions)

Functions 这一小节讲了四点，

- Parameter Annotations
- Return Type Annotation
- Optional Parameters
- Overloading
- Declaring Functions

前三点都比较简单，只看最后亮点。

### Overloading（重载）

一点 Overloading。教程给出的例子如下，

```tsx
// Overloads
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
// Actual implementation that is a true representation of all the cases the function body needs to handle
function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d,
  };
}

// use
padding(1); // Okay: all
padding(1, 1); // Okay: topAndBottom, leftAndRight
padding(1, 1, 1, 1); // Okay: top, right, bottom, left

padding(1, 1, 1); // Error: Not a part of the available overloads
```

首先看 `padding` 这个函数，根据函数体的判断，我们可以知道函数允许的传入参数的个数分别为为 `1` 、 `2`、 `4` 个，但是除了第一个参数 `a` 之外，其他参数都是可选的（Optional Parameters），也就是我们可以传入三个参数。

此时，我们可以通过函数重载的方式限定函数传入参数的类型，上面这个例子，我们通过重载限定了传入参数是 1、2、4 个。所以我们通过 `padding(1,1,1)` 调用时就会报错，提示 `Not a part of the available overloads` 。

注意，前三次我们只是声明了函数头。而第四次声明包含了函数体，这次声明函数头的参数声明并不对外（只是函数内使用）。但是需要注意，这里的第四次声明一定是兼容前面的函数重载的，因为它才是真实调用的函数。

> Function overloading in TypeScript doesn't come with any runtime overhead. It just allows you to document the manner you expect the function to be called in and the compiler holds the rest of your code in check.

函数重载不会在运行时生成任何东西，只是允许你记录函数调用的限制，并通过编译器去检查。

### Declaring Functions

TypeScript 提供了两种方式在不提供实现的情况下声明一个函数的类型。

```tsx
type LongHand = {
  (a: number): number;
};

// 类似于箭头函数
type ShortHand = (a: number) => number;
```

上边这两种声明是完全等价的。不过当你想添加重载时，通过第一种方式很方便实现，

```tsx
type LongHandAllowsOverloadDeclarations = {
  (a: number): number;
  (a: string): string;
};
```

## Callable（可调用的） [🔗](https://basarat.gitbook.io/typescript/type-system/callable)

这一小节和上一节的重载是关联的。我们除了可以使用类型别名（上一节 Declaring Functions）来表示一个可被调用的类型注解外，还可以使用 interface。

```tsx
interface ReturnString {
  (): string;
}

declare const foo: ReturnString;

const bar = foo(); // bar 被推断为一个字符串。
```

同样的，它也和类型别名一样支持重载，

```tsx
interface Overloaded {
  (foo: string): string;
  (foo: number): number;
}
```

### Arrow Syntax

TypeScript 还提供了一种简便的声明可调用类型的方式——箭头函数。

```tsx
const simple: (foo: number) => string = (foo) => foo.toString();
```

### Newable

我们可以通过添加前缀 `new` 来声明一个可实例化的调用，示例如下，

```tsx
interface CallMeWithNewToGetString {
  new (): string;
}
// Usage
declare const Foo: CallMeWithNewToGetString;
const bar = new Foo(); // bar is inferred to be of type string
```

## Type Assertion（类型断言） [🔗](https://basarat.gitbook.io/typescript/type-system/type-assertion)

TypeScript 允许我们通过 `类型断言` 来覆盖它自身的类型推断。这说明你比编辑器更加清楚这个类型，并且它不应该报错。一个典型的应用场景是将 JavaScript 重构为 TypeScript 时，示例如下，

```tsx
// 默认情况下，因为 foo 在初始化时是一个空的字面量对象，不包含 bar、bas 属性，所以 TS 报错
var foo = {};
foo.bar = 123; // Error: property 'bar' does not exist on `{}`
foo.bas = "hello"; // Error: property 'bas' does not exist on `{}`

// 通过类型断言后，foo 被断言为 Foo 类型，可以正常添加属性。
interface Foo {
  bar: number;
  bas: string;
}
var foo = {} as Foo;
foo.bar = 123;
foo.bas = "hello";
```

类型断言有两种方式（[variable] 只某个变量）：

- [variable] as foo
- <foo>[variable]

由于第二种方式在 `JSX` 中使用时可能会被识别为 DOM 元素，所以通常情况下推荐第一种写法。

类型断言表明它只是编译时语法，不会转换为运行时的代码，所以它不叫类型转换（Casting），以免造成误解。

### Assertion considered harmful

类型断言是有害的。以上面的例子来说，因为你可能会忘记实际去给 `foo` 这个对象添加某个属性，但是可能之后又使用了这个属性（因为定义了 `Foo` 类型，编译器会提示如 `[foo.bar](http://foo.bar)` `foo.bas` 等属性），这样虽然在编译时不会报错，但是实际运行就报错了。

当然，我们可以直接在创建字面量对象时为其定义类型，这样就保证类型定义与实际的统一。

```tsx
interface Foo {
  bar: number;
  bas: string;
}
var foo: Foo = {
  // the compiler will provide autocomplete for properties of Foo
};
```

### Double assertion

类型断言并安全，但在某些情况下还有有用的，比如，

```tsx
function handler(event: Event) {
  const mouseEvent = event as MouseEvent;
}
```

当我们了解传入参数 `event` 更具体的类型 `MouseEvent` ，我们可以直接断言为这个类型。

类型断言是有限制条件的。当  `S` 类型是  `T`  类型的子集，或者  `T`  类型是  `S`  类型的子集时，`S`  能被成功断言成  `T`。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用  `any`。

## Freshness [🔗](https://basarat.gitbook.io/typescript/type-system/freshness)

Freshness 直译过来是 `新鲜` 的意思。TypeScript 为了让检查对象字面量类型更容易，提供了 `Freshness` 的概念（也被称为更严格的对象字面量检查）来确保对象字面量在结构上兼容。

结构类型（structural typing）的方便之处在于可以很方便的把 JavaScript 迁移到 TypeScript，

```tsx
function logName(something: { name: string }) {
  console.log(something.name);
}

var person = { name: "matt", job: "being awesome" };
var animal = { name: "cow", diet: "vegan, but has milk of own species" };
var random = { note: `I don't have a name property` };

logName(person); // okay
logName(animal); // okay
logName(random); // Error: property `name` is missing
```

这个例子里，虽然传入 `logName` 方法的 `person` 和 `animal` 对象除了方法定义的 `name` 属性外，还多了其他属性，但是依旧是兼容的，TS 不会报错。当然，如果没有传入 `name` 属性，如 `random` 对象，还是回报错的。

当然，它也有一个缺点是，会让我们误以为方法能够接受更多实际上不存在的属性。当我们直接在该方法传入 `对象字面量` 时，TypeScript 就会报错，

```tsx
function logName(something: { name: string }) {
  console.log(something.name);
}

logName({ name: "matt" }); // okay
logName({ name: "matt", job: "being awesome" }); // Error: object literals must only specify known properties. `job` is excessive here.
```

另一个典型场景是与具有可选成员的接口一起使用，对象字面量检查能够有效的避免输入拼写错误的单词，

```tsx
function logIfHasName(something: { name?: string }) {
  if (something.name) {
    console.log(something.name);
  }
}
var person = { name: "matt", job: "being awesome" };
var animal = { name: "cow", diet: "vegan, but has milk of own species" };

logIfHasName(person); // okay
logIfHasName(animal); // okay
logIfHasName({ neme: "I just misspelled name to neme" }); // Error: object literals must only specify known properties. `neme` is excessive here.
```

### Allowing extra properties（允许额外的参数）

一个类型能够包含索引签名，以明确表明可以使用额外的属性，

```tsx
var x: { foo: number; [x: string]: unknown };
x = { foo: 1, baz: 2 }; // Ok, `baz` matched by index signature
```
