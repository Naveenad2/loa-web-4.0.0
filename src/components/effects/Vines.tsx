import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import styles from "./Vines.module.css";

// Trailing creepers like the ones spilling over Loa's façade planters. The canopy follows a
// shallow curve so it can sit on top of an arch. Geometry comes from a seeded RNG at module
// load, so the markup is identical on every render. Each strand is its own <svg> so its sway
// is a compositor-only transform rather than a full SVG repaint every frame.

const LEAF = "M0 0C4-5 12-6.5 19 0C12 6.5 4 5 0 0Z";
const GREENS = ["#3d5a2a", "#56763a", "#2b4220", "#6a8a44", "#4a6a30"];
const WIDTH = 410;
const TOP = -14;
const HEIGHT = 340;
const VIEWBOX = `0 ${TOP} ${WIDTH} ${HEIGHT}`;
const ARC_DEPTH = 64;

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = rng(7);
const round = (n: number) => Math.round(n * 10) / 10;
const arcY = (x: number) => ARC_DEPTH * ((x - WIDTH / 2) / (WIDTH / 2)) ** 2;

const STRANDS = [
  { x: 40, len: 120 },
  { x: 92, len: 210 },
  { x: 150, len: 130 },
  { x: 205, len: 240 },
  { x: 262, len: 115 },
  { x: 318, len: 200 },
  { x: 368, len: 105 },
].map((s, i) => {
  const top = arcY(s.x);
  const drift = (rand() - 0.5) * 30;
  const pointAt = (y: number) => s.x + drift * (y / s.len) + Math.sin(y / 28 + i) * 5;
  const stem: string[] = [];
  for (let y = 0; y <= s.len; y += 10) stem.push(`${round(pointAt(y))} ${round(top + y)}`);
  const leaves = [];
  for (let y = 8, side = 1; y < s.len; y += 9 + rand() * 6, side *= -1) {
    leaves.push({
      x: round(pointAt(y)),
      y: round(top + y),
      rotate: Math.round(90 + side * (35 + rand() * 40)),
      scale: round(0.7 + rand() * 0.6 - (y / s.len) * 0.25),
      fill: GREENS[Math.floor(rand() * GREENS.length)],
    });
  }
  return {
    stem: `M${stem.join("L")}`,
    leaves,
    dur: round(5 + rand() * 3),
    delay: round(-rand() * 4),
    // Pivot at the strand's top, as a percentage of the shared viewBox.
    originX: round((s.x / WIDTH) * 100),
    originY: round(((top - TOP) / HEIGHT) * 100),
  };
});

const CANOPY = Array.from({ length: 34 }, (_, i) => {
  const x = 4 + i * 11.6 + (rand() - 0.5) * 6;
  return {
    x: round(x),
    y: round(arcY(x) - 4 + rand() * 10),
    rotate: Math.round(rand() * 360),
    scale: round(0.9 + rand() * 0.7),
    fill: GREENS[Math.floor(rand() * GREENS.length)],
  };
});

export function Vines({ className }: { className?: string }) {
  return (
    <div className={cx(styles.vines, className)} aria-hidden="true">
      {STRANDS.map((s, i) => (
        <svg
          key={i}
          className={styles.strand}
          viewBox={VIEWBOX}
          focusable="false"
          style={
            {
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
              "--ox": `${s.originX}%`,
              "--oy": `${s.originY}%`,
            } as CSSProperties
          }
        >
          <path d={s.stem} className={styles.stem} />
          {s.leaves.map((l, j) => (
            <path key={j} d={LEAF} fill={l.fill} transform={`translate(${l.x} ${l.y}) rotate(${l.rotate}) scale(${l.scale})`} />
          ))}
        </svg>
      ))}
      <svg viewBox={VIEWBOX} focusable="false">
        {CANOPY.map((l, i) => (
          <path key={i} d={LEAF} fill={l.fill} transform={`translate(${l.x} ${l.y}) rotate(${l.rotate}) scale(${l.scale})`} />
        ))}
      </svg>
    </div>
  );
}
