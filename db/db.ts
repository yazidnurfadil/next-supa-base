import { config } from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import {
  usersInAuth as users,
  accountsInBasejump as accounts,
  accountUserInBasejump as accountUsers,
} from "./schema";

config({ path: ".env.local" }); // or .env.local

const postgresClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle({
  client: postgresClient,
  schema: {
    users,
    accounts,
    accountUsers,
  },
});

export type DB = typeof db;
