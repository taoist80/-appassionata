import PageHeader from "../components/PageHeader";
import { P, H2 } from "../components/typography";
import Seo from "../components/Seo";
import JsonLd from "../components/JsonLd";
import { STUDIO, breadcrumbLd } from "../data/site";

export default function Privacy() {
  return (
    <article>
      <Seo path="/privacy" />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />

      <PageHeader
        eyebrow="Updated June 2026"
        title="Privacy Policy"
        lede="How we handle information collected through this website"
      />

      <P>
        {STUDIO.name} (“we”) respects your privacy. This page explains what
        information is collected when you use this website and how it is used.
        For questions, contact Laura at{" "}
        <a href={STUDIO.phoneHref} className="text-primary font-semibold no-underline hover:underline">
          {STUDIO.phone}
        </a>{" "}
        or{" "}
        <a href={STUDIO.emailHref} className="text-primary font-semibold no-underline hover:underline">
          {STUDIO.email}
        </a>
        .
      </P>

      <H2 className="text-[1.6rem]">Information you provide</H2>
      <P>
        Our booking, contact, and member-login forms are provided by{" "}
        <strong>My Music Staff</strong>, our studio-management platform. When you
        submit one of those forms, the information you enter (such as your name,
        email, phone number, and message) is collected and processed by My Music
        Staff on our behalf so we can respond to you and schedule lessons. Their
        handling of that data is governed by My Music Staff's own privacy policy.
      </P>

      <H2 className="text-[1.6rem]">Information collected automatically</H2>
      <P>
        We may use <strong>Google Analytics</strong> to understand, in aggregate,
        how visitors use the site (for example, which pages are viewed). This
        relies on cookies and collects standard technical data such as your
        approximate location, device, and browser. We also embed a{" "}
        <strong>Google Map</strong> showing the studio's location; loading it
        involves Google. We do not sell your information.
      </P>

      <H2 className="text-[1.6rem]">Your choices</H2>
      <P>
        You can block or delete cookies in your browser settings, and you may
        contact us at any time to ask what information we hold or to request that
        we delete information you've sent us. This policy may be updated from time
        to time; the date above reflects the latest revision.
      </P>
    </article>
  );
}
