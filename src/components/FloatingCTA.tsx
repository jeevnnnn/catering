"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Calendar, ChevronUp } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsAppNumber = "+442079460958";
  const defaultMsg = encodeURIComponent(
    "Hello KAÈON, I would like to inquire about booking premium catering services for an upcoming event. Please connect me with an event designer."
  );

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3"
      role="complementary"
      aria-label="Quick actions"
    >
      {/* Scroll to Top */}
      <AnimatePresence>
        {isVisible && (
          <m.button
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            onClick={scrollToTop}
            className="p-2.5 rounded-full glass-panel text-[#8B5E3C] shadow-md hover:bg-[#8B5E3C] hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          </m.button>
        )}
      </AnimatePresence>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsAppNumber.replace(/\D/g, "")}?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white shadow-lg text-xs font-semibold uppercase tracking-wider transition-colors group"
        aria-label="Contact KAÈON via WhatsApp"
      >
        <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 ease-out whitespace-nowrap">
          WhatsApp Quote
        </span>
      </a>

      {/* Sticky Book Now (appears on scroll) */}
      <AnimatePresence>
        {isVisible && (
          <m.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <Link
              href="/inquiry"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#8B5E3C] hover:bg-[#724D30] text-[#FFFDF9] shadow-lg text-xs font-semibold uppercase tracking-widest transition-colors"
              aria-label="Book an event with KAÈON"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book Event</span>
            </Link>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
