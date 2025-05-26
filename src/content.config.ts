import { defineCollection } from "astro:content";
import bookmarkLoader from "@/content/bookmarks/loader";
import blogPostLoader from "@/content/blogPosts/loader";
import {
  RAINDROP_API_TOKEN,
  INKDROP_DB_NAME,
  INKDROP_DB_URL,
  INKDROP_DB_USER,
  INKDROP_DB_PASSWORD,
  INKDROP_NOTEBOOK,
} from "astro:env/server";

export const BLOG_PATH = "src/data/blog";

const bookmarks = defineCollection({
  loader: bookmarkLoader({ token: RAINDROP_API_TOKEN }),
});

const blogPosts = defineCollection({
  loader: blogPostLoader({
    dbConfig: {
      name: INKDROP_DB_NAME,
      url: INKDROP_DB_URL,
      user: INKDROP_DB_USER,
      password: INKDROP_DB_PASSWORD,
    },
    notebookId: INKDROP_NOTEBOOK,
  }),
});

export const collections = { bookmarks, blogPosts };
