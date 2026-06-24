import PageHeader from "../components/PageHeader";
import { P, H2 } from "../components/typography";

export default function Home() {
  return (
    <article>
      <PageHeader
        eyebrow="Piano & Cello Lessons · Sandy, Utah"
        title="Inspiring a Passion for Music"
        lede="Welcome to the studio of Laura Ebersole Francis"
      />

      <img
        src="/images/hero-piano-keys.jpg"
        alt="Close-up of piano keys"
        className="w-full h-[260px] object-cover rounded-2xl bg-base-300 mb-[26px]"
      />

      <P>
        I <em>love</em> teaching piano &amp; cello. My passion is to inspire
        students of all ages to love and appreciate music — by helping them
        discover their individual musical strengths, encouraging creativity, and
        building the skills that grow confident, excellent musicians.
      </P>
      <P>
        Whether the journey leads to orchestra, jazz band, church, a college
        music degree, or playing just for fun, lessons are an investment into a
        lifetime of enjoying music. I would love to explore what Appassionata
        Studio can offer you.
      </P>

      <H2 className="text-[1.95rem]">Appassionata is in Sandy</H2>
      <P>
        The studio is centrally located near many schools — Alta, Jordan, Corner
        Canyon, Eastmont Middle, Indian Hills Middle, Glacier Hills, Waterford,
        Challenger, and Mt. Jordan — plus parks, grocery stores, and rec centers,
        so families can run errands or drop off siblings during a lesson.
      </P>

      <figure className="my-8 pl-[22px] border-l-[3px] border-accent">
        <p className="font-display italic font-medium text-[1.5rem] leading-[1.4] text-secondary m-0">
          “To play a wrong note is insignificant; to play without passion is
          inexcusable.”
        </p>
        <figcaption className="text-[.85rem] text-[#4A4F57] mt-2.5 tracking-[.02em]">
          — Ludwig van Beethoven
        </figcaption>
      </figure>
    </article>
  );
}
