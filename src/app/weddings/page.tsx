import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Heart, Award, ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Luxury Wedding Catering",
  description: "Bespoke Michelin-trained wedding catering packages for destination weddings, estate receptions, and coastal galas. Custom menus, champagne bars, and white-glove service.",
  alternates: { canonical: "/weddings" },
  openGraph: { title: "KAÈON Luxury Wedding Catering", url: "https://kaeonstudios.com/weddings" },
};

export default function WeddingsPage() {
  const packages = [
    {
      name: "Mayfair Grand Ball Package",
      desc: "Designed for grand receptions in premium historic castles and estate ballrooms.",
      price: "$110 / Guest",
      details: [
        "Champagne reception & custom oyster bar",
        "5-Course plated Michelin-trained menu",
        "Full dessert styling table & custom wedding cake",
        "Complimentary menu tasting session for 4",
        "White-glove waitstaff service & coordinator"
      ]
    },
    {
      name: "Intimate Estate Manor",
      desc: "Ideal for bespoke private mansion gardens and exclusive boutique estates.",
      price: "$95 / Guest",
      details: [
        "Smoked-herb artisanal cocktail bar",
        "3-Course fine plated selection menu",
        "Shared charcuterie family-style banquet boards",
        "Vintage gold-rimmed plate setups",
        "Dedicated guest lounge hosts"
      ]
    },
    {
      name: "Destination Coastal Gala",
      desc: "Perfect for seaside villa weddings requiring weatherproof setup logistics.",
      price: "$130 / Guest",
      details: [
        "Live seafood cooking stations & raw seafood bars",
        "Spit-roast beef & live pasta flaming",
        "Custom cocktail list pairing",
        "Self-powered outdoor catering trailer setup",
        "Late-night slider and dessert stations"
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
            src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1600&auto=format&fit=crop&q=80"
            alt="Luxury Wedding Banquet Setup"
            className="w-full h-full object-cover animate-zoom-in"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-[#FFFDF9] space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] font-extrabold block">
            Prestige Bridal Concierge
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold leading-tight">
            Orchestrating Bridal Feasts <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A66B] via-[#F7F1E8] to-[#C9A66B]">
              Across Global Destinations
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F1E8]/80 max-w-lg mx-auto leading-relaxed font-light pt-2">
            Fine-dining plate art, interactive appetizer trays, and customized champagne stations designed to mirror your personal love story.
          </p>
        </div>
      </section>

      {/* Culinary Narrative / Storytelling */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#8B5E3C]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B5E3C] font-extrabold">
              Sensory Bridal Gastronomy
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight">
            Crafting Culinary Memories That Live Forever
          </h2>
          <div className="w-16 h-0.5 bg-[#C9A66B]" />
          
          <p className="text-xs sm:text-sm text-[#444444] leading-relaxed font-light">
            We understand that your wedding reception is more than just dinner — it's the first official meal you share with friends and family as partners. Our menu consultants study your favorite cuisines, heritage background, and favorite cocktails to synthesize a fully customized menu story.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#1a1a1a]">Traditional Heritage Menus</h4>
              <p className="text-xs text-[#444444]/75 leading-relaxed">Elegant representations of classic French, Mediterranean, and heritage traditions, updated for contemporary plating.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#1a1a1a]">Interactive Food Theater</h4>
              <p className="text-xs text-[#444444]/75 leading-relaxed">Live carved steaks, hand-rolled sushi boards, and dessert nitrogen displays to entertain wedding guests during toasts.</p>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C9A66B]/25 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80"
            alt="Wedding Champagne Reception Table Detail"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Packages Section */}
      <section className="bg-[#8B5E3C]/5 border-y border-[#C9A66B]/15 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B5E3C] font-extrabold">
              Event Packages
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-1">
              Curated Wedding Packages
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
                  href={`/inquiry?eventType=wedding&package=${pkg.name}`}
                  className="w-full text-center py-3 bg-[#8B5E3C] hover:bg-[#724D30] text-white rounded text-xs font-semibold uppercase tracking-widest mt-8 transition-colors"
                >
                  Request Consultation
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <Award className="w-8 h-8 text-[#C9A66B] mx-auto" />
        <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">
          Meet Your Dedicated Wedding Butler
        </h2>
        <p className="text-xs sm:text-sm text-[#444444]/80 max-w-md mx-auto leading-relaxed font-light">
          We limit ourselves to just two premium weddings per weekend to maintain absolute Michelin standards of styling and focus. Check calendar availability now.
        </p>
        <Link
          href="/inquiry?eventType=wedding"
          className="btn-luxury inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B5E3C] hover:bg-[#724D30] text-white text-xs font-semibold uppercase tracking-widest rounded-full shadow-lg"
        >
          <span>Check Date Availability</span>
          <Calendar className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
