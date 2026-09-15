/**
 * The navigation map, shared by the left rail and the 404 page so the two can
 * never drift apart.
 *
 * Blog tags are passed in rather than read here: only the blog collection knows
 * them, and this module stays free of async content reads.
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

/** The rail's groups, with the blog's own category links appended to Writing.
 *  A catalogue orders its categories by how much is in them, so `tags` arrives
 *  already sorted by count. */
export function navGroups(tags: NavLink[] = []): NavGroup[] {
  return [
    {
      label: 'Writing',
      links: [{ href: '/blog/', label: 'All posts' }, ...tags],
    },
    {
      label: 'Record',
      links: [
        { href: '/research/', label: 'Research' },
        { href: '/publications/', label: 'Publications' },
        { href: '/projects/', label: 'Projects' },
        { href: '/cv/', label: 'Curriculum vitae' },
        { href: '/news/', label: 'News & talks' },
      ],
    },
    {
      label: 'About',
      links: [{ href: '/contact/', label: 'Contact' }],
    },
  ];
}

/** True on the page itself. Drives `aria-current="page"`. */
export function isCurrent(path: string, href: string): boolean {
  return path === href;
}

/** True on a page *below* this one, e.g. a post under /blog/. Kept separate
 *  from `isCurrent` because with tag routes one path can sit under two links:
 *  /blog/tag/pinns/ is below /blog/ but is not that page. */
export function isAncestor(path: string, href: string): boolean {
  return path !== href && path.startsWith(href);
}
