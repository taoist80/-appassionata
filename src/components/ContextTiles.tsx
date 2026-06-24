import { STUDIO } from "../data/site";
import BookTrial from "./BookTrial";

/**
 * Contextual action tiles shown at the bottom of every page.
 * In production the "Book a trial lesson" CTA opens the My Music Staff
 * booking widget; for now it routes to /contact.
 */
export default function ContextTiles() {
  return (
    <section className="max-w-[940px] mx-auto mt-[54px] pt-[38px] border-t border-base-300">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 items-start">
        {/* 1 — Start lessons (tinted CTA tile) */}
        <div className="card rounded-box p-5 bg-[#FBEEF0] border border-[#ECD9DB] text-secondary">
          <h3 className="font-display font-semibold text-[1.28rem] mb-1.5">
            Start lessons
          </h3>
          <p className="text-[.88rem] leading-relaxed mb-3.5 text-[#8a5560]">
            Book a meet-and-greet or trial lesson with Laura.
          </p>
          {/* Opens the My Music Staff sign-up widget in a modal. */}
          <BookTrial />
        </div>

        {/* 2 — Contact */}
        <div className="card card-border rounded-box p-5 bg-base-100">
          <h3 className="font-display font-semibold text-[1.2rem] mb-3 text-secondary">
            Contact
          </h3>
          <div className="flex gap-2.5 items-start text-[.9rem] mb-2.5">
            <span aria-hidden className="text-primary">&#9742;</span>
            <a
              href={STUDIO.phoneHref}
              className="text-base-content no-underline font-semibold"
            >
              {STUDIO.phone}
            </a>
          </div>
          <div className="flex gap-2.5 items-start text-[.85rem] mb-2.5 break-all">
            <span aria-hidden className="text-primary">&#9993;</span>
            <a
              href={STUDIO.emailHref}
              className="text-base-content no-underline font-semibold"
            >
              {STUDIO.email}
            </a>
          </div>
          <div className="flex gap-2.5 items-start text-[.85rem] text-[#4A4F57]">
            <span aria-hidden className="text-primary">&#9784;</span>
            <span>{STUDIO.address}</span>
          </div>
        </div>

        {/* 3 — Find the studio (Google Map embed) */}
        <div className="card card-border rounded-box p-5 bg-base-100">
          <h3 className="font-display font-semibold text-[1.2rem] mb-3 text-secondary">
            Find the studio
          </h3>
          <iframe
            loading="lazy"
            title="Studio location"
            src={STUDIO.mapEmbed}
            className="block w-full h-[150px] rounded-[10px] border-0"
          />
        </div>
      </div>
    </section>
  );
}
