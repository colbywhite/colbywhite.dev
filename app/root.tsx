import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import Header from "~/components/Header";
import Footer from "./components/Footer";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen w-11/12 md:w-5/6 mx-auto flex flex-col gap-2 bg-slate-50 prose-headings:font-bold prose-h1:prose-xl prose-h2:prose-lg">
        <Header className="mx-auto w-full border-gray-700"/>
        <Outlet />
        <Footer className="mx-auto w-full border-gray-700" />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
