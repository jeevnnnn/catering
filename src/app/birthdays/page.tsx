import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Gift, Star, ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Luxury Birthday Event Catering",
  description: "Bespoke milestone birthday catering packages, interactive dessert bars, custom patisserie, and live chef experiences at private estate gardens.",
  alternates: {
    canonical: "/birthdays",
  },
  openGraph: {
    title: "KAÈON Luxury Birthday Event Catering",
    url: "https://kaeonstudios.com/birthdays",
  },
};

export default function BirthdaysPage() {
  const packages = [
    {
      name: "Kids Enchanted Forest",
      desc: "Designed for whimsical children birthday celebrations with interactive dessert structures.",
      price: "$45 / Guest",
      details: [
        "Playful slider & miniature taco bars",
        "Liquid nitrogen custom ice-cream displays",
        "Character theme decoration & table setup",
        "Professional balloon decorator & entertainer",
        "Assorted fresh juice punch stations"
      ]
    },
    {
      name: "Milestone Luxury Gala",
      desc: "Ideal for 30th, 50th, or 80th birthday milestones requiring premium adult dining.",
      price: "$80 / Guest",
      details: [
        "Gold-flake signature champagne pour",
        "4-Course plated fine culinary menu",
        "Custom milestone tiered cake design",
        "Live jazz quartet or acoustic set",
        "Premium floral table runner designs"
      ]
    },
    {
      name: "Private Backyard Estate Grill",
      desc: "Perfect for casual, premium summer birthdays hosted in family garden estates.",
      price: "$60 / Guest",
      details: [
        "Woodfire gourmet steak & grill station",
        "Premium salad bar & bread boards",
        "Craft beer tap and custom gin setups",
        "Mobile garden marquee setups",
        "Outdoor table games and lighting"
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] font-sans">
      
      {/* Cinematic Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&auto=format&fit=crop&q=80"
            alt="Luxury Birthday Decor Reception"
            className="w-full h-full object-cover animate-zoom-in"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-[#FFFDF9] space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] font-extrabold block">
            Bespoke Family Celebrations
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold leading-tight">
            Curating Vibrant & Luxury <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A66B] via-[#F7F1E8] to-[#C9A66B]">
              Birthday Celebrations
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F1E8]/80 max-w-lg mx-auto leading-relaxed font-light pt-2">
            From interactive kids dessert tables to premium Michelin-style milestone adult dining, we deliver custom themes, live chefs, and premium decorations.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#8B5E3C]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B5E3C] font-extrabold">
              Personalized Party Design
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight">
            Milestones Styled with Joy & Culinary Magic
          </h2>
          <div className="w-16 h-0.5 bg-[#C9A66B]" />
          
          <p className="text-xs sm:text-sm text-[#444444] leading-relaxed font-light">
            Whether you are hosting an intimate garden party for immediate family or a grand 50th birthday banquet with friends, KAÈON makes the event unforgettable. We construct custom theme displays, organize live mixologists, set up woodfire grill stations, and handle complete event styling and coordination.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#1a1a1a]">Interactive Food Bars</h4>
              <p className="text-xs text-[#444444]/75 leading-relaxed">Liquid nitrogen ice displays, live churro fryers, and custom taco bars keep guests interacting and energized.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#1a1a1a]">Bespoke Theme Decor</h4>
              <p className="text-xs text-[#444444]/75 leading-relaxed">Our designers outline color charts, customized balloons, photo backdrop backdrops, and table settings to match your concept.</p>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C9A66B]/25 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80"
            alt="Mixology Birthday Drinks Pouring"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Packages Section */}
      <section className="bg-[#8B5E3C]/5 border-y border-[#C9A66B]/15 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B5E3C] font-extrabold">
              Celebration Packages
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-1">
              Custom Birthday Packages
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A66B] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className="bg-[#FFFDF9] border border-[#C9A66B]/20 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-serif font-bold text-[#1A1A1A]">{pkg.name}</h3>
                  <div className="text-lg font-serif font-semibold text-[#8B5E3C] mt-2 mb-4">{pkg.price}</div>
                  <p className="text-xs text-[#444444]/80 leading-relaxed mb-6 border-b border-[#C9A66B]/10 pb-4">
                    {pkg.desc}
                  </p>

                  <ul className="space-y-3">
                    {pkg.details.map((det, i) => (
                      <li key={i} className="text-xs text-[#444444]/75 flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/inquiry?eventType=birthday&package=${pkg.name}`}
                  className="w-full text-center py-3 bg-[#8B5E3C] hover:bg-[#724D30] text-white rounded text-xs font-semibold uppercase tracking-widest mt-8 transition-colors"
                >
                  Book Birthday Event
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <Star className="w-8 h-8 text-[#C9A66B] mx-auto" />
        <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">
          Create a Magical Milestone Today
        </h2>
        <p className="text-xs sm:text-sm text-[#444444]/80 max-w-md mx-auto leading-relaxed font-light">
          Let our designers handle menu preparation, custom decorations, waitstaff, sound systems, and cleanup.
        </p>
        <Link
          href="/inquiry?eventType=birthday"
          className="btn-luxury inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B5E3C] hover:bg-[#724D30] text-white text-xs font-semibold uppercase tracking-widest rounded-full shadow-lg"
        >
          <span>Request Custom Proposal</span>
          <Calendar className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
