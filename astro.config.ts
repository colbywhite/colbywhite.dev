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
  image: {
    // Used for all Markdown images; not configurable per-image
    // Used for all `<Image />` and `<Picture />` components unless overridden with a prop
    experimentalLayout: "responsive",
  },
  experimental: {
    responsiveImages: true,
    preserveScriptOrder: true,
  },
  env: {
    schema: {
      INKDROP_DB_NAME: envField.string({
        context: "server",
        access: "secret",
      }),
      INKDROP_DB_URL: envField.string({
        context: "server",
        access: "secret",
      }),
      INKDROP_DB_USER: envField.string({
        context: "server",
        access: "secret",
      }),
      INKDROP_DB_PASSWORD: envField.string({
        context: "server",
        access: "secret",
      }),
      INKDROP_NOTEBOOK: envField.string({
        context: "server",
        access: "secret",
      }),
      RAINDROP_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
