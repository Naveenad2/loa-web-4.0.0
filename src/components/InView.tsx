"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";

/**
 * Sets `data-inview="true"` once the element scrolls into view, so CSS can start
 * animations that would otherwise run unseen on page load.
 */
export function InView({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-inview={inView} {...rest}>
      {children}
    </div>
  );
}
