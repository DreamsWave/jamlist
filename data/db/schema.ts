import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  serial,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artistId: text("artist_id"),
  // price: text("price"),
  // isOriginal: boolean("is_original"),
  // hasCopyright: boolean("has_copyright"),
  // timesPlayed: integer("times_played"),
  // likes: integer("likes"),
  // createdAt: timestamp("created_at").defaultNow(),
  // updatedAt: timestamp("updated_at").defaultNow(),
  // lastPlayedAt: timestamp("last_played_at"),
});

export const songsRelations = relations(songs, ({ many }) => ({
  tags: many(songTags),
  moods: many(songMoods),
  genres: many(songGenres),
}));

export const songTags = pgTable(
  "song_tags",
  {
    songId: serial("song_id")
      .notNull()
      .references(() => songs.id),
    tagId: serial("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({ compoundKey: primaryKey({ columns: [t.songId, t.tagId] }) })
);

export const songTagsRelations = relations(songTags, ({ one }) => ({
  song: one(songs, {
    fields: [songTags.songId],
    references: [songs.id],
  }),
  tag: one(tags, {
    fields: [songTags.tagId],
    references: [tags.id],
  }),
}));

export const songMoods = pgTable(
  "song_moods",
  {
    songId: serial("song_id")
      .notNull()
      .references(() => songs.id),
    moodId: serial("mood_id")
      .notNull()
      .references(() => moods.id),
  },
  (t) => ({ compoundKey: primaryKey({ columns: [t.songId, t.moodId] }) })
);

export const songMoodsRelations = relations(songMoods, ({ one }) => ({
  song: one(songs, {
    fields: [songMoods.songId],
    references: [songs.id],
  }),
  mood: one(moods, {
    fields: [songMoods.moodId],
    references: [moods.id],
  }),
}));

export const songGenres = pgTable(
  "song_genres",
  {
    songId: serial("song_id")
      .notNull()
      .references(() => songs.id),
    genreId: serial("genre_id")
      .notNull()
      .references(() => genres.id),
  },
  (t) => ({ compoundKey: primaryKey({ columns: [t.songId, t.genreId] }) })
);

export const songGenreRelations = relations(songGenres, ({ one }) => ({
  song: one(songs, {
    fields: [songGenres.songId],
    references: [songs.id],
  }),
  genre: one(genres, {
    fields: [songGenres.genreId],
    references: [genres.id],
  }),
}));

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  songs: many(songTags),
}));

export const moods = pgTable("moods", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
});

export const moodsRelations = relations(moods, ({ many }) => ({
  songs: many(songMoods),
}));

export const genres = pgTable("genres", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
});

export const genreRelations = relations(genres, ({ many }) => ({
  songs: many(songGenres),
}));

export type Song = typeof songs.$inferSelect;
export type NewSong = typeof songs.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
export type Mood = typeof moods.$inferSelect;
export type NewMood = typeof moods.$inferInsert;
export type Genre = typeof genres.$inferSelect;
export type NewGenre = typeof genres.$inferInsert;
