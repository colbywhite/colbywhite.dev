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
import type { NavItemProps } from "~/components/Header";
import Footer from "./components/Footer";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

const NAV: NavItemProps[] = [
  // { path: "/", name: "Home" }, // shows last 10 writings, readings
  // { path: "/about", name: "About" }, // shows resume
  // { path: "/writings", name: "Writings" },
  // { path: "/readings", name: "Readings" },
  // { path: "/tools", name: "Cool Tools" },
];

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="mx-auto flex min-h-screen w-11/12 flex-col gap-2 bg-secondary-50 md:w-5/6 lg:w-3/6">
        <Header
          className="mx-auto w-full border-primary-700 print:hidden"
          nav={NAV}
        />
        <Outlet />
        <Footer className="mx-auto w-full border-primary-700 print:hidden" />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
