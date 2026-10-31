// Everything the site says about Loa lives here, so copy can be edited in one place.
// Details are taken from Loa's own posters and public listings. Fields that could not be
// verified (phone, Instagram) are left empty and simply don't render until filled in.

export const site = {
  name: "Loa Cafe",
  tagline: "Slow Burn Social Lounge",
  motto: "Evenings, unhurried.",
  description:
    "Loa Cafe — Slow Burn Social Lounge in Panampilly Nagar, Kochi. A café by day, a hookah lounge by dusk, with match nights, workshops and hookah happy hours from 1 PM to 7 PM.",
  // Set NEXT_PUBLIC_SITE_URL to the live domain so share previews use absolute URLs.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: {
    street: "1st Cross Rd",
    area: "Panampilly Nagar",
    city: "Kochi",
    region: "Kerala",
    country: "IN",
  },
  transit: "Nearest metro: Kadavanthra — then a short auto ride.",
  googleListingUrl: "https://share.google/uJ1ewh9VfzKYSx3WN",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Loa+Cafe+Slow+Burn+Social+Lounge+Panampilly+Nagar+Kochi",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Loa+Cafe+Slow+Burn+Social+Lounge,+Panampilly+Nagar,+Kochi&output=embed",
  happyHours: {
    label: "1 PM – 7 PM",
    startLabel: "1 PM",
    endLabel: "7 PM",
    startHour: 13,
    endHour: 19,
    timeZone: "Asia/Kolkata",
  },
  // e.g. "+91 98765 43210" and "https://instagram.com/<handle>"
  phone: "" as string,
  instagram: "" as string,
} as const;

export const navLinks = [
  { href: "#story", label: "Story" },
  { href: "#moods", label: "Moods" },
  { href: "#happy-hours", label: "Happy Hours" },
  { href: "#feed", label: "Feed" },
  { href: "#visit", label: "Visit" },
] as const;

export const marqueeWords = [
  "Coffee by day",
  "Hookah by dusk",
  "Evenings, unhurried",
  "Match nights",
  "Workshops & socials",
  "Panampilly Nagar",
] as const;
