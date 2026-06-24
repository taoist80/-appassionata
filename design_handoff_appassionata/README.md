# Handoff: Appassionata Piano & Cello Studio — website redesign

## Overview
A redesign of the Appassionata Piano & Cello Studio website (a home studio in Sandy, Utah, owned by Laura Ebersole Francis). The selected direction is **"Option A — Refined Classic"**: a calm, traditional, family-friendly site built as a **two-column app shell** — a **collapsible left navigation rail** plus a centered reading column — with contextual actions (book a trial, contact, map) presented as **cards/tiles within the content flow**.

## Start here
1. **`CLAUDE.md`** — the build spec. Open it with Claude Code in your new project; it is written as instructions for implementing this design with **Tailwind CSS + daisyUI** (the user's chosen component library). It is self-sufficient: stack, setup commands, the brand daisyUI theme, the app-shell + collapsible-rail behavior, every page, and the design tokens.
2. **`reference/Option A — Refined Classic.dc.html`** — the visual prototype. View it to see the intended look and the collapse/drawer behavior in action.
3. **`reference/content.md`** — all page copy, verbatim. Source of truth for text.
4. **`reference/image_manifest.csv`** — every image (page, role, size, full-res URL).
5. **`reference/design_tokens.json`** — raw color/type/spacing/grid tokens.

## About the design files
The files in `reference/` are **design references created in HTML** — prototypes that show the intended look and behavior, **not production code to copy directly**. The `.dc.html` prototype in particular uses a custom rendering runtime and will not drop into a normal app.

Your task is to **recreate this design in a real codebase**. `CLAUDE.md` recommends **Vite + React + TypeScript + Tailwind v4 + daisyUI v5** (the user wants daisyUI). If you are adding this to an existing app instead, follow that app's framework and conventions and apply the tokens/components from `CLAUDE.md`.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and interactions are final and specified exactly in `CLAUDE.md` (and `design_tokens.json`). Recreate the UI faithfully using daisyUI components, falling back to custom Tailwind only where daisyUI has no equivalent (the gradient rail and its width-collapse).

## Screens / Views
Eight routes. Full per-page layout, components, exact copy, colors, and typography are documented in **`CLAUDE.md` → "Page-by-page notes"** and **"The app shell"**. In brief:

- **Home** (`/`) — hero headline, welcome copy, location section, Beethoven pull-quote.
- **Laura's Story** (`/story`) — bio with floated portrait + credential badges.
- **Programs & Tuition** (`/programs`) — five age-group cards with tuition badges.
- **MiniMusic Class** (`/programs/minimusic`) — fit checklist + essentials fact grid.
- **Studio Life & Policy** (`/policies`) — 2-column grid of policy summary cards.
- **Testimonials** (`/testimonials`) — quote figures with student photos.
- **Contact** (`/contact`) — phone/email + message form (My Music Staff embed in prod).
- **Member Login** (`/login`) — centered login card (My Music Staff embed in prod).

## Interactions & Behavior
- **Collapsible left rail** (explicitly requested): expands (252px) / collapses (78px) on desktop with a ~220ms grid transition; collapsed state shows single-letter monograms and is persisted to `localStorage`.
- **Mobile (< 900px)**: rail becomes a daisyUI off-canvas `drawer` opened by a top-bar hamburger; closes on scrim click or `Esc`.
- **Navigation**: active route highlighted in the rail (white pill, maroon text); client-side routing via react-router.
- **CTAs**: "Book a trial lesson" → Contact / My Music Staff booking widget.
- Full details, hover/active/focus states, and transitions are in `CLAUDE.md`.

## State Management
- `railCollapsed: boolean` (persisted in `localStorage` as `rail-collapsed`).
- `drawerOpen: boolean` (mobile).
- Current route (react-router).
- Contact/login forms are placeholders for My Music Staff embeds — no real submission logic required initially.

## Design Tokens
See the table in **`CLAUDE.md` → "Design tokens (summary)"** and the full **`reference/design_tokens.json`**. Headline values: primary `#9E1B2F`, secondary `#7A1422`, accent/gold `#C9A24B`, app bg `#FAF7F5`, ink `#1F2227`, hairline `#E7E2DE`; fonts **Source Serif 4** (display) + **Mulish** (body); card radius 16px, field radius 10px, pill buttons.

## Assets
Public studio photos + logo — URLs, roles, and resolutions in `reference/image_manifest.csv`. For production, download originals into `public/images/` and reference locally instead of hot-linking; drop the two generic template stock images flagged in the manifest. Keep imagery restrained (type-led).

## Third-party embeds
The studio runs on **My Music Staff**. Keep embedding its booking, contact-form, member-login, and calendar/map widgets where the prototype shows placeholders. Re-skin everything else freely.

## Files
- `CLAUDE.md` — build spec (primary).
- `reference/Option A — Refined Classic.dc.html` — visual prototype (design reference).
- `reference/content.md` — verbatim copy.
- `reference/image_manifest.csv` — image inventory.
- `reference/design_tokens.json` — raw tokens.
