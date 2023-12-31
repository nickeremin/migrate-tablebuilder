DO $$ BEGIN
 CREATE TYPE "notification_preferences_type" AS ENUM('web', 'email');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification_prefernces" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" "notification_preferences_type" NOT NULL,
	"table_failures" boolean DEFAULT true NOT NULL,
	"new_updates" boolean DEFAULT true NOT NULL,
	"subscription_expiration" boolean DEFAULT true NOT NULL,
	"team_table_changes" boolean DEFAULT true NOT NULL,
	"team_join_requests" boolean DEFAULT true NOT NULL,
	"warnings" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "table_records" (
	"id" text PRIMARY KEY NOT NULL,
	"table_id" text NOT NULL,
	"data" json NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tables" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"favorite" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"image_url" text,
	"email" text NOT NULL,
	"username" text NOT NULL
);
