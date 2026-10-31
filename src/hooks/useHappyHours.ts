"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export type HappyHoursState = {
  phase: "before" | "live" | "after";
  /** Minutes until the next change (start or end). */
  minutesLeft: number;
  /** Current time in Kochi, e.g. "4:05 pm". */
  clock: string;
};

const { startHour, endHour, timeZone } = site.happyHours;

const partsFormatter = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const clockFormatter = new Intl.DateTimeFormat("en-IN", { timeZone, hour: "numeric", minute: "2-digit", hour12: true });

function compute(now: Date): HappyHoursState {
  const parts = partsFormatter.formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const mins = hour * 60 + minute;
  const start = startHour * 60;
  const end = endHour * 60;

  const phase = mins < start ? "before" : mins < end ? "live" : "after";
  const minutesLeft = phase === "before" ? start - mins : phase === "live" ? end - mins : 24 * 60 - mins + start;
  return { phase, minutesLeft, clock: clockFormatter.format(now) };
}

export function formatDuration(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}

/** Live happy-hours status in Kochi time. `null` until mounted, so server HTML stays time-independent. */
export function useHappyHours() {
  const [state, setState] = useState<HappyHoursState | null>(null);

  useEffect(() => {
    const tick = () => setState(compute(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
