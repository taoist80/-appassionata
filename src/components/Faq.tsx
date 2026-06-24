import JsonLd from "./JsonLd";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Visible FAQ accordion (daisyUI collapse) that also emits FAQPage JSON-LD.
 * Answers stay in the DOM (collapse only hides visually), so they're crawlable.
 */
export default function Faq({
  items,
  heading = "Common questions",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display font-semibold text-[1.9rem] text-secondary mb-3">
        {heading}
      </h2>
      <div className="flex flex-col gap-2">
        {items.map((it, i) => (
          <div
            key={it.q}
            className="collapse collapse-arrow border border-base-300 rounded-box bg-base-100"
          >
            <input type="checkbox" defaultChecked={i === 0} aria-label={it.q} />
            <div className="collapse-title font-display font-semibold text-[1.1rem] text-secondary">
              {it.q}
            </div>
            <div className="collapse-content text-[1rem] leading-[1.7] text-[#2a2d33]">
              <p>{it.a}</p>
            </div>
          </div>
        ))}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }}
      />
    </section>
  );
}
