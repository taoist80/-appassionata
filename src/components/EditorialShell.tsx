import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { EDITORIAL_NAV, STUDIO } from "../data/site";
import BookTrial from "./BookTrial";
import LayoutToggle from "./LayoutToggle";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  "font-sans font-semibold text-[.9rem] no-underline pb-[3px] border-b-2 whitespace-nowrap transition-colors " +
  (isActive
    ? "text-primary border-primary"
    : "text-[#4A4F57] border-transparent hover:text-primary");

/**
 * Editorial (Option C) layout shell: sticky top nav, centered 720px reading
 * column, and a global footer. Shares all content/SEO/MMS components with the
 * Classic layout via the shared data + reusable components.
 */
export default function EditorialShell() {
  const narrow = useMediaQuery("(max-width: 859px)");
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!narrow) setMenuOpen(false);
  }, [narrow]);

  return (
    <div className="font-sans text-[#1F2227] bg-[#FBF7F1] min-h-screen flex flex-col">
      {/* Top navigation */}
      <header
        className="sticky top-0 z-50 flex items-center gap-5 bg-[#FBF7F1]/90 backdrop-blur border-b border-[#E9E2DB]"
        style={{ padding: narrow ? "12px 20px" : "15px clamp(24px,5vw,56px)" }}
      >
        <Link
          to="/"
          className="flex items-center gap-[11px] no-underline shrink-0"
          aria-label={`${STUDIO.shortName} — home`}
        >
          <img
            src="/images/logo.jpg"
            alt=""
            width={38}
            height={38}
            className="w-[38px] h-[38px] rounded-[8px] object-cover bg-white"
          />
          <span className="font-editorial font-semibold text-[1.32rem] text-[#1F2227] tracking-[.005em] leading-none">
            Appassionata
          </span>
        </Link>

        {!narrow && (
          <>
            <nav
              aria-label="Primary"
              className="flex items-center gap-[26px] mx-auto"
            >
              {EDITORIAL_NAV.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
                  {n.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-4 shrink-0">
              <LayoutToggle tone="light" />
              <NavLink
                to="/login"
                className="font-sans font-semibold text-[.9rem] text-[#4A4F57] no-underline hover:text-primary"
              >
                Login
              </NavLink>
              <BookTrial className="font-sans font-bold text-[.88rem] text-white bg-primary no-underline cursor-pointer px-[18px] py-2.5 rounded-full hover:bg-secondary transition-colors">
                Book a trial
              </BookTrial>
            </div>
          </>
        )}

        {narrow && (
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="ml-auto bg-primary text-white border-0 w-[42px] h-[42px] rounded-[10px] text-[1.2rem] cursor-pointer"
          >
            &#9776;
          </button>
        )}
      </header>

      {/* Mobile dropdown menu */}
      {narrow && menuOpen && (
        <div
          className="border-b border-[#E9E2DB] bg-white flex flex-col gap-0.5"
          style={{ padding: "8px clamp(20px,5vw,56px) 16px" }}
        >
          {EDITORIAL_NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className="font-sans font-semibold text-[1rem] text-[#1F2227] no-underline py-[11px] px-1 border-b border-[#F0EAE3]"
            >
              {n.label}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            className="font-sans font-semibold text-[1rem] text-primary no-underline py-[11px] px-1"
          >
            Member Login
          </NavLink>
          <div className="pt-3">
            <LayoutToggle tone="light" />
          </div>
        </div>
      )}

      {/* Reading column */}
      <main
        className="grow w-full max-w-[720px] mx-auto"
        style={{ padding: narrow ? "40px 22px 64px" : "64px 24px 88px" }}
      >
        <div key={location.pathname}>
          <Outlet />
        </div>
      </main>

      {/* Global footer */}
      <footer className="text-center border-t border-[#E7E2DE] bg-white px-6 pt-10 pb-12 mt-6">
        <div className="font-editorial font-semibold text-[1.15rem] text-[#1F2227] mb-2">
          {STUDIO.name}
        </div>
        <div className="font-sans text-[.88rem] text-[#6b6259] leading-[1.7]">
          Sandy, Utah ·{" "}
          <a
            href={STUDIO.phoneHref}
            className="no-underline text-[#6b6259] hover:text-primary"
          >
            {STUDIO.phone}
          </a>{" "}
          ·{" "}
          <a
            href={STUDIO.emailHref}
            className="no-underline text-[#6b6259] hover:text-primary break-words"
          >
            {STUDIO.email}
          </a>
        </div>
        <div className="font-sans text-[.78rem] text-[#a99f95] mt-3.5">
          © {new Date().getFullYear()} {STUDIO.name} · Powered by My Music Staff ·{" "}
          <Link
            to="/privacy"
            className="no-underline text-[#a99f95] hover:text-primary"
          >
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}
