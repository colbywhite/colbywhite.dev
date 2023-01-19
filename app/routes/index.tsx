import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";

export function loader() {
  const recentlyRead = [
    {
      url: "https://uptointerpretation.com/posts/the-next-browser-language/",
      author: "Nicholas Yang",
      publishDate: new Date("2022-12-27T01:04:56-05:00"),
      title: "The Next Browser Language",
    },
    {
      url: "https://lloydatkinson.net/posts/2022/one-teams-eight-points-is-another-teams-two-points/",
      author: "Lloyd Atkinson",
      publishDate: new Date("2022-03-29T14:23:56.000Z"),
      title: "Eight Points for One Team Is Two Points for Another Team",
    },
    {
      url: "https://calpaterson.com/blockchain.html",
      author: "Cal Paterson",
      publishDate: new Date("2022-08-11"),
      title: "There aren't that many uses for blockchains",
    },
    {
      url: "https://blog.jim-nielsen.com/2022/browsers-json-formdata/",
      author: "Jim Nielsen",
      publishDate: new Date("2022-11-09T19:00:00Z"),
      title: "Browsers, JSON, and FormData",
    },
  ];
  return json({ recentlyRead });
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
export default function Index() {
  const { recentlyRead } = useLoaderData<typeof loader>();
  return (
    <main>
      <section>
        <header className="prose">
          <h1>Recently read</h1>
          <p className="prose-sm italic">
            A list of articles I've recently read.
          </p>
        </header>
          <ul>
            {recentlyRead.map(({ author, publishDate, title, url }) => (
              <li key={url}>
                <a href={url} className="link-primary link hover:no-underline">
                  {title}
                </a>
                <br />
                <span className="prose-sm italic">
                  {author} &ndash;{" "}
                  <time dateTime={publishDate}>
                    {formatDate(new Date(publishDate))}
                  </time>
                </span>
              </li>
            ))}
          </ul>
      </section>
    </main>
  );
}
