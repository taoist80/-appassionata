import { useEffect, useId, useRef, useState } from "react";

/**
 * MmsWidget — embeds a My Music Staff (MMS) widget for the Appassionata site.
 *
 * Why this exists: My Music Staff has no public API. All transactional features
 * (sign-up / book a trial, member login, contact) are MMS widgets. This component
 * wraps the two embed mechanisms so buttons can open the right widget:
 *
 *   - "block" iframes — app.mymusicstaff.com/Website/v3/widget.html?settings=<base64>
 *   - the official Student Portal login script — login.mymusicstaff.com/widget/v2/Login.ashx
 *
 * The IDs below were confirmed against the live appassionata-piano.com site
 * (settings payloads decoded from /home, /login, /contact) on 2026-06-24. To move
 * to the officially-supported embed codes later, edit only MMS_CONFIG / LOGIN_SCRIPT_SRC.
 */

export const MMS_CONFIG = {
  schoolId: "sch_gMSJf",
  websiteId: "wbs_dBjJq",
  /** WebsiteBlockIDs from the live site. Verify in MMS → Website if widgets change. */
  blocks: {
    signup: "wbb_zw6ZHJp", //  Home — student sign-up / "Book a trial lesson"
    login: "wbb_zw6ZrJs", //   Member login (Student Portal)
    contact: "wbb_zw6ZGJc", // "Contact Laura" message form
  },
} as const;

export type MmsBlock = keyof typeof MMS_CONFIG.blocks;

const WIDGET_BASE = "https://app.mymusicstaff.com/Website/v3/widget.html";
const MMS_ORIGIN = "https://app.mymusicstaff.com";
const LOGIN_SCRIPT_SRC = "https://login.mymusicstaff.com/widget/v2/Login.ashx";
const LOAD_TIMEOUT_MS = 12000;

/** Base64-encode the settings object MMS expects (client-only SPA → btoa). */
function buildWidgetSrc(block: string): string {
  const json = JSON.stringify({
    SchoolID: MMS_CONFIG.schoolId,
    WebsiteID: MMS_CONFIG.websiteId,
    WebsiteBlockID: block,
  });
  return `${WIDGET_BASE}?settings=${btoa(json)}`;
}

export interface MmsWidgetProps {
  /** Which MMS block to render. */
  block: MmsBlock;
  /** Accessible iframe title (defaults per block). */
  title?: string;
  /** Extra classes for the wrapper. */
  className?: string;
  /** Fallback/min height in px before any auto-resize (default 600). */
  minHeight?: number;
  /**
   * For block="login" only: use the official Login.ashx script widget instead of
   * the block iframe. Prefer this for production logins.
   */
  useOfficialLoginScript?: boolean;
}

const DEFAULT_TITLES: Record<MmsBlock, string> = {
  signup: "Book a trial lesson",
  login: "Member login",
  contact: "Contact Laura",
};

export default function MmsWidget({
  block,
  title,
  className = "",
  minHeight = 600,
  useOfficialLoginScript = false,
}: MmsWidgetProps) {
  const reactId = useId();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scriptHostRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(minHeight);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const renderLoginScript = block === "login" && useOfficialLoginScript;
  const resolvedTitle = title ?? DEFAULT_TITLES[block];
  // Direct link to the same widget — the graceful fallback if framing/cookies
  // are blocked (works for every block, including the login fallback).
  const directUrl = buildWidgetSrc(MMS_CONFIG.blocks[block]);

  // --- Official login script variant -------------------------------------
  useEffect(() => {
    if (!renderLoginScript || !scriptHostRef.current) return;
    const host = scriptHostRef.current;
    const script = document.createElement("script");
    script.src = LOGIN_SCRIPT_SRC;
    script.async = true;
    script.type = "text/javascript";
    script.onload = () => setLoaded(true);
    host.appendChild(script);
    return () => {
      host.innerHTML = ""; // remove script + injected widget on unmount
    };
  }, [renderLoginScript]);

  // --- Best-effort auto-resize for the iframe variant --------------------
  // MMS widgets may postMessage their content height. We accept a few common
  // shapes and ignore anything not from the MMS origin. A solid min-height is
  // always kept as a fallback in case no message arrives.
  useEffect(() => {
    if (renderLoginScript) return;
    function onMessage(e: MessageEvent) {
      if (e.origin !== MMS_ORIGIN) return;
      let h: number | undefined;
      const d = e.data as unknown;
      if (typeof d === "number") h = d;
      else if (typeof d === "string" && /^\d+$/.test(d)) h = Number(d);
      else if (d && typeof d === "object") {
        const obj = d as Record<string, unknown>;
        const cand = obj.height ?? obj.Height ?? obj.scrollHeight;
        if (typeof cand === "number") h = cand;
        else if (typeof cand === "string" && /^\d+$/.test(cand)) h = Number(cand);
      }
      if (h && h > 200 && h < 5000) setHeight(h);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [renderLoginScript]);

  // --- Load timeout → surface the fallback if nothing renders ------------
  useEffect(() => {
    if (loaded) return;
    const t = setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [loaded]);

  const fallbackLink = (
    <a
      href={directUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="link link-hover text-[.8rem] text-[#4A4F57]"
    >
      Trouble loading? Open in My Music Staff ↗
    </a>
  );

  const spinner = (
    <span
      className="loading loading-spinner loading-lg text-primary"
      aria-hidden="true"
    />
  );

  const timeoutNotice = timedOut && !loaded && (
    <div className="alert bg-base-200 text-[.85rem] text-[#4A4F57] mb-3">
      <span>
        The form is taking a moment to load. You can{" "}
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link text-primary font-semibold"
        >
          open it directly in My Music Staff ↗
        </a>
        .
      </span>
    </div>
  );

  if (renderLoginScript) {
    return (
      <div
        className={`mms-widget ${className}`}
        role="region"
        aria-label={resolvedTitle}
      >
        {timeoutNotice}
        <div ref={scriptHostRef} id={`mms-login-${reactId}`} />
        {!loaded && <div className="flex justify-center py-10">{spinner}</div>}
        <div className="mt-3 text-center">{fallbackLink}</div>
      </div>
    );
  }

  return (
    <div
      className={`mms-widget ${className}`}
      role="region"
      aria-label={resolvedTitle}
    >
      {timeoutNotice}
      <div className="relative">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            {spinner}
          </div>
        )}
        <iframe
          ref={iframeRef}
          title={resolvedTitle}
          src={directUrl}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="w-full border-0 rounded-2xl bg-base-100"
          style={{ height, minHeight }}
        />
      </div>
      <div className="mt-3 text-center">{fallbackLink}</div>
    </div>
  );
}
