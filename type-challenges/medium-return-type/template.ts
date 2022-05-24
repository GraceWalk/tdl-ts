type MyReturnType<T> = T extends (...args: any[]) => infer Return
  ? Return
  : never;
