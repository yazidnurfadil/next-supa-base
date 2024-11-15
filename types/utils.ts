export enum Theme {
  Light = "light",
  Dark = "dark",
}

export enum Sort {
  ASC = "ASC",
  DESC = "DESC",
}

export type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

export type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends object
    ? KeysToCamelCase<T[K]>
    : T[K];
};
