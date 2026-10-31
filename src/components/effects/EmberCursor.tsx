"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cx } from "@/lib/cx";
import styles from "./EmberCursor.module.css";

/** A warm glow that trails the mouse. Never mounted on touch devices. */
export function EmberCursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  if (!finePointer || reduced) return null;
  return <Follower />;
}

function Follower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setActive(!!target?.closest("a, button, [role='button'], [draggable='true'], figure"));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <m.div
      className={cx(styles.ring, active && styles.active, visible && styles.visible)}
      style={{ x: sx, y: sy }}
      aria-hidden="true"
    />
  );
}
