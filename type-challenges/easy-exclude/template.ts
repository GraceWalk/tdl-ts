type MyExclude<T, U> = T extends U ? never : T;

type a = string | number | (() => void);

type b = Function extends () => void ? true : false;
