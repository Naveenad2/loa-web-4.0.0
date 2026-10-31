import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ScrollRevealText } from "./ScrollRevealText";
import monstera from "@/assets/images/monstera.jpg";
import { site } from "@/data/site";
import { cx } from "@/lib/cx";
import styles from "./Story.module.css";

const PILLARS = [
  {
    title: "Café by day",
    body: "Coffee, conversation and olive-green booths beneath tall arched windows.",
  },
  {
    title: "Lounge by dusk",
    body: `Slow-burning hookah in low light, with happy hours from ${site.happyHours.startLabel} to ${site.happyHours.endLabel}.`,
  },
  {
    title: "Socials & match nights",
    body: "Catch the game with your crew, or join a hands-on creative workshop.",
  },
];

export function Story() {
  return (
    <section id="story" className={styles.story}>
      <div className={cx("container", styles.inner)}>
        <div className={styles.head}>
          <Reveal>
            <p className={cx("eyebrow", styles.eyebrow)}>The Loa way</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.title}>
              Evenings, <span className={cx("script", styles.scriptWord)}>unhurried.</span>
            </h2>
          </Reveal>
        </div>

        <div className={styles.grid}>
          <ScrollRevealText
            className={styles.manifesto}
            emClassName={styles.em}
            text={`Loa is a café that *slows* the city down. Coffee in the afternoon, a hookah as the sun sets, good company long after — inside a *terracotta* house of arches on ${site.address.street}, ${site.address.area}.`}
          />

          <Reveal className={styles.figureWrap} delay={0.1}>
            <figure className={styles.figure}>
              <div className={styles.frame}>
                <Image
                  src={monstera}
                  alt="A monstera in a woven planter beside Loa's olive booths"
                  fill
                  placeholder="blur"
                  quality={70}
                  sizes="(max-width: 960px) 60vw, 300px"
                  className={styles.img}
                />
              </div>
              <figcaption className={cx("script", styles.caption)}>a Loa evening</figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className={styles.pillars}>
          {PILLARS.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08} className={styles.pillar}>
                <span className={styles.pillarIndex}>0{i + 1}</span>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
