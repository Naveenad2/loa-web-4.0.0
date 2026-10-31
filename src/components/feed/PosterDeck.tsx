"use client";

import { useState } from "react";
import Image from "next/image";
import { m, type PanInfo } from "framer-motion";
import { posters } from "@/data/content";
import { ArrowIcon } from "@/components/icons";
import styles from "./Feed.module.css";

// Resting pose for each depth in the stack (0 = top card).
const POSES = [
  { rotate: -2, x: 0, y: 0, scale: 1 },
  { rotate: 5, x: 26, y: 12, scale: 0.95 },
  { rotate: -8, x: -24, y: 22, scale: 0.9 },
];

const SWIPE_DISTANCE = 90;
const SWIPE_VELOCITY = 500;

/** A stack of Loa's posters. Swipe/drag the top one away (or use the buttons) to flip through. */
export function PosterDeck() {
  const [order, setOrder] = useState(() => posters.map((_, i) => i));

  const next = () => setOrder(([first, ...rest]) => [...rest, first]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_DISTANCE || Math.abs(info.velocity.x) > SWIPE_VELOCITY) next();
  };

  const current = posters[order[0]];

  return (
    <div className={styles.deckWrap}>
      <div className={styles.deck} role="group" aria-roledescription="carousel" aria-label="Loa posters">
        {posters.map((poster, i) => {
          const depth = order.indexOf(i);
          const top = depth === 0;
          return (
            <m.div
              key={poster.caption}
              className={styles.slot}
              style={{ zIndex: posters.length - depth }}
              animate={POSES[depth] ?? POSES[POSES.length - 1]}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              aria-hidden={!top}
            >
              <m.figure
                className={styles.card}
                drag={top ? "x" : false}
                dragSnapToOrigin
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                whileDrag={{ scale: 1.03, rotate: 2 }}
                style={{ touchAction: "pan-y" }}
              >
                <Image
                  src={poster.src}
                  alt={poster.alt}
                  placeholder="blur"
                  quality={75}
                  sizes="(max-width: 600px) 74vw, 380px"
                  draggable={false}
                  className={styles.cardImg}
                />
              </m.figure>
            </m.div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.navBtn} onClick={prev} aria-label="Previous poster">
          <ArrowIcon style={{ transform: "rotate(180deg)" }} />
        </button>
        <p className={styles.caption} aria-live="polite">
          <span>
            {order[0] + 1} / {posters.length}
          </span>
          {current.caption}
        </p>
        <button type="button" className={styles.navBtn} onClick={next} aria-label="Next poster">
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
