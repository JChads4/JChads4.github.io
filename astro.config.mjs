// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { katexDisplay, katexInline } from './src/lib/katex-math.mjs';

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
  markdown: {
    // Astro 7 defaults to the Sätteri processor, which parses maths natively
    // (`math` is off by default) but does not render it. The plugins in
    // src/lib/katex-math.mjs turn each expression into KaTeX HTML at build
    // time, so no client-side script is shipped.
    processor: satteri({
      features: { math: true },
      mdastPlugins: [katexDisplay],
      hastPlugins: [katexInline],
    }),
    // Shiki defaults to github-dark, which drops a dark slab into a page that is
    // otherwise light and monochrome. This is the light counterpart, and it is
    // applied at build time, so the theme costs no client-side JavaScript.
    shikiConfig: { theme: 'github-light' },
  },
});
