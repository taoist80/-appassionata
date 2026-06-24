import Seo from "../../components/Seo";
import JsonLd from "../../components/JsonLd";
import { STUDIO, breadcrumbLd } from "../../data/site";
import { EditorialHeader, EdP, EdH2 } from "../../components/editorial/prose";

export default function EditorialPrivacy() {
  return (
    <article>
      <Seo path="/privacy" />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />

      <EditorialHeader
        eyebrow="Updated June 2026"
        title="Privacy Policy"
        lede="How we handle information collected through this website"
      />

      <EdP>
        {STUDIO.name} (“we”) respects your privacy. This page explains what
        information is collected when you use this website and how it is used. For
        questions, contact Laura at{" "}
        <a
          href={STUDIO.phoneHref}
          className="text-primary font-semibold no-underline hover:underline"
        >
          {STUDIO.phone}
        </a>{" "}
        or{" "}
        <a
          href={STUDIO.emailHref}
          className="text-primary font-semibold no-underline hover:underline"
        >
          {STUDIO.email}
        </a>
        .
      </EdP>

      <EdH2 className="text-[1.5rem] mt-8">Information you provide</EdH2>
      <EdP>
        Our booking, contact, and member-login forms are provided by{" "}
        <strong>My Music Staff</strong>, our studio-management platform. When you
        submit one of those forms, the information you enter (such as your name,
        email, phone number, and message) is collected and processed by My Music
        Staff on our behalf so we can respond to you and schedule lessons.
      </EdP>

      <EdH2 className="text-[1.5rem] mt-8">Information collected automatically</EdH2>
      <EdP>
        We may use <strong>Google Analytics</strong> to understand, in aggregate,
        how visitors use the site. This relies on cookies and collects standard
        technical data such as your approximate location, device, and browser. We
        also embed a <strong>Google Map</strong> of the studio's location. We do
        not sell your information.
      </EdP>

      <EdH2 className="text-[1.5rem] mt-8">Your choices</EdH2>
      <EdP className="mb-0">
        You can block or delete cookies in your browser settings, and you may
        contact us at any time to ask what information we hold or to request that
        we delete information you've sent us. This policy may be updated from time
        to time; the date above reflects the latest revision.
      </EdP>
    </article>
  );
}
