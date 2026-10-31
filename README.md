# Loa Cafe — Slow Burn Social Lounge

Website for Loa Cafe, 1st Cross Rd, Panampilly Nagar, Kochi. Built with Next.js 16 (App Router),
TypeScript, Framer Motion and hand-written CSS Modules.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Set `NEXT_PUBLIC_SITE_URL` to the live domain before deploying so social share previews resolve.

## Editing content

All copy lives in two files:

- `src/data/site.ts` — name, address, directions/map links, happy-hours times, nav, marquee words.
  **`phone` and `instagram` are empty on purpose** (they couldn't be verified). Fill them in and they
  appear automatically in the Visit section, Feed section and footer.
- `src/data/content.ts` — the four "moods" panels and the poster deck.

Photos are in `src/assets/images/` (cropped from Loa's own posts, with Instagram UI removed).
The logo is `logo.png` in the project root. `src/lib/logoPath.ts` is a vector trace of it, so it stays
sharp at any size and can be animated.

## Sections

Hero (neon logo that writes itself, façade in an arch) → crossed marquee ribbons → Story (scroll-lit
manifesto) → Moods (pinned horizontal scroll on desktop, swipe carousel on mobile) → Happy Hours
(live Kochi-time status) → Feed (swipeable poster stack) → Visit (click-to-load map) → Footer.

## Performance notes

- The page is fully static (prerendered HTML) and CSS is inlined.
- Framer Motion's animation features are lazy-loaded after hydration (`LazyMotion`).
- Ambient effects (smoke, embers, vines, marquee, burning borders) animate only `transform`/`opacity`,
  so they run on the GPU compositor. Fewer layers render on small screens.
- Google Maps only loads when tapped. The cursor glow is never mounted on touch devices.
- `prefers-reduced-motion` turns animations off.

Lighthouse (mobile, slow 4G + 4× CPU, devtools throttling): Performance 99, Accessibility 100,
Best Practices 100, SEO 100. LCP 1.8s, CLS ≈ 0.
