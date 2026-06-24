import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// Per-page <Seo> owns title/description/canonical/OG. Remove the static
// index.html fallbacks here so JS-rendering crawlers never see duplicates.
// (Non-JS crawlers don't run this and keep the defaults in the served HTML.)
document.querySelectorAll("head [data-default]").forEach((el) => el.remove());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
