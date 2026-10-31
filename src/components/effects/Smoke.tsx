import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import styles from "./Smoke.module.css";

// Soft radial wisps that drift upward. Only transform/opacity animate, so it stays on the compositor.
const WISPS = [
  { x: 4, dur: 19, delay: -2, dx: 12, size: 1 },
  { x: 26, dur: 24, delay: -11, dx: -8, size: 1.25 },
  { x: 48, dur: 21, delay: -6, dx: 10, size: 0.9 },
  { x: 66, dur: 26, delay: -17, dx: -14, size: 1.35 },
  { x: 82, dur: 22, delay: -4, dx: 6, size: 1.05 },
  { x: 14, dur: 28, delay: -21, dx: 16, size: 1.2 },
  { x: 58, dur: 30, delay: -14, dx: -10, size: 1.4 },
];

export function Smoke({ className, tint = "warm" }: { className?: string; tint?: "warm" | "cool" }) {
  return (
    <div className={cx(styles.smoke, tint === "cool" && styles.cool, className)} aria-hidden="true">
      {WISPS.map((w, i) => (
        <span
          key={i}
          style={
            {
              "--x": `${w.x}%`,
              "--dur": `${w.dur}s`,
              "--delay": `${w.delay}s`,
              "--dx": `${w.dx}vw`,
              "--s": w.size,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
