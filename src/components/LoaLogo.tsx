import { LOGO_PATH, LOGO_VIEWBOX } from "@/lib/logoPath";
import { cx } from "@/lib/cx";
import styles from "./LoaLogo.module.css";

type LoaLogoProps = {
  className?: string;
  /** Accessible name. Ignored when `decorative`. */
  title?: string;
  decorative?: boolean;
  /** Writes the script stroke-by-stroke on first paint (CSS only, no JS needed). */
  draw?: boolean;
  /** Warm neon halo like the sign on the building. */
  neon?: boolean;
};

export function LoaLogo({ className, title = "Loa", decorative = false, draw = false, neon = false }: LoaLogoProps) {
  return (
    <span className={cx(styles.logo, draw && styles.draw, neon && styles.neon, className)}>
      {neon && (
        <svg className={styles.halo} viewBox={LOGO_VIEWBOX} aria-hidden="true" focusable="false">
          <path d={LOGO_PATH} fillRule="evenodd" />
        </svg>
      )}
      <svg
        className={styles.mark}
        viewBox={LOGO_VIEWBOX}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : title}
        aria-hidden={decorative || undefined}
        focusable="false"
      >
        <path className={styles.ink} d={LOGO_PATH} fillRule="evenodd" pathLength={1} />
      </svg>
    </span>
  );
}
