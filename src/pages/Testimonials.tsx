import type { ReactNode } from "react";
import PageHeader from "../components/PageHeader";

function Testimonial({
  photo,
  name,
  quote,
  detail,
}: {
  photo: string;
  name: string;
  quote: ReactNode;
  detail: string;
}) {
  return (
    <figure className="card flex-row gap-[18px] items-start rounded-box border border-base-300 bg-base-100 p-[22px] mb-4 shadow-[0_8px_20px_rgba(0,0,0,.04)]">
      <img
        src={photo}
        alt={name}
        className="w-[74px] h-[74px] rounded-full object-cover shrink-0 bg-base-300"
      />
      <div>
        <p className="font-display italic text-[1.25rem] leading-[1.45] text-base-content mb-2.5">
          {quote}
        </p>
        <figcaption className="text-[.88rem] text-[#4A4F57]">
          <strong className="text-secondary">{name}</strong> · {detail}
        </figcaption>
      </div>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <article>
      <PageHeader eyebrow="In their words" title="Testimonials" />

      <Testimonial
        photo="/images/testimonial-valerie.jpg"
        name="Valerie"
        quote="“You've had such an impact on my life. Thank you for showing me what it's like to have a passion for music and inspiring me to pursue it.”"
        detail="Piano Performance & Pedagogy, Utah State University · Student 2010–2022"
      />
      <Testimonial
        photo="/images/testimonial-sawyer.jpg"
        name="Sawyer"
        quote="“I looked forward to lessons every week. You gave me a space to reset and just play the piano. Thank you for everything!”"
        detail="Law & Music, Stanford University · Student 2014–2022"
      />

      <p className="text-[.95rem] text-[#4A4F57] italic text-center mt-[1.2rem]">
        More testimonials coming soon…
      </p>
    </article>
  );
}
