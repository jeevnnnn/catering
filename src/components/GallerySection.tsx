"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  category: "wedding" | "corporate" | "culinary" | "decor";
  categoryName: string;
  image: string;
  width: number;
  height: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Caviar & Oyster Plated Entrée",
    category: "culinary",
    categoryName: "Culinary Art",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 600,
  },
  {
    id: "gal-2",
    title: "Golden Hour Mayfair Table Styling",
    category: "decor",
    categoryName: "Bespoke Decor",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 1000, // taller for masonry look
  },
  {
    id: "gal-3",
    title: "Wagyu Beef Flambé Live Kitchen",
    category: "culinary",
    categoryName: "Culinary Art",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 600,
  },
  {
    id: "gal-4",
    title: "Corporate Banquet at The Savoy",
    category: "corporate",
    categoryName: "Corporate Galas",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 550,
  },
  {
    id: "gal-5",
    title: "Imperial Rose Arch Wedding Canopy",
    category: "wedding",
    categoryName: "Luxury Weddings",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 1100, // tall masonry
  },
  {
    id: "gal-6",
    title: "Truffle Tortellini Michelin Showcase",
    category: "culinary",
    categoryName: "Culinary Art",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 600,
  },
  {
    id: "gal-7",
    title: "Crystal Candelabra Table Decor",
    category: "decor",
    categoryName: "Bespoke Decor",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 600,
  },
  {
    id: "gal-8",
    title: "Signature Smoked Sage Cocktails",
    category: "decor",
    categoryName: "Bespoke Decor",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 1000, // tall masonry
  },
  {
    id: "gal-9",
    title: "High-Profile Tech Gala Dinner",
    category: "corporate",
    categoryName: "Corporate Galas",
    image: "https://images.unsplash.com/photo-1565182999561-18d7dc63c393?auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 600,
  },
];

interface GallerySectionProps {
  limit?: number;
}

export default function GallerySection({ limit }: GallerySectionProps) {
  const [filter, setFilter] = useState<string>("all");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "All Masterpieces" },
    { id: "wedding", name: "Weddings" },
    { id: "corporate", name: "Corporate" },
    { id: "culinary", name: "Culinary Art" },
    { id: "decor", name: "Event Styling" },
  ];

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  // Limit items if prop is provided
  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % displayedItems.length);
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      (activeImageIndex - 1 + displayedItems.length) % displayedItems.length
    );
  };

  return (
    <div className="w-full">
      {/* Category Navigation (Only show if not previewing a small limit on Home) */}
      {!limit && (
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                filter === cat.id
                  ? "bg-[#8B5E3C] text-white shadow-md"
                  : "bg-white/80 border border-[#C9A66B]/25 text-[#444444] hover:bg-[#8B5E3C]/5"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      <div className="masonry-grid w-full">
        <AnimatePresence mode="popLayout">
          {displayedItems.map((item, index) => (
            <m.div
              layout
              key={item.id}
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="masonry-item gpu-accelerated group relative overflow-hidden rounded-xl border border-[#C9A66B]/15 bg-[#FFFDF9] cursor-pointer"
              onClick={() => setActiveImageIndex(index)}
              role="button"
              aria-label={`View ${item.title}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveImageIndex(index)}
            >
              <div className="relative overflow-hidden aspect-[4/5] sm:aspect-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={item.width}
                  height={item.height}
                  className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Elegant Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-[9px] uppercase tracking-widest text-[#C9A66B] font-semibold">
                  {item.categoryName}
                </span>
                <h4 className="text-sm md:text-base font-serif text-[#FFFDF9] font-bold mt-1 leading-snug">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-3 text-[10px] text-[#F7F1E8]/85 uppercase tracking-widest font-semibold border-t border-[#C9A66B]/30 pt-2.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C9A66B]" />
                  <span>Enlarge Artwork</span>
                </div>
              </div>
            </m.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveImageIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close Trigger */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 p-2 bg-[#FFFDF9]/10 text-white rounded-full hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-8 p-3 bg-[#FFFDF9]/10 text-white rounded-full hover:bg-white/20 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 p-3 bg-[#FFFDF9]/10 text-white rounded-full hover:bg-white/20 transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <div
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <m.img
                key={displayedItems[activeImageIndex].id}
                initial={{ scale: 0.93 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.93 }}
                src={displayedItems[activeImageIndex].image}
                alt={displayedItems[activeImageIndex].title}
                width={displayedItems[activeImageIndex].width}
                height={displayedItems[activeImageIndex].height}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-[#C9A66B]/25"
              />
              <div className="mt-4 text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#C9A66B] font-bold">
                  {displayedItems[activeImageIndex].categoryName}
                </span>
                <h3 className="text-[#FFFDF9] font-serif text-lg md:text-xl font-bold mt-1">
                  {displayedItems[activeImageIndex].title}
                </h3>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
