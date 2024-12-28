import { sql } from "drizzle-orm/sql";
import {
  text,
  uuid,
  jsonb,
  pgView,
  boolean,
  pgSchema,
  timestamp,
} from "drizzle-orm/pg-core";

const businessSchemaName = "business";
export const businessSchema = pgSchema(businessSchemaName);
export const businessAccounts = pgView("business_accounts", {
  id: uuid(),
  name: text(),
  slug: text(),
  metadata: jsonb(),
  isOwner: boolean("is_owner"),
  personalAccount: boolean("personal_account"),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
  updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
}).as(
  sql`WITH create_accounts_json AS ( SELECT get_accounts() AS account_arr ) SELECT accounts.account_id AS id, accounts.is_primary_owner AS is_owner, accounts.personal_account, a.name, a.slug, a.created_at, a.updated_at, a.public_metadata AS metadata FROM create_accounts_json CROSS JOIN LATERAL json_to_recordset(create_accounts_json.account_arr) accounts(account_id uuid, is_primary_owner boolean, personal_account boolean) JOIN basejump.accounts a ON a.id = accounts.account_id WHERE accounts.personal_account = false`
);
