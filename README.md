# Academic Portfolio

A modern-minimal academic research portfolio built with [Astro](https://astro.build).
Static output — fast, accessible, and deployable to GitHub Pages, Netlify, or Vercel.

## Pages

| Route            | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| `/`              | Home — hero, selected publications, research, news |
| `/research/`     | Research areas (from content collections)      |
| `/publications/` | Full publication list, grouped by year         |
| `/cv/`           | Structured CV (positions, education, awards, …) |
| `/contact/`      | Email, office, social links                   |

Dark mode is supported and follows your system preference; the toggle in the
header persists your choice.

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
  firstName: 'Jamie',          // wordmark in the header
  title: 'Research on …',      // hero tagline + meta description
  role: 'Assistant Professor',
  affiliation: '…',
  location: '…',
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

Your name is **bolded** in author lists automatically when it matches
`site.name`.

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

### 4. CV — `src/data/cv.ts`

Edit `education`, `positions`, `awards`, `teaching`, and `service` arrays
(oldest first; the page renders them in order). `summary` feeds the home page
and the CV header. To offer a printable PDF, drop `cv.pdf` in `public/` and
set `site.cvPdf` to `'/cv.pdf'`.

### 5. News — `src/data/news.ts`

Short dated updates shown on the home page. List most recent first.

### 6. Look & feel

All colors, spacing, and typography are CSS variables in
`src/styles/global.css` (sections 1–2). The accent color is `--accent`.

## Project structure

```
src/
├── content.config.ts        # collections schema (publications, research)
├── content/
│   ├── publications/*.md    # one file per paper
│   └── research/*.md        # one file per research area
├── data/                    # cv.ts, news.ts (structured content)
├── config.ts                # site-wide identity (name, email, socials)
├── components/              # Nav, Footer, ThemeToggle, cards
├── layouts/BaseLayout.astro # HTML shell, meta, theme bootstrapping
├── pages/                   # the five routes + generated robots.txt
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
