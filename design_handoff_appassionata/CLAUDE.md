# CLAUDE.md — Appassionata Piano & Cello Studio website

This file tells Claude Code how to build the studio website. Read it fully before writing code.

## What we're building

A small, elegant, **family-friendly and traditional** marketing website for a home piano/cello studio in Sandy, Utah. The chosen design is **"Option A — Refined Classic"**: a **two-column app shell** with a **collapsible left navigation rail** and a centered reading column. Contextual actions (book a trial, contact, map) live as **cards/tiles in the content flow**, not in a third column.

The reference prototype is in `reference/Option A — Refined Classic.dc.html`. It is a **design reference only** (an HTML prototype showing look + behavior) — do **not** ship it as-is. Recreate it in the stack below.

## Stack (use exactly this unless the user says otherwise)

- **Vite + React + TypeScript**
- **Tailwind CSS v4**
- **daisyUI v5** (component layer on top of Tailwind) — the user specifically wants daisyUI
- **react-router-dom** for page routing
- Google Fonts: **Source Serif 4** (headings) + **Mulish** (body/UI)

### Getting started

```bash
npm create vite@latest appassionata -- --template react-ts
cd appassionata
npm install
npm install tailwindcss @tailwindcss/vite daisyui react-router-dom
```

`vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [react(), tailwindcss()] });
```

`src/index.css` — Tailwind v4 + daisyUI v5 are configured **in CSS** (no JS config file needed):
```css
@import "tailwindcss";
@plugin "daisyui";

/* Custom brand theme — see Design Tokens below */
@plugin "daisyui/theme" {
  name: "appassionata";
  default: true;
  prefersdark: false;
  color-scheme: light;

  --color-base-100: #FFFFFF;   /* surface */
  --color-base-200: #FAF7F5;   /* app background (warm off-white) */
  --color-base-300: #E7E2DE;   /* hairlines / borders */
  --color-base-content: #1F2227; /* ink */

  --color-primary: #9E1B2F;            /* brand red (AA-safe on white) */
  --color-primary-content: #FFFFFF;
  --color-secondary: #7A1422;          /* deep maroon */
  --color-secondary-content: #FFFFFF;
  --color-accent: #C9A24B;             /* gold */
  --color-accent-content: #3A2A00;
  --color-neutral: #1F2227;
  --color-neutral-content: #FFFFFF;

  --color-info: #0F62FE;
  --color-success: #1F8A5B;
  --color-warning: #C9A24B;
  --color-error: #BF2020;

  --radius-selector: 0.625rem;  /* nav items, small controls */
  --radius-field: 0.625rem;     /* inputs, buttons */
  --radius-box: 1rem;           /* cards/tiles */
  --border: 1px;
}

/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Mulish:wght@400;500;600;700&display=swap');

@theme {
  --font-display: "Source Serif 4", Georgia, serif;
  --font-sans: "Mulish", system-ui, sans-serif;
}

html, body, #root { height: 100%; }
body { font-family: var(--font-sans); }
```

