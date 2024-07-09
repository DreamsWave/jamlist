import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.development" });

if (!("DB_URL" in process.env))
  throw new Error("DB_URL not found on .env.development");

export default defineConfig({
  schema: "./data/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL || "",
  },
});
