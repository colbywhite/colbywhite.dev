import { getCollection } from "astro:content";
import { SITE } from "@/config";
import { getLatestDate } from "@/content/blogPosts/utils";

const getSortedBlogPosts = async () => {
  const blogPosts = await getCollection("blogPosts");
  return blogPosts.sort(
    (a, b) =>
      Math.floor(new Date(getLatestDate(b)).getTime() / 1000) -
      Math.floor(new Date(getLatestDate(a)).getTime() / 1000)
  );
};

const getRecentBlogPosts = async (count = SITE.paging as number) => {
  const blogPosts = await getSortedBlogPosts();
  return blogPosts.slice(0, count);
};

const getFeaturedBlogPosts = async (count = SITE.paging as number) => {
  const blogPosts = await getSortedBlogPosts();
  return blogPosts.filter(({ data }) => data.Featured).slice(0, count);
};

export { getSortedBlogPosts, getRecentBlogPosts, getFeaturedBlogPosts };
