import type { Mdx } from "~/services/writings";

export const POST_CACHE_FILENAME = "post-cache.json";

function isDefined(val: string | undefined): val is string {
  return typeof val === "string";
}

function reverseSort(a: Mdx, b: Mdx) {
  if (!isDefined(a.frontmatter.date) || !isDefined(b.frontmatter.date)) {
    throw new Error("Missing dates");
  }
  const aDate = new Date(a.frontmatter.date);
  const bDate = new Date(b.frontmatter.date);
  return bDate.getTime() - aDate.getTime();
}

export async function getPosts(origin: string) {
  return fetch(new URL(POST_CACHE_FILENAME, origin))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not retrieve posts ${response.statusText}`);
      }
      return response.json() as Promise<Mdx[]>;
    })
    .then((posts) => {
      return posts
        .filter(
          ({ frontmatter }) =>
            isDefined(frontmatter.date) && isDefined(frontmatter.title)
        )
        .sort(reverseSort);
    });
}

export async function getPost(origin: string, slug: string) {
  const posts = await getPosts(origin);
  return posts.find((post) => post.slug === slug);
}

export async function getRecentPost(origin: string, count = 10) {
  const posts = await getPosts(origin);
  return posts.slice(0, count);
}
