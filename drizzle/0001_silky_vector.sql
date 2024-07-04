CREATE TABLE IF NOT EXISTS "moods" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "song_moods" (
	"song_id" serial NOT NULL,
	"mood_id" serial NOT NULL,
	CONSTRAINT "song_moods_song_id_mood_id_pk" PRIMARY KEY("song_id","mood_id")
);
--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "title" SET DATA TYPE varchar(256);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "song_moods" ADD CONSTRAINT "song_moods_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "song_moods" ADD CONSTRAINT "song_moods_mood_id_moods_id_fk" FOREIGN KEY ("mood_id") REFERENCES "public"."moods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
