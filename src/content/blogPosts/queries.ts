import { getCollection } from "astro:content";
import { SITE } from "@/config";
import { getLatestDate } from "@/content/blogPosts/utils";
import { slugifyAll, slugifyStr } from "@/utils/slugify.ts";

const getBlogPosts = async () => {
  return getCollection("blogPosts");
};

const getSortedBlogPosts = async () => {
  const blogPosts = await getBlogPosts();
  return blogPosts.sort((a, b) => {
    return (
      Math.floor(getLatestDate(b).getTime() / 1000) -
      Math.floor(getLatestDate(a).getTime() / 1000)
    );
  });
};

const getRecentBlogPosts = async (count = SITE.paging as number) => {
  const blogPosts = await getSortedBlogPosts();
  return blogPosts.slice(0, count);
};

const getFeaturedBlogPosts = async (count = SITE.paging as number) => {
  const blogPosts = await getSortedBlogPosts();
  return blogPosts
    .filter(({ data }) => data.frontmatter.featured)
    .slice(0, count);
};

const getTags = async () => {
  const posts = await getBlogPosts();
  function getPostsByTag(tag: string) {
    return posts.filter(post =>
      slugifyAll(post.data.frontmatter.tags || []).includes(slugifyStr(tag))
    );
  }
  return posts
    .flatMap(post => post.data.frontmatter.tags)
    .filter(tag => tag !== undefined)
    .map(tag => ({
      tag: slugifyStr(tag),
      tagName: tag,
      posts: getPostsByTag(tag),
    }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
};

export {
  getSortedBlogPosts,
  getRecentBlogPosts,
  getFeaturedBlogPosts,
  getTags,
};
