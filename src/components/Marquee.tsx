import { marqueeWords } from "@/data/site";
import { cx } from "@/lib/cx";
import styles from "./Marquee.module.css";

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul className={styles.track} aria-hidden={hidden || undefined}>
      {marqueeWords.map((word) => (
        <li key={word}>
          <span>{word}</span>
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M10 0c.8 5.6 3.6 8.6 10 10-6.4 1.4-9.2 4.4-10 10C9.2 14.4 6.4 11.4 0 10c6.4-1.4 9.2-4.4 10-10Z" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

function Band({ variant }: { variant: "clay" | "cream" }) {
  return (
    <div className={cx(styles.band, styles[variant])}>
      <div className={styles.slider}>
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}

/** Two crossed ribbons of scrolling text — pure CSS, no JS. */
export function Marquee() {
  return (
    <div className={styles.marquee}>
      <Band variant="cream" />
      <Band variant="clay" />
    </div>
  );
}
