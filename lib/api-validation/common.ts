import vine from "@vinejs/vine";
import { FieldContext } from "@vinejs/vine/types";

import { phoneRegExp } from "@/lib/validations";
const phoneNumberRule = (
  value: unknown,
  _options: undefined,
  field: FieldContext
) => {
  if (typeof value !== "string") {
    return;
  }
  if (!phoneRegExp.test(value)) {
    field.report("Nomor telepon tidak sesuai", "phone", field);
  }
};
export const phone = vine.createRule(phoneNumberRule);
