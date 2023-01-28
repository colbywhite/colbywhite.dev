import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/node";
import type { Mdx } from "~/services/writings";
import { getPosts } from "~/services/writings.db";
import { PUBLISH_DATE_FORMATTER } from "~/utils";

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

export async function loader({ request }: LoaderArgs) {
  const cache = await getPosts(new URL(request.url).origin);
  const sortedCache = cache
    .filter(
      ({ frontmatter }) =>
        isDefined(frontmatter.date) && isDefined(frontmatter.title)
    )
    .sort(reverseSort);
  return json({
    posts: sortedCache.map(({ slug, frontmatter }) => ({ slug, frontmatter })),
  });
}

export default function BlogPostListing() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="prose">
      <h1>Writings</h1>
      {posts.length <= 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map(({ slug, frontmatter: { title, date } }) => (
            <li key={slug}>
              <article className="my-0">
                <Link className="link-secondary link" to={slug}>
                  {title || "Unknown"}
                </Link>
                {typeof date === "string" && (
                  <>
                    <span className="hidden md:inline"> - </span>
                    <br className="md:hidden" />
                    <span className="prose-sm italic">
                      published {PUBLISH_DATE_FORMATTER.format(new Date(date))}
                    </span>
                  </>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
