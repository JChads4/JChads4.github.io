# Academic Portfolio

A minimal academic research portfolio built with [Astro](https://astro.build),
styled after the WordPress Twenty Seventeen theme.
Static output — fast, accessible, and deployable to GitHub Pages, Netlify, or Vercel.

## Pages

| Route            | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| `/`              | Home — about, selected publications, research, teaching, news, invited talks, latest posts |
| `/blog/`         | Blog listing (newest first, drafts excluded)   |
| `/blog/<slug>/`  | One page per post                              |
| `/research/`     | Research areas (from content collections)      |
| `/publications/` | Full publication list, grouped by year         |
| `/cv/`           | Structured CV (positions, education, awards, …) |
| `/contact/`      | Email, office, social links                   |

The design follows the WordPress **Twenty Seventeen** theme: grey only, flat
borders instead of shadows, a full-bleed banner behind the site title, and a
white nav bar wider than the text column. There is no colour accent and no dark
mode, both deliberate.

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
  title: 'Research on …',      // banner tagline + meta description
  role: 'Assistant Professor',
  affiliation: '…',
  location: '…',
  profileImage: '/images/profile.jpg', // portrait beside the home-page summary
  bannerImage: '',             // full-bleed banner, ~1600x960; empty = plain dark banner
  cvPdf: '',                   // set to '/cv.pdf' (place the file in public/) to show the button
  url: 'https://example.org',  // keep in sync with astro.config.mjs
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
tags: ["pinns"]
draft: false          # drafts build in dev, never in production
---

Body in Markdown. Maths works: `$x$` inline and `$$…$$` displayed.
```

Posts are ordered newest first. A `draft: true` post is visible at
`npm run dev` and absent from a production build, the listing, and the sitemap.
The blog's subject matter is machine learning and physics-informed neural
networks; the publications, research, projects and CV are the real
nuclear-physics record and are independent of it.

### 5. Talks — `src/data/talks.ts`

One entry per talk, driving the front-page "Invited talks" block (filtered to
`kind: 'invited'`). `year` is a number for ordering; `date` is the display
string. The CV rows are coarser than this list, so the two are maintained
separately.

```ts
{ venue: 'University of Jyväskylä', year: 2023, date: '2023', kind: 'invited' }
```

### 6. CV — `src/data/cv.ts`

Edit `education`, `positions`, `awards`, `teaching`, and `service` arrays
(oldest first; the page renders them in order). `summary` feeds the home page
and the CV header. The home page's Teaching block reads this file's `Teaching`
section directly, so adding entries there updates both pages. To offer a
printable PDF, drop `cv.pdf` in `public/` and set `site.cvPdf` to `'/cv.pdf'`.

### 7. News — `src/data/news.ts`

Short dated updates shown on the home page. List most recent first.

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
`src/styles/global.css` (section 1). `--accent` is the near-black `#222` used
for headings and links; the theme is deliberately monochrome, so there is no
accent hue to change. `--container` (1080px) and `--shell` (1080px) set the page
column, and `--measure` (48rem) caps long-form prose inside it, so cards, chip
rows, images and code fill the column while lines of text stay readable.

## Project structure

```
src/
├── content.config.ts        # collections schema (publications, research, blog)
├── content/
│   ├── publications/*.md    # one file per paper
│   ├── research/*.md        # one file per research area
│   └── blog/*.md            # one file per post (flat filenames)
├── data/                    # cv.ts, news.ts, talks.ts (structured content)
├── lib/
│   ├── katex-math.mjs       # build-time maths rendering
│   └── blog.ts              # post dates, hrefs, draft filtering
├── config.ts                # site-wide identity (name, email, socials)
├── components/              # Nav, Footer, cards, MathText
├── layouts/BaseLayout.astro # HTML shell, meta, banner, fonts
├── pages/                   # the routes + generated robots.txt
└── styles/global.css        # design system

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
