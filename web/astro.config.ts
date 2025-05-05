import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  experimental: {
    responsiveImages: true,
    preserveScriptOrder: true,
  },
  env: {
    schema: {
      RAINDROP_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      STRAPI_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      STRAPI_BASE_URL: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
