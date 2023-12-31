ALTER TABLE "tables" ADD COLUMN "owner_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tables" DROP COLUMN IF EXISTS "user_id";