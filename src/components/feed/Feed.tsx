import { Reveal } from "@/components/Reveal";
import { LoaLogo } from "@/components/LoaLogo";
import { ArrowIcon } from "@/components/icons";
import { PosterDeck } from "./PosterDeck";
import { site } from "@/data/site";
import { cx } from "@/lib/cx";
import styles from "./Feed.module.css";

export function Feed() {
  return (
    <section id="feed" className={styles.feed} aria-labelledby="feed-title">
      <LoaLogo className={styles.watermark} decorative />

      <div className={cx("container", styles.grid)}>
        <div className={styles.copy}>
          <Reveal>
            <p className={cx("eyebrow", styles.eyebrow)}>Fresh from the feed</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="feed-title" className={styles.title}>
              What&rsquo;s on <em>at Loa</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className={styles.lede}>
              Offers, match nights and slow evenings — straight from Loa&rsquo;s own posters. Swipe the stack to flip
              through.
            </p>
          </Reveal>
          {site.instagram && (
            <Reveal delay={0.18}>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Follow on Instagram <ArrowIcon />
              </a>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} y={60}>
          <PosterDeck />
        </Reveal>
      </div>
    </section>
  );
}
