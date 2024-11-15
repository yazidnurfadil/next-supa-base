import { camelCase } from "lodash-es";

import type { KeysToCamelCase } from "@/types/utils";

export function objKeyCamelCase<T>(obj: T): KeysToCamelCase<T> {
  if (Array.isArray(obj)) {
    return obj.map((v) => objKeyCamelCase(v)) as KeysToCamelCase<T>;
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: objKeyCamelCase(obj[key as keyof T]),
      }),
      {}
    ) as KeysToCamelCase<T>;
  }
  return obj as KeysToCamelCase<T>;
}
