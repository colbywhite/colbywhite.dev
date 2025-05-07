import type { CollectionEntry } from "astro:content";

export function getLatestDate(blogPost: CollectionEntry<"blogPosts">) {
  return hasBeenUpdated(blogPost)
    ? blogPost.data.updatedAt
    : blogPost.data.publishedAt;
}

export function hasBeenUpdated({
  data: { updatedAt, publishedAt },
}: CollectionEntry<"blogPosts">) {
  const updatedDate = new Date(updatedAt);
  const publishedDate = new Date(publishedAt);
  return updatedDate > publishedDate;
}