Use `font-display` for all headings (`class="font-display"`), `font-sans` for everything else (it's the default body font).

## Site structure & routes

Use react-router. Pages (the rail order):

| Route | Page | Nav label |
|---|---|---|
| `/` | Home | Home |
| `/story` | Laura's Story | Laura's Story |
| `/programs` | Programs & Tuition | Programs & Tuition |
| `/programs/minimusic` | MiniMusic Class | MiniMusic · Ages 5–7 (sub-item, indented) |
| `/policies` | Studio Life & Policy | Studio Policies |
| `/testimonials` | Testimonials | Testimonials |
| `/contact` | Contact | Contact |
| `/login` | Member Login | Member Login (pinned to bottom of rail) |

All page copy is verbatim in `reference/content.md`. Use it as the source of truth for text.

## The app shell (most important — get this right)

A persistent **two-column** layout: collapsible left rail + main content. There is **no** right sidebar — contextual cards sit at the bottom of each page's content.

### Layout
- Root: `display:grid; grid-template-columns: <rail> minmax(0,1fr)`. Rail width animates between **252px (expanded)** and **78px (collapsed)** with a `~220ms ease` transition on `grid-template-columns`.
- Main content: centered reading column, `max-width: 70ch`, generous padding (`~52px` top/bottom desktop, side padding `clamp(28px,4.5vw,68px)`).

### Left navigation rail
- Background: vertical gradient **`linear-gradient(180deg, #7A1422, #9E1B2F)`** (secondary→primary). White text.
- Sticky, full viewport height (`sticky top-0 h-screen`), `flex flex-col`, padding `18px 12px`.
- **Brand header** (top): the studio logo (`reference` → `Small Logo.jpg`, ~42px, `rounded-lg`, white bg) + wordmark "Appassionata" in `font-display` 700 with a small uppercase tracked sub-label "Piano & Cello Studio". Clicking it navigates Home. When collapsed, hide the wordmark — show only the logo, centered.
- **Nav items**: daisyUI `menu` semantics. Each item is a row: `flex items-center gap-3`, `rounded-[var(--radius-selector)]`, padding `10px 12px`, `font-medium`, `0.95rem`.
  - **Default**: text `rgba(255,255,255,.92)`, transparent background.
  - **Active** (current route): background `#FFFFFF`, text `#7A1422`, weight 700.
  - **Hover** (inactive): `background: rgba(255,255,255,.12)`.
  - **No decorative icons next to labels.** (Earlier iterations had little glyphs — they were removed. Keep nav as clean text.)
  - Sub-item (MiniMusic): smaller (`0.82rem`), extra left padding (`pl-[30px]`).
- **Member Login**: pinned to the bottom (use a `flex-1` spacer above it). Slightly distinct: faint `rgba(255,255,255,.08)` background when inactive. **No lock icon** — plain text.
- **Collapse control**: a button at the very bottom, `rgba(0,0,0,.18)` background, white text, label "Collapse" + a chevron (`‹` when expanded, `›` when collapsed). Toggles the rail width.

### Collapsed rail behavior (REQUIRED — the user explicitly wants this collapsible)
When collapsed (78px):
- Hide all text labels and the wordmark.
- For each nav item show a **single-letter monogram** (first letter of the label, uppercase, weight 700) centered — e.g. H, L, P, S, T, C, and "M" for Member Login. **Not** an icon font.
- Center every item (`justify-center`).
- Persist the collapsed state (e.g. `localStorage` key `rail-collapsed`) so it survives reloads.

### Mobile (< 900px)
- Switch to daisyUI **`drawer`**: the rail becomes an off-canvas drawer.
- Show a top bar (`bg-secondary` `#7A1422`, white) with the logo, "Appassionata" wordmark, and a hamburger button (`btn btn-square`) that opens the drawer.
- A scrim/overlay closes the drawer; `Esc` also closes it.
- In the drawer, always show full labels (never the collapsed monogram state on mobile).

> daisyUI mapping: use `drawer` + `drawer-side` for the mobile off-canvas behavior, and `menu menu-md` for the list. For the desktop collapsible width, drive it with a React state boolean + the grid-template-columns transition described above (daisyUI has no built-in width-collapse, so this part is custom Tailwind).

## Contextual tiles (bottom of each page)

Below the article content, separated by a top hairline (`border-t border-base-300`, `margin-top:~54px`, `padding-top:~38px`), render a responsive grid of tiles:
`grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px`, centered, `max-width:940px`.

Three tiles (daisyUI `card`):
1. **Start lessons** — tinted card: `background:#FBEEF0; border:1px solid #ECD9DB`. Heading "Start lessons" (`font-display` 600, `#7A1422`). Body "Book a meet-and-greet or trial lesson with Laura." Button: **`btn btn-accent rounded-full`** "Book a trial lesson" → routes to `/contact` (and in production opens the My Music Staff booking widget).
2. **Contact** — `card card-bordered bg-base-100`. Heading "Contact". Phone `(801) 455-5539` (`tel:` link), email `Ljefrancis1990@gmail.com` (`mailto:`), address `917 East Statice Ave, Sandy, UT`. Use small `text-primary` markers, links in ink with `font-semibold`.
3. **Find the studio** — `card card-bordered bg-base-100`. Heading "Find the studio" + the Google Map embed (`<iframe>` to `https://www.google.com/maps?q=917+East+Statice+Avenue+Sandy+UT&output=embed`, `height:150px`, `rounded`).

These tiles are the same across pages (a shared `<ContextTiles />` component).

## Typography spec

- Headings use `font-display` (Source Serif 4).
- **Eyebrow** (page kicker): `font-sans`, uppercase, `letter-spacing:.18em`, `0.72rem`, weight 700, `text-primary`, ~10px bottom margin.
- **H1**: `font-display` 700, `clamp(2.4rem, 4vw, 3.4rem)`, line-height ~1.06, `text-base-content`.
- **Lede / subhead**: `font-display` *italic* 500, ~`1.15rem`, `#7A1422`.
- **H2** (section): `font-display` 600, ~`1.9rem`, `text-secondary` (`#7A1422`), margin-top ~`2rem`.
- **H3** (card/tile/group title): `font-display` 600/700, `1.2–1.45rem`, `#7A1422`.
- **Body**: `font-sans`, `1.05rem`, line-height ~1.78, color `#2a2d33`. Keep measure ≤ ~70ch.
- **Chips/badges** (e.g. tuition `$110/mo`, credentials): daisyUI `badge` tinted `bg-[#F6E7E9] text-[#7A1422]`, pill, weight 700, `0.78–0.82rem`.

## Page-by-page notes

**Home** — eyebrow "Piano & Cello Lessons · Sandy, Utah"; H1 "Inspiring a Passion for Music"; italic lede "Welcome to the studio of Laura Ebersole Francis"; a restrained hero image (`reference` piano-keys image, `height ~260px`, `rounded-2xl`, `object-cover`); two intro paragraphs; H2 "Appassionata is in Sandy" + location paragraph; a **pull-quote** (Beethoven) — `font-display` italic, `1.5rem`, `#7A1422`, left border `3px solid #C9A24B`, left padding.

**Laura's Story** — eyebrow "About"; H1 "Laura's Story"; italic lede "My Musical Adventure"; a portrait photo floated right (`~210×252`, `rounded-2xl`); three biography paragraphs; a row of credential badges ("35th year teaching", "Principal cellist · Utah Philharmonic", "B.M. Piano Pedagogy, USU").

**Programs & Tuition** — eyebrow "Lessons"; H1; lede "Music adventures for every age and stage"; five `card`s by age group (Ages 5–7, 8–11, 11–College, Adults, Specialized). Each card: title (H3) + an uppercase tracked `text-primary` tag (e.g. "First steps") + offerings as short paragraphs with `<strong>` names and inline tuition badges. The "Specialized" card uses `bg-base-200` (no shadow). End with a text link to register/book.

**MiniMusic Class** — eyebrow "Ages 5–7"; H1 "MiniMusic Class"; lede; an H2 "Would MiniMusic be a good fit?" with a bullet list; a paragraph; H2 "The essentials" with a responsive grid of 4 small bordered fact cards (When / Tuition / Length / Where); a registration note linking to Contact.

**Studio Life & Policy** — eyebrow "Updated July 2025"; H1 "Studio Life & Policy"; lede; a **2-column grid of bordered summary cards** (8 cards: philosophy, parents, students, tuition, attendance & missed lessons, performance, music library, evaluation) each with an H3 + a 1–2 sentence summary; a closing hairline note about summer session.

**Testimonials** — eyebrow "In their words"; H1; two testimonial `figure`s, each `card`-like (`flex gap` row): a circular student photo (~74px) + an italic `font-display` quote + attribution (name in `#7A1422`, details in muted). Footer line "More testimonials coming soon…".

**Contact** — eyebrow "Get in touch"; H1 "Contact Laura"; intro paragraph; two outlined "chips" (phone, email) as `tel:`/`mailto:` links; a **Send a message** card with daisyUI `input`/`textarea` (Name, Email, Message) and a `btn btn-secondary rounded-full` "Send message"; note "Contact form powered by My Music Staff." In production, replace this form with the My Music Staff embed.

**Member Login** — a centered (`max-width:400px`) login card: logo, H1 "Member Login", subtitle, daisyUI `input` Email + Password, a right-aligned "Forgot password?" link, a full-width `btn btn-secondary rounded-full` "Sign in", and a "Secure member portal powered by My Music Staff." note. In production this links to / embeds the My Music Staff member login.

## Design tokens (summary)

| Token | Value | Use |
|---|---|---|
| primary | `#9E1B2F` | brand red, links, active accents |
| secondary | `#7A1422` | deep maroon, rail gradient top, headings, buttons |
| accent | `#C9A24B` | gold, primary CTA button |
| base-100 | `#FFFFFF` | surfaces/cards |
| base-200 | `#FAF7F5` | app background |
| base-300 | `#E7E2DE` | borders/hairlines |
| base-content | `#1F2227` | ink |
| body text | `#2a2d33` | paragraph color |
| tint | `#F6E7E9` / `#FBEEF0` | badge / CTA-tile backgrounds |
| muted | `#4A4F57` | secondary text |
| radius-box | `1rem` (16px) | cards/tiles |
| radius-field/selector | `0.625rem` (10px) | inputs, buttons, nav items |
| pill | `9999px` | CTA & primary buttons (`rounded-full`) |
| shadow (card) | `0 1px 2px rgba(0,0,0,.04), 0 8px 20px rgba(0,0,0,.05)` | tiles/cards |
| spacing | 4 / 8 / 16 / 24 / 40 / 64 px | base scale |
| breakpoints | mobile ≤767, tablet ≤1024, desktop ≥1025; rail→drawer < 900 | layout |

## Assets

Studio photos and the logo are public on the current site. URLs and metadata are in `reference/image_manifest.csv`. For production, download originals (the original data pack included a `download_assets.sh`) into `public/images/` and reference locally rather than hot-linking. Drop the two generic template stock images (`gallery-column-1/2.jpg`) noted in the manifest. Imagery should stay **restrained** — lead with type; use a single hero on Home and small supporting photos elsewhere.

## Embedded third-party widgets (keep these)

The studio runs on **My Music Staff**. Booking, the contact form, the member login, and the calendar are My Music Staff widgets. Re-skin all marketing pages freely, but keep embedding those widgets where noted (Contact form, Login, the "Book a trial" CTA, the studio map). Treat the mocked form/login in the prototype as placeholders for those embeds.

## Accessibility

- Maintain the AA-safe brand red `#9E1B2F` (the original `#BF2020` failed AA for white text). Don't revert to the brighter red for text/buttons.
- Visible focus ring: `outline: 3px solid #0F62FE; outline-offset: 2px`.
- The rail is `<nav aria-label="Primary">`; the collapse button and hamburger need `aria-expanded`; the mobile drawer must be keyboard-closable (Esc) and focus-trapped while open.
- Hit targets ≥ 44px on touch.

## Definition of done

- Two-column shell with a working **collapsible** rail (expand/collapse on desktop, off-canvas drawer on mobile), state persisted.
- All 8 routes implemented with the copy from `content.md`.
- daisyUI components used for buttons, cards, inputs, menu, drawer, badges; custom Tailwind only where daisyUI has no equivalent (rail width-collapse, gradient rail).
- Brand theme applied via the daisyUI custom theme above; Source Serif 4 + Mulish loaded.
- Contextual tiles shared across pages; My Music Staff embed points stubbed and clearly marked.
- Matches the reference prototype's look at desktop and degrades cleanly to mobile.
