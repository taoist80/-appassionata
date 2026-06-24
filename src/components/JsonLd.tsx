/**
 * Renders a JSON-LD structured-data block. Google reads ld+json anywhere in the
 * DOM, so per-page schema (BreadcrumbList, FAQPage, …) can live in the page body.
 * The site-wide LocalBusiness graph lives statically in index.html.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
