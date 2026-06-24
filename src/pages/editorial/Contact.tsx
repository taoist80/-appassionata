import Seo from "../../components/Seo";
import JsonLd from "../../components/JsonLd";
import MmsWidget from "../../components/MmsWidget";
import { STUDIO, breadcrumbLd } from "../../data/site";
import { EditorialHeader } from "../../components/editorial/prose";

export default function EditorialContact() {
  return (
    <article>
      <Seo path="/contact" />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <EditorialHeader eyebrow="Get in touch" title="Contact Laura" />

      <p className="font-editorial text-[1.16rem] leading-[1.7] text-[#2a2d33] text-center max-w-[40ch] mx-auto mb-11">
        Please reach out with any questions about me or the studio — I'd love to
        hear from you.
      </p>

      <div className="flex justify-center gap-10 flex-wrap text-center mb-11">
        <div>
          <div className="font-sans uppercase tracking-[.14em] text-[.7rem] text-[#9b9088] font-bold mb-1.5">
            Call or text
          </div>
          <a
            href={STUDIO.phoneHref}
            className="font-editorial text-[1.4rem] text-[#1F2227] no-underline hover:text-primary"
          >
            {STUDIO.phone}
          </a>
        </div>
        <div>
          <div className="font-sans uppercase tracking-[.14em] text-[.7rem] text-[#9b9088] font-bold mb-1.5">
            Email
          </div>
          <a
            href={STUDIO.emailHref}
            className="font-editorial text-[1.4rem] text-[#1F2227] no-underline hover:text-primary break-words"
          >
            {STUDIO.email}
          </a>
        </div>
      </div>

      <div className="border-t border-[#E7E2DE] pt-8">
        <h2 className="font-editorial font-semibold text-[1.4rem] text-secondary mb-4 text-center">
          Send a message
        </h2>
        <MmsWidget block="contact" minHeight={560} />
        <p className="font-sans text-[.76rem] text-[#a99f95] text-center mt-3.5">
          Contact form powered by My Music Staff.
        </p>
      </div>
    </article>
  );
}
