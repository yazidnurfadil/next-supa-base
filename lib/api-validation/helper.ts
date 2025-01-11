import { SchemaTypes } from "@vinejs/vine/types";
import vine, { VineObject, BaseLiteralType } from "@vinejs/vine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cloneOptional = (schema: VineObject<any, any, any, any>) => {
  const clonedSchema: Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BaseLiteralType<any, any, any>
  > = {
    ...schema.getProperties(),
  };
  const schemaKeys = Object.keys(clonedSchema);
  const fixedSchema = schemaKeys.reduce(
    (acc, key) => {
      acc[key] = clonedSchema[key].optional();
      return acc;
    },
    {} as Record<string, SchemaTypes>
  );
  return vine.object(fixedSchema);
};
