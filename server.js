import { createRequestHandler } from "@remix-run/netlify";
import * as build from "@remix-run/dev/server-build";

function getLoadContext(event, context) {
  const loadContext = {};

  return loadContext;
}

export const handler = createRequestHandler({
  build,
  getLoadContext,
  mode: process.env.NODE_ENV,
});
