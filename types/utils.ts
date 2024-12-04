export enum Sort {
  ASC = "ASC",
  DESC = "DESC",
}

export enum Theme {
  Dark = "dark",
  Light = "light",
}

export type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<K & string>]: T[K] extends object
    ? KeysToCamelCase<T[K]>
    : T[K];
};

export type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;
