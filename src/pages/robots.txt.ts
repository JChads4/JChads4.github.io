import type { APIRoute } from 'astro';
import { site as config } from '../config';

/**
 * robots.txt — generated at build time so the Sitemap directive always points
 * at the configured `site` in astro.config.mjs instead of a stale hard-coded
 * domain.
 */
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site ?? config.url).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
