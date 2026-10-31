"use client";

import { m, useScroll, useSpring } from "framer-motion";
import styles from "./ScrollProgress.module.css";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  return <m.div className={styles.bar} style={{ scaleX }} aria-hidden="true" />;
}
