import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Star, CheckCircle, ShieldCheck, Heart } from "lucide-react";
import StatCard from "@/components/StatCard";
import BudgetCalculator from "@/components/BudgetCalculator";
import GallerySection from "@/components/GallerySection";

export const metadata: Metadata = {
  title: "KAÈON | Luxury Catering & Bespoke Event Management",
  description: "Bespoke fine-dining and luxury event orchestration by Michelin-trained master chefs. Catering for destination weddings, corporate galas, and milestone celebrations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KAÈON | Luxury Catering & Bespoke Events",
    description: "Bespoke fine-dining and luxury event orchestration by Michelin-trained master chefs. Catering for destination weddings, corporate galas, and milestone celebrations.",
    url: "https://kaeonstudios.com",
  },
};

export default function Home() {
  const testimonials = [
    {
      name: "Lady Georgina Cavendish",
      event: "High-End Destination Wedding, Italy",
      text: "KAÈON turned our wedding feast into an immersive culinary gallery. The Wagyu stations left our guests utterly speechless. Absolutely flawless execution.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
    },
    {
      name: "Marcus Aurelius Vance",
      event: "Tech Gala Banquet, London",
      text: "For our annual executive summit, we needed catering that matched our branding standards. KAÈON did that and more. Michelin-level plating at scale.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    },
    {
      name: "The Sterling Family",
      event: "Private Estate Birthday Celebration",
      text: "Having a dedicated team prepare, plate, and style our family banquet allowed us to enjoy the night fully. A masterclass in luxury dining hospitality.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80",
    },
  ];

  return (
    <div className="w-full relative">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image — CSS scale zoom, no opacity so it's always visible */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/55 z-10" />
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80"
            alt="Michelin Dining Plating Setup"
            className="w-full h-full object-cover animate-zoom-in"
          />
        </div>

        {/* Hero Narrative — CSS staggered slide animations, always start visible */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-[#FFFDF9] flex flex-col items-center">
          {/* Badge — slides up with CSS delay 0 */}
          <div
            style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A66B]/50 bg-black/40 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A66B] mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Award-Winning Culinary Masters</span>
          </div>

          {/* H1 — slides up, CSS delay 0.15s */}
          <h1
            style={{ animation: "hero-slide-up 0.9s 0.15s cubic-bezier(0.16,1,0.3,1) both" }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-wide leading-tight"
          >
            Curating Luxury <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A66B] via-[#F7F1E8] to-[#C9A66B]">
              Culinary Artworks
            </span>
          </h1>

          {/* Tagline — CSS delay 0.3s */}
          <p
            style={{ animation: "hero-slide-up 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) both" }}
            className="text-sm md:text-base text-[#F7F1E8]/85 max-w-2xl mt-6 leading-relaxed font-light"
          >
            Bespoke menus styled by Michelin-trained master chefs, paired with luxury event design planning, for prestigious galas, birthdays, and destination weddings.
          </p>

          {/* CTAs — CSS delay 0.45s */}
          <div
            style={{ animation: "hero-slide-up 0.9s 0.45s cubic-bezier(0.16,1,0.3,1) both" }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
          >
            <Link
              href="/inquiry"
              className="w-full sm:w-auto btn-luxury px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#8B5E3C] hover:bg-[#724D30] text-white shadow-xl flex items-center justify-center gap-2"
            >
              <span>Book Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="#calculator"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest border border-[#C9A66B] bg-black/20 hover:bg-[#FFFDF9]/10 text-white flex items-center justify-center transition-colors"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Floating Statistics Panel */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 -mt-16 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            number={550}
            suffix="+"
            label="Prestige Events"
            subLabel="Weddings & Corporates managed flawlessly."
          />
          <StatCard
            number={25}
            suffix="+"
            label="Michelin Chefs"
            subLabel="Menu planners & plated styling masters."
          />
          <StatCard
            number={99}
            suffix="%"
            label="Guest Satisfaction"
            subLabel="Five-star feedback across all reviews."
          />
          <StatCard
            number={16}
            suffix="+"
            label="Catering Cities"
            subLabel="Providing destination services globally."
          />
        </div>
      </section>

      {/* 3. Luxury Catering Services Overview */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B5E3C] font-extrabold">
            Signature Services
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A1A1A] mt-2">
            Exquisite Offerings for Elite Gatherings
          </h2>
          <div className="w-16 h-0.5 bg-[#C9A66B] mx-auto mt-4" />
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Weddings */}
          <div className="glass-card rounded-xl overflow-hidden border border-[#C9A66B]/15 bg-white/50 flex flex-col justify-between p-6">
            <div>
              <span className="text-2xl font-serif text-[#8B5E3C] block mb-4">01.</span>
              <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Luxury Wedding Storytelling</h3>
              <p className="text-xs text-[#444444]/80 mt-2 leading-relaxed">
                Plated fine-dining banquets, interactive appetizers, and champagne stations structured to represent your personal story.
              </p>
            </div>
            <Link href="/weddings" className="flex items-center gap-1.5 text-xs font-semibold text-[#8B5E3C] hover:text-[#C9A66B] mt-6 transition-colors group">
              <span>View Packages</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Corporate */}
          <div className="glass-card rounded-xl overflow-hidden border border-[#C9A66B]/15 bg-white/50 flex flex-col justify-between p-6">
            <div>
              <span className="text-2xl font-serif text-[#8B5E3C] block mb-4">02.</span>
              <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Corporate Galas & Summits</h3>
              <p className="text-xs text-[#444444]/80 mt-2 leading-relaxed">
                Seamless corporate catering for AGMs, product releases, and vip client lunches. Engineered for efficiency and prestige.
              </p>
            </div>
            <Link href="/corporate" className="flex items-center gap-1.5 text-xs font-semibold text-[#8B5E3C] hover:text-[#C9A66B] mt-6 transition-colors group">
              <span>View Packages</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 3: Birthdays */}
          <div className="glass-card rounded-xl overflow-hidden border border-[#C9A66B]/15 bg-white/50 flex flex-col justify-between p-6">
            <div>
              <span className="text-2xl font-serif text-[#8B5E3C] block mb-4">03.</span>
              <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Upscale Birthday Celebrations</h3>
              <p className="text-xs text-[#444444]/80 mt-2 leading-relaxed">
                Vibrant themed displays, custom patisserie cakes, and interactive live chef stations to impress multi-generational families.
              </p>
            </div>
            <Link href="/birthdays" className="flex items-center gap-1.5 text-xs font-semibold text-[#8B5E3C] hover:text-[#C9A66B] mt-6 transition-colors group">
              <span>View Packages</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us / Luxury Storytelling */}
      <section className="bg-[#8B5E3C]/5 border-y border-[#C9A66B]/15 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B5E3C] font-extrabold">
              The KAÈON Distinction
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A1A1A] leading-tight">
              Crafting Immersive Culinary Architecture
            </h2>
            <p className="text-sm text-[#444444]/90 leading-relaxed font-light">
              We believe a dining experience should appeal to all five senses. By blending contemporary culinary styling, hand-selected seasonal ingredients, and meticulous host logistics, we create memories that last well past the final course.
            </p>

            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#C9A66B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1A1A1A]">Tailored Menu Design</h4>
                  <p className="text-xs text-[#444444]/75 mt-0.5">No copy-paste packages. Every event receives custom menu concepts based on your style.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C9A66B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1A1A1A]">Impeccable White-Glove Staging</h4>
                  <p className="text-xs text-[#444444]/75 mt-0.5">Highly-trained hostesses, silver services, and design setup coordinate cohesively.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-[#C9A66B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1A1A1A]">Stress-Free Coordination</h4>
                  <p className="text-xs text-[#444444]/75 mt-0.5">Our culinary directors handle layout setups, cleanup, drink orders, and logistics.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C9A66B]/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80"
              alt="Bespoke Luxury Banquets Table Styling"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* 5. Masterpiece Gallery Preview */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B5E3C] font-extrabold block">
              Curated Masterpieces
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mt-1.5">
              Exquisite Portfolios & Events
            </h2>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] hover:text-[#C9A66B] mt-4 sm:mt-0 transition-colors"
          >
            <span>Explore All Work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <GallerySection limit={6} />
      </section>

      {/* 6. Testimonials Carousel */}
      <section id="testimonials" className="bg-[#1A1A1A] text-[#F7F1E8] py-24 mb-24 border-y border-[#C9A66B]/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] font-extrabold block">
              Honorable Reviews
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#FFFDF9] mt-2">
              Endorsements of Excellence
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A66B] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A66B] text-[#C9A66B]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#F7F1E8]/85 leading-relaxed font-light italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#C9A66B]/50"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-[#FFFDF9]">{t.name}</h4>
                    <p className="text-[10px] text-[#F7F1E8]/60 mt-0.5">{t.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Calculator Section */}
      <section id="calculator" className="max-w-7xl mx-auto px-6 mb-24 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B5E3C] font-extrabold block">
            Plan Investment
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mt-1.5">
            Event Budget Calculator
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A66B] mx-auto mt-4" />
        </div>

        <BudgetCalculator />
      </section>

      {/* 8. Final CTA Banner */}
      <section className="relative py-24 bg-gradient-to-br from-[#8B5E3C] to-[#1A1A1A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] font-extrabold block">
            Reserve Your Calendar
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FFFDF9]">
            Let Us Orchestrate Your Next Feast
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F1E8]/80 max-w-xl mx-auto leading-relaxed">
            Calendar slots for peak destination wedding season fill up quickly. Secure your catering event planner, menu designer, and customized plating setup today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/inquiry"
              className="w-full sm:w-auto btn-luxury px-8 py-3.5 bg-[#C9A66B] hover:bg-[#b08e54] text-white text-xs font-semibold uppercase tracking-widest rounded-full shadow-lg"
            >
              Consult Event Designer
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#FFFDF9]/40 hover:border-white text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-colors"
            >
              Speak to Concierge
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
