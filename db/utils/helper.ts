import { eq, sql, SQL, ColumnDataType, ColumnBaseConfig } from "drizzle-orm";
import {
  uuid,
  boolean,
  pgPolicy,
  PgPolicy,
  PgColumn,
  PgSelect,
  timestamp,
  ExtraConfigColumn,
} from "drizzle-orm/pg-core";

import {
  accountUserInBasejump as accountUser,
  accountsInBasejump as businessAccount,
} from "@/db/schemas/basejump";

import { type DB } from "../db";
import { usersInAuth as users } from "../schema";
export const createRLSHelpers = (db: DB) => ({
  async enableRLS(tableName: string) {
    await db.execute(sql`
        ALTER TABLE ${sql.identifier(tableName)} ENABLE ROW LEVEL SECURITY;
      `);
  },

  async createReadPolicy(tableName: string, policyName: string, using: string) {
    await db.execute(sql`
        CREATE POLICY ${sql.identifier(policyName)}
        ON ${sql.identifier(tableName)}
        FOR SELECT
        TO authenticated
        USING (${sql.raw(using)});
      `);
  },

  async createWritePolicy(
    tableName: string,
    policyName: string,
    using: string
  ) {
    await db.execute(sql`
        CREATE POLICY ${sql.identifier(policyName)}
        ON ${sql.identifier(tableName)}
        FOR INSERT
        TO authenticated
        WITH CHECK (${sql.raw(using)});
      `);
  },

  async grantTablePermissions(
    tableName: string,
    permissions: string[],
    roles: string[]
  ) {
    const permissionString = permissions.join(", ");
    const roleString = roles.join(", ");

    await db.execute(sql`
        GRANT ${sql.raw(permissionString)} 
        ON ${sql.identifier(tableName)} 
        TO ${sql.raw(roleString)};
      `);
  },
});

export async function createDrizzleSupabaseImpersonate(
  email: string,
  client: DB
) {
  const user = await client
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const appMetaData = (user[0]?.rawAppMetaData as string) ?? "{}";
  const clientWithImpersonation: typeof client.transaction = async (
    transaction,
    ...rest
  ) => {
    return await client.transaction(
      async (tx) => {
        // Supabase exposes auth.uid() and auth.jwt()
        // https://supabase.com/docs/guides/database/postgres/row-level-security#helper-functions
        try {
          await tx.execute(sql`
        -- auth.jwt() '${sql.raw(appMetaData)}'
        select set_config('request.jwt.claims', '${sql.raw(appMetaData)}', TRUE);
        -- auth.uid() '${sql.raw(user[0]?.id)}'
        select set_config('request.jwt.claim.sub', '${sql.raw(user[0]?.id)}', TRUE);												
        -- set local role '${sql.raw(user[0]?.role as string)}'
        set local role ${sql.raw(user[0]?.role as string)};
        `);
          return await transaction(tx);
        } finally {
          await tx.execute(sql`
          -- reset
          select set_config('request.jwt.claims', NULL, TRUE);
          select set_config('request.jwt.claim.sub', NULL, TRUE);
          reset role;
          `);
        }
      },
      ...rest
    );
  };
  return clientWithImpersonation;
}

export const generateGeneralPolicy = (
  policyName: string,
  table: Record<
    string,
    ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>
  >
): PgPolicy[] => {
  return [
    pgPolicy(`Super users can create ${policyName}`, {
      for: "insert",
      as: "permissive",
      to: ["authenticated"],
      withCheck: sql`(basejump.is_super_user(auth.uid()) = true)`,
    }),
    pgPolicy(`Owner can create ${policyName}`, {
      for: "insert",
      as: "permissive",
      to: ["authenticated"],
      withCheck: sql`
        exists (
          select 1 
          from ${accountUser}
          where (
            ${accountUser.userId} = auth.uid() 
            and 
            ${accountUser.accountRole} = 'owner'
          )
        )`,
    }),
    pgPolicy(
      `Super users can delete ${policyName}s and owners can delete their own ${policyName}s`,
      {
        for: "delete",
        as: "permissive",
        to: ["authenticated"],
        using: sql`
          basejump.is_super_user(auth.uid()) = true
          or 
          exists (
            select 1 
            from ${accountUser}
            where (
              ${accountUser.userId} = auth.uid() 
              and 
              ${accountUser.accountRole} = 'owner' 
              and 
              ${accountUser.accountId} = ${table.businessAccountId}
            )
          )
        `,
      }
    ),
    pgPolicy(
      `Super users can update ${policyName}s and owners can update their own ${policyName}s`,
      {
        for: "update",
        as: "permissive",
        to: ["authenticated"],
        using: sql`
          basejump.is_super_user(auth.uid()) = true
          or 
          exists (
            select 1 
            from ${accountUser}
            where (
              ${accountUser.userId} = auth.uid() 
              and 
              ${accountUser.accountRole} = 'owner' 
              and 
              ${accountUser.accountId} = ${table.businessAccountId}
            )
          )
        `,
      }
    ),
    pgPolicy(
      // "Super users can view all customers and owners can view their own customers",
      `Super users can view all ${policyName}s and team members can view their own ${policyName}s`,
      {
        for: "select",
        as: "permissive",
        to: ["authenticated"],
        using: sql`
          basejump.is_super_user(auth.uid()) = true
          or 
          exists (
            select 1 
            from ${accountUser}
            where (
              ${accountUser.userId} = auth.uid() 
              and 
              ${accountUser.accountRole} = 'owner' 
              and 
              ${accountUser.accountId} = ${table.businessAccountId}
            )
          )
        `,
      }
    ),
  ];
};

export const commonColumns = {
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id),
  updatedBy: uuid("updated_by")
    .notNull()
    .references(() => users.id),
  id: uuid()
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  deletedAt: timestamp("deleted_at", {
    mode: "string",
    withTimezone: true,
  }),
  businessAccountId: uuid("business_account_id")
    .notNull()
    .references(() => businessAccount.id),
  updatedAt: timestamp("updated_at", {
    mode: "string",
    withTimezone: true,
  })
    .default(sql`current_timestamp`)
    .defaultNow(),
  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  })
    .default(sql`current_timestamp`)
    .defaultNow(),
};

export const withPagination = <T extends PgSelect>(
  qb: T,
  orderByColumn: SQL.Aliased | PgColumn | SQL,
  page: string | number = 1,
  pageSize: string | number = 15
): T => {
  return qb
    .orderBy(orderByColumn)
    .limit(Number(pageSize))
    .offset((Number(page) - 1) * Number(pageSize));
};
