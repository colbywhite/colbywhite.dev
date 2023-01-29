import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import { getRecentBookmarks } from "~/services/bookmarks";
import { getRecentPost } from "~/services/writings.db";
import type { LoaderArgs } from "@remix-run/node";
import { PUBLISH_DATE_FORMATTER } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const recentBookmarks$ = getRecentBookmarks().catch((err) => {
    console.warn("Could not retrieve bookmarks.", err);
    return [];
  });
  const recentWritings$ = getRecentPost(new URL(request.url).origin).catch(
    (err) => {
      console.warn("Could not retrieve bookmarks.", err);
      return [];
    }
  );
  const [recentBookmarks, recentWritings] = await Promise.all([
    recentBookmarks$,
    recentWritings$,
  ]);
  return json({ recentBookmarks, recentWritings });
}

export default function Index() {
  const { recentBookmarks, recentWritings } = useLoaderData<typeof loader>();
  return (
    <main>
      <section className="prose mb-8">
        <header>
          <h1 className="">Recently read</h1>
          <p className="subtitle">
            A list of articles I've recently read <br className="md:hidden" />
            (powered by{" "}
            <a href="https://raindrop.io" className="link-accent link">
              raindrop
            </a>
            )
          </p>
        </header>
        {recentBookmarks.length <= 0 ? (
          <p>No bookmarks found.</p>
        ) : (
          <ul>
            {recentBookmarks.map(({ domain, _id, title, link }) => (
              <li key={_id}>
                <a href={link} className="link-secondary link">
                  {title}
                </a>{" "}
                <br className="md:hidden" />
                <span className="prose-sm italic">via {domain}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="prose">
        <header>
          <h1 className="">Recently written</h1>
        </header>
        {recentWritings.length <= 0 ? (
          <p>No writings found.</p>
        ) : (
          <ul>
            {recentWritings.map(({ frontmatter, slug }) => (
              <li key={slug}>
                <a href={slug} className="link-secondary link">
                  {frontmatter.title}
                </a>{" "}
                {typeof frontmatter.date === "string" && (
                  <>
                    <span className="hidden md:inline"> - </span>
                    <br className="md:hidden" />
                    <span className="prose-sm italic">
                      published{" "}
                      {PUBLISH_DATE_FORMATTER.format(
                        new Date(frontmatter.date)
                      )}
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
