import type { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Curated Event Capabilities & Services",
  description: "Michelin-chef plated menus, live counters, destination catering setups, floral styling, creative photography, and full coordination.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "KAÈON Luxury Event Capabilities & Services",
    url: "https://kaeonstudios.com/services",
  },
};
import { 
  Sparkles, Coffee, Cake, UtensilsCrossed, Wine, Layers, Flame, 
  Map, Paintbrush, Camera, Compass, Music, CheckCircle, ArrowRight 
} from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  inclusions: string[];
  icon: React.ComponentType<{ className?: string }>;
  category: "culinary" | "planning";
}

const SERVICES: ServiceItem[] = [
  {
    id: "wedding",
    name: "Wedding Catering",
    desc: "Luxury plated courses and artisanal setups for grand destination ceremonies.",
    inclusions: ["Custom tasting menus", "Fine wine pairings", "White-glove banquet service"],
    icon: Sparkles,
    category: "culinary"
  },
  {
    id: "corporate",
    name: "Corporate Catering",
    desc: "Precision dining operations for conferences, business summits, and shareholder galas.",
    inclusions: ["All-day coffee bars", "Eco-friendly lunch boxes", "VIP plated board dinners"],
    icon: Coffee,
    category: "culinary"
  },
  {
    id: "birthday",
    name: "Birthday Parties",
    desc: "Vibrant and themed family spreads featuring custom patisserie masterpieces.",
    inclusions: ["Themed dessert bars", "Interactive food counters", "Kid-friendly luxury spreads"],
    icon: Cake,
    category: "culinary"
  },
  {
    id: "private",
    name: "Private Events",
    desc: "Exclusive cocktail receptions, anniversaries, and high-profile home banquets.",
    inclusions: ["Dedicated house butlers", "Mixologist services", "Customized table layouts"],
    icon: UtensilsCrossed,
    category: "culinary"
  },
  {
    id: "luxury_dining",
    name: "Luxury Dining / Omakase",
    desc: "Michelin-chef plated degustations crafted directly in your private kitchen estate.",
    inclusions: ["Personal Sommelier", "7-course culinary narrative", "Imported rare ingredients"],
    icon: Wine,
    category: "culinary"
  },
  {
    id: "buffet",
    name: "Buffet Services",
    desc: "Refined buffet options featuring gold-accented styling warmers and diverse menu maps.",
    inclusions: ["Temperature-controlled tables", "Artisanal bakery selectors", "Gourmet carving stations"],
    icon: Layers,
    category: "culinary"
  },
  {
    id: "live_counters",
    name: "Live Counters & Cooking Theater",
    desc: "Interactive chef showmanship showcasing fire, ice, and artisanal plate assemblage.",
    inclusions: ["Liquid nitrogen ice bars", "Woodfire pizza ovens", "Wagyu sear grills"],
    icon: Flame,
    category: "culinary"
  },
  {
    id: "outdoor",
    name: "Outdoor Catering",
    desc: "Mobile dining networks designed to maintain five-star plating in nature or islands.",
    inclusions: ["Self-powered cooling grid", "Mobile kitchen marquees", "Weatherproof styling"],
    icon: Map,
    category: "culinary"
  },
  {
    id: "decor",
    name: "Florals & Decoration",
    desc: "High-end floral installations, customized candelabras, and linen color mappings.",
    inclusions: ["Bespoke table layouts", "Premium linens", "Custom floral runners"],
    icon: Paintbrush,
    category: "planning"
  },
  {
    id: "photography",
    name: "Creative Photography & Cinema",
    desc: "Visual narratives capturing food steam, guests laughter, and overall space beauty.",
    inclusions: ["Professional culinary shooters", "4K drone video captures", "Post-event gallery portals"],
    icon: Camera,
    category: "planning"
  },
  {
    id: "planning",
    name: "Event Planning & Coordination",
    desc: "Dedicated project coordinators to schedule timelines, logistics, and vendors.",
    inclusions: ["RSVP list tracking", "Visual layout blueprinting", "Stage-manager services"],
    icon: Compass,
    category: "planning"
  },
  {
    id: "entertainment",
    name: "Premium Entertainment",
    desc: "Classical quartets, acoustic jazz groups, and contemporary lighting systems.",
    inclusions: ["Custom stage audio grids", "Ambient uplighting design", "Curated performers database"],
    icon: Music,
    category: "planning"
  }
];

export default function ServicesPage() {
  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] py-16 px-6 font-sans">
      
      {/* Title Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B5E3C] font-extrabold">
          Concierge Brochure
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1A1A] mt-3">
          Our Curated Event Capabilities
        </h1>
        <p className="text-xs sm:text-sm text-[#444444]/80 max-w-xl mx-auto mt-4 leading-relaxed font-light">
          From Michelin-star catering plated menus to complete space planning, floral styling, photography, and audio setups. We orchestrate all details.
        </p>
        <div className="w-16 h-0.5 bg-[#C9A66B] mx-auto mt-6" />
      </div>

      {/* Culinary Services */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="border-b border-[#C9A66B]/20 pb-2 mb-8">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#8B5E3C] font-bold">
            1. Culinary & Banqueting Offerings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.filter(s => s.category === "culinary").map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className="glass-card rounded-xl border border-[#C9A66B]/15 bg-white/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded bg-[#8B5E3C]/10 text-[#8B5E3C] w-fit mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#1A1A1A]">{service.name}</h3>
                  <p className="text-xs text-[#444444]/80 mt-2 leading-relaxed">{service.desc}</p>
                  
                  <ul className="mt-5 space-y-2 border-t border-[#C9A66B]/10 pt-4">
                    {service.inclusions.map((inc, i) => (
                      <li key={i} className="text-[11px] text-[#444444]/75 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C9A66B] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href={`/inquiry?eventType=${service.id}`}
                  className="flex items-center gap-1 text-xs font-semibold text-[#8B5E3C] hover:text-[#C9A66B] mt-8 transition-colors group"
                >
                  <span>Select Service</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Services */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="border-b border-[#C9A66B]/20 pb-2 mb-8">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#8B5E3C] font-bold">
            2. Design, Production & Logistics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.filter(s => s.category === "planning").map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className="glass-card rounded-xl border border-[#C9A66B]/15 bg-white/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded bg-[#8B5E3C]/10 text-[#8B5E3C] w-fit mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#1A1A1A]">{service.name}</h3>
                  <p className="text-xs text-[#444444]/80 mt-2 leading-relaxed">{service.desc}</p>
                  
                  <ul className="mt-5 space-y-2 border-t border-[#C9A66B]/10 pt-4">
                    {service.inclusions.map((inc, i) => (
                      <li key={i} className="text-[11px] text-[#444444]/75 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C9A66B] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href={`/inquiry?serviceType=${service.id}`}
                  className="flex items-center gap-1 text-xs font-semibold text-[#8B5E3C] hover:text-[#C9A66B] mt-8 transition-colors group"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
