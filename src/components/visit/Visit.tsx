import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { LoaLogo } from "@/components/LoaLogo";
import { ArrowIcon, ClockIcon, ExternalIcon, PinIcon, TrainIcon } from "@/components/icons";
import { MapEmbed } from "./MapEmbed";
import facade from "@/assets/images/facade.jpg";
import { site } from "@/data/site";
import { cx } from "@/lib/cx";
import styles from "./Visit.module.css";

export function Visit() {
  const { address, happyHours } = site;

  return (
    <section id="visit" className={styles.visit} aria-labelledby="visit-title">
      <div className={cx("container", styles.grid)}>
        <div className={styles.info}>
          <Reveal>
            <p className={cx("eyebrow", styles.eyebrow)}>Visit</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="visit-title" className={styles.title}>
              Find the <em>terracotta</em> arches.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className={styles.lede}>
              Look for the glowing
              <LoaLogo className={styles.inlineLogo} title="loa." />
              sign on {address.street}, {address.area}.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <dl className={styles.details}>
              <div>
                <dt>
                  <PinIcon /> Address
                </dt>
                <dd>
                  <address>
                    {address.street}, {address.area}
                    <br />
                    {address.city}, {address.region}
                  </address>
                </dd>
              </div>
              <div>
                <dt>
                  <TrainIcon /> Getting here
                </dt>
                <dd>{site.transit}</dd>
              </div>
              <div>
                <dt>
                  <ClockIcon /> Happy hours
                </dt>
                <dd>Hookah lounge, {happyHours.label}</dd>
              </div>
              {site.phone && (
                <div>
                  <dt>Call</dt>
                  <dd>
                    <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a>
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>

          <Reveal delay={0.2} className={styles.actions}>
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-burn">
              Get directions <ArrowIcon />
            </a>
            <a href={site.googleListingUrl} target="_blank" rel="noopener noreferrer" className={cx("btn btn-ghost", styles.ghost)}>
              View on Google <ExternalIcon />
            </a>
          </Reveal>
        </div>

        <Reveal className={styles.media} delay={0.1} y={50}>
          <MapEmbed />
          <figure className={styles.postcard}>
            <div className={styles.postcardImg}>
              <Image
                src={facade}
                alt="Loa Cafe building at dusk on 1st Cross Rd"
                fill
                placeholder="blur"
                quality={70}
                sizes="(max-width: 960px) 56vw, 300px"
                className={styles.img}
              />
            </div>
            <figcaption className="script">you&rsquo;re here</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
