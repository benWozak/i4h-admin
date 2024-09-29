import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_users_role" AS ENUM('admin', 'editor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_hero_text_placement" AS ENUM('center', 'bottom-left', 'bottom-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_hero_background_type" AS ENUM('none', 'image', 'carousel', 'video');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_hero_background_viewport_height" AS ENUM('full', 'partial');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_landing_page_hero_text_placement" AS ENUM('center', 'bottom-left', 'bottom-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_landing_page_hero_background_type" AS ENUM('none', 'image', 'carousel', 'video');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_landing_page_hero_background_viewport_height" AS ENUM('full', 'partial');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_main_navigation_items_type" AS ENUM('link', 'dropdown');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "enum_users_role" NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "pages_hero_background_carousel" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_seo_keywords" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"keyword" varchar
);

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"hero_headline" varchar NOT NULL,
	"hero_subline" varchar,
	"hero_textPlacement" "enum_pages_hero_text_placement",
	"hero_scrim" boolean,
	"hero_background_type" "enum_pages_hero_background_type",
	"hero_background_viewportHeight" "enum_pages_hero_background_viewport_height",
	"hero_background_use_parallax" boolean,
	"seo_title" varchar,
	"seo_description" varchar,
	"seo_image_width" numeric,
	"seo_image_height" numeric,
	"seo_image_alt" varchar,
	"seo_url" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_tablet_url" varchar,
	"sizes_tablet_width" numeric,
	"sizes_tablet_height" numeric,
	"sizes_tablet_mime_type" varchar,
	"sizes_tablet_filesize" numeric,
	"sizes_tablet_filename" varchar
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "landing_page_hero_background_carousel" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "landing_page_seo_keywords" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"keyword" varchar
);

CREATE TABLE IF NOT EXISTS "landing_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_name" varchar NOT NULL,
	"hero_headline" varchar NOT NULL,
	"hero_subline" varchar,
	"hero_textPlacement" "enum_landing_page_hero_text_placement",
	"hero_scrim" boolean,
	"hero_background_type" "enum_landing_page_hero_background_type",
	"hero_background_viewportHeight" "enum_landing_page_hero_background_viewport_height",
	"hero_background_use_parallax" boolean,
	"seo_title" varchar,
	"seo_description" varchar,
	"seo_image_width" numeric,
	"seo_image_height" numeric,
	"seo_image_alt" varchar,
	"seo_url" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "landing_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "main_navigation_items_dropdown_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar
);

CREATE TABLE IF NOT EXISTS "main_navigation_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"type" "enum_main_navigation_items_type" NOT NULL
);

CREATE TABLE IF NOT EXISTS "main_navigation" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "main_navigation_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer
);

CREATE TABLE IF NOT EXISTS "brand" (
	"id" serial PRIMARY KEY NOT NULL,
	"brand_colors_primary" varchar NOT NULL,
	"brand_colors_secondary" varchar NOT NULL,
	"social_links_facebook" varchar NOT NULL,
	"social_links_instagram" varchar NOT NULL,
	"social_links_twitter" varchar NOT NULL,
	"social_links_linkedin" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "brand_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "pages_hero_background_carousel_order_idx" ON "pages_hero_background_carousel" ("_order");
CREATE INDEX IF NOT EXISTS "pages_hero_background_carousel_parent_id_idx" ON "pages_hero_background_carousel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_seo_keywords_order_idx" ON "pages_seo_keywords" ("_order");
CREATE INDEX IF NOT EXISTS "pages_seo_keywords_parent_id_idx" ON "pages_seo_keywords" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" ("slug");
CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" ("created_at");
CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" ("order");
CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" ("path");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" ("sizes_thumbnail_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" ("sizes_card_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" ("sizes_tablet_filename");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
CREATE INDEX IF NOT EXISTS "landing_page_hero_background_carousel_order_idx" ON "landing_page_hero_background_carousel" ("_order");
CREATE INDEX IF NOT EXISTS "landing_page_hero_background_carousel_parent_id_idx" ON "landing_page_hero_background_carousel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "landing_page_seo_keywords_order_idx" ON "landing_page_seo_keywords" ("_order");
CREATE INDEX IF NOT EXISTS "landing_page_seo_keywords_parent_id_idx" ON "landing_page_seo_keywords" ("_parent_id");
CREATE INDEX IF NOT EXISTS "landing_page_rels_order_idx" ON "landing_page_rels" ("order");
CREATE INDEX IF NOT EXISTS "landing_page_rels_parent_idx" ON "landing_page_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "landing_page_rels_path_idx" ON "landing_page_rels" ("path");
CREATE INDEX IF NOT EXISTS "main_navigation_items_dropdown_items_order_idx" ON "main_navigation_items_dropdown_items" ("_order");
CREATE INDEX IF NOT EXISTS "main_navigation_items_dropdown_items_parent_id_idx" ON "main_navigation_items_dropdown_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "main_navigation_items_order_idx" ON "main_navigation_items" ("_order");
CREATE INDEX IF NOT EXISTS "main_navigation_items_parent_id_idx" ON "main_navigation_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "main_navigation_rels_order_idx" ON "main_navigation_rels" ("order");
CREATE INDEX IF NOT EXISTS "main_navigation_rels_parent_idx" ON "main_navigation_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "main_navigation_rels_path_idx" ON "main_navigation_rels" ("path");
CREATE INDEX IF NOT EXISTS "brand_rels_order_idx" ON "brand_rels" ("order");
CREATE INDEX IF NOT EXISTS "brand_rels_parent_idx" ON "brand_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "brand_rels_path_idx" ON "brand_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "pages_hero_background_carousel" ADD CONSTRAINT "pages_hero_background_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_seo_keywords" ADD CONSTRAINT "pages_seo_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "landing_page_hero_background_carousel" ADD CONSTRAINT "landing_page_hero_background_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "landing_page_seo_keywords" ADD CONSTRAINT "landing_page_seo_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "landing_page_rels" ADD CONSTRAINT "landing_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "landing_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "landing_page_rels" ADD CONSTRAINT "landing_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "main_navigation_items_dropdown_items" ADD CONSTRAINT "main_navigation_items_dropdown_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "main_navigation_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "main_navigation_items" ADD CONSTRAINT "main_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "main_navigation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "main_navigation_rels" ADD CONSTRAINT "main_navigation_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "main_navigation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "main_navigation_rels" ADD CONSTRAINT "main_navigation_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "brand_rels" ADD CONSTRAINT "brand_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "brand"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "brand_rels" ADD CONSTRAINT "brand_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "pages_hero_background_carousel";
DROP TABLE "pages_seo_keywords";
DROP TABLE "pages";
DROP TABLE "pages_rels";
DROP TABLE "media";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";
DROP TABLE "landing_page_hero_background_carousel";
DROP TABLE "landing_page_seo_keywords";
DROP TABLE "landing_page";
DROP TABLE "landing_page_rels";
DROP TABLE "main_navigation_items_dropdown_items";
DROP TABLE "main_navigation_items";
DROP TABLE "main_navigation";
DROP TABLE "main_navigation_rels";
DROP TABLE "brand";
DROP TABLE "brand_rels";`);

};
