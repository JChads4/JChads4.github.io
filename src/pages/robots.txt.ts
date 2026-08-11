import type { APIRoute } from 'astro';
import { site } from '../config';

/**
 * robots.txt — generated at build time so the Sitemap directive always points
 * at the real `site.url` (see src/config.ts and astro.config.mjs) instead of
 * a stale hard-coded domain.
 */
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
