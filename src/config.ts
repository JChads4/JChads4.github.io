/**
 * Central site configuration.
 *
 * Everything personal about the site lives here (or in the content
 * collections) so pages stay free of hard-coded names and links.
 */

export const site = {
  /** Full name, used in the header, footer, and page titles. */
  name: 'Jamie Chadderton',
  /** One-line research summary (banner tagline + meta description). */
  title:
    'Experimental nuclear physics — heavy and superheavy element spectroscopy',
  /** Current academic role. */
  role: 'Postdoctoral Researcher',
  /** Department and university. */
  affiliation: 'Department of Nuclear Engineering, University of California, Berkeley',
  /** Office / lab location, shown on the Contact page. */
  location: 'Berkeley, CA, USA',
  /** Default <meta name="description"> fallback. */
  description:
    'Academic portfolio of Jamie Chadderton, PhD — experimental nuclear physics research, publications, and CV.',
  /** Deployed URL — keep in sync with astro.config.mjs `site`. */
  url: 'https://JChads4.github.io',
  /** Path to a portrait shown beside the home-page summary (lives in /public). */
  profileImage: '/images/profile.jpg',
  /**
   * Full-bleed banner image behind the site title, on every page (lives in
   * /public). Around 1600x960 works well. Empty = a plain dark banner.
   */
  bannerImage: '',
  /** Optional link to a PDF of your CV (place the file in public/). Empty = hidden. */
  cvPdf: '',
} as const;

/**
 * All author-string forms of *your* name as they appear in publications.
 * The PublicationCard bolds any entry that exactly matches one of these —
 * keep it case-sensitive (matches the convention in physics author lists).
 * Add additional forms if a paper spells you differently.
 */
export const selfAuthorNames: readonly string[] = [
  'J. Chadderton',
  'J. M. Chadderton',
  'Jamie Chadderton',
];

/**
 * Email address, split into user/host parts so the Contact page can compose
 * the mailto link without duplicating the address across files. Note: the
 * address is still fully present in the built HTML — no static site is truly
 * spam-proof; consider a captcha/obfuscation service if harvesting becomes
 * an issue.
 */
export const email = {
  user: 'jamiechadderton8',
  host: 'gmail.com',
} as const;

export interface SocialLink {
  label: string;
  /** Leave empty to hide the link. */
  url: string;
}

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/JChads4',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jamie-chadderton-a5597b17b/',
  },
  {
    label: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=',
  },
  {
    label: 'ORCID',
    url: 'https://orcid.org/',
  },
  {
    label: 'Email',
    url: 'mailto:jamiechadderton8@gmail.com',
  },
];

/** Visible social links only (empty URLs dropped). */
export const activeSocials = socials.filter((s) => s.url.length > 0);
