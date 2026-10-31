import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import styles from "./Embers.module.css";

// Deterministic values so server and client markup always match.
const EMBERS = Array.from({ length: 16 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 97.13 + n * 13.7) + 1) / 2);
  return {
    x: Math.round(r(1) * 100),
    size: 2 + Math.round(r(2) * 3),
    dur: 7 + Math.round(r(3) * 9),
    delay: -Math.round(r(4) * 14),
    sway: Math.round((r(5) - 0.5) * 80),
  };
});

export function Embers({ className }: { className?: string }) {
  return (
    <div className={cx(styles.embers, className)} aria-hidden="true">
      {EMBERS.map((e, i) => (
        <span
          key={i}
          style={
            {
              "--x": `${e.x}%`,
              "--size": `${e.size}px`,
              "--dur": `${e.dur}s`,
              "--delay": `${e.delay}s`,
              "--sway": `${e.sway}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
