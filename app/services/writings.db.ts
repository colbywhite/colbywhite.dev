import type { Mdx } from "~/services/writings";

export const POST_CACHE_FILENAME = "post-cache.json";

export async function getPosts(origin: string) {
  return fetch(new URL(POST_CACHE_FILENAME, origin)).then((response) => {
    if (!response.ok) {
      throw new Error(`Could not retrieve posts ${response.statusText}`);
    }
    return response.json() as Promise<Mdx[]>;
  });
}

export async function getPost(origin: string, slug: string) {
  const posts = await getPosts(origin);
  return posts.find((post) => post.slug === slug);
}
