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

## Before Commit

Run `npm run validate`, `git diff --check`, `git status --short`, and inspect the
diff manually. Do not use `git add .`.
