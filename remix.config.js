/**
 * @type {import("@remix-run/dev").AppConfig}
 */
module.exports = {
  future: {
    v2_routeConvention: true,
    unstable_tailwind: true
  },
  server: "./server.js",
  serverBuildTarget: "cloudflare-pages",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
};
