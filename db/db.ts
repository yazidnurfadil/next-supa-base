import { config } from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";

config({ path: ".env.local" }); // or .env.local

const postgresClient = postgres(process.env.DATABASE_URL!);
const {
  accountsInBasejump: accounts,
  accountUserInBasejump: accountUsers,
  ...restSchemas
} = schema;

export const db = drizzle({
  client: postgresClient,
  schema: {
    accounts,
    accountUsers,
    ...restSchemas,
  },
});

export type DB = typeof db;
