import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sids.iglesia",
  output: "static",
  trailingSlash: "ignore",
  build: {
    assets: "_astro",
  },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
