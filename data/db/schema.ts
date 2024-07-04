import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const songs = pgTable("songs", {
  id: text("id").notNull().primaryKey(),
  title: text("title").notNull(),
  artistId: text("artist_id"),
  price: text("price"),
  genreIds: text("genre_ids"),
  moodIds: text("mood_ids"),
  isOriginal: boolean("is_original"),
  hasCopyright: boolean("has_copyright"),
  tagIds: text("tag_ids"),
  timesPlayed: integer("times_played"),
  likes: integer("likes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  lastPlayedAt: timestamp("last_played_at"),
});
