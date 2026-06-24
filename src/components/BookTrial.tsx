import { useRef, useState, type ReactNode } from "react";
import MmsWidget from "./MmsWidget";

interface BookTrialProps {
  /** Button classes. Defaults to the gold pill used on the context tiles. */
  className?: string;
  /** Button label / content. */
  children?: ReactNode;
}

/**
 * "Book a trial lesson" entry point. Opens the My Music Staff sign-up widget in
 * a daisyUI modal; the iframe is only mounted once the modal is first opened.
 * Reusable both as the gold pill (context tiles) and as an inline text link
 * (Programs / MiniMusic "book a meet-and-greet").
 */
export default function BookTrial({
  className = "btn btn-accent rounded-full btn-sm font-bold",
  children = "Book a trial lesson",
}: BookTrialProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  const open = () => {
    setMounted(true);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button type="button" onClick={open} className={className}>
        {children}
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-2xl p-0 overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-base-300">
            <h3 className="font-display font-semibold text-[1.2rem] text-secondary m-0">
              Book a trial lesson
            </h3>
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost"
                aria-label="Close"
              >
                ✕
              </button>
            </form>
          </div>
          <div className="p-4 max-h-[75vh] overflow-y-auto">
            <p className="text-[.9rem] text-[#4A4F57] mb-3">
              Register and book a meet-and-greet or trial lesson with Laura.
            </p>
            {mounted && <MmsWidget block="signup" minHeight={640} />}
          </div>
        </div>
        {/* Click-outside / Esc closes the dialog */}
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close">close</button>
        </form>
      </dialog>
    </>
  );
}
