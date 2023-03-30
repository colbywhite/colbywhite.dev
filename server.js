import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import invariant from "tiny-invariant";
import { BookmarkService } from "./app/services/bookmarks";
import { KvCache } from "./app/services/kv.cache";

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => {
    const { RAINDROP_TOKEN, BOOKMARKS } = context.env;
    invariant(
      typeof RAINDROP_TOKEN === "string" && RAINDROP_TOKEN.length > 1,
      "Missing RAINDROP_TOKEN env variable."
    );
    const bookmarkCache = new KvCache(BOOKMARKS);
    const bookmarkSvc = new BookmarkService(RAINDROP_TOKEN, bookmarkCache);
    return { env: context.env, services: { bookmark: bookmarkSvc } };
  },
});

export function onRequest(context) {
  return handleRequest(context);
}
