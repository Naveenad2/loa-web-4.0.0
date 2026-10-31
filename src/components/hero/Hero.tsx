import type { CSSProperties } from "react";
import { LoaLogo } from "@/components/LoaLogo";
import { ArrowIcon } from "@/components/icons";
import { Smoke } from "@/components/effects/Smoke";
import { Vines } from "@/components/effects/Vines";
import { HeroVisual } from "./HeroVisual";
import { HappyHourChip } from "./HappyHourChip";
import { site } from "@/data/site";
import { cx } from "@/lib/cx";
import styles from "./Hero.module.css";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.bg} aria-hidden="true">
        <Smoke />
      </div>

      <div className={cx("container", styles.inner)}>
        <div className={styles.copy}>
          <p className={cx("eyebrow", styles.eyebrow, styles.fade)} style={delay(0.1)}>
            {site.address.area} · {site.address.city}
          </p>

          <h1 className={styles.title}>
            <LoaLogo className={styles.logo} title="Loa" draw neon />
            <span className={styles.titleText}>
              <span className={styles.line}>
                <span style={delay(0.35)}>Slow Burn</span>
              </span>
              <span className={styles.line}>
                <span style={delay(0.48)}>
                  <em>Social Lounge</em>
                </span>
              </span>
            </span>
          </h1>

          <p className={cx(styles.lede, styles.fade)} style={delay(0.6)}>
            A café by day, a hookah lounge by dusk — and evenings that never feel rushed.
          </p>

          <div className={cx(styles.actions, styles.fade)} style={delay(0.75)}>
            <a href="#visit" className="btn btn-burn">
              Plan your visit <ArrowIcon />
            </a>
            <HappyHourChip />
          </div>
        </div>

        <HeroVisual>
          <Vines className={styles.vines} />
        </HeroVisual>
      </div>

      <a href="#story" className={styles.cue} aria-label="Scroll to our story">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}
