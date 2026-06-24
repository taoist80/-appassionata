import Seo from "../../components/Seo";
import JsonLd from "../../components/JsonLd";
import BookTrial from "../../components/BookTrial";
import { breadcrumbLd } from "../../data/site";
import { EditorialHeader, EdP, EdH2 } from "../../components/editorial/prose";

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

const ESSENTIALS: [string, string][] = [
  ["When", "Wednesdays 5:00–6:00 pm"],
  ["Tuition", "$110/mo · book & supplies included"],
  ["Length", "12 months · 30-week school year + summer"],
  ["Where", "Home studio in Sandy, Utah"],
];

export default function EditorialMiniMusic() {
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

      <EditorialHeader
        eyebrow="Ages 5–7"
        title="MiniMusic Class"
        lede="A joyful first introduction to music — no piano required"
      />

      <EdH2>Would MiniMusic be a good fit?</EdH2>
      <ul className="font-editorial text-[1.12rem] leading-[1.7] text-[#2a2d33] list-disc pl-6 mb-6">
        <li className="mb-1.5">
          Want your child (5–7) to explore music and instruments before
          committing to individual lessons?
        </li>
        <li className="mb-1.5">
          Want them excited and confident about learning while they're young?
        </li>
        <li>Not sure yet if they'll love the piano?</li>
      </ul>
      <EdP>
        If you answered yes, start with MiniMusic. No piano at home is needed —
        all learning is done in class, and no practicing is required.
      </EdP>

      <EdH2 className="mt-10">The essentials</EdH2>
      <dl className="mt-2">
        {ESSENTIALS.map(([k, v]) => (
          <div key={k} className="flex gap-5 py-3 border-b border-[#E7E2DE]">
            <dt className="font-sans uppercase tracking-[.12em] text-[.72rem] text-primary font-bold w-[96px] shrink-0 pt-1">
              {k}
            </dt>
            <dd className="font-editorial text-[1.08rem] text-[#1F2227] m-0">
              {v}
            </dd>
          </div>
        ))}
      </dl>

      <p className="font-editorial text-[1.05rem] text-[#4A4F57] mt-8">
        Registration: non-refundable $25 fee. New families{" "}
        <BookTrial className="inline align-baseline bg-transparent border-0 p-0 m-0 text-primary font-semibold cursor-pointer hover:underline">
          book a meet-and-greet
        </BookTrial>{" "}
        before starting class.
      </p>
    </article>
  );
}
