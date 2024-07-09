import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";
import * as dotenv from "dotenv";
dotenv.config();

let db: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

try {
  pg = postgres(process.env.DB_URL || "", { max: 1 });
  db = drizzle(pg, { schema });

  if (!db) throw new Error("Database not initialized");
} catch (error) {
  console.log(error);
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
