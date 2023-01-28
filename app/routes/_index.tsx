import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import { getRecentBookmarks } from "~/services/bookmarks";

export async function loader() {
  const recentBookmarks = await getRecentBookmarks().catch((err) => {
    console.warn("Could not retrieve bookmarks.", err);
    return [];
  });
  return json({ recentBookmarks });
}

export default function Index() {
  const { recentBookmarks } = useLoaderData<typeof loader>();
  return (
    <main>
      <section className="prose">
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
    </main>
  );
}
