import PageHeader from "../components/PageHeader";
import { P } from "../components/typography";
import { STUDIO } from "../data/site";

export default function Contact() {
  return (
    <article>
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

      {/* Message form — placeholder for the My Music Staff contact widget. */}
      <div className="card rounded-[18px] border border-base-300 bg-base-100 p-6 shadow-[0_10px_24px_rgba(0,0,0,.05)]">
        <h3 className="font-display font-bold text-[1.4rem] text-secondary mt-0 mb-4">
          Send a message
        </h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
            <label className="text-[.82rem] text-[#4A4F57] font-semibold">
              Name
              <input
                type="text"
                placeholder="Your name"
                className="input w-full mt-1.5 font-sans"
              />
            </label>
            <label className="text-[.82rem] text-[#4A4F57] font-semibold">
              Email
              <input
                type="email"
                placeholder="you@email.com"
                className="input w-full mt-1.5 font-sans"
              />
            </label>
          </div>
          <label className="text-[.82rem] text-[#4A4F57] font-semibold">
            Message
            <textarea
              rows={4}
              placeholder="Tell me a little about the student and what you're looking for…"
              className="textarea w-full mt-1.5 font-sans resize-y"
            />
          </label>
          <button
            type="submit"
            className="btn btn-secondary rounded-full mt-4 font-bold"
          >
            Send message
          </button>
        </form>
        <p className="text-[.78rem] text-[#9aa0a8] mt-3.5">
          Contact form powered by My Music Staff.
        </p>
      </div>
    </article>
  );
}
