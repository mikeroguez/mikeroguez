# Development

## Requirements

- Node.js 22 or newer.
- npm 10 or newer.
- Git.

## Install

```sh
npm install
```

## Commands

- `npm run dev`: start Vite locally.
- `npm run build`: typecheck, build to `dist/`, and create `dist/404.html`.
- `npm run preview`: preview the production build.
- `npm run format`: format files.
- `npm run format:check`: verify formatting.
- `npm run lint`: run ESLint.
- `npm run typecheck`: run Vue TypeScript checks.
- `npm run test:run`: run unit tests.
- `npm run test:coverage`: run tests with coverage.
- `npm run check:public`: run public repository safety checks.
- `npm run validate`: run the full validation sequence.

## Structure

The site is a Vue 3 SPA built with Vite and TypeScript. Routes live in
`src/router/`, pages in `src/views/`, shared layout in `src/layouts/`, and native
CSS in `src/assets/styles/`.

`public/` is copied directly to the build output. Only approved public files
belong there.

## `.local-context/`

`.local-context/` is local evidence storage and is ignored by Git. Agents may
read it, but must not copy private material into public files. Prefer
`approved/`, then `reviewed/`, and treat `raw/` as source evidence only.

## Workflow

1. Read the relevant docs and evidence.
2. Make small changes.
3. Run validation.
4. Review accessibility and privacy.
5. Inspect the diff before any commit proposal.

## Testing

Unit tests use Vitest, jsdom, and Vue Test Utils. Add tests when changing router,
layout, components, or publication-sensitive behavior.

## Deployment

GitHub Actions builds `dist/`, creates a SPA fallback `404.html`, uploads the
artifact, and deploys to GitHub Pages. `public/CNAME` configures
`mikeroguez.me`.

GitHub Pages has no server rewrite for SPA routes, so the build copies
`dist/index.html` to `dist/404.html`. Direct navigation returns the fallback and
Vue Router resolves the client route.

## Troubleshooting

- If direct routes fail, confirm `dist/404.html` exists.
- If the custom domain fails, confirm `dist/CNAME` exists after build.
- If validation fails on public safety, inspect the exact file named by the
  script and perform human review.

## New Content Rules

Every public claim needs evidence, source date, publication authorization, and
privacy review. Do not publish private data or unverified achievements.

## Blog Posts

Blog entries live in `src/content/posts/`. Each Markdown file becomes one entry
at `/blog/{slug}`, where `{slug}` is the filename without `.md`.

Use lowercase slugs with hyphens, for example:

```text
src/content/posts/nota-sobre-diseno-educativo.md
```

Required frontmatter:

```md
---
title: 'Public title'
description: 'Short summary for index and metadata.'
date: '2026-07-13'
status: 'draft'
---
```

Only `published` entries appear in the blog index. Do not commit private drafts,
secrets, personal data, client details, student data, or unverified claims. A
committed Markdown file is public even when its status is `draft`.

The blog index at `/blog` includes local search, a side index, year filters, and
incremental loading in groups of six posts. Search uses the generated
`searchText` field, so run `npm run generate:blog` after editing posts.

`npm run generate:blog` reads the Markdown files once and generates:

- `src/content/generated/blog-posts.ts` for the Vue app.
- `public/feed.xml` for RSS readers.
- `public/sitemap.xml` for the public routes and published posts.

Do not edit generated blog output by hand; edit the Markdown source instead.

## Before Commit

Run `npm run validate`, `git diff --check`, `git status --short`, and inspect the
diff manually. Do not use `git add .`.
