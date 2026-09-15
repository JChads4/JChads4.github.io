import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Format an ISO `YYYY-MM-DD` date for display. Pure string work, so a build in
 *  any timezone produces the same day. */
export function formatPostDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/** URL for a post. `build.format` is 'directory', so the trailing slash matters. */
export function postHref(post: Post): string {
  return `/blog/${post.id}/`;
}

/** Posts to show in this environment: newest first, ties broken by title (as on
 *  /publications). Drafts are visible while writing and dropped from the build. */
export function visiblePosts(all: Post[]): Post[] {
  return all
    .filter((post) => !post.data.draft || import.meta.env.DEV)
    .sort(
      (a, b) =>
        b.data.date.localeCompare(a.data.date) ||
        a.data.title.localeCompare(b.data.title)
    );
}
