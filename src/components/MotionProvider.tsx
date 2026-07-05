"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

/**
 * MotionProvider — wraps the app in Framer Motion's LazyMotion context.
 *
 * Key behaviours:
 * 1. LazyMotion + domAnimation loads motion features asynchronously,
 *    reducing the JS bundle impact.
 * 2. MotionConfig reducedMotion:"user" respects prefers-reduced-motion
 *    system setting automatically.
 * 3. `isReady` state ensures initial animations only play after client
 *    hydration, preventing SSR opacity:0 flash.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsReady(true));
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        // Skip initial animations on first SSR render — they'll play normally
        // on subsequent client-side navigation
        transition={{ duration: isReady ? undefined : 0 }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
