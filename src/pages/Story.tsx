import PageHeader from "../components/PageHeader";
import { P, Pill } from "../components/typography";

export default function Story() {
  return (
    <article>
      <PageHeader
        eyebrow="About"
        title="Laura's Story"
        lede="My Musical Adventure"
      />

      <img
        src="/images/laura-portrait.jpg"
        alt="Laura Ebersole Francis"
        className="float-right w-[210px] h-[252px] object-cover rounded-2xl bg-base-300 mt-1 mb-4 ml-6"
      />

      <P>
        Playing songs by ear on a mini electric keyboard, my mom suspected her
        little girl had some talent and would enjoy piano lessons. My formal
        lessons began at 7. I'm endlessly grateful that my parents invested their
        encouragement, time, and finances into 14 years of lessons — and that my
        mom sat with me almost every day those first few years to guide my
        practicing.
      </P>
      <P>
        At 18, I began teaching piano and knew this was what I wanted to do for
        the rest of my life. I earned a Bachelor of Music <em>cum laude</em> in
        Piano Pedagogy from Utah State University. Alongside piano came cello
        from age 10, and playing in orchestra — now as principal cellist in the
        Utah Philharmonic Orchestra — is another great love of mine.
      </P>
      <P>
        I'm deeply grateful to my professors for helping shape me into the
        musician and teacher I am today. My musical adventure continues as I
        begin my 35th year of teaching.
      </P>

      <div className="flex flex-wrap gap-2.5 mt-6">
        <Pill>35th year teaching</Pill>
        <Pill>Principal cellist · Utah Philharmonic</Pill>
        <Pill>B.M. Piano Pedagogy, USU</Pill>
      </div>
    </article>
  );
}
