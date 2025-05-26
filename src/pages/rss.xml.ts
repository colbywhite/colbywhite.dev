import rss from "@astrojs/rss";
import { SITE } from "@/config";
import { getSortedBlogPosts } from "@/content/blogPosts/queries";
import { slugifyStr } from "@/utils/slugify";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const sortedPosts = await getSortedBlogPosts();
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data }) => ({
      link: new URL(
        `/posts/${slugifyStr(data.title)}`,
        new URL(request.url).origin
      ).href,
      title: data.title,
      description: data.frontmatter.description,
      pubDate: new Date(
        data.frontmatter.modDatetime ?? data.frontmatter.pubDatetime
      ),
    })),
  });
};
