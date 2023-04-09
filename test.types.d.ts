import type { KVNamespace } from "@cloudflare/workers-types";

// these are the globals injected by miniflare during test
declare global {
  const BOOKMARKS: KVNamespace;
}
