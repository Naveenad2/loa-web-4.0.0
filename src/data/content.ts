import type { StaticImageData } from "next/image";
import booth from "@/assets/images/booth.jpg";
import hookah from "@/assets/images/hookah.jpg";
import happyHoursPoster from "@/assets/images/posters/happy-hours.jpg";
import eveningPoster from "@/assets/images/posters/loa-evening.jpg";
import matchPoster from "@/assets/images/posters/match-night.jpg";

// Section content that carries imagery. Plain text/config lives in ./site.ts.

export type MoodTone = "olive" | "ember" | "match" | "cream";

export type Mood = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  body: string;
  tone: MoodTone;
  image?: { src: StaticImageData; alt: string };
  tags?: string[];
};

export const moods: Mood[] = [
  {
    id: "cafe",
    index: "01",
    kicker: "by day",
    title: "The Café",
    body: "Olive-green booths, rattan chairs and warm light through tall arched glass. Pull up, order a coffee and let the afternoon stretch.",
    tone: "olive",
    image: { src: booth, alt: "Olive-green leather booth and rattan chair inside Loa Cafe" },
  },
  {
    id: "lounge",
    index: "02",
    kicker: "by dusk",
    title: "The Hookah Lounge",
    body: "Leather booths, low light and a slow-burning hookah. Settle in for the evening — happy hours run from 1 PM to 7 PM.",
    tone: "ember",
    image: { src: hookah, alt: "A hookah wrapped in soft smoke at the Loa lounge" },
  },
  {
    id: "match",
    index: "03",
    kicker: "game on",
    title: "Match Nights",
    body: "Catch the match with hookah. Every goal louder, every evening longer — bring the crew and smoke up the goal.",
    tone: "match",
  },
  {
    id: "socials",
    index: "04",
    kicker: "make something",
    title: "Workshops & Socials",
    body: "Loa plays host to hands-on creative sessions — craft, paint and make something with new people over coffee.",
    tone: "cream",
    tags: ["Punch needle", "Resin art", "Charcoal painting", "Candle making", "Clay trays", "Vision boards"],
  },
];

export const posters = [
  {
    src: happyHoursPoster,
    alt: "Loa poster: Happy Hours at the Hookah Lounge, 1 PM to 7 PM, limited time offer",
    caption: "Happy Hours at the Hookah Lounge",
  },
  {
    src: eveningPoster,
    alt: "Loa poster: A Loa evening — olive booth and monstera under a glowing pendant lamp",
    caption: "A Loa evening",
  },
  {
    src: matchPoster,
    alt: "Loa poster: Smoke up the GOAAAAL — catch the match with hookah, 1st Cross Rd, Panampilly Nagar",
    caption: "Smoke up the GOAAAAL!!",
  },
] as const;
