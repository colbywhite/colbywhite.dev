import type { CollectionEntry } from "astro:content";

export function getLatestDate(blogPost: CollectionEntry<"blog">) {
  return hasBeenUpdated(blogPost)
    ? (blogPost.data.modDatetime as Date)
    : (blogPost.data.pubDatetime as Date);
}

export function hasBeenUpdated({
  data: { modDatetime, pubDatetime },
}: CollectionEntry<"blog">) {
  return modDatetime && modDatetime > pubDatetime;
}
