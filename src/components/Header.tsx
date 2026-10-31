"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { LoaLogo } from "@/components/LoaLogo";
import { ArrowIcon } from "@/components/icons";
import { navLinks, site } from "@/data/site";
import { cx } from "@/lib/cx";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cx(styles.header, scrolled && styles.scrolled, hidden && !open && styles.hidden)}
      data-menu-open={open}
    >
      <div className={cx("container", styles.bar)}>
        <a href="#top" className={styles.brand} aria-label="Loa — back to top" onClick={close}>
          <LoaLogo className={styles.logo} decorative neon />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className={cx("btn btn-burn", styles.cta)}>
          Directions <ArrowIcon />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="site-menu" ref={menuRef} className={styles.menu} data-open={open} inert={!open}>
        <nav aria-label="Mobile">
          <ul className={styles.menuList}>
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ "--i": i } as CSSProperties}>
                <a href={link.href} onClick={close}>
                  <span className={styles.menuIndex}>0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.menuFoot}>
          <p>
            {site.address.street}, {site.address.area}
            <br />
            {site.address.city}, {site.address.region}
          </p>
          <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-burn">
            Get directions <ArrowIcon />
          </a>
        </div>
        <LoaLogo className={styles.menuLogo} decorative neon />
      </div>
    </header>
  );
}
