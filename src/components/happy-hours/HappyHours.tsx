import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Smoke } from "@/components/effects/Smoke";
import { Embers } from "@/components/effects/Embers";
import { HappyHoursLive } from "./HappyHoursLive";
import hookah from "@/assets/images/hookah.jpg";
import { site } from "@/data/site";
import { cx } from "@/lib/cx";
import styles from "./HappyHours.module.css";

const [startNum, startUnit] = site.happyHours.startLabel.split(" ");
const [endNum, endUnit] = site.happyHours.endLabel.split(" ");

export function HappyHours() {
  return (
    <section id="happy-hours" className={styles.section} aria-labelledby="hh-title">
      <div className={styles.bg} aria-hidden="true">
        <Smoke tint="cool" />
        <Embers />
      </div>

      <div className={cx("container", styles.grid)}>
        <div className={styles.copy}>
          <Reveal>
            <span className={styles.offer}>Limited time offer</span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 id="hh-title" className={styles.title}>
              <span className={styles.happy}>
                Happy
                <br />
                Hours
              </span>
              <span className={cx("script", styles.atThe)}>at the</span>
              <span className={styles.lounge}>Hookah Lounge</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.time} aria-label={`From ${site.happyHours.startLabel} to ${site.happyHours.endLabel}`}>
              <span>{startNum}</span>
              <small>{startUnit}</small>
              <i aria-hidden="true" />
              <span>{endNum}</span>
              <small>{endUnit}</small>
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <HappyHoursLive />
          </Reveal>

          <p className={styles.terms}>*T&amp;C apply. Offer valid for a limited time.</p>
        </div>

        <Reveal className={styles.visual} delay={0.1} y={60}>
          <div className={styles.ring}>
            <div className={styles.arch}>
              <Image
                src={hookah}
                alt="A hookah wrapped in drifting smoke beside Loa's leather booths"
                fill
                placeholder="blur"
                quality={75}
                sizes="(max-width: 960px) 72vw, 400px"
                className={styles.img}
              />
            </div>
          </div>
          <span className={styles.glow} aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}
