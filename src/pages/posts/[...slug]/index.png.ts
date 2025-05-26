import type { APIRoute } from "astro";
import { type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { SITE } from "@/config";
import { getBlogPosts } from "@/content/blogPosts/queries.ts";
import { slugifyStr } from "@/utils/slugify.ts";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const posts = await getBlogPosts();
  return posts.map(post => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(
    await generateOgImageForPost(props as CollectionEntry<"blogPosts">),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};
