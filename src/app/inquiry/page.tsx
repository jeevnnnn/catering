import type { Metadata } from "next";
import React, { Suspense } from "react";
import InquiryForm from "@/components/InquiryForm";
import { Star, ShieldCheck, CalendarClock, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Book Event & Request Quote | Inquiry",
  description: "Submit your event details, guest headcount, target budget, and preferred date to request a customized culinary proposal.",
  alternates: {
    canonical: "/inquiry",
  },
  openGraph: {
    title: "KAÈON Catering Event Inquiry",
    url: "https://kaeonstudios.com/inquiry",
  },
};

export default function InquiryPage() {
  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] py-16 px-6 font-sans">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B5E3C] font-extrabold block">
          Calendar Reservation
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1A1A] mt-3">
          Book Event & Request Quote
        </h1>
        <p className="text-xs sm:text-sm text-[#444444]/80 max-w-xl mx-auto mt-4 leading-relaxed font-light">
          Submit your guest count, budget, date, and venue. Our event planners will draft a custom culinary proposal and contract.
        </p>
        <div className="w-16 h-0.5 bg-[#C9A66B] mx-auto mt-6" />
      </div>

      {/* Trust Badges */}
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 text-center">
        <div className="p-4 rounded-lg border border-[#C9A66B]/15 bg-white/50 flex flex-col items-center justify-center">
          <Star className="w-5 h-5 text-[#C9A66B] fill-[#C9A66B]" />
          <span className="text-xs font-bold text-[#1A1A1A] mt-1.5">4.9 / 5 Rating</span>
          <span className="text-[9px] text-[#444444]/60">Google & Trustpilot</span>
        </div>
        
        <div className="p-4 rounded-lg border border-[#C9A66B]/15 bg-white/50 flex flex-col items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-[#C9A66B]" />
          <span className="text-xs font-bold text-[#1A1A1A] mt-1.5">Insured & Certified</span>
          <span className="text-[9px] text-[#444444]/60">General Liability Protection</span>
        </div>

        <div className="p-4 rounded-lg border border-[#C9A66B]/15 bg-white/50 flex flex-col items-center justify-center">
          <CalendarClock className="w-5 h-5 text-[#C9A66B]" />
          <span className="text-xs font-bold text-[#1A1A1A] mt-1.5">Quick Turnaround</span>
          <span className="text-[9px] text-[#444444]/60">Quote ready in 24 hours</span>
        </div>

        <div className="p-4 rounded-lg border border-[#C9A66B]/15 bg-white/50 flex flex-col items-center justify-center">
          <Trophy className="w-5 h-5 text-[#C9A66B]" />
          <span className="text-xs font-bold text-[#1A1A1A] mt-1.5">Michelin Plated</span>
          <span className="text-[9px] text-[#444444]/60">Culinary standard certification</span>
        </div>
      </div>

      {/* Inquiry Form Form Wrap (wrapped in Next.js Suspense since it uses searchParams) */}
      <div className="max-w-7xl mx-auto mb-20">
        <Suspense fallback={
          <div className="text-center py-20 text-xs uppercase tracking-wider text-[#8B5E3C] font-semibold">
            Loading VIP Booking System...
          </div>
        }>
          <InquiryForm />
        </Suspense>
      </div>

    </div>
  );
}
