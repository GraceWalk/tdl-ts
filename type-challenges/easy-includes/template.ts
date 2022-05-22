type IsEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type Includes<T extends readonly any[], U> = T extends [
  infer Item,
  ...infer Rest
]
  ? IsEqual<U, Item> extends true
    ? true
    : Includes<Rest, U>
  : false;
