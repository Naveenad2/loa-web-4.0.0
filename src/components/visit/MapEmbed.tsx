"use client";

import { useState } from "react";
import { PinIcon } from "@/components/icons";
import { site } from "@/data/site";
import styles from "./Visit.module.css";

/** Google Maps is ~1MB of JS, so it only loads when someone asks for it. */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className={styles.map}>
        <iframe
          className={styles.iframe}
          src={site.mapEmbedUrl}
          title="Map showing Loa Cafe in Panampilly Nagar, Kochi"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles.map}>
      <div className={styles.mapArt} aria-hidden="true">
        <span className={styles.road1} />
        <span className={styles.road2} />
        <span className={styles.road3} />
        <span className={styles.pin}>
          <PinIcon />
        </span>
      </div>
      <button type="button" className={styles.mapBtn} onClick={() => setLoaded(true)}>
        <span className={styles.mapLabel}>
          <strong>Loa Cafe</strong>
          {site.address.street}, {site.address.area}
        </span>
        <span className={styles.mapAction}>Tap to load map</span>
      </button>
    </div>
  );
}
