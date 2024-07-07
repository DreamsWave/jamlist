"use server";

import { db } from "@/data/db";
import { insertSongSchema, songs } from "@/data/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { z } from "zod";

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

export const deleteSongAction = async (id: number) => {
  const song = await db.query.songs.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(songs.id, id)),
  });

  if (!song) {
    throw new Error("Song not found.");
  }

  await db.delete(songs).where(eq(songs.id, id));

  revalidatePath("/");
};
