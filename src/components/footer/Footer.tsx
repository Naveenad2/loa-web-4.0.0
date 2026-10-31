import { InView } from "@/components/InView";
import { LoaLogo } from "@/components/LoaLogo";
import { ArrowIcon } from "@/components/icons";
import { navLinks, site } from "@/data/site";
import { cx } from "@/lib/cx";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={cx("container", styles.inner)}>
        <div className={styles.top}>
          <p className={styles.motto}>
            <span className="script">Evenings,</span> unhurried.
          </p>
          <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-burn">
            Get directions <ArrowIcon />
          </a>
        </div>

        <div className={styles.cols}>
          <div>
            <h3 className={styles.colTitle}>Visit</h3>
            <address className={styles.address}>
              {site.name} — {site.tagline}
              <br />
              {site.address.street}, {site.address.area}
              <br />
              {site.address.city}, {site.address.region}
            </address>
          </div>
          <nav aria-label="Footer">
            <h3 className={styles.colTitle}>Explore</h3>
            <ul className={styles.links}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className={styles.colTitle}>Happy hours</h3>
            <p>
              Hookah lounge · {site.happyHours.label}
              <br />
              <small>*T&amp;C apply. Limited time offer.</small>
            </p>
            {(site.instagram || site.phone) && (
              <ul className={styles.links}>
                {site.instagram && (
                  <li>
                    <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </li>
                )}
                {site.phone && (
                  <li>
                    <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        <InView className={styles.bigLogoWrap}>
          <LoaLogo className={styles.bigLogo} title="Loa" draw neon />
        </InView>

        <div className={styles.bottom}>
          <span>
            © {year} {site.name} · {site.tagline}
          </span>
          <a href="#top" className={styles.backTop}>
            Back to top <ArrowIcon style={{ transform: "rotate(-90deg)" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
