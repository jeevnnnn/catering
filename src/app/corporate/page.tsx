import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Coffee, Shield, Calendar, Award, ArrowRight, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Event Catering",
  description: "Precision corporate catering for board dinners, product launches, AGM galas, and large-scale conference buffets. Seamless service built for schedule and scale.",
  alternates: { canonical: "/corporate" },
  openGraph: { title: "KAÈON Corporate Catering", url: "https://kaeonstudios.com/corporate" },
};

export default function CorporatePage() {
  const packages = [
    {
      name: "Summit Boardroom VIP",
      desc: "Designed for high-profile shareholder meetings and executive board dinners.",
      price: "$85 / Headcount",
      details: [
        "White-glove plated lunch (3 Courses)",
        "Pre-meeting coffee bar & pastries",
        "Personal butler service",
        "Discreet setup & silent service",
        "Custom mineral water styling"
      ]
    },
    {
      name: "Product Release Gala",
      desc: "Perfect for large media launches, branding events, and corporate celebrations.",
      price: "$65 / Headcount",
      details: [
        "Artisanal passed appetizers & cocktail trays",
        "Mixologist bars & custom branded mocktails",
        "Live cooking theaters & food stations",
        "Full staging cleanup coordination",
        "Micro-microphone host sound systems"
      ]
    },
    {
      name: "All-Day Conference Buffet",
      desc: "Ideal for multi-day workshops, summits, and large-scale corporate symposiums.",
      price: "$50 / Headcount",
      details: [
        "Gourmet hot buffet menu",
        "Morning pastry & afternoon dessert tables",
        "Continuous mineral water & espresso stations",
        "Clear food labeling for allergies",
        "Speedy buffet lines setup"
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
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&auto=format&fit=crop&q=80"
            alt="Corporate Banquet Gala"
            className="w-full h-full object-cover animate-zoom-in"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-[#FFFDF9] space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] font-extrabold block">
            Executive Catering division
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold leading-tight">
            High-Profile Corporate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A66B] via-[#F7F1E8] to-[#C9A66B]">
              Catering Operations
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F1E8]/80 max-w-lg mx-auto leading-relaxed font-light pt-2">
            Seamless dining setups designed for media product launches, board summits, and annual gala banquets. Built for scale, schedule precision, and premium aesthetics.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#8B5E3C]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B5E3C] font-extrabold">
              Pristine Commercial Catering
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight">
            Elevating Corporate Brand Hospitality
          </h2>
          <div className="w-16 h-0.5 bg-[#C9A66B]" />
          
          <p className="text-xs sm:text-sm text-[#444444] leading-relaxed font-light">
            Corporate catering requires two things: culinary brilliance and absolute schedule timing. At KAÈON, our team integrates directly with your schedule. Whether it's feeding 500 tech summit attendees in under 45 minutes or designing a private tasting menu for board directors, we ensure your brand message shines.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#1a1a1a]">Schedule Precision</h4>
              <p className="text-xs text-[#444444]/75 leading-relaxed">Our coordinators verify floor setup timelines to guarantee appetizer passing and coffee bar prep align perfectly with keynotes.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#1a1a1a]">Modern Allergy Labeling</h4>
              <p className="text-xs text-[#444444]/75 leading-relaxed">We label and coordinate menu components for gluten-free, vegan, nut-free, and custom guest diets.</p>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C9A66B]/25 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1565182999561-18d7dc63c393?w=800&auto=format&fit=crop&q=80"
            alt="Corporate Banquet Buffet Styling"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Packages Section */}
      <section className="bg-[#8B5E3C]/5 border-y border-[#C9A66B]/15 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B5E3C] font-extrabold">
              Corporate Options
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-1">
              Custom Corporate Packages
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
                        <CheckSquare className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/inquiry?eventType=corporate&package=${pkg.name}`}
                  className="w-full text-center py-3 bg-[#8B5E3C] hover:bg-[#724D30] text-white rounded text-xs font-semibold uppercase tracking-widest mt-8 transition-colors"
                >
                  Request Corporate Quote
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
          Establish Corporate Client Account
        </h2>
        <p className="text-xs sm:text-sm text-[#444444]/80 max-w-md mx-auto leading-relaxed font-light">
          Become a corporate partner to receive fixed-rate monthly menus, quick-turnaround booking, and a dedicated VIP coordinator.
        </p>
        <Link
          href="/inquiry?eventType=corporate"
          className="btn-luxury inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B5E3C] hover:bg-[#724D30] text-white text-xs font-semibold uppercase tracking-widest rounded-full shadow-lg"
        >
          <span>Submit Corporate RFP</span>
          <Calendar className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
