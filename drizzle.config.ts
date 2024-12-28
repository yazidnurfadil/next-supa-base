import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" }); // or .env.local

export default defineConfig({
  dialect: "postgresql",
  out: "./db/migrations",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: ["public", "auth", "basejump", "next_auth", "business"],
});
