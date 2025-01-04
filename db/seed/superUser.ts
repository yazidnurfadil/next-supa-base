import { eq, and, sql } from "drizzle-orm";

import { db } from "../db";
import {
  usersInAuth as users,
  accountsInBasejump as accounts,
  accountUserInBasejump as accountUsers,
} from "../schema";

export async function seedSuperUser() {
  try {
    // Create super user
    const [superUser] = await db
      .insert(users)
      .values({
        emailChange: "",
        recoveryToken: "",
        aud: "authenticated",
        role: "authenticated",
        confirmationToken: "",
        emailChangeTokenNew: "",
        email: "super@example.com",
        id: sql`uuid_generate_v4()`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastSignInAt: new Date().toISOString(),
        recoverySentAt: new Date().toISOString(),
        emailConfirmedAt: new Date().toISOString(),
        instanceId: "00000000-0000-0000-0000-000000000000",
        encryptedPassword: sql`crypt('superpassword123', gen_salt('bf'))`,
        rawAppMetaData: {
          provider: "email",
          providers: ["email"],
        },
        rawUserMetaData: {
          phone: "08000000000",
          avatar: "samples/man-portrait",
        },
      })
      .returning();

    const superUserAccount = await db.query.accounts.findFirst({
      where: eq(accounts.primaryOwnerUserId, superUser.id),
    });

    if (!superUserAccount) {
      throw new Error("Super user account not found!");
    }
    // Update account role to super
    await db
      .update(accountUsers)
      .set({
        accountRole: "super",
      })
      .where(
        and(
          eq(accountUsers.userId, superUser.id),
          eq(accountUsers.accountId, superUserAccount.id)
        )
      );

    console.log("[\x1b[33m%s\x1b[0m]", "✓", "Super user created successfully!");
  } catch (error) {
    console.error("Error creating super user:", error);

    throw error;
  }
}
