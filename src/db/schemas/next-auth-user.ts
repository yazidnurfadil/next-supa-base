import { sql } from "drizzle-orm/sql";
import { text, uuid, pgTable, pgPolicy, foreignKey } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    name: text(),
    email: text(),
    image: text(),
    id: uuid().primaryKey().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      name: "users_id_fkey",
      foreignColumns: [table.id],
    }).onDelete("cascade"),
    pgPolicy("Can update own user data.", {
      for: "update",
      to: ["public"],
      as: "permissive",
      using: sql`(next_auth.uid() = id)`,
    }),
    pgPolicy("Can view own user data.", {
      for: "select",
      to: ["public"],
      as: "permissive",
    }),
  ]
);
