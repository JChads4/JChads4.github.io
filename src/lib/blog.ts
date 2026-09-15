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

/** The year a post belongs to, for the archive's grouping. */
export function postYear(post: Post): number {
  return Number(post.data.date.slice(0, 4));
}

/** URL slug for a tag. Tags are slugs by convention, so this changes nothing
 *  today; it is a guard for the future, where "PINNs" in one file and "pinns"
 *  in another would otherwise become two categories. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** URL for a tag page. */
export function tagHref(slug: string): string {
  return `/blog/tag/${slug}/`;
}

/** Distinct tags across the given posts, most-used first, then alphabetical. */
export function allTags(
  posts: Post[]
): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, { tag: string; count: number }>();
  for (const post of posts) {
    // A Set, so a tag repeated within one post still counts once.
    for (const slug of new Set(post.data.tags.map(tagSlug))) {
      if (!slug) continue;
      const seen = counts.get(slug);
      if (seen) {
        seen.count += 1;
        continue;
      }
      // The first spelling in the collection wins for display, so a tag reads
      // as its author first wrote it while the URL stays lower-case.
      const tag = post.data.tags.find((t) => tagSlug(t) === slug)!;
      counts.set(slug, { tag, count: 1 });
    }
  }
  return [...counts.entries()]
    .map(([slug, { tag, count }]) => ({ tag, slug, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** The posts carrying a tag, by slug. */
export function postsWithTag(posts: Post[], slug: string): Post[] {
  return posts.filter((post) =>
    post.data.tags.some((tag) => tagSlug(tag) === slug)
  );
}
