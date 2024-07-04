CREATE TABLE IF NOT EXISTS "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "song_genres" (
	"song_id" serial NOT NULL,
	"genre_id" serial NOT NULL,
	CONSTRAINT "song_genres_song_id_genre_id_pk" PRIMARY KEY("song_id","genre_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "song_genres" ADD CONSTRAINT "song_genres_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "song_genres" ADD CONSTRAINT "song_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
