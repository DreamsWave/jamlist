import { z } from "zod";

export const getSongSchema = z.object({
  id: z.number(),
});

export const getSongsSchema = z.object({
  // limit: z.number().default(10),
  // offset: z.number().default(0),
  // categories: z.string().optional().nullable(),
  // subcategories: z.string().optional().nullable(),
  // sort: z.string().optional().nullable(),
  // price_range: z.string().optional().nullable(),
  // store_ids: z.string().optional().nullable(),
});
