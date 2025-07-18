import type { KeysToCamelCase } from "@/types/utils";

import { Database } from "./database.types";

export type Business = {} & KeysToCamelCase<BusinessRow>;

export type BusinessRes = KeysToCamelCase<BusinessSerialized>;

export type BusinessSerialized = Pick<
  BusinessRow,
  "created_at" | "updated_at" | "name" | "slug" | "id"
>;

export type BusinessRow = Database["basejump"]["Tables"]["accounts"]["Row"] & {
  account_id: Database["basejump"]["Tables"]["accounts"]["Row"]["id"];
};
