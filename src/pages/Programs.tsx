import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import PageHeader from "../components/PageHeader";
import { Pill } from "../components/typography";

const CARD_SHADOW =
  "shadow-[0_1px_2px_rgba(0,0,0,.03),0_8px_20px_rgba(0,0,0,.04)]";

function ProgramCard({
  title,
  tag,
  children,
}: {
  title: string;
  tag: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`card rounded-box border border-base-300 bg-base-100 p-[20px_22px] mb-4 ${CARD_SHADOW}`}
    >
      <div className="flex items-baseline justify-between gap-2.5 flex-wrap">
        <h3 className="font-display font-bold text-[1.45rem] text-secondary m-0">
          {title}
        </h3>
        <span className="text-[.78rem] text-primary font-bold tracking-[.08em] uppercase">
          {tag}
        </span>
      </div>
      {children}
    </div>
  );
}

function Offering({ children }: { children: ReactNode }) {
  return (
    <p className="text-[1rem] leading-[1.7] mt-[.7rem] mb-0 text-[#2a2d33]">
      {children}
    </p>
  );
}

export default function Programs() {
  return (
    <article>
      <PageHeader
        eyebrow="Lessons"
        title="Programs & Tuition"
        lede="Music adventures for every age and stage"
      />

      <ProgramCard title="Ages 5–7" tag="First steps">
        <Offering>
          <strong>MiniMusic Classes</strong> — a music appreciation and
          beginning-piano class where all learning happens in class (no piano
          needed at home). Limited to 5 children. <Pill inline>$110/mo</Pill>
        </Offering>
        <Offering>
          <strong>PIANO Blast Group Lessons</strong> — weekly 60-min group
          lessons: skills, playing by ear, theory games, reading music. Up to 6
          students. <Pill inline>$125/mo</Pill>
        </Offering>
      </ProgramCard>

      <ProgramCard title="Ages 8–11" tag="Building skills">
        <Offering>
          <strong>Piano or Cello Blast Group Lessons</strong> — weekly 50-min
          group lessons, up to 5 students. <Pill inline>$125/mo</Pill>
        </Offering>
        <Offering>
          <strong>Individual lessons</strong> + monthly performance/theory
          class, and themed summer mini-camps.
        </Offering>
      </ProgramCard>

      <ProgramCard title="11 – College" tag="Going deeper">
        <Offering>
          Individual piano or cello lessons (30/45/60 min) with monthly
          performance/theory class, plus summer camps and workshops. Great for
          orchestra students and serious musicians preparing for college
          auditions.
        </Offering>
      </ProgramCard>

      <ProgramCard title="Adults" tag="Beginning–intermediate">
        <Offering>
          Start a new hobby or return after a break. Flexible daytime and
          evening scheduling, 4-lesson packages of 30/45/60-min lessons, tailored
          to your interests and goals.
        </Offering>
      </ProgramCard>

      {/* Specialized — flat (no shadow), subtle background */}
      <div className="card rounded-box border border-base-300 bg-base-200 p-[20px_22px] mb-4">
        <h3 className="font-display font-bold text-[1.45rem] text-secondary mt-0 mb-2">
          Specialized adventures
        </h3>
        <p className="text-[.98rem] leading-[1.7] m-0 text-[#2a2d33]">
          <strong>Duo Lessons</strong> ($140/mo) ·{" "}
          <strong>Music Matters Homeschool Class</strong> ·{" "}
          <strong>Pedagogy Course</strong> for high schoolers ·{" "}
          <strong>College Music Degree &amp; Audition Prep</strong>.
        </p>
      </div>

      <p className="text-[.95rem] text-[#4A4F57] mt-1.5">
        To explore any of these,{" "}
        <Link
          to="/contact"
          className="text-primary font-bold no-underline hover:underline"
        >
          register and book a meet-and-greet
        </Link>
        .
      </p>
    </article>
  );
}
