import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import Seo from "../../components/Seo";
import JsonLd from "../../components/JsonLd";
import { breadcrumbLd } from "../../data/site";
import {
  EditorialHeader,
  EdP,
  EdTag,
  EdHr,
  EdCTA,
} from "../../components/editorial/prose";

const Money = ({ children }: { children: ReactNode }) => (
  <span className="font-sans font-bold text-[.78rem] text-primary">{children}</span>
);

export default function EditorialPrograms() {
  return (
    <article>
      <Seo path="/programs" />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Programs & Tuition", path: "/programs" },
        ])}
      />

      <EditorialHeader
        eyebrow="Lessons"
        title="Programs & Tuition"
        lede="Music adventures for every age and stage — in Sandy, Utah"
      />

      <EdTag>Ages 5–7 · First steps</EdTag>
      <EdP>
        <strong>MiniMusic Classes</strong> introduce music appreciation and
        beginning piano in class — no piano needed at home, limited to 5 children{" "}
        <Money>($110/mo)</Money>. <strong>PIANO Blast Group Lessons</strong> are
        weekly 60-min group lessons in skills, playing by ear, theory games, and
        reading music, up to 6 students <Money>($125/mo)</Money>. See the{" "}
        <Link
          to="/programs/minimusic"
          className="text-primary font-semibold no-underline hover:underline"
        >
          MiniMusic page
        </Link>{" "}
        for details.
      </EdP>

      <EdHr />

      <EdTag>Ages 8–11 · Building skills</EdTag>
      <EdP>
        <strong>Piano or Cello Blast Group Lessons</strong> meet weekly for 50
        minutes, up to 5 students <Money>($125/mo)</Money>, alongside individual
        lessons, a monthly performance/theory class, and themed summer mini-camps.
      </EdP>

      <EdHr />

      <EdTag>11 – College · Going deeper</EdTag>
      <EdP>
        Individual piano or cello lessons (30/45/60 min) with a monthly
        performance/theory class, plus summer camps and workshops — ideal for
        orchestra students and serious musicians preparing for college auditions.
      </EdP>

      <EdHr />

      <EdTag>Adults · Beginning–intermediate</EdTag>
      <EdP>
        Start a new hobby or return after a break with flexible daytime and
        evening scheduling in 4-lesson packages of 30/45/60-min lessons, tailored
        to your interests and goals.
      </EdP>

      <EdHr />

      <EdTag>Specialized adventures</EdTag>
      <EdP>
        <strong>Duo Lessons</strong> <Money>($140/mo)</Money>, the{" "}
        <strong>Music Matters Homeschool Class</strong>, a high-school{" "}
        <strong>Pedagogy Course</strong>, and{" "}
        <strong>College Music Degree &amp; Audition Prep</strong>.
      </EdP>

      <EdCTA>Register &amp; book a meet-and-greet</EdCTA>
    </article>
  );
}
