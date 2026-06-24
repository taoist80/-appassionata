import Seo from "../../components/Seo";
import Faq from "../../components/Faq";
import {
  EditorialHeader,
  EdP,
  EdH2,
  EdHr,
  EdCTA,
} from "../../components/editorial/prose";

const HOME_FAQ = [
  {
    q: "What ages do you teach?",
    a: "Appassionata teaches piano and cello from age 5 through adults — MiniMusic for ages 5–7, group and individual lessons for school-age students, and lessons for adult beginners and returners.",
  },
  {
    q: "Where is the studio located?",
    a: "The home studio is at 917 East Statice Ave in Sandy, Utah — a block south of Alta View Elementary, close to Alta, Jordan, and Corner Canyon schools.",
  },
  {
    q: "Do you offer online lessons?",
    a: "Yes. Online lessons are available alongside in-studio lessons, and make-up lessons can be done online when needed.",
  },
  {
    q: "How do I get started?",
    a: "Book a meet-and-greet or trial lesson with Laura. New families register and schedule through the booking widget on this site.",
  },
];

export default function EditorialHome() {
  return (
    <article>
      <Seo path="/" />

      <EditorialHeader
        eyebrow="Piano & Cello Lessons · Sandy, Utah"
        title="Inspiring a Passion for Music"
        lede="Welcome to the studio of Laura Ebersole Francis — where students of all ages discover the joy of music."
      />

      <img
        src="/images/hero-piano-keys.jpg"
        alt="Close-up of piano keys"
        width={1100}
        height={340}
        fetchPriority="high"
        className="w-full h-[340px] object-cover rounded-[4px] bg-base-300 mb-11 border border-[#EBD9DC]"
      />

      <EdP>
        I <em>love</em> teaching piano and cello. My passion is to inspire
        students of all ages to love and appreciate music — helping each one
        discover their individual strengths, encouraging creativity, and building
        the skills that grow confident, excellent musicians.
      </EdP>
      <EdP>
        Whether the journey leads to orchestra, jazz band, church, a college
        music degree, or playing just for fun, lessons are an investment into a
        lifetime of enjoying music. I would love to explore what Appassionata
        Studio can offer you.
      </EdP>

      <EdHr />

      <EdH2 className="text-[2.1rem]">
        Piano &amp; cello lessons in Sandy, Utah
      </EdH2>
      <EdP>
        The studio is centrally located in Sandy, Utah, near many schools — Alta,
        Jordan, Corner Canyon, Eastmont Middle, Indian Hills, Glacier Hills,
        Waterford, Challenger, and Mt. Jordan — plus parks, grocery stores, and
        rec centers, so families can run errands or drop off siblings during a
        lesson.
      </EdP>

      <figure className="text-center my-12">
        <span
          className="block w-12 h-[2px] bg-primary rounded-full mx-auto mb-6"
          aria-hidden
        />
        <p className="font-editorial italic font-medium text-[1.7rem] leading-[1.4] text-secondary max-w-[30ch] mx-auto m-0">
          “To play a wrong note is insignificant; to play without passion is
          inexcusable.”
        </p>
        <figcaption className="font-sans text-[.82rem] tracking-[.08em] uppercase text-[#9b9088] mt-4">
          Ludwig van Beethoven
        </figcaption>
      </figure>

      <EdCTA />

      <Faq items={HOME_FAQ} variant="editorial" />
    </article>
  );
}
