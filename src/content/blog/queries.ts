import { getCollection } from "astro:content";
import { SITE } from "@/config";
import { getLatestDate } from "@/content/blog/utils";

const getSortedBlogPosts = async () => {
  const blogPosts = await getCollection("blog");
  return blogPosts
    .filter(({ data: { draft } }) => !draft)
    .sort(
      (a, b) =>
        Math.floor(getLatestDate(b).getTime() / 1000) -
        Math.floor(getLatestDate(a).getTime() / 1000)
    );
};

const getRecentBlogPosts = async (count = SITE.paging as number) => {
  const blogPosts = await getSortedBlogPosts();
  return blogPosts.slice(0, count);
};

const getFeaturedBlogPosts = async (count = SITE.paging as number) => {
  const blogPosts = await getSortedBlogPosts();
  return blogPosts.filter(({ data }) => data.featured).slice(0, count);
};

export { getSortedBlogPosts, getRecentBlogPosts, getFeaturedBlogPosts };
