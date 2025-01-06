import { eq, sql } from "drizzle-orm";

import { forEach } from "lodash-es";

import { createDrizzleSupabaseImpersonate } from "@/db/utils/helper";

import { db } from "../db";
import {
  usersInAuth as users,
  accountsInBasejump as account,
  identitiesInAuth as identities,
} from "../schema";

// Create specific business accounts
export const specificBusinesses = [
  {
    image: "cld-sample-5",
    phone: "089999999909",
    businessSlug: "my-garment",
    userEmail: "user1@example.com",
    businessName: "Garment Production",
  },
  {
    image: "cld-sample-4",
    phone: "089999999908",
    businessSlug: "my-tees",
    userEmail: "user2@example.com",
    businessName: "Tees Production",
  },

  {
    image: "cld-sample-3",
    phone: "089999999907",
    userEmail: "user3@example.com",
    businessName: "Amc Production",
    businessSlug: "amc-production",
  },
  {
    image: "cld-sample-2",
    phone: "089999999906",
    userEmail: "user4@example.com",
    businessName: "Bmx Production",
    businessSlug: "bmx-production",
  },
];

export async function seedBusiness() {
  try {
    const baseUsers = Array.from({ length: 20 }, (_, i) => {
      return {
        emailChange: "",
        recoveryToken: "",
        rawUserMetaData: {},
        aud: "authenticated",
        role: "authenticated",
        confirmationToken: "",
        emailChangeTokenNew: "",
        id: sql`uuid_generate_v4()`,
        email: `user${i + 1}@example.com`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastSignInAt: new Date().toISOString(),
        recoverySentAt: new Date().toISOString(),
        emailConfirmedAt: new Date().toISOString(),
        instanceId: "00000000-0000-0000-0000-000000000000",
        rawAppMetaData: { provider: "email", providers: ["email"] },
        encryptedPassword: sql`crypt('password123', gen_salt('bf'))`,
      };
    });

    // Insert users
    const insertedUsers = await db.insert(users).values(baseUsers).returning();

    forEach(insertedUsers, async (user, i) => {
      await db
        .update(account)
        .set({
          publicMetadata: {
            image: "cld-sample",
            phone: "08912345678" + i,
          },
        })
        .where(eq(account.primaryOwnerUserId, user.id));
    });

    // Create identities for each user except super user
    const identitiesData = insertedUsers.map((user) => ({
      userId: user.id,
      provider: "email",
      providerId: user.id,
      id: sql`uuid_generate_v4()`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastSignInAt: new Date().toISOString(),
      identityData: {
        sub: user.id,
        email: user.email,
      },
    }));
    await db.insert(identities).values(identitiesData);
    console.log("[\x1b[33m%s\x1b[0m]", "✓", "Dummy users seeded successfully!");

    // Create business accounts for users 5-20
    for (let i = 5; i <= 20; i++) {
      const user = insertedUsers.find(
        (u) => u.email === `user${i}@example.com`
      )!;

      const accountResult = await createAccount(
        `Production User ${i}`,
        `business-user-${i}`,
        user.email!
      );

      await db
        .update(account)
        .set({
          publicMetadata: {
            business_image: "cld-sample-4",
            business_phone: `08888888880${i}`,
          },
        })
        .where(eq(account.id, accountResult.accountId));
    }

    for (const business of specificBusinesses) {
      const user = insertedUsers.find((u) => u.email === business.userEmail);
      if (!user) continue;
      const accountResult = await createAccount(
        business.businessName,
        business.businessSlug,
        user.email!
      );
      await db
        .update(account)
        .set({
          publicMetadata: {
            business_image: business.image,
            business_phone: business.phone,
          },
        })
        .where(eq(account.id, accountResult.accountId));
    }
    console.log(
      "[\x1b[33m%s\x1b[0m]",
      "✓",
      "Dummy businesses seeded successfully!"
    );
  } catch (error) {
    console.error("Error seeding businesses:", error);
    throw error;
  }
}

async function createAccount(
  name: string,
  slug: string,
  ownerEmail: string
): Promise<{ accountId: string }> {
  try {
    const clientAsUser = await createDrizzleSupabaseImpersonate(ownerEmail, db);

    const result = await clientAsUser((tx) => {
      return tx
        .insert(account)
        .values({
          name,
          slug,
        })
        .returning({ accountId: account.id });
    });
    return { accountId: result[0].accountId };
  } catch (_error) {
    return { accountId: "" };
  }
}
