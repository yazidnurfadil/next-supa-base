import { sql } from "drizzle-orm/sql";
import {
  text,
  uuid,
  jsonb,
  check,
  unique,
  boolean,
  integer,
  pgSchema,
  pgPolicy,
  timestamp,
  foreignKey,
  primaryKey,
} from "drizzle-orm/pg-core";

import { usersInAuth } from "@/db/schemas/auth";

// Create basejump schema
const basejumpSchemaName = "basejump";
export const basejumpSchema = pgSchema(basejumpSchemaName);

export const accountRoleInBasejump = basejumpSchema.enum("account_role", [
  "super",
  "owner",
  "member",
]);

export const invitationTypeInBasejump = basejumpSchema.enum("invitation_type", [
  "one_time",
  "24_hour",
]);

export const subscriptionStatusInBasejump = basejumpSchema.enum(
  "subscription_status",
  [
    "trialing",
    "active",
    "canceled",
    "incomplete",
    "incomplete_expired",
    "past_due",
    "unpaid",
  ]
);

export const configInBasejump = basejumpSchema.table(
  "config",
  {
    billingProvider: text("billing_provider").default("stripe"),
    enableTeamAccounts: boolean("enable_team_accounts").default(true),
    enableTeamAccountBilling: boolean("enable_team_account_billing").default(
      true
    ),
    enablePersonalAccountBilling: boolean(
      "enable_personal_account_billing"
    ).default(true),
  },
  (_table) => [
    pgPolicy("Basejump settings can be read by authenticated users", {
      for: "select",
      as: "permissive",
      using: sql`true`,
      to: ["authenticated"],
    }),
  ]
);

export const accountsInBasejump = basejumpSchema.table(
  "accounts",
  {
    name: text(),
    slug: text(),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    publicMetadata: jsonb("public_metadata").default({}),
    privateMetadata: jsonb("private_metadata").default({}),
    personalAccount: boolean("personal_account").default(false).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    primaryOwnerUserId: uuid("primary_owner_user_id")
      .default(sql`auth.uid()`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      foreignColumns: [usersInAuth.id],
      columns: [table.primaryOwnerUserId],
      name: "accounts_primary_owner_user_id_fkey",
    }),
    foreignKey({
      columns: [table.createdBy],
      foreignColumns: [usersInAuth.id],
      name: "accounts_created_by_fkey",
    }),
    foreignKey({
      columns: [table.updatedBy],
      foreignColumns: [usersInAuth.id],
      name: "accounts_updated_by_fkey",
    }),
    unique("accounts_slug_key").on(table.slug),
    pgPolicy("Any accounts can be deleted by super user", {
      for: "delete",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(basejump.is_super_user(auth.uid()) = true)`,
    }),
    pgPolicy("Any accounts can be updated by super user", {
      for: "update",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(basejump.is_super_user(auth.uid()) = true`,
    }),
    pgPolicy("Any accounts can be created by super user", {
      for: "insert",
      as: "permissive",
      to: ["authenticated"],
      withCheck: sql`(basejump.is_super_user(auth.uid()) = true`,
    }),
    pgPolicy("All accounts are viewable by super users", {
      for: "select",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(basejump.is_super_user(auth.uid()) = true`,
    }),
    pgPolicy("Accounts can be edited by owners", {
      for: "update",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(basejump.has_role_on_account(id, 'owner') = true`,
    }),
    pgPolicy("Team accounts can be created by any user", {
      for: "insert",
      as: "permissive",
      to: ["authenticated"],
      withCheck: sql`(
        basejump.is_set('enable_team_accounts') = true
        and 
        personal_account = false
      )`,
    }),
    pgPolicy("Accounts are viewable by primary owner", {
      for: "select",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(primary_owner_user_id = auth.uid()`,
    }),
    pgPolicy("Accounts are viewable by members", {
      for: "select",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(basejump.has_role_on_account(id) = true)`,
    }),
    check(
      "basejump_accounts_slug_null_if_personal_account_true",
      sql`((personal_account = true) AND (slug IS NULL)) OR ((personal_account = false) AND (slug IS NOT NULL))`
    ),
  ]
);

export const invitationsInBasejump = basejumpSchema.table(
  "invitations",
  {
    accountName: text("account_name"),
    accountId: uuid("account_id").notNull(),
    invitedByUserId: uuid("invited_by_user_id").notNull(),
    accountRole: accountRoleInBasejump("account_role").notNull(),
    invitationType: invitationTypeInBasejump("invitation_type").notNull(),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }),
    token: text()
      .default(sql`basejump.generate_token(30)`)
      .notNull(),
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.accountId],
      name: "invitations_account_id_fkey",
      foreignColumns: [accountsInBasejump.id],
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.invitedByUserId],
      foreignColumns: [usersInAuth.id],
      name: "invitations_invited_by_user_id_fkey",
    }),
    unique("invitations_token_key").on(table.token),
    pgPolicy("Invitations can be deleted by account owners", {
      for: "delete",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(basejump.has_role_on_account(account_id, 'owner'::basejump.account_role) = true)`,
    }),
    pgPolicy("Invitations can be created by account owners", {
      for: "insert",
      as: "permissive",
      to: ["authenticated"],
      withCheck: sql`(
        -- team accounts should be enabled
            basejump.is_set('enable_team_accounts') = true
        -- this should not be a personal account
        and (SELECT personal_account
             FROM basejump.accounts
             WHERE id = account_id) = false
        -- the inserting user should be an owner of the account
        and
        (basejump.has_role_on_account(account_id, 'owner') = true))`,
    }),
    pgPolicy("Invitations viewable by account owners", {
      for: "select",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(
        created_at > (now() - interval '24 hours')
        and
        basejump.has_role_on_account(account_id, 'owner') = true
      )`,
    }),
  ]
);

