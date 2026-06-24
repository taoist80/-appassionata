import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}

/** Eyebrow kicker + H1 + optional italic lede — shared across pages. */
export default function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <header>
      <p className="font-sans uppercase font-bold text-primary tracking-[.18em] text-[.72rem] mb-2.5">
        {eyebrow}
      </p>
      <h1 className="font-display font-bold text-base-content leading-[1.06] tracking-[.005em] text-[clamp(2.4rem,4vw,3.4rem)] mb-1.5">
        {title}
      </h1>
      {lede && (
        <p className="font-display italic font-medium text-secondary text-[1.15rem] mb-6">
          {lede}
        </p>
      )}
    </header>
  );
}
