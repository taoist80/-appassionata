import { Fragment } from "react";
import Seo from "../../components/Seo";
import JsonLd from "../../components/JsonLd";
import { breadcrumbLd } from "../../data/site";
import {
  EditorialHeader,
  EdP,
  EdH2,
  EdHr,
} from "../../components/editorial/prose";

const SECTIONS: [string, string][] = [
  [
    "Laura's philosophy",
    "Sensitive to each learning style, building well-rounded, confident musicians in a patient, encouraging atmosphere across varied genres.",
  ],
  [
    "Parents: a key to success",
    "Consistent daily practice, weekly notebook checks, a tuned instrument at home, and open communication make all the difference in a student's progress.",
  ],
  [
    "Student expectations",
    "Note reading, theory, technique, ear training, and musicianship. Arrive prepared, practice 5 days a week, and have fun.",
  ],
  [
    "Tuition",
    "All-inclusive of classes, parties, camps, materials, and recitals. Twelve equal monthly payments based on enrollment, due by the 6th. Pay by cash, check, Zelle, bank bill pay, PayPal, or Venmo.",
  ],
  [
    "Attendance & missed lessons",
    "Cancel on the studio calendar with at least 24 hours' notice. Make-up options include Skype lessons, same-week reschedules when available, and recorded video lessons.",
  ],
  [
    "Performance opportunities",
    "Two recitals a year (Fall & Spring), with flexible alternatives and performance-anxiety accommodations, plus optional festivals and achievement exams.",
  ],
  [
    "Music library",
    "Borrow 3–5 supplementary books a year — Piano Adventures, Piano Safari, Suzuki, cello music, and digital resources — a big savings for families.",
  ],
  [
    "Lesson evaluation",
    "An annual written/conference evaluation covers technique, theory, preparation, practice, and attitude.",
  ],
];

export default function EditorialPolicies() {
  return (
    <article>
      <Seo path="/policies" />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Studio Policies", path: "/policies" },
        ])}
      />

      <EditorialHeader
        eyebrow="Updated July 2025"
        title="Studio Life & Policy"
        lede="How we partner with families for a lifetime of music"
      />

      {SECTIONS.map(([title, body], i) => (
        <Fragment key={title}>
          {i > 0 && <EdHr />}
          <EdH2>{title}</EdH2>
          <EdP className="mb-0">{body}</EdP>
        </Fragment>
      ))}

      <p className="font-sans text-[.9rem] text-[#6b6259] mt-10 border-t border-[#E7E2DE] pt-6">
        Summer Session (June–August) has no reschedules or credits. The full
        written policy is provided to enrolled families.
      </p>
    </article>
  );
}
