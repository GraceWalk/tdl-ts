type MyAwaited<T extends Promise<any>> = T extends Promise<infer K>
  ? K extends Promise<any>
    ? MyAwaited<K>
    : K
  : never;
