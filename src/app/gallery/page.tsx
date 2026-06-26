import type { Metadata } from "next";
import React from "react";
import GallerySection from "@/components/GallerySection";

export const metadata: Metadata = {
  title: "Luxury Event Gallery & Portfolio",
  description: "Explore our collection of michelin-inspired plated dishes, luxury destination weddings table settings, and curated floral layouts.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "KAÈON Luxury Event Gallery & Portfolio",
    url: "https://kaeonstudios.com/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] py-16 px-6 font-sans">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B5E3C] font-extrabold block">
          Visual Masterpieces
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1A1A] mt-3">
          Our Event Gallery & Portfolio
        </h1>
        <p className="text-xs sm:text-sm text-[#444444]/80 max-w-xl mx-auto mt-4 leading-relaxed font-light">
          A visual chronicle of bespoke luxury weddings, Michelin-style plated dishes, and curated space decoration. Every plate is styled as an artwork.
        </p>
        <div className="w-16 h-0.5 bg-[#C9A66B] mx-auto mt-6" />
      </div>

      {/* Main Gallery Area */}
      <div className="max-w-7xl mx-auto mb-20">
        <GallerySection />
      </div>

      {/* Philosophy Section */}
      <div className="max-w-5xl mx-auto text-center border-t border-[#C9A66B]/15 pt-16 pb-10 space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#1a1a1a]">
          Visual Culinary Philosophy
        </h3>
        <p className="text-xs text-[#444444]/75 max-w-xl mx-auto leading-relaxed">
          We believe plating should tell a story before the guest takes their first bite. Through color contrast, temperature control, premium tableware pairing, and custom micro-green accents, our team builds culinary compositions that reflect our Michelin-star styling philosophy.
        </p>
      </div>

    </div>
  );
}
