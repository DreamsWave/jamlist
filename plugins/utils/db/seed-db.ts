/**
 * The Drizzle ORM seed function with using PostgresJS driver
 * The script can be run with the next command: `pnpm db:seed`
 *
 */

import { generateSongs } from "@/server/actions/generate";

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
