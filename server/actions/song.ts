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

// export async function getSongsAction(rawInput: z.infer<typeof getSongsSchema>) {
//   try {
//     // const input = getSongsSchema.parse(rawInput);

//     // const [column, order] = (input.sort?.split(".") as [
//     //   keyof Product | undefined,
//     //   "asc" | "desc" | undefined,
//     // ]) ?? ["createdAt", "desc"];
//     // const [minPrice, maxPrice] = input.price_range?.split("-") ?? [];
//     // const categories =
//     //   (input.categories?.split(".") as Product["category"][]) ?? [];
//     // const subcategories = input.subcategories?.split(".") ?? [];
//     // const storeIds = input.store_ids?.split(".").map(Number) ?? [];

//     const { items, count } = await db.transaction(async (tx) => {
//       const items = await tx.select().from(songs);
//       // .limit(input.limit)
//       // .offset(input.offset)
//       // .where(
//       //   and(
//       //     categories.length ?
//       //       inArray(products.category, categories)
//       //     : undefined,
//       //     subcategories.length ?
//       //       inArray(products.subcategory, subcategories)
//       //     : undefined,
//       //     minPrice ? gte(products.price, minPrice) : undefined,
//       //     maxPrice ? lte(products.price, maxPrice) : undefined,
//       //     storeIds.length ? inArray(products.storeId, storeIds) : undefined,
//       //   ),
//       // )
//       // .groupBy(songs.id)
//       // .orderBy(
//       //   column && column in songs ?
//       //     order === "asc" ?
//       //       asc(songs[column])
//       //     : desc(songs[column])
//       //   : desc(songs.createdAt),
//       // );

//       const count = await tx
//         .select({
//           count: sql<number>`count(*)`,
//         })
//         .from(songs)
//         // .where(
//         //   and(
//         //     categories.length ?
//         //       inArray(songs.category, categories)
//         //     : undefined,
//         //     subcategories.length ?
//         //       inArray(songs.subcategory, subcategories)
//         //     : undefined,
//         //     minPrice ? gte(songs.price, minPrice) : undefined,
//         //     maxPrice ? lte(songs.price, maxPrice) : undefined,
//         //     storeIds.length ? inArray(songs.storeId, storeIds) : undefined,
//         //   ),
//         // )
//         .execute()
//         .then((res) => res[0]?.count ?? 0);

//       return {
//         items,
//         count,
//       };
//     });

//     return {
//       items,
//       count,
//     };
//   } catch (err) {
//     console.error(err);
//     if (err instanceof Error) {
//       // Throw an Error object with the original error message
//       throw new TypeError(err.message);
//     }
//     if (err instanceof z.ZodError) {
//       // Combine Zod error messages and throw as an Error object
//       throw new TypeError(err.issues.map((issue) => issue.message).join("\n"));
//     }
//     // Throw a generic Error for unknown cases
//     throw new TypeError("Unknown error.");
//   }
// }

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
