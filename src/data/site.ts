// Studio facts — single source of truth for contact details & embeds.
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
