# Academic Portfolio

A blog-first academic site built with [Astro](https://astro.build) and laid out
as a dense parts catalogue: a compact masthead, a persistent left rail of
categories, and rule-separated index rows under small uppercase column labels.
Static output — fast, accessible, and deployable to GitHub Pages, Netlify, or Vercel.

## Pages

| Route               | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `/`                 | A one-line identity strip, then the ten most recent posts |
| `/blog/`            | The archive: every post, grouped by year, plus the tag list |
| `/blog/<slug>/`     | One page per post                              |
| `/blog/tag/<tag>/`  | Posts carrying one tag (noindex; kept out of the sitemap) |
| `/news/`            | Dated updates, then every invited and contributed talk |
| `/research/`        | Research areas (from content collections)      |
| `/publications/`    | Full publication list, grouped by year         |
| `/projects/`        | Software and analysis projects                 |
| `/cv/`              | Structured CV (positions, education, awards, …) |
| `/contact/`         | Email, affiliation, and profile links          |
| `/404.html`         | A miss offers the same links as the rail       |

Nothing is lost from the older portfolio shape: teaching lives on `/cv/`, and
news and talks moved to `/news/`, which is the first page to carry all seven
talks (five of them previously reached no page at all).

## The design

Structure comes from 1px rules and nothing else: square corners, no shadows, no
cards. Links are underlined and the underline is never removed, because in a
monochrome palette it does all the work of signalling a link. There is no colour
accent and no dark mode, both deliberate.

Two type scales share one token set, and the split is deliberate. `--fs-micro`
through `--fs-ui` (11px to 14px) are for the dense regions: the rail, index
rows, column labels and metadata. `--fs-body` with `--leading` is for long-form
prose, which has to stay readable. `--measure` (44rem) caps prose while listings
span the full column.

There is **no client-side JavaScript**, with one exception: no `.js` file and no
`<script>` element is emitted anywhere, and the single inline `onclick` is the
CV's print button, which is the only PDF route on `/cv/` while `site.cvPdf` is
unset. Search is deliberately absent for the same reason: the rail, the dense
index and the tag pages do the finding.

## Quick start

```bash
npm install
npm run dev       # local dev server → http://localhost:4321
npm run build     # static site → dist/
npm run preview   # preview the production build
npm run check     # type + content-schema check
```

Requires Node.js ≥ 22.12.

## Customizing

Everything personal lives in a few obvious places:

### 1. `src/config.ts` — site-wide identity

```ts
export const site = {
  name: 'Jamie Morgan',        // your full name
  title: 'Research on …',      // the masthead line on record pages
  blogSubject: 'Notes on …',   // the masthead line on blog routes, and the home-page strip
  role: 'Assistant Professor',
  affiliation: '…',
  location: '…',
  description: '…',            // <meta name="description"> fallback
  url: 'https://example.org',  // keep in sync with astro.config.mjs
  profileImage: '/images/profile.jpg', // portrait on the contact page
  cvPdf: '',                   // set to '/cv.pdf' (place the file in public/) to show the button
};

export const email = { user: 'j.morgan', host: 'example.org' };

export const socials = [
  { label: 'Google Scholar', url: '' },  // leave url empty to hide a link
  { label: 'ORCID', url: '' },
  { label: 'GitHub', url: '' },
  { label: 'Bluesky', url: '' },
  { label: 'LinkedIn', url: '' },
];
```

`activeSocials` (the non-empty ones) is what reaches the masthead. An entry with
a *partly* filled URL, like `https://scholar.google.com/citations?user=` with no
id after the `=`, is non-empty and therefore still renders, so delete the line
or fill in the id rather than leaving the tail empty.

### 2. Publications — one Markdown file per paper

Add files to `src/content/publications/`. The filename becomes the entry id.

```md
---
title: "Your Paper Title"
authors: ["Your Name", "Co-author"]
venue: "Journal / Conference"
year: 2025
type: journal        # journal | conference | workshop | preprint | thesis
doi: "10.…"
arxiv: "https://arxiv.org/abs/…"
pdf: "https://…/paper.pdf"
keywords: ["topic", "method"]
abstract: "One paragraph, shown under a collapsible Abstract."
---

Optional longer description (rendered if the page shows it).
```

Your name is **bolded** in author lists automatically when it matches an entry
in `selfAuthorNames` in `src/config.ts`.

### 3. Research areas — one Markdown file per topic

Add files to `src/content/research/`. The file **body** is the visible
description.

```md
---
title: "Research Area Name"
status: active        # active | completed | planned
since: 2023           # starting year (controls ordering)
keywords: ["…", "…"]
---

Describe the thread in 2–3 sentences.
```

### 4. Blog posts — one Markdown file per post

Add files to `src/content/blog/`. Keep filenames flat and slug-like: the
filename becomes the URL (`hello-world.md` → `/blog/hello-world/`), and a file
in a subdirectory would produce a slug containing a slash, which the
single-segment route does not model.

```md
---
title: "What a PINN actually minimises"
date: 2026-09-02      # quoted 'YYYY-MM-DD' or a bare YAML date, both fine
excerpt: "One paragraph for the listing and the meta description."
image: "/images/post.jpg"   # optional thumbnail under public/
tags: ["PINNs", "Training"]
draft: false          # drafts build in dev, never in production
---

Body in Markdown. Maths works: `$x$` inline and `$$…$$` displayed.
```

Posts are ordered newest first. A `draft: true` post is visible at
`npm run dev` and absent from a production build, the listing, and the sitemap.

**Tags are the site's categories.** They are not decoration: each one becomes a
page at `/blog/tag/<slug>/`, and `allTags` in `src/lib/blog.ts` builds the rail's
WRITING group and the chip row on `/blog/` from them, sorted by how many posts
carry each one. Write a tag in the case you want it displayed (`PINNs`); `tagSlug`
lower-cases it for the URL and folds punctuation to hyphens, so `PINNs` and
`pinns` are one category rather than two.

The blog's subject matter is machine learning and physics-informed neural
networks; the publications, research, projects and CV are the real
nuclear-physics record and are independent of it.

### 5. Talks — `src/data/talks.ts`

One entry per talk, driving the two tables on `/news/`, grouped by `kind`.
`year` is a number for ordering; `date` is the display string. The CV rows are
coarser than this list, so the two are maintained separately: `/cv/` links
across to `/news/` rather than duplicating it.

```ts
{ venue: 'University of Jyväskylä', year: 2023, date: '2023', kind: 'invited' }
```

### 6. CV — `src/data/cv.ts`

Edit `education`, `positions`, `awards`, `teaching`, and `service` arrays
(oldest first; the page renders them in order). `summary` feeds the CV header
and the contact page. A section with no entries renders nothing, so an empty
array is safe. To offer a printable PDF, drop `cv.pdf` in `public/` and set
`site.cvPdf` to `'/cv.pdf'`.

The page has a **Print / Save as PDF** button, which is the only inline
JavaScript on the site. The print stylesheet is section 19 of `global.css` and
is last in the file on purpose: it strips the masthead, the rail and the footer,
keeps each entry whole across a page break, and expands `http` URLs after entry
and publication titles. Verify changes to it by printing `/cv/` and
`/publications/` to PDF, not by reading the CSS.

### 7. News — `src/data/news.ts`

Short dated updates, shown on `/news/` above the talk tables. List most recent
first. The text goes through `MathText`, so `$…$` in an update renders.

### 8. Maths

Maths is rendered by [KaTeX](https://katex.org) **at build time**, so no
client-side JavaScript is shipped. Astro 7's default Markdown processor
(Sätteri) parses `$…$` and `$$…$$` natively but does not render it, so two
plugins in `src/lib/katex-math.mjs` do the rendering: one in the mdast phase for
display maths, one in the hast phase for inline. The split is not arbitrary:
Astro's syntax highlighter runs on `pre` elements ahead of user plugins, so
display maths has to be replaced before it ever becomes a code block.

Frontmatter and `src/data/*.ts` never reach the Markdown pipeline, so maths in a
plain string (a publication title, a CV detail) is rendered with the
`MathText` component instead.

### 9. Look & feel

All colours, spacing, and typography are CSS variables in
`src/styles/global.css` (section 1). `--accent` is the near-black `#222` used for
headings and links; the theme is deliberately monochrome, so there is no accent
hue to change. `--shell` (75rem) sets the page column, `--rail` (15rem) the left
rail, and `--measure` (44rem) caps long-form prose, so listings, chip rows and
code fill the column while lines of text stay readable.

The file has 19 numbered sections and **print is the last one**, deliberately: it
previously sat before three later sections, where a rule of equal specificity
could silently beat it. For the same reason every layout breakpoint is written
`@media screen and (max-width: …)`. A Letter page is about 739 CSS px of content,
which is below the row-collapse breakpoint, so an unscoped `max-width` query
fires when you print and quietly restacks the listings.

No design token is referenced outside this file, so renaming or deleting one is a
one-file change. Class names are not: `.math-block` in particular is emitted by
`src/lib/katex-math.mjs` rather than by a component, so a search across the
`.astro` files will not find its consumer.

## Verification

The layout claims in this file are checked against geometry, not against a
screenshot. Two scripts drive headless Chrome over the DevTools protocol and set
the width on the *layout viewport*, because the browser clamps its own window to
500px and every interesting breakpoint here is narrower:

```bash
npm run build && npm run preview            # serves dist/ on :4322
node scripts/probe.mjs http://localhost:4322/ 400        # overflow, rail, measure
node scripts/probe.mjs http://localhost:4322/cv/ 740 print
node scripts/shot.mjs  http://localhost:4322/blog/ 400 .shots/blog-mobile.png
```

`probe.mjs` reports `overflow` (page-level horizontal scroll, which must be `0`),
any element reaching past the viewport with no scrolling ancestor, the width of a
prose block, and whether the rail is `sticky` or `static`. Write screenshots
inside the project directory: reads outside the working directory are blocked.

For print, use Chrome directly and then read the PDF, since the failure modes
(clipped rows, an orphaned heading, the chrome reappearing) are all visual:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --no-pdf-header-footer --print-to-pdf=.shots/cv-print.pdf \
  http://localhost:4322/cv/
```

## Project structure

```
src/
├── content.config.ts        # collections schema (publications, research, blog)
├── content/
│   ├── publications/*.md    # one file per paper
│   ├── research/*.md        # one file per research area
│   └── blog/*.md            # one file per post (flat filenames)
├── data/                    # cv.ts, news.ts, talks.ts, projects.ts
├── lib/
│   ├── katex-math.mjs       # build-time maths rendering
│   ├── blog.ts              # dates, hrefs, draft filtering, tags
│   └── nav.ts               # the rail's link map, shared with the 404
├── config.ts                # site-wide identity (name, email, socials)
├── components/
│   ├── Masthead.astro       # name, subject, utility links
│   ├── Rail.astro           # the left rail; computes its own tag links
│   ├── IndexLabels.astro    # the uppercase column-label row
│   ├── PostRow.astro        # a post as an index row
│   ├── TalkRow.astro        # a talk as an index row
│   ├── PublicationCard.astro, ResearchCard.astro, ProjectCard.astro
│   ├── MathText.astro       # maths in frontmatter and src/data strings
│   └── Footer.astro
├── layouts/BaseLayout.astro # HTML shell, meta, masthead, rail, fonts
├── pages/                   # the routes + generated robots.txt
└── styles/global.css        # design system, print last

scripts/                    # headless-Chrome probes for layout and print
public/                     # static assets (favicon.svg) copied to dist/
```

## Deployment

- **GitHub Pages**: use an [Astro GitHub Pages
  workflow](https://docs.astro.build/en/guides/deploy/github/) with Node 22+
  and `npm run build` (output in `dist/`). For a *project* site
  (`https://username.github.io/<repo>/`), also set `base: '/<repo>/'` and
  `site: 'https://username.github.io/<repo>/'` in `astro.config.mjs` — without
  `base`, every route and asset is emitted at absolute `/…` paths and the site
  404s.
- **Netlify / Vercel**: connect the repo; the default Astro build settings work.

Set the `site` URL in `astro.config.mjs` and `src/config.ts` to your real
domain before deploying — it drives canonical URLs, the sitemap, and the
generated `robots.txt` (`src/pages/robots.txt.ts`).
