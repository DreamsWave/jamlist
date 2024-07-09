"use server";

import { revalidatePath } from "next/cache";
import { faker } from "@faker-js/faker";

import { db } from "@/data/db";
import { songs, type Song } from "@/data/db/schema";

export async function generateSongs({ count = 10 }: { count?: number }) {
  const allSongs: Omit<Song, "id">[] = [];

  for (let i = 0; i < count; i++) {
    allSongs.push({
      title: faker.music.songName(),
      artistId: faker.person.fullName(),
      price: String(
        faker.helpers.arrayElement([
          0, 0, 0, 0, 0, 0, 10, 20, 30, 50, 100, 150,
        ]),
      ),
      isOriginal: faker.datatype.boolean(0.1),
      hasCopyright: faker.datatype.boolean(0.3),
      timesPlayed: faker.number.int({ min: 0, max: 50 }),
      createdAt: faker.date.recent({ days: 10 }),
      lastPlayedAt: faker.date.recent({ days: 9 }),
    } satisfies Omit<Song, "id">);
  }

  await db.insert(songs).values(allSongs);

  // revalidatePath("/");
}
