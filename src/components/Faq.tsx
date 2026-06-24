import JsonLd from "./JsonLd";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Visible FAQ accordion (daisyUI collapse) that also emits FAQPage JSON-LD.
 * Answers stay in the DOM (collapse only hides visually), so they're crawlable.
 * `variant` adapts the type to the Classic or Editorial layout.
 */
export default function Faq({
  items,
  heading = "Common questions",
  variant = "classic",
}: {
  items: FaqItem[];
  heading?: string;
  variant?: "classic" | "editorial";
}) {
  const editorial = variant === "editorial";
  const headingCls = editorial
    ? "font-editorial font-semibold text-[1.7rem] text-[#1F2227] tracking-[-.01em] mb-3"
    : "font-display font-semibold text-[1.9rem] text-secondary mb-3";
  const titleCls = editorial
    ? "collapse-title font-editorial font-semibold text-[1.12rem] text-[#1F2227]"
    : "collapse-title font-display font-semibold text-[1.1rem] text-secondary";
  const contentCls = editorial
    ? "collapse-content font-editorial text-[1.05rem] leading-[1.7] text-[#2a2d33]"
    : "collapse-content text-[1rem] leading-[1.7] text-[#2a2d33]";

  return (
    <section className="mt-10">
      <h2 className={headingCls}>{heading}</h2>
      <div className="flex flex-col gap-2">
        {items.map((it, i) => (
          <div
            key={it.q}
            className="collapse collapse-arrow border border-base-300 rounded-box bg-base-100"
          >
            <input type="checkbox" defaultChecked={i === 0} aria-label={it.q} />
            <div className={titleCls}>{it.q}</div>
            <div className={contentCls}>
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
