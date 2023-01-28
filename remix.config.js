/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  future: {
    v2_routeConvention: true,
  },
  serverBuildTarget: "netlify",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: [
    "**/.*",
    "**/*.css",
    "**/*.test.{js,jsx,ts,tsx}",
    "writings/post-cache.json",
  ],
};
