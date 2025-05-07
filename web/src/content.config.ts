import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";
import bookmarkLoader from "@/content/bookmarks/loader";
import {
  RAINDROP_API_TOKEN,
  STRAPI_BASE_URL,
  STRAPI_API_TOKEN,
} from "astro:env/server";
import postLoader from "@/content/blogPosts/loader";
import POST_SCHEMA from "@/content/blogPosts/schema";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string().optional(),
      canonicalURL: z.string().optional(),
      timezone: z.string().optional(),
    }),
});

const bookmarks = defineCollection({
  loader: bookmarkLoader({ token: RAINDROP_API_TOKEN }),
});

const blogPosts = defineCollection({
  loader: postLoader({
    contentType: "blog-post",
    clientConfig: {
      baseURL: STRAPI_BASE_URL,
      auth: STRAPI_API_TOKEN,
    },
  }),
  schema: POST_SCHEMA,
});

export const collections = { blog, bookmarks, blogPosts };
