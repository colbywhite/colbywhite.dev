import { json } from "@remix-run/server-runtime";
import { Link, useLoaderData } from "@remix-run/react";
import type { BookmarkService } from "~/services/bookmarks";
import { getRecentPost } from "~/services/writings.db";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { PUBLISH_DATE_FORMATTER } from "~/utils";

export async function loader({ request, context }: LoaderArgs) {
  const { bookmark: bookmarkSvc } = context.services as {
    bookmark: BookmarkService;
  };
  const recentBookmarks$ = bookmarkSvc.getRecentBookmarks().catch((err) => {
    console.warn("Could not retrieve readings.", err);
    return [];
  });
  const recentWritings$ = getRecentPost(new URL(request.url).origin).catch(
    (err) => {
      console.warn("Could not retrieve posts.", err);
      return [];
    }
  );
  const [bookmarks, recentWritings] = await Promise.all([
    recentBookmarks$,
    recentWritings$,
  ]);
  return json({ bookmarks, recentWritings });
}

export default function Index() {
  const { bookmarks, recentWritings } = useLoaderData<typeof loader>();
  return (
    <main>
      <section className="prose mb-8">
        <header>
          <h1>Recent bookmarks</h1>
          <p className="subtitle">
            Articles I've recently read and bookmarked for later
          </p>
        </header>
        {bookmarks.length <= 0 ? (
          <p>No bookmarks found.</p>
        ) : (
          <ul>
            {bookmarks.map(({ _id, title, link, created }) => (
              <li key={_id}>
                <a href={link}>{title}</a> <br className="md:hidden" />
                <span className="prose-sm italic">
                  saved on {PUBLISH_DATE_FORMATTER.format(new Date(created))}{" "}
                  via {new URL(link).host}
                </span>
              </li>
            ))}
          </ul>
        )}
        <footer>
          <p className="subtitle">
            View the{" "}
            <Link to="bookmarks" prefetch="intent" className="link-secondary">
              full archive
            </Link>
          </p>
        </footer>
      </section>
      <section className="prose">
        <header>
          <h1>Recent writings</h1>
          <p className="subtitle">Notes and articles I've recently written</p>
        </header>
        {recentWritings.length <= 0 ? (
          <p>No writings found.</p>
        ) : (
          <ul>
            {recentWritings.map(({ frontmatter, slug }) => (
              <li key={slug}>
                <Link prefetch="intent" to={`writings/${slug}`}>
                  {frontmatter.title}
                </Link>{" "}
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
        <footer>
          <p className="subtitle">
            View the{" "}
            <Link to="writings" prefetch="intent" className="link-secondary">
              full archive
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}
