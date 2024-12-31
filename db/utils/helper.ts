import { eq, sql } from "drizzle-orm";

import type { DB } from "../db";

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
