import type { InkDropBlogPostChangeDocument } from "@/content/blogPosts/model";
import render from "@/content/blogPosts/render";
import type { LoaderContext } from "astro/loaders";
import type { CollectionEntry } from "astro:content";

/**
 * Transform a change document to a data entry.
 */
export async function changeToDataEntry(
  change: InkDropBlogPostChangeDocument,
  utils: {
    parseData: LoaderContext["parseData"];
    generateDigest: LoaderContext["generateDigest"];
  }
) {
  const { id, doc } = change;
  const [html, frontmatter] = await render(doc.body);
  const data = await utils.parseData({ id, data: { ...doc, frontmatter } });
  const rendered = {
    html,
    metadata: {
      frontmatter,
    },
  };
  const digest = utils.generateDigest(rendered);
  return {
    data,
    digest,
    id,
    body: doc.body,
    rendered,
  };
}

export function getLatestDate(blogPost: CollectionEntry<"blogPosts">) {
  const { frontmatter } = blogPost.data;
  const pubDatetime = new Date(frontmatter.pubDatetime);
  if (frontmatter.modDatetime) {
    const modDatetime = new Date(frontmatter.modDatetime);
    return modDatetime > pubDatetime ? modDatetime : pubDatetime;
  }
  return pubDatetime;
}

export function hasBeenUpdated({
  data: {
    frontmatter: { modDatetime, pubDatetime },
  },
}: CollectionEntry<"blogPosts">) {
  return modDatetime && new Date(modDatetime) > new Date(pubDatetime);
}
