import { sql } from "@vercel/postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";

let db: PostgresJsDatabase<typeof schema>;

try {
  db = drizzle(sql, { schema });
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
    process.exit(1);
  } else {
    // If for any reason something else was
    // thrown that wasn't an Error, handle it
    console.error("❌ An unexpected error occurred:", error);
    process.exit(1); // Exits the process with a failure code
  }
}

export { db };
