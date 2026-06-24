import type { ReactNode } from "react";
import BookTrial from "../BookTrial";

/** Centered page header — eyebrow + H1 + italic lede (Editorial layout). */
export function EditorialHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <header>
      <p className="font-sans uppercase tracking-[.24em] text-[.72rem] text-primary font-bold text-center mb-4">
        {eyebrow}
      </p>
      <h1 className="font-editorial font-semibold text-[#1F2227] text-center leading-[1.02] tracking-[-.012em] text-[clamp(2.6rem,5vw,4.4rem)] mb-4">
        {title}
      </h1>
      {lede && (
        <p className="font-editorial italic text-[1.36rem] leading-[1.45] text-[#6b5358] text-center max-w-[34ch] mx-auto mb-9">
          {lede}
        </p>
      )}
    </header>
  );
}

/** Body paragraph — Newsreader, left-aligned within the centered column. */
export function EdP({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-editorial text-[1.16rem] leading-[1.72] text-[#2a2d33] mb-[1.2rem] ${className}`}
    >
      {children}
    </p>
  );
}

/** Section heading — deep maroon with a short red accent rule above it. */
export function EdH2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-editorial font-semibold text-[1.7rem] text-secondary tracking-[-.01em] mb-2 before:content-[''] before:block before:w-9 before:h-[3px] before:bg-primary before:rounded-full before:mb-3 ${className}`}
    >
      {children}
    </h2>
  );
}

/** Uppercase kicker used above editorial Programs sections. */
export function EdTag({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans uppercase tracking-[.16em] text-[.72rem] text-primary font-bold mb-2">
      {children}
    </div>
  );
}

/** Editorial section divider — hairlines flanking a small red diamond. */
export function EdHr() {
  return (
    <div className="flex items-center justify-center gap-2.5 my-10" aria-hidden>
      <span className="block w-12 h-px bg-[#E0CBCF]" />
      <span className="block w-[7px] h-[7px] rotate-45 bg-primary rounded-[1px]" />
      <span className="block w-12 h-px bg-[#E0CBCF]" />
    </div>
  );
}

/** Centered "Book a trial lesson" CTA (opens the shared booking modal). */
export function EdCTA({ children = "Book a trial lesson" }: { children?: ReactNode }) {
  return (
    <div className="text-center mt-11">
      <BookTrial className="inline-block font-sans font-bold text-[.95rem] text-white bg-primary hover:bg-secondary no-underline cursor-pointer px-[30px] py-3.5 rounded-full transition-colors">
        {children}
      </BookTrial>
    </div>
  );
}
