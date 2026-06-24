# Appassionata Piano & Cello Studio — website

Marketing site for a home piano/cello studio in Sandy, Utah ("Option A — Refined
Classic"). Vite + React 19 + TypeScript, Tailwind v4 + daisyUI v5, react-router.
Transactional features (booking, contact, member login) are **My Music Staff**
widgets; see `src/components/MmsWidget.tsx`.

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc -b && vite build  → dist/
npm run preview      # serve the production build
```

## Environment

Copy `.env.example` → `.env.local`:

- `VITE_GA4_ID` — GA4 Measurement ID (`G-XXXXXXXXXX`). Analytics
  (`src/components/Analytics.tsx`) is a no-op until this is set.

## SEO

- **Canonical domain** lives in one place: `SITE_URL` in `src/data/site.ts`
  (currently `https://appassionata-piano.pro`). Used for canonical links, the
  sitemap, and Open Graph URLs — change it there if the domain changes.
- Per-page titles/descriptions: `PAGE_SEO` in `src/data/site.ts`, rendered via
  `src/components/Seo.tsx` (React 19 native metadata).
- Site-wide `LocalBusiness`/`MusicSchool` JSON-LD + default OG/Twitter tags are
  static in `index.html` (so non-JS crawlers/social scrapers see them).
  Per-page `BreadcrumbList`/`FAQPage`/`Review` JSON-LD via `src/components/JsonLd.tsx`.
- `public/robots.txt` + `public/sitemap.xml` — **update the sitemap when routes
  change** (it's a static file).

## Deploy (AWS, CDK)

Static site on S3 + CloudFront in `infra/` (account `truemark-dev-jgilgen`, us-east-1).

```bash
npm run build
cd infra
npx cdk deploy AppassionataSiteStack --require-approval never   # custom domain stays ON
```

- **Custom domain is ON by default** (ACM cert + apex/www Route 53 aliases). A plain
  `cdk deploy` preserves it. Pass **`-c domain=off`** only to deploy without the
  domain (e.g. before NS delegation) — do NOT use it on the live site, it removes
  the alias records and the apex stops resolving.
- **Custom domain setup (one-time):** delegate the domain's nameservers (at Porkbun)
  to the Route 53 hosted zone from `AppassionataDnsStack`, then `cdk deploy` the site stack.
- **Google Search Console** (domain verification) — pass the token to the DNS stack:
  ```bash
  npx cdk deploy AppassionataDnsStack -c gscToken=<verification-token>
  ```
- Teardown: `npx cdk destroy AppassionataSiteStack AppassionataDnsStack`.
