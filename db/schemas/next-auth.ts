import { sql } from "drizzle-orm/sql";
import {
  text,
  uuid,
  unique,
  bigint,
  pgSchema,
  timestamp,
  foreignKey,
} from "drizzle-orm/pg-core";

// Create basejump schema
const nextAuthSchemaName = "next_auth";
export const nextAuthSchema = pgSchema(nextAuthSchemaName);

export const usersInNextAuth = nextAuthSchema.table(
  "users",
  {
    name: text(),
    email: text(),
    image: text(),
    emailVerified: timestamp({ mode: "string", withTimezone: true }),
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
  },
  (table) => [unique("email_unique").on(table.email)]
);

export const sessionsInNextAuth = nextAuthSchema.table(
  "sessions",
  {
    userId: uuid(),
    sessionToken: text().notNull(),
    expires: timestamp({ mode: "string", withTimezone: true }).notNull(),
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      name: "sessions_userId_fkey",
      foreignColumns: [usersInNextAuth.id],
    }).onDelete("cascade"),
    unique("sessiontoken_unique").on(table.sessionToken),
  ]
);

export const accountsInNextAuth = nextAuthSchema.table(
  "accounts",
  {
    scope: text(),
    userId: uuid(),
    type: text().notNull(),
    idToken: text("id_token"),
    provider: text().notNull(),
    tokenType: text("token_type"),
    oauthToken: text("oauth_token"),
    accessToken: text("access_token"),
    providerAccountId: text().notNull(),
    refreshToken: text("refresh_token"),
    sessionState: text("session_state"),
    oauthTokenSecret: text("oauth_token_secret"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    expiresAt: bigint("expires_at", { mode: "number" }),
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      name: "accounts_userId_fkey",
      foreignColumns: [usersInNextAuth.id],
    }).onDelete("cascade"),
    unique("provider_unique").on(table.provider, table.providerAccountId),
  ]
);

export const verificationTokensInNextAuth = nextAuthSchema.table(
  "verification_tokens",
  {
    identifier: text(),
    token: text().primaryKey().notNull(),
    expires: timestamp({ mode: "string", withTimezone: true }).notNull(),
  },
  (table) => [
    unique("token_identifier_unique").on(table.identifier, table.token),
  ]
);
