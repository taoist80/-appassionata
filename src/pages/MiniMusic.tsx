import type { ReactNode } from "react";
import PageHeader from "../components/PageHeader";
import { P, H2 } from "../components/typography";
import BookTrial from "../components/BookTrial";
import Seo from "../components/Seo";
import JsonLd from "../components/JsonLd";
import { breadcrumbLd } from "../data/site";

const MINIMUSIC_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Would MiniMusic be a good fit for my child?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MiniMusic suits children ages 5–7 who want to explore music and instruments before committing to individual lessons. No piano at home is needed — all learning happens in class and no practicing is required.",
      },
    },
    {
      "@type": "Question",
      name: "When and where does MiniMusic meet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wednesdays 5:00–6:00 pm at the home studio in Sandy, Utah, a block south of Alta View Elementary.",
      },
    },
    {
      "@type": "Question",
      name: "How much is MiniMusic tuition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "$110 per month, including the activity book and all supplies. It is a 12-month program — a 30-week school year plus a summer session.",
      },
    },
  ],
};

function FactCard({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-[12px] border border-base-300 bg-base-100 p-[14px_16px]">
      <div className="text-[.72rem] uppercase tracking-[.1em] text-primary font-bold mb-1">
        {label}
      </div>
      <div className="text-[.98rem] text-base-content">{value}</div>
    </div>
  );
}

export default function MiniMusic() {
  return (
    <article>
      <Seo path="/programs/minimusic" />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Programs & Tuition", path: "/programs" },
          { name: "MiniMusic Class", path: "/programs/minimusic" },
        ])}
      />
      <JsonLd data={MINIMUSIC_FAQ} />

      <PageHeader
        eyebrow="Ages 5–7"
        title="MiniMusic Class"
        lede="A joyful first introduction to music — no piano required"
      />

      <H2 className="text-[1.7rem] mt-0">Would MiniMusic be a good fit?</H2>
      <ul className="font-sans text-[1.02rem] leading-[1.7] text-[#2a2d33] mb-[1.4rem] pl-[1.2rem] list-disc">
        <li className="mb-[.4rem]">
          Want your child (5–7) to explore music and instruments before
          committing to individual lessons?
        </li>
        <li className="mb-[.4rem]">
          Want them excited and confident about learning while they're young?
        </li>
        <li>Not sure yet if they'll love the piano?</li>
      </ul>
      <P className="leading-[1.75] mb-[1.6rem]">
        If you answered yes, start with MiniMusic. No piano at home is needed —
        all learning is done in class, and no practicing is required.
      </P>

      <H2 className="text-[1.7rem]">The essentials</H2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        <FactCard label="When" value="Wednesdays 5:00–6:00 pm" />
        <FactCard label="Tuition" value="$110/mo · book & supplies included" />
        <FactCard label="Length" value="12 months · 30-week school year + summer" />
        <FactCard label="Where" value="Home studio in Sandy" />
      </div>

      <p className="text-[.95rem] text-[#4A4F57] mt-[1.4rem]">
        Registration: non-refundable $25 fee. New families{" "}
        <BookTrial className="inline align-baseline bg-transparent border-0 p-0 m-0 text-primary font-bold cursor-pointer hover:underline">
          book a meet-and-greet
        </BookTrial>{" "}
        before starting class.
      </p>
    </article>
  );
}
