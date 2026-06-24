import type { ReactNode } from "react";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import JsonLd from "../components/JsonLd";
import { breadcrumbLd } from "../data/site";

function PolicyCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[14px] border border-base-300 bg-base-100 p-[18px_20px]">
      <h3 className="font-display font-bold text-[1.25rem] text-secondary mt-0 mb-[.4rem]">
        {title}
      </h3>
      <p className="text-[.95rem] leading-[1.65] m-0 text-[#4A4F57]">
        {children}
      </p>
    </div>
  );
}

export default function Policies() {
  return (
    <article>
      <Seo path="/policies" />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Studio Policies", path: "/policies" },
        ])}
      />

      <PageHeader
        eyebrow="Updated July 2025"
        title="Studio Life & Policy"
        lede="How we partner with families for a lifetime of music"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <PolicyCard title="Laura's philosophy">
          Sensitive to each learning style, building well-rounded, confident
          musicians in a patient, encouraging atmosphere across varied genres.
        </PolicyCard>
        <PolicyCard title="Parents: a key to success">
          Consistent daily practice, weekly notebook checks, a tuned instrument
          at home, and open communication make all the difference.
        </PolicyCard>
        <PolicyCard title="Student expectations">
          Note reading, theory, technique, ear training, and musicianship.
          Arrive prepared, practice 5 days a week, and have fun.
        </PolicyCard>
        <PolicyCard title="Tuition">
          All-inclusive: classes, parties, camps, materials, and recitals. 12
          equal monthly payments based on enrollment, due by the 6th. Pay by
          cash, check, Zelle, bank bill pay, PayPal, or Venmo.
        </PolicyCard>
        <PolicyCard title="Attendance & missed lessons">
          Cancel on the studio calendar with 24 hrs notice. Make-up options
          include Skype lessons, same-week reschedules (when available), and
          recorded video lessons.
        </PolicyCard>
        <PolicyCard title="Performance opportunities">
          Two recitals a year (Fall &amp; Spring), with flexible alternatives and
          performance-anxiety accommodations. Optional festivals and achievement
          exams.
        </PolicyCard>
        <PolicyCard title="Music library">
          Borrow 3–5 supplementary books a year — Piano Adventures, Piano Safari,
          Suzuki, cello music, and digital resources — a big savings for
          families.
        </PolicyCard>
        <PolicyCard title="Lesson evaluation">
          An annual written/conference evaluation covers technique, theory,
          preparation, practice, and attitude.
        </PolicyCard>
      </div>

      <p className="text-[.9rem] text-[#4A4F57] mt-[1.4rem] border-t border-base-300 pt-3.5">
        Summer Session (June–August) has no reschedules or credits. The full
        written policy is provided to enrolled families.
      </p>
    </article>
  );
}
