"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { m, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { moods, type Mood } from "@/data/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cx } from "@/lib/cx";
import styles from "./Moods.module.css";

/**
 * Desktop: the section pins and vertical scroll drives the panels sideways.
 * Mobile: a native, snap-scrolling carousel (no scroll hijacking, no JS work on scroll).
 */
export function Moods() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const [distance, setDistance] = useState(0);
  const distanceMV = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distanceMV.get());
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!isDesktop || !pin || !track) {
      distanceMV.set(0);
      setDistance(0);
      return;
    }
    const measure = () => {
      const d = Math.max(0, track.scrollWidth - pin.clientWidth);
      distanceMV.set(d);
      setDistance(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(pin);
    ro.observe(track);
    return () => ro.disconnect();
  }, [isDesktop, distanceMV]);

  return (
    <section
      id="moods"
      ref={sectionRef}
      className={styles.moods}
      style={isDesktop && distance ? ({ "--distance": `${distance}px` } as CSSProperties) : undefined}
      aria-labelledby="moods-title"
    >
      <div ref={pinRef} className={styles.pin}>
        <header className={cx("container", styles.head)}>
          <div>
            <p className={cx("eyebrow", styles.eyebrow)}>Moods of Loa</p>
            <h2 id="moods-title" className={styles.title}>
              Four moods, <em>one address.</em>
            </h2>
          </div>
          <div className={styles.meter} aria-hidden="true">
            <span className={styles.hint}>{isDesktop ? "Keep scrolling" : "Swipe"} →</span>
            <span className={styles.bar}>
              <m.i style={{ scaleX: progress }} />
            </span>
          </div>
        </header>

        <m.div ref={trackRef} className={styles.track} style={{ x }}>
          {moods.map((mood) => (
            <Panel key={mood.id} mood={mood} />
          ))}
        </m.div>
      </div>
    </section>
  );
}

function trackPointer(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function Panel({ mood }: { mood: Mood }) {
  return (
    <article className={cx(styles.panel, styles[mood.tone])} onPointerMove={trackPointer} aria-labelledby={`mood-${mood.id}`}>
      <div className={styles.panelBody}>
        <div className={styles.text}>
          <span className={styles.index} aria-hidden="true">
            {mood.index}
          </span>
          <p className={cx("script", styles.kicker)}>{mood.kicker}</p>
          <h3 id={`mood-${mood.id}`} className={styles.panelTitle}>
            {mood.title}
          </h3>
          <p className={styles.copy}>{mood.body}</p>
          {mood.tags && (
            <ul className={styles.tags} aria-label="Recent workshops">
              {mood.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>

        {mood.image && (
          <div className={cx(styles.media, mood.tone === "ember" && styles.mediaTall)}>
            <Image
              src={mood.image.src}
              alt={mood.image.alt}
              fill
              placeholder="blur"
              quality={70}
              sizes="(max-width: 960px) 80vw, 340px"
              className={styles.img}
            />
          </div>
        )}

        {mood.tone === "match" && <MatchArt />}
      </div>
    </article>
  );
}

/** A nod to Loa's own match-night poster: red grid, smoke cloud, shouty type. */
function MatchArt() {
  return (
    <div className={styles.matchArt} aria-hidden="true">
      <span className={cx("script", styles.smokeUp)}>Smoke up</span>
      <span className={styles.goal}>
        <b>THE</b>
        <b>GOAAAAL!!</b>
      </span>
      <span className={styles.cloud}>Catch the match with hookah</span>
    </div>
  );
}
