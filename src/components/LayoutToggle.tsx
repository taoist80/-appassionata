import { useLayout, type Layout } from "../layout/LayoutContext";

/**
 * Classic ⇄ Editorial layout switcher (comparison control). `tone` adapts it to
 * the dark rail ("dark") or the light editorial header/footer ("light").
 */
export default function LayoutToggle({
  tone = "light",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const { layout, setLayout } = useLayout();
  const isDark = tone === "dark";

  const wrap = isDark
    ? "bg-white/15"
    : "bg-base-100 border border-base-300";

  const opt = (value: Layout, label: string) => {
    const active = layout === value;
    const cls = active
      ? isDark
        ? "bg-white text-secondary"
        : "bg-secondary text-secondary-content"
      : isDark
        ? "text-white/80 hover:text-white"
        : "text-[#6b5358] hover:text-secondary";
    return (
      <button
        type="button"
        onClick={() => setLayout(value)}
        aria-pressed={active}
        className={`px-2.5 py-1 rounded-full text-[.72rem] font-sans font-bold leading-none transition-colors cursor-pointer ${cls}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      role="group"
      aria-label="Page layout"
      className={`inline-flex items-center gap-0.5 rounded-full p-0.5 ${wrap} ${className}`}
    >
      {opt("classic", "Classic")}
      {opt("editorial", "Editorial")}
    </div>
  );
}
