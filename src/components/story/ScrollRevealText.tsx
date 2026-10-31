"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";

type Props = {
  /** Wrap words in *asterisks* to emphasise them. */
  text: string;
  className?: string;
  emClassName?: string;
};

/** Paragraph whose words light up one after another as it scrolls through the viewport. */
export function ScrollRevealText({ text, className, emClassName }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.5"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((raw, i) => {
        const emphasised = raw.startsWith("*");
        const word = raw.replace(/\*/g, "");
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            className={emphasised ? emClassName : undefined}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <m.span className={className} style={{ opacity }}>
        {children}
      </m.span>{" "}
    </>
  );
}
