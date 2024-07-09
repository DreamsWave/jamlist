"use server";

import { db } from "@/data/db";
import { insertSongSchema, type Song, songs } from "@/data/db/schema";
import { getSongSchema } from "@/data/validations/song";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getSongAction = async (
  rawInput: z.infer<typeof getSongSchema>,
) => {
  const input = getSongSchema.parse(rawInput);

  try {
    const song = await db.query.songs.findFirst({
      with: {
        tags: {
          columns: { songId: false, tagId: false },
          with: { tag: { columns: { title: true, id: true } } },
        },
        moods: {
          columns: { songId: false, moodId: false },
          with: { mood: { columns: { title: true, id: true } } },
        },
        genres: {
          columns: { songId: false, genreId: false },
          with: { genre: { columns: { title: true, id: true } } },
        },
      },
      where: eq(songs.id, input.id),
    });

    if (!song) {
      throw new Error("Song not found.");
    }

    return song;
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      // Throw an Error object with the original error message
      throw new TypeError(err.message);
    }
    if (err instanceof z.ZodError) {
      // Combine Zod error messages and throw as an Error object
      throw new TypeError(err.issues.map((issue) => issue.message).join("\n"));
    }
    // Throw a generic Error for unknown cases
    throw new TypeError("Unknown error.");
  }
};

export async function getSongsAction() {
  try {
    const songs = await db.query.songs.findMany({
      with: {
        tags: {
          columns: { songId: false, tagId: false },
          with: { tag: { columns: { title: true, id: true } } },
        },
        moods: {
          columns: { songId: false, moodId: false },
          with: { mood: { columns: { title: true, id: true } } },
        },
        genres: {
          columns: { songId: false, genreId: false },
          with: { genre: { columns: { title: true, id: true } } },
        },
      },
    });
    return songs;
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      console.error(err);
      // Throw an Error object with the original error message
      throw new TypeError(err.message);
    }
    if (err instanceof z.ZodError) {
      // Combine Zod error messages and throw as an Error object
      throw new TypeError(err.issues.map((issue) => issue.message).join("\n"));
    }
    // Throw a generic Error for unknown cases
    throw new TypeError("Unknown error.");
  }
}

export const addSongAction = async (
  rawInput: z.infer<typeof insertSongSchema>,
) => {
  const input = insertSongSchema.parse(rawInput);

  const songsWithSameTitle = await db.query.songs.findFirst({
    columns: {
      id: true,
    },
    where: eq(songs.title, input.title),
  });

  if (songsWithSameTitle) {
    return { status: "error", message: "Song title already taken." };
  }

  await db.insert(songs).values({
    ...input,
  });

  revalidatePath("/");
};

export const deleteSongAction = async (
  rawInput: z.infer<typeof getSongSchema>,
) => {
  const input = getSongSchema.parse(rawInput);
  const song = await db.query.songs.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(songs.id, input.id)),
  });

  if (!song) {
    throw new Error("Song not found.");
  }

  await db.delete(songs).where(eq(songs.id, input.id));

  revalidatePath("/");
};

const extendedInsertSongSchemaWithId = insertSongSchema.extend({
  id: z.number(),
});

export const updateSongAction = async (
  rawInput: z.infer<typeof extendedInsertSongSchemaWithId>,
) => {
  const input = extendedInsertSongSchemaWithId.parse(rawInput);

  const song = await db.query.songs.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(songs.id, input.id)),
  });

  if (!song) {
    throw new Error("Song not found.");
  }

  await db.update(songs).set(input).where(eq(songs.id, song.id));

  revalidatePath("/");
};
