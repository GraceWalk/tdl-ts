// 方法 1
type First<T extends any[]> = 0 extends T["length"] ? never : T[0];

// 方法 2
type First<T extends any[]> = T extends [infer First, ...infer _rest]
  ? First
  : never;

// 方法 3
type First<T extends any[]> = T extends [] ? never : T[0];
