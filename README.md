# Islam Duishobaev — Portfolio

Personal portfolio for Python Backend / Full Stack roles. Built with React 19, TypeScript, Vite, Tailwind CSS 4 and React Router 7.

The site is bilingual (English by default, Russian via the `RU / EN` switch in the header). Content is typed, and every project fact is tagged as either **CV** (candidate-reported) or **Repository** (checked in source code). Anything that could not be verified is shown on the case-study page under “Not verified in this write-up”.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, recruiter fact sheet, featured projects, core skills |
| `/about` | Profile, working principles, education, languages |
| `/projects` | All case studies with category filter |
| `/projects/:slug` | Case study: problem, solution, contribution, architecture, data flow, database, API examples, challenges, results, unverified items |
| `/experience` | Work history from the CV, education, CV download |
| `/tech-stack` | Stack grouped by area, with where each technology was used |
| `/architecture` | Request, background-job and ingestion flows, linked to source |
| `/blog` | Writing page (honest empty state until articles exist) |
| `/contact` | Email, phone, Telegram, LinkedIn, GitHub, CV |
| `*` | Custom 404 (`noindex`) |

## Commands

```bash
npm install
npm run dev         # http://localhost:5173
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm test            # vitest (data integrity checks)
npm run build       # typecheck + vite build + sitemap (if VITE_SITE_URL is set)
npm run preview     # serve dist/ locally on :4173
```

## Configuration

Copy `.env.example` to `.env` (or set environment variables in your host) and set:

- `VITE_SITE_URL` — the production origin, for example `https://your-domain.example`. When set, the build adds canonical URLs, absolute Open Graph URLs and `dist/sitemap.xml`, and appends a `Sitemap:` line to `robots.txt`. Without it these are skipped, because the production domain is not configured yet.

### OkurmenKIDS video (`VITE_OKURMENKIDS_YOUTUBE_VIDEO_ID`)

The OkurmenKIDS case study (`/projects/okurmenkids`) and its project card show a YouTube walkthrough.

- Set `VITE_OKURMENKIDS_YOUTUBE_VIDEO_ID` to the 11-character video ID (the `xxxxxxxxxxx` in `https://www.youtube.com/watch?v=xxxxxxxxxxx`) in `.env` or in the host's environment variables, then rebuild.
- While it is empty (or not a valid ID), the page shows a poster with a clearly marked “Video coming soon” placeholder; no player or YouTube link is rendered.
- The player is click-to-load: nothing is requested from YouTube until the visitor presses play, and the iframe uses `youtube-nocookie.com`.
- The ID is parsed in `src/data/video.ts` (`OKURMENKIDS_YOUTUBE_VIDEO_ID`); the poster is `public/img/okurmenkids-youtube-thumbnail.jpg`.

## Deployment

The app uses client-side routing with `BrowserRouter`, so the host must serve `index.html` for every path:

- **Vercel**: `vercel.json` already contains the rewrite. Build command `npm run build`, output `dist`.
- **Netlify / Cloudflare Pages**: `public/_redirects` is copied into `dist/` and contains the SPA fallback.
- **Any other static host**: configure a rewrite of all paths to `/index.html`. Without it, direct URLs such as `/projects/jobpulse` return 404 from the host.

Note: the 404 page is rendered by the client, so static hosts return HTTP 200 for unknown paths unless they are configured to return 404 for them.

## Languages (i18n)

All text lives in one place per language; components read it through the `useI18n()` hook, so switching language re-renders the page in place without a reload. The choice is saved in `localStorage` (`locale-preference`) and mirrored to `<html lang>` and `og:locale`.

```
src/i18n/
  config.ts          LOCALES, DEFAULT_LOCALE ('en'), LOCALE_META, localStorage helpers
  types.ts           Dictionary interface: ui strings, profile content, project texts
  dictionaries.ts    locale → dictionary registry
  LanguageProvider.tsx, context.ts   React context + useI18n()
  locales/en/        ui.ts · profile.ts · projects.ts
  locales/ru/        ui.ts · profile.ts · projects.ts
```

Language-neutral data (contacts, links, tech stack, endpoint paths, image files) stays in `src/data/`.

**Adding a language** (for example Kyrgyz, `ky`):

1. Add `'ky'` to `LOCALES` and an entry to `LOCALE_META` in `src/i18n/config.ts`.
2. Copy `src/i18n/locales/en/` to `src/i18n/locales/ky/` and translate the values.
3. Register it in `src/i18n/dictionaries.ts`.

TypeScript reports any missing key, and `npm test` checks that every dictionary has the same structure (keys, list lengths, non-empty strings) as the English one. The switcher picks the new language up automatically.

## Adding or editing a project

Language-neutral facts (slug, category, stack, GitHub link, endpoint paths, image files) go in `src/data/projects.ts`; texts go in `src/i18n/locales/<lang>/projects.ts` under the same slug, with one endpoint note per endpoint and one alt text per image. Add the slug to the `ProjectSlug` type in `src/types.ts`. Each metric needs a `source` of `CV` or `Repository`. `npm test` checks slugs, links, image paths, endpoint prefixes and translation completeness.

Images live in `public/img/`. The CV is `public/cv/Islam-Duishobaev-CV.pdf`; replace the file to update the download.
