"use client";

import React, { useEffect, useState, useRef } from "react";
import { m, useInView } from "framer-motion";

interface StatCardProps {
  number: number;
  suffix: string;
  label: string;
  subLabel: string;
}

export default function StatCard({ number, suffix, label, subLabel }: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  // Use margin "0px" so it triggers as soon as the element enters the viewport (not 100px after)
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800;
    const end = number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const current = Math.min(Math.floor((progress / duration) * end), end);

      setCount(current);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, number]);

  return (
    <div
      ref={ref}
      className="glass-card rounded-xl p-6 text-center border border-[#C9A66B]/20 flex flex-col justify-between"
    >
      <div>
        {/* Always visible — only transform animates, never opacity */}
        <m.div
          initial={{ y: 10 }}
          animate={isInView ? { y: 0 } : { y: 10 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-extrabold text-[#8B5E3C] dark:text-[#C9A66B]"
        >
          {count}
          {suffix}
        </m.div>
        <div className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] dark:text-white mt-3">
          {label}
        </div>
      </div>
      <div className="text-xs text-[#444444]/75 dark:text-[#F7F1E8]/70 mt-1 border-t border-[#C9A66B]/10 pt-2">
        {subLabel}
      </div>
    </div>
  );
}
