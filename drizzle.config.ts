import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./data/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL || "",
  },
});
