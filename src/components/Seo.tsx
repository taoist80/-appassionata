import { OG_IMAGE, PAGE_SEO, SITE_URL, STUDIO } from "../data/site";

/**
 * Per-page metadata via React 19's native document-metadata hoisting: <title>,
 * <meta>, and <link> rendered here are lifted into <head>. Copy is centralized
 * in PAGE_SEO (src/data/site.ts), keyed by route path.
 *
 * Note (CSR): non-JS scrapers see the generic tags baked into index.html; these
 * per-page tags apply once the app renders (fine for Googlebot, which runs JS).
 */
export default function Seo({
  path,
  noindex = false,
}: {
  path: string;
  noindex?: boolean;
}) {
  const seo = PAGE_SEO[path] ?? {
    title: STUDIO.name,
    description: STUDIO.tagline,
  };
  const canonical = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={STUDIO.name} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </>
  );
}
