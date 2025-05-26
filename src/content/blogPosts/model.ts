import { z } from "astro:content";
import type { DatabaseChangesResultItem } from "nano";
import { SITE } from "@/config";

const FrontMatterSchema = z.object({
  author: z.string().default(SITE.author),
  pubDatetime: z.string().datetime({ offset: true }),
  modDatetime: z.string().datetime({ offset: true }).optional().nullable(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]),
  description: z.string().optional(),
  timezone: z.string().optional(),
});

export const InkDropBlogPostSchema = z.object({
  _id: z.string(),
  _rev: z.string(),
  doctype: z.string(),
  title: z.string(),
  body: z.string(),
  bookId: z.string(),
  tags: z.array(z.string()),
  createdAt: z.number(),
  updatedAt: z.number(),
  status: z.enum(["completed", "none", "active", "onHold", "dropped"]),
  // share: z.enum(["private", "public"]),
  numOfTasks: z.number(),
  numOfCheckedTasks: z.number(),
  timestamp: z.number(),
  frontmatter: FrontMatterSchema,
});

export type InkDropBlogPost = z.infer<typeof InkDropBlogPostSchema>;
export type InkDropBlogPostChangeDocument = DatabaseChangesResultItem & {
  doc: InkDropBlogPost;
};
