import { LoaLogo } from "@/components/LoaLogo";
import { cx } from "@/lib/cx";
import styles from "./CircleBadge.module.css";

const R = 41;
const CIRCUMFERENCE = 2 * Math.PI * R;

type CircleBadgeProps = {
  /** Unique per page — used for the SVG text path reference. */
  id: string;
  text: string;
  className?: string;
};

export function CircleBadge({ id, text, className }: CircleBadgeProps) {
  return (
    <div className={cx(styles.badge, className)} aria-hidden="true">
      <svg viewBox="0 0 100 100" className={styles.ring} focusable="false">
        <defs>
          <path id={id} d={`M50 ${50 - R}a${R} ${R} 0 1 1 0 ${2 * R}a${R} ${R} 0 1 1 0 ${-2 * R}`} />
        </defs>
        <text className={styles.text}>
          <textPath href={`#${id}`} textLength={CIRCUMFERENCE - 2} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <LoaLogo className={styles.logo} decorative />
    </div>
  );
}
