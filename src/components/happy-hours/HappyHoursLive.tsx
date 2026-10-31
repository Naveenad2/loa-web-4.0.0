"use client";

import { formatDuration, useHappyHours } from "@/hooks/useHappyHours";
import { ClockIcon } from "@/components/icons";
import { site } from "@/data/site";
import { cx } from "@/lib/cx";
import styles from "./HappyHours.module.css";

const WINDOW = (site.happyHours.endHour - site.happyHours.startHour) * 60;

export function HappyHoursLive() {
  const status = useHappyHours();

  let headline = `${site.happyHours.label}`;
  let detail = "Kochi time";
  let fill = 0;

  if (status?.phase === "live") {
    headline = "On now";
    detail = `Ends in ${formatDuration(status.minutesLeft)}`;
    fill = 1 - status.minutesLeft / WINDOW;
  } else if (status?.phase === "before") {
    headline = `Starts in ${formatDuration(status.minutesLeft)}`;
    detail = `Runs ${site.happyHours.label}`;
  } else if (status?.phase === "after") {
    headline = "Wrapped for today";
    detail = `Runs ${site.happyHours.label}`;
    fill = 1;
  }

  return (
    <div className={cx(styles.live, status?.phase === "live" && styles.isLive)}>
      <div className={styles.liveTop}>
        <span className={styles.liveDot} aria-hidden="true" />
        <span className={styles.liveHeadline}>{headline}</span>
        <span className={styles.clock}>
          <ClockIcon />
          {status ? `${status.clock} in Kochi` : "Kochi time"}
        </span>
      </div>
      <div
        className={styles.meter}
        role="progressbar"
        aria-label="Happy hours elapsed today"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(fill * 100)}
      >
        <i style={{ transform: `scaleX(${fill})` }} />
      </div>
      <div className={styles.meterLabels}>
        <span>{site.happyHours.startLabel}</span>
        <span>{detail}</span>
        <span>{site.happyHours.endLabel}</span>
      </div>
    </div>
  );
}
