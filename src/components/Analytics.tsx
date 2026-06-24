import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * GA4 — no-op unless VITE_GA4_ID is set at build time. Injects gtag.js once and
 * sends a manual page_view on every client-side route change (send_page_view is
 * disabled so first load + navigations are counted exactly once each).
 */
const GA_ID = import.meta.env.VITE_GA4_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_ID || document.getElementById("ga4-src")) return;
    const tag = document.createElement("script");
    tag.id = "ga4-src";
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(tag);

    const init = document.createElement("script");
    init.id = "ga4-init";
    init.textContent =
      `window.dataLayer=window.dataLayer||[];` +
      `function gtag(){dataLayer.push(arguments);}` +
      `gtag('js',new Date());` +
      `gtag('config','${GA_ID}',{send_page_view:false});`;
    document.head.appendChild(init);
  }, []);

  useEffect(() => {
    if (!GA_ID) return;
    window.gtag?.("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
