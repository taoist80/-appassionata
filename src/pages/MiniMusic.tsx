import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import PageHeader from "../components/PageHeader";
import { P, H2 } from "../components/typography";

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
        <Link
          to="/contact"
          className="text-primary font-bold no-underline hover:underline"
        >
          book a meet-and-greet
        </Link>{" "}
        before starting class.
      </p>
    </article>
  );
}