export const billingCustomersInBasejump = basejumpSchema.table(
  "billing_customers",
  {
    email: text(),
    provider: text(),
    active: boolean(),
    id: text().primaryKey().notNull(),
    accountId: uuid("account_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.accountId],
      foreignColumns: [accountsInBasejump.id],
      name: "billing_customers_account_id_fkey",
    }).onDelete("cascade"),
    pgPolicy("Can only view own billing customer data.", {
      for: "select",
      to: ["public"],
      as: "permissive",
      using: sql`(basejump.has_role_on_account(account_id) = true)`,
    }),
  ]
);

export const billingSubscriptionsInBasejump = basejumpSchema.table(
  "billing_subscriptions",
  {
    provider: text(),
    metadata: jsonb(),
    quantity: integer(),
    priceId: text("price_id"),
    planName: text("plan_name"),
    id: text().primaryKey().notNull(),
    status: subscriptionStatusInBasejump(),
    accountId: uuid("account_id").notNull(),
    cancelAtPeriodEnd: boolean("cancel_at_period_end"),
    billingCustomerId: text("billing_customer_id").notNull(),
    created: timestamp({ mode: "string", withTimezone: true })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    endedAt: timestamp("ended_at", {
      mode: "string",
      withTimezone: true,
    }).default(sql`timezone('utc'::text, now())`),
    cancelAt: timestamp("cancel_at", {
      mode: "string",
      withTimezone: true,
    }).default(sql`timezone('utc'::text, now())`),
    trialEnd: timestamp("trial_end", {
      mode: "string",
      withTimezone: true,
    }).default(sql`timezone('utc'::text, now())`),
    canceledAt: timestamp("canceled_at", {
      mode: "string",
      withTimezone: true,
    }).default(sql`timezone('utc'::text, now())`),
    trialStart: timestamp("trial_start", {
      mode: "string",
      withTimezone: true,
    }).default(sql`timezone('utc'::text, now())`),
    currentPeriodEnd: timestamp("current_period_end", {
      mode: "string",
      withTimezone: true,
    })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    currentPeriodStart: timestamp("current_period_start", {
      mode: "string",
      withTimezone: true,
    })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.accountId],
      foreignColumns: [accountsInBasejump.id],
      name: "billing_subscriptions_account_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.billingCustomerId],
      foreignColumns: [billingCustomersInBasejump.id],
      name: "billing_subscriptions_billing_customer_id_fkey",
    }).onDelete("cascade"),
    pgPolicy("Can only view own billing subscription data.", {
      for: "select",
      to: ["public"],
      as: "permissive",
      using: sql`(basejump.has_role_on_account(account_id) = true)`,
    }),
  ]
);

export const accountUserInBasejump = basejumpSchema.table(
  "account_user",
  {
    userId: uuid("user_id").notNull(),
    accountId: uuid("account_id").notNull(),
    accountRole: accountRoleInBasejump("account_role").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [usersInAuth.id],
      name: "account_user_user_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.accountId],
      name: "account_user_account_id_fkey",
      foreignColumns: [accountsInBasejump.id],
    }).onDelete("cascade"),
    primaryKey({
      name: "account_user_pkey",
      columns: [table.userId, table.accountId],
    }),
    pgPolicy("Account users can be deleted by owners except primary owner", {
      for: "delete",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(
          (basejump.has_role_on_account(account_id, 'owner'::basejump.account_role) = true) 
          OR 
          (basejump.has_role_on_account(account_id, 'super'::basejump.account_role) = true) 
          AND 
          user_id != (SELECT accounts.primary_owner_user_id
                      FROM basejump.accounts
                      WHERE account_user.account_id = accounts.id)
        )`,
    }),
    pgPolicy("Super users can view all accounts", {
      for: "select",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(basejump.is_super_user(auth.uid()) = true)`,
    }),
    pgPolicy("users can view their teammates", {
      for: "select",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(basejump.has_role_on_account(account_id) = true)`,
    }),
    pgPolicy("users can view their own account_users", {
      for: "select",
      as: "permissive",
      to: ["authenticated"],
      using: sql`(user_id = auth.uid())`,
    }),
  ]
);
