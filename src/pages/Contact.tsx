import PageHeader from "../components/PageHeader";
import { P } from "../components/typography";
import { STUDIO, breadcrumbLd } from "../data/site";
import MmsWidget from "../components/MmsWidget";
import Seo from "../components/Seo";
import JsonLd from "../components/JsonLd";

export default function Contact() {
  return (
    <article>
      <Seo path="/contact" />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHeader eyebrow="Get in touch" title="Contact Laura" />

      <P className="leading-[1.75] mb-[22px]">
        Please reach out with any questions about me or the studio — I'd love to
        hear from you.
      </P>

      {/* Quick-contact chips */}
      <div className="flex flex-wrap gap-3 mb-6">
        <a
          href={STUDIO.phoneHref}
          className="flex items-center gap-2.5 rounded-[12px] border border-base-300 bg-base-100 px-[18px] py-3.5 no-underline text-base-content font-bold"
        >
          <span aria-hidden className="text-primary text-[1.1rem]">
            &#9742;
          </span>
          {STUDIO.phone}
        </a>
        <a
          href={STUDIO.emailHref}
          className="flex items-center gap-2.5 rounded-[12px] border border-base-300 bg-base-100 px-[18px] py-3.5 no-underline text-base-content font-bold"
        >
          <span aria-hidden className="text-primary text-[1.1rem]">
            &#9993;
          </span>
          Email Laura
        </a>
      </div>

      {/* My Music Staff contact widget (block wbb_zw6ZGJc). */}
      <div className="card rounded-[18px] border border-base-300 bg-base-100 p-4 sm:p-6 shadow-[0_10px_24px_rgba(0,0,0,.05)]">
        <h3 className="font-display font-bold text-[1.4rem] text-secondary mt-0 mb-4">
          Send a message
        </h3>
        <MmsWidget block="contact" minHeight={560} />
        <p className="text-[.78rem] text-[#9aa0a8] mt-3.5">
          Contact form powered by My Music Staff.
        </p>
      </div>
    </article>
  );
}
