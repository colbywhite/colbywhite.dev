import { json } from "@remix-run/cloudflare";
import type {
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import Header from "~/components/Header";
import type { NavItemProps } from "~/components/Header";
import Footer from "./components/Footer";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

const AUTHOR = "Colby M. White";
const TITLE = "Colby M. White's personal site";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: TITLE,
  pagename: TITLE,
  description: TITLE,
  viewport: "width=device-width,initial-scale=1",
  language: "en-US",
  "og:locale": "en-US",
  "og:site_name": TITLE,
  "og:type": "website",
  "theme-color": "rgb(45, 27, 105)", // TODO: dynamically pull from daisy-ui
  author: AUTHOR,
  generator: "Remix",
});

const NAV: NavItemProps[] = [
  { path: "/", name: "Home" }, // shows last 10 writings, readings
  { path: "/bookmarks", name: "Bookmarks" },
  { path: "/writings", name: "Writings" },
  { path: "/about", name: "About" }, // shows resume
  // { path: "/tools", name: "Cool Tools" },
];

const STRUCTURED_DATA = {
  name: AUTHOR,
  description: TITLE,
  author: {
    "@type": "Person",
    name: AUTHOR,
    url: "https://colbywhite.dev",
  },
  "@type": "WebSite",
  // url: "{{ site.url }}", // TODO useMatches to grab url
  headline: TITLE,
  "@context": "https://schema.org",
};

export function loader({ request }: LoaderArgs) {
  const theme = request.headers.get("X-theme");
  return json({ theme });
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();
  return (
    <html lang="en" className="h-full" data-theme={theme}>
      <head>
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA),
          }}
        />
      </head>
      <body className="mx-auto flex min-h-screen max-w-[65ch] flex-col gap-4 p-2 print:bg-base-100">
        <Header
          className="mx-auto w-full border-primary print:hidden"
          nav={NAV}
        />
        <Outlet />
        <Footer className="mx-auto w-full border-primary print:hidden" />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
