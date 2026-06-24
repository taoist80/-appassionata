import { Fragment } from "react";
import Seo from "../../components/Seo";
import JsonLd from "../../components/JsonLd";
import { breadcrumbLd, SITE_URL, STUDIO } from "../../data/site";
import { EditorialHeader, EdHr } from "../../components/editorial/prose";

interface Quote {
  name: string;
  display: string;
  body: string;
  detail: string;
}

const TESTIMONIALS: Quote[] = [
  {
    name: "Valerie",
    display:
      "“You've had such an impact on my life. Thank you for showing me what it's like to have a passion for music and inspiring me to pursue it.”",
    body: "You've had such an impact on my life. Thank you for showing me what it's like to have a passion for music and inspiring me to pursue it.",
    detail: "Piano Performance & Pedagogy, Utah State University · Student 2010–2022",
  },
  {
    name: "Sawyer",
    display:
      "“I looked forward to lessons every week. You gave me a space to reset and just play the piano. Thank you for everything!”",
    body: "I looked forward to lessons every week. You gave me a space to reset and just play the piano. Thank you for everything!",
    detail: "Law & Music, Stanford University · Student 2014–2022",
  },
];

export default function EditorialTestimonials() {
  return (
    <article>
      <Seo path="/testimonials" />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials" },
        ])}
      />
      {TESTIMONIALS.map((t) => (
        <JsonLd
          key={t.name}
          data={{
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "MusicSchool",
              "@id": `${SITE_URL}/#studio`,
              name: STUDIO.name,
            },
            author: { "@type": "Person", name: t.name },
            reviewBody: t.body,
          }}
        />
      ))}

      <EditorialHeader eyebrow="In their words" title="Testimonials" />

      {TESTIMONIALS.map((t, i) => (
        <Fragment key={t.name}>
          {i > 0 && <EdHr />}
          <figure className="text-center m-0">
            <p className="font-editorial italic text-[1.5rem] leading-[1.5] text-[#1F2227] max-w-[36ch] mx-auto mb-4">
              {t.display}
            </p>
            <figcaption className="font-sans text-[.85rem] text-[#6b6259]">
              <strong className="text-primary">{t.name}</strong> — {t.detail}
            </figcaption>
          </figure>
        </Fragment>
      ))}

      <p className="font-sans text-[.9rem] text-[#a99f95] text-center mt-10">
        More testimonials coming soon…
      </p>
    </article>
  );
}
