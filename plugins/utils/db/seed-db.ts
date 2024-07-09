/**
 * The Drizzle ORM seed function with using PostgresJS driver
 * The script can be run with the next command: `pnpm db:seed`
 *
 */

import { generateSongs } from "@/server/actions/generate";
import * as dotenv from "dotenv";
dotenv.config();

if (!("DB_URL" in process.env))
  throw new Error("DB_URL not found on .env.development");

const SONGS_COUNT = 100;

async function seed() {
  console.log("🚀 Starting seed...");
  const newSongs = await generateSongs({ count: SONGS_COUNT });
}

seed()
  .catch((err) => {
    console.error("🚨 Seed failed! Error:", err);
    process.exit(1);
  })
  .finally(() => {
    console.log(" ✓ Seed complete!");
    process.exit(0);
  });
