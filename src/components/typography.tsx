import type { ReactNode } from "react";

/** Body paragraph — Mulish, comfortable measure & leading. */
export function P({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-sans text-[1.05rem] leading-[1.78] text-[#2a2d33] mb-[1.1rem] ${className}`}
    >
      {children}
    </p>
  );
}

/** Section heading (H2) — Source Serif 4, deep maroon. */
export function H2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display font-semibold text-[1.9rem] text-secondary mt-8 mb-2 ${className}`}
    >
      {children}
    </h2>
  );
}

/** Tinted pill badge. `inline` is the small in-text tuition variant. */
export function Pill({
  children,
  inline = false,
  className = "",
}: {
  children: ReactNode;
  inline?: boolean;
  className?: string;
}) {
  const size = inline
    ? "text-[.78rem] px-[11px] py-[3px] ml-1"
    : "text-[.82rem] px-3.5 py-[7px]";
  return (
    <span
      className={`badge inline-block bg-[#F6E7E9] text-secondary font-bold rounded-full border-0 ${size} ${className}`}
    >
      {children}
    </span>
  );
}
