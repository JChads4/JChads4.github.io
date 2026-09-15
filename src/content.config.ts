import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Publications — one Markdown file per paper in src/content/publications/.
 * The filename becomes the entry id (e.g. `2025-alignment.md` → `2025-alignment`).
 */
const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** Author list in citation order. Bold yourself by matching `site.name` in config.ts. */
    authors: z.array(z.string()).min(1),
    /** Journal, conference proceedings, or venue name. */
    venue: z.string(),
    year: z.number().int().min(1900).max(2100),
    type: z.enum(['journal', 'conference', 'workshop', 'preprint', 'thesis']),
    /** Optional links — rendered as pills on the publication card.
     *  doi and arxiv accept either a bare ID ("10.xxxx/yyy", "2405.00000")
     *  or a full URL; the card normalizes bare IDs to canonical links. */
    doi: z.string().optional(),
    arxiv: z.string().optional(),
    pdf: z.string().optional(),
    /** Short abstract, shown in a collapsed <details> on the Publications page. */
    abstract: z.string().optional(),
    keywords: z.array(z.string()).default([]),
  }),
});

/**
 * Research areas — one Markdown file per topic in src/content/research/.
 * The file body becomes the visible description.
 */
const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'completed', 'planned']).default('active'),
    /** Starting year of this research thread, used for ordering. */
    since: z.number().int().min(1900).max(2100).optional(),
    keywords: z.array(z.string()).default([]),
  }),
});

/**
 * Blog posts — one Markdown file per post in src/content/blog/.
 *
 * Keep filenames flat and slug-like: the filename becomes the entry id and
 * therefore the URL (`hello-world.md` → `/blog/hello-world/`). A file in a
 * subdirectory would produce an id containing a slash, which the single-segment
 * `[slug]` route does not model.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** Publication date. Accepts a quoted `YYYY-MM-DD` or a bare YAML date
     *  (`date: 2026-09-14` parses as a Date, not a string). Both normalise to
     *  the same string, which sorts chronologically and cannot shift a day
     *  through a timezone conversion at render time. */
    date: z
      .union([z.iso.date(), z.date()])
      .transform((v) => (typeof v === 'string' ? v : v.toISOString().slice(0, 10))),
    /** One-paragraph summary for the listing and the meta description. */
    excerpt: z.string().optional(),
    /** Optional featured image path under /public. */
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    /** Drafts build in dev but are absent from production and from the sitemap. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { publications, research, blog };
