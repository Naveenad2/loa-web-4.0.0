import type { Metadata, Viewport } from "next";
import { Anton, Cormorant, Manrope, Pinyon_Script } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/data/site";
import "./globals.css";

const serif = Cormorant({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Script accents only appear below the fold, so keep them off the critical path.
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
  preload: false,
});

// Only used on the match-night panel, so it isn't preloaded.
const poster = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poster",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} · Panampilly Nagar, Kochi`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Loa Cafe",
    "Loa Kochi",
    "hookah lounge Kochi",
    "cafe Panampilly Nagar",
    "Slow Burn Social Lounge",
    "happy hours Kochi",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1d130e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: `${site.name} — ${site.tagline}`,
  description: site.description,
  image: "/images/facade.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street}, ${site.address.area}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  hasMap: site.googleListingUrl,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${script.variable} ${poster.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
