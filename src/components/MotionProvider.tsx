"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

// Animation features are code-split and fetched after hydration, keeping them off the critical path.
const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
