import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { NAV_ITEMS, STUDIO } from "../data/site";
import { Icon } from "./icons";
import ContextTiles from "./ContextTiles";
import LayoutToggle from "./LayoutToggle";

const RAIL_EXPANDED = 252;
const RAIL_COLLAPSED = 78;
const STORAGE_KEY = "rail-collapsed";

/** Track a media query reactively. */
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

/** The rail body — brand header, nav, pinned Member Login, collapse control.
 *  Reused by the desktop rail and the mobile drawer. */
function RailContent({
  collapsed,
  onNavigate,
  showCollapseControl,
  onToggleCollapse,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  showCollapseControl: boolean;
  onToggleCollapse?: () => void;
}) {
  const showLabels = !collapsed;
  const linkClass = (sub: boolean | undefined, login: boolean) =>
    ({ isActive }: { isActive: boolean }) =>
      [
        "rail-item",
        sub && "rail-item--sub",
        login && "rail-item--login",
        isActive && "is-active",
      ]
        .filter(Boolean)
        .join(" ");

  return (
    <>
      {/* Brand header */}
      <NavLink
        to="/"
        end
        onClick={onNavigate}
        className="flex items-center gap-[11px] cursor-pointer px-2 pt-1.5 pb-4 mb-2.5 border-b border-white/20 no-underline"
        style={{ justifyContent: collapsed ? "center" : "flex-start" }}
        aria-label={`${STUDIO.shortName} — home`}
      >
        <img
          src="/images/logo.jpg"
          alt=""
          className="w-[42px] h-[42px] rounded-[9px] object-cover bg-white shrink-0"
        />
        {showLabels && (
          <span className="font-display font-bold text-[1.2rem] leading-[1.05] text-white">
            Appassionata
            <span className="block font-sans font-normal text-[.66rem] opacity-80 tracking-[.12em] uppercase mt-[3px]">
              Piano &amp; Cello Studio
            </span>
          </span>
        )}
      </NavLink>

      {/* Primary nav */}
      <div className={collapsed ? "rail--collapsed" : undefined}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={linkClass(item.sub, false)}
            title={item.label}
          >
            <Icon
              name={item.icon}
              className={item.sub ? "w-4 h-4 shrink-0" : "w-5 h-5 shrink-0"}
            />
            {showLabels && <span>{item.label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Spacer pushes login + collapse control to the bottom */}
      <div className="flex-1" />

      <div className={collapsed ? "rail--collapsed" : undefined}>
        <NavLink
          to="/login"
          onClick={onNavigate}
          className={linkClass(false, true)}
          title="Member Login"
        >
          <Icon name="login" className="w-5 h-5 shrink-0" />
          {showLabels && <span>Member Login</span>}
        </NavLink>
      </div>

      {showLabels && (
        <div className="flex justify-center mt-2">
          <LayoutToggle tone="dark" />
        </div>
      )}

      {showCollapseControl && (
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          className="flex items-center justify-center gap-3 bg-black/20 text-white border-0 cursor-pointer p-2.5 rounded-[10px] font-sans text-[.8rem] mt-1.5"
        >
          <span className="text-[.85rem]">{collapsed ? "❯" : "❮"}</span>
          {showLabels && <span>Collapse</span>}
        </button>
      )}
    </>
  );
}

export default function AppShell() {
  const narrow = useMediaQuery("(max-width: 899px)");
  const location = useLocation();

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(collapsed));
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Reset scroll + close the drawer on navigation.
  useEffect(() => {
    window.scrollTo(0, 0);
    setDrawerOpen(false);
  }, [location.pathname]);

  // Close the drawer when leaving the mobile breakpoint (avoids a stuck
  // body-scroll lock when resizing up to desktop with the drawer open).
  useEffect(() => {
    if (!narrow) setDrawerOpen(false);
  }, [narrow]);

  // Mobile drawer: Esc to close, body scroll lock, and a simple focus trap.
  useEffect(() => {
    if (!drawerOpen) return;
    const nav = navRef.current;
    const focusable = nav
      ? Array.from(
          nav.querySelectorAll<HTMLElement>(
            'a[href], button, [tabindex]:not([tabindex="-1"])',
          ),
        )
      : [];
    focusable[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerOpen, closeDrawer]);

  const effectiveCollapsed = collapsed && !narrow;
  const railWidth = effectiveCollapsed ? RAIL_COLLAPSED : RAIL_EXPANDED;

  const mainInner = (
    <main
      style={{
        padding: narrow ? "26px 18px 40px" : "52px clamp(28px,4.5vw,68px)",
      }}
    >
      <div className="max-w-[70ch] mx-auto" key={location.pathname}>
        <Outlet />
      </div>
      <ContextTiles />
      <footer className="max-w-[940px] mx-auto mt-10 pt-5 border-t border-base-300 text-center text-[.82rem] text-[#4A4F57]">
        © {new Date().getFullYear()} {STUDIO.name} · Powered by My Music Staff ·{" "}
        <Link
          to="/privacy"
          className="text-primary font-semibold no-underline hover:underline"
        >
          Privacy
        </Link>
      </footer>
    </main>
  );

  // ---- Mobile: top bar + off-canvas drawer -------------------------------
  if (narrow) {
    const railStyle: CSSProperties = {
      position: "fixed",
      top: 0,
      left: 0,
      width: `${RAIL_EXPANDED}px`,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "18px 12px",
      transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform .25s ease",
      zIndex: 60,
      boxShadow: drawerOpen ? "0 0 40px rgba(0,0,0,.3)" : "none",
      overflowY: "auto",
    };

    return (
      <>
        <header className="flex items-center gap-3 bg-secondary text-secondary-content px-4 py-2.5 sticky top-0 z-50">
          <img
            src="/images/logo.jpg"
            alt=""
            className="w-8 h-8 rounded-md object-cover bg-white"
          />
          <span className="font-display font-bold text-[1.25rem] tracking-[.01em]">
            Appassionata
          </span>
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            className="btn btn-square ml-auto bg-white/16 hover:bg-white/25 border-0 text-white text-[1.3rem]"
          >
            &#9776;
          </button>
        </header>

        {drawerOpen && (
          <div
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/45 z-[55]"
            aria-hidden
          />
        )}

        <nav
          ref={navRef}
          className="rail-surface"
          style={railStyle}
          aria-label="Primary"
          aria-hidden={!drawerOpen}
        >
          <RailContent
            collapsed={false}
            onNavigate={closeDrawer}
            showCollapseControl={false}
          />
        </nav>

        {mainInner}
      </>
    );
  }

  // ---- Desktop: two-column grid with collapsible rail --------------------
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${railWidth}px minmax(0,1fr)`,
        minHeight: "100vh",
        transition: "grid-template-columns .22s ease",
      }}
    >
      <nav
        className="rail-surface flex flex-col sticky top-0 h-screen overflow-y-auto"
        style={{ padding: "18px 12px" }}
        aria-label="Primary"
      >
        <RailContent
          collapsed={effectiveCollapsed}
          showCollapseControl
          onToggleCollapse={() => setCollapsed((v) => !v)}
        />
      </nav>

      {mainInner}
    </div>
  );
}
