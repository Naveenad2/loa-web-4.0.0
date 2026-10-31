"use client";

import { m, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/** Fades and lifts its children in once they scroll into view. */
export function Reveal({ delay = 0, y = 36, children, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
