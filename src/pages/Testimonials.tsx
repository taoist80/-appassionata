import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import JsonLd from "../components/JsonLd";
import { breadcrumbLd, SITE_URL, STUDIO } from "../data/site";

interface Quote {
  photo: string;
  name: string;
  /** Displayed quote (with typographic quote marks). */
  display: string;
  /** Plain-text body for Review schema (no surrounding quotes). */
  body: string;
  detail: string;
}

const TESTIMONIALS: Quote[] = [
  {
    photo: "/images/testimonial-valerie.jpg",
    name: "Valerie",
    display:
      "“You've had such an impact on my life. Thank you for showing me what it's like to have a passion for music and inspiring me to pursue it.”",
    body: "You've had such an impact on my life. Thank you for showing me what it's like to have a passion for music and inspiring me to pursue it.",
    detail:
      "Piano Performance & Pedagogy, Utah State University · Student 2010–2022",
  },
  {
    photo: "/images/testimonial-sawyer.jpg",
    name: "Sawyer",
    display:
      "“I looked forward to lessons every week. You gave me a space to reset and just play the piano. Thank you for everything!”",
    body: "I looked forward to lessons every week. You gave me a space to reset and just play the piano. Thank you for everything!",
    detail: "Law & Music, Stanford University · Student 2014–2022",
  },
];

export default function Testimonials() {
  return (
    <article>
      <Seo path="/testimonials" />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials" },
        ])}
      />
      {/* Review schema — no star ratings (we have none); honest markup only. */}
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

      <PageHeader eyebrow="In their words" title="Testimonials" />

      {TESTIMONIALS.map((t) => (
        <figure
          key={t.name}
          className="card flex-row gap-[18px] items-start rounded-box border border-base-300 bg-base-100 p-[22px] mb-4 shadow-[0_8px_20px_rgba(0,0,0,.04)]"
        >
          <img
            src={t.photo}
            alt={`${t.name}, Appassionata student`}
            width={74}
            height={74}
            loading="lazy"
            className="w-[74px] h-[74px] rounded-full object-cover shrink-0 bg-base-300"
          />
          <div>
            <p className="font-display italic text-[1.25rem] leading-[1.45] text-base-content mb-2.5">
              {t.display}
            </p>
            <figcaption className="text-[.88rem] text-[#4A4F57]">
              <strong className="text-secondary">{t.name}</strong> · {t.detail}
            </figcaption>
          </div>
        </figure>
      ))}

      <p className="text-[.95rem] text-[#4A4F57] italic text-center mt-[1.2rem]">
        More testimonials coming soon…
      </p>
    </article>
  );
}
