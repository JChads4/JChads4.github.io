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

export const collections = { publications, research };
