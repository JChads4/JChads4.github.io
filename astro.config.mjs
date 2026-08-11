// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Replace `site` with your real domain before deploying — it is used for the
// canonical URLs, the sitemap, and Open Graph metadata. The matching mirror
// value lives in src/config.ts (`site.url`) — keep them in sync.
export default defineConfig({
  site: 'https://JChads4.github.io',
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    format: 'directory',
  },
});
