CREATE TABLE IF NOT EXISTS "songs" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"artist_id" text,
	"price" text,
	"genre_ids" text,
	"mood_ids" text,
	"is_original" boolean,
	"has_copyright" boolean,
	"tag_ids" text,
	"times_played" integer,
	"likes" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_played_at" timestamp
);
