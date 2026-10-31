"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { CircleBadge } from "@/components/effects/CircleBadge";
import facade from "@/assets/images/facade.jpg";
import booth from "@/assets/images/booth.jpg";
import styles from "./Hero.module.css";

export function HeroVisual({ children }: { children?: React.ReactNode }) {
  const { scrollY } = useScroll();
  const archY = useTransform(scrollY, [0, 900], [0, 110]);
  const imageScale = useTransform(scrollY, [0, 900], [1, 1.18]);
  const portholeY = useTransform(scrollY, [0, 900], [0, -80]);
  const badgeRotate = useTransform(scrollY, [0, 900], [0, 120]);

  return (
    <div className={styles.visual}>
      <m.div className={styles.arch} style={{ y: archY }}>
        <m.div className={styles.archMedia} style={{ scale: imageScale }}>
          <Image
            src={facade}
            alt="Loa Cafe's terracotta façade with arched windows, hanging vines and the glowing loa. sign at dusk"
            fill
            preload
            fetchPriority="high"
            placeholder="blur"
            quality={80}
            sizes="(max-width: 960px) 88vw, 460px"
            className={styles.archImg}
          />
        </m.div>
        <span className={styles.archShine} aria-hidden="true" />
        {children}
      </m.div>

      <m.div className={styles.porthole} style={{ y: portholeY }}>
        <Image
          src={booth}
          alt="Olive-green booth and rattan chair inside Loa"
          fill
          placeholder="blur"
          quality={70}
          sizes="(max-width: 960px) 40vw, 220px"
          className={styles.portholeImg}
        />
      </m.div>

      <m.div className={styles.badge} style={{ rotate: badgeRotate }}>
        <CircleBadge id="hero-badge" text="Slow burn • Social lounge • Kochi • " />
      </m.div>
    </div>
  );
}
