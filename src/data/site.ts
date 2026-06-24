// Canonical production origin (no trailing slash) — used for canonical links,
// sitemap, and Open Graph URLs. Change here if the final domain differs.
export const SITE_URL = "https://appassionata-piano.pro";

// Default social/share image (1200×630), served from /public.
export const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

// Studio facts — single source of truth for contact details, embeds & schema.
export const STUDIO = {
  name: "Appassionata Piano & Cello Studio",
  shortName: "Appassionata",
  teacher: "Laura Ebersole Francis",
  tagline: "Inspiring a Passion for Music",
  phone: "(801) 455-5539",
  phoneHref: "tel:+18014555539",
  email: "Ljefrancis1990@gmail.com",
  emailHref: "mailto:Ljefrancis1990@gmail.com",
  address: "917 East Statice Ave, Sandy, UT",
  mapEmbed:
    "https://www.google.com/maps?q=917+East+Statice+Avenue+Sandy+UT&output=embed",
  // Structured-address parts for LocalBusiness JSON-LD
  streetAddress: "917 East Statice Ave",
  addressLocality: "Sandy",
  addressRegion: "UT",
  postalCode: "84094",
  addressCountry: "US",
  // Approximate coords (block south of Alta View Elementary). Google geocodes
  // from the postal address regardless; refine if exact coords are needed.
  geo: { lat: 40.5773, lng: -111.8502 },
  youtube: "https://www.youtube.com/@appassionatapianostudio3181",
} as const;

import type { IconName } from "../components/icons";

export interface NavItem {
  to: string;
  label: string;
  /** Icon shown beside the label, and on its own when the rail is collapsed. */
  icon: IconName;
  /** Sub-items render smaller and indented (e.g. MiniMusic). */
  sub?: boolean;
  /** Match the route exactly (used for "/" and "/programs"). */
  end?: boolean;
}

// Rail order. Member Login is handled separately (pinned to the bottom).
export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", icon: "home", end: true },
  { to: "/story", label: "Laura's Story", icon: "story" },
  { to: "/programs", label: "Programs & Tuition", icon: "programs", end: true },
  {
    to: "/programs/minimusic",
    label: "MiniMusic · Ages 5–7",
    icon: "minimusic",
    sub: true,
  },
  { to: "/policies", label: "Studio Policies", icon: "policies" },
  { to: "/testimonials", label: "Testimonials", icon: "testimonials" },
  { to: "/contact", label: "Contact", icon: "contact" },
];

/** Build a BreadcrumbList JSON-LD object from an ordered list of crumbs. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "/" : it.path}`,
    })),
  };
}

// Per-route SEO copy — local-keyword-rich titles & descriptions. Keyed by path.
export interface PageSeo {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Piano & Cello Lessons in Sandy, Utah | Appassionata",
    description:
      "Appassionata Piano & Cello Studio in Sandy, Utah — piano and cello lessons for all ages with Laura Ebersole Francis, in her 35th year of teaching. Book a trial lesson.",
  },
  "/story": {
    title: "Laura's Story — Piano & Cello Teacher in Sandy, UT | Appassionata",
    description:
      "Meet Laura Ebersole Francis: B.M. in Piano Pedagogy (USU), principal cellist with the Utah Philharmonic, and a Sandy, Utah piano & cello teacher of 35 years.",
  },
  "/programs": {
    title: "Programs & Tuition — Piano & Cello Lessons, Sandy UT | Appassionata",
    description:
      "Piano and cello programs for every age in Sandy, Utah — MiniMusic (ages 5–7), group Blast lessons, individual lessons, adults, and specialized classes. See tuition.",
  },
  "/programs/minimusic": {
    title: "MiniMusic Class (Ages 5–7), Sandy UT | Appassionata",
    description:
      "MiniMusic is a joyful first music class for ages 5–7 in Sandy, Utah — no piano required, all learning done in class. Wednesdays 5–6pm, $110/mo. Reserve a spot.",
  },
  "/policies": {
    title: "Studio Life & Policy | Appassionata Piano & Cello, Sandy UT",
    description:
      "How Appassionata partners with families: practice expectations, tuition, attendance and make-up lessons, recitals, and the studio music library. Sandy, Utah.",
  },
  "/testimonials": {
    title: "Testimonials — Appassionata Piano & Cello Studio, Sandy UT",
    description:
      "What students and families say about lessons with Laura Ebersole Francis at Appassionata Piano & Cello Studio in Sandy, Utah.",
  },
  "/contact": {
    title: "Contact — Piano & Cello Lessons in Sandy, Utah | Appassionata",
    description:
      "Contact Laura at Appassionata Piano & Cello Studio in Sandy, Utah. Call or text (801) 455-5539, email, or send a message to book a meet-and-greet or trial lesson.",
  },
  "/login": {
    title: "Member Login | Appassionata Piano & Cello Studio",
    description:
      "Student Portal login for Appassionata Piano & Cello Studio members.",
  },
  "/privacy": {
    title: "Privacy Policy | Appassionata Piano & Cello Studio",
    description:
      "How Appassionata Piano & Cello Studio handles information collected through this website and its My Music Staff booking, contact, and login widgets.",
  },
};
