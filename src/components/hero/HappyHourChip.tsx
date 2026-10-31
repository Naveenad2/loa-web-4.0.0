"use client";

import { formatDuration, useHappyHours } from "@/hooks/useHappyHours";
import { site } from "@/data/site";
import { cx } from "@/lib/cx";
import styles from "./Hero.module.css";

export function HappyHourChip() {
  const status = useHappyHours();
  const live = status?.phase === "live";

  let label = `Hookah happy hours · ${site.happyHours.label}`;
  if (status?.phase === "live") label = `Happy hours on now · ends in ${formatDuration(status.minutesLeft)}`;
  else if (status?.phase === "before") label = `Happy hours from ${site.happyHours.startLabel} · in ${formatDuration(status.minutesLeft)}`;

  return (
    <a href="#happy-hours" className={cx(styles.chip, live && styles.chipLive)}>
      <span className={styles.chipDot} aria-hidden="true" />
      {label}
    </a>
  );
}
