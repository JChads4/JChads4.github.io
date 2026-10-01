import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site as config } from '../config';
import { postHref, visiblePosts } from '../lib/blog';
import { plainText } from '../lib/text';

/**
 * The blog's RSS feed. Drafts are dropped by `visiblePosts`, as everywhere else.
 * Titles and excerpts are flattened to plain text, since a feed reader cannot
 * render the `$…$` maths that the pages do.
 */
export const GET: APIRoute = async ({ site }) => {
  const posts = visiblePosts(await getCollection('blog'));
  return rss({
    title: `${config.name} — blog`,
    description: config.blogSubject,
    site: site ?? config.url,
    items: posts.map((post) => ({
      title: plainText(post.data.title),
      description: post.data.excerpt && plainText(post.data.excerpt),
      pubDate: new Date(`${post.data.date}T00:00:00Z`),
      link: postHref(post),
      categories: post.data.tags,
    })),
  });
};
