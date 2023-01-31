import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { getPosts } from "~/services/writings.db";
import { PUBLISH_DATE_FORMATTER } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const posts = await getPosts(new URL(request.url).origin);
  return json({
    posts: posts.map(({ slug, frontmatter }) => ({ slug, frontmatter })),
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
                <Link prefetch="intent" to={slug}>
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
