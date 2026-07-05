"use client";

import React, { useState } from "react";
import { EVENT_TYPES, calculateEventBudget, generateWhatsAppMessage } from "@/lib/calculator-logic";
import { Calculator, ArrowRight, MessageCircle, HelpCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function BudgetCalculator() {
  const [eventType, setEventType] = useState(EVENT_TYPES[0].id);
  const [guestCount, setGuestCount] = useState(50);

  const results = calculateEventBudget(eventType, guestCount);

  const selectedEvent = EVENT_TYPES.find(e => e.id === eventType) || EVENT_TYPES[0];

  const handleWhatsAppShare = () => {
    const formattedBudget = `$${results.priceRangeMin} - $${results.priceRangeMax}`;
    const urlMessage = generateWhatsAppMessage({
      eventType: selectedEvent.name,
      guestCount,
      date: "",
      budget: formattedBudget,
      location: ""
    });
    window.open(`https://wa.me/+442079460958?text=${urlMessage}`, "_blank");
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl glass-panel shadow-2xl border border-[#C9A66B]/20 p-6 md:p-10 font-sans">
      <div className="flex items-center gap-3 mb-8 border-b border-[#C9A66B]/15 pb-4">
        <Calculator className="w-6 h-6 text-[#8B5E3C] dark:text-[#C9A66B]" />
        <div>
          <h3 className="text-lg font-semibold font-serif text-[#1A1A1A] dark:text-white">
            Bespoke Event Budget Estimator
          </h3>
          <p className="text-xs text-[#444444]/75 dark:text-[#F7F1E8]/70 mt-0.5">
            Receive an instant culinary estimate tailored to your guest headcount and event profile.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Side: Inputs */}
        <div className="flex flex-col space-y-6 justify-center">
          {/* Event Type Select */}
          <div className="flex flex-col space-y-2">
            <label 
              htmlFor="budget-event-category" 
              className="text-xs uppercase tracking-wider font-semibold text-[#8B5E3C] dark:text-[#C9A66B]"
            >
              Select Event Category
            </label>
            <select
              id="budget-event-category"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full bg-[#FFFDF9] dark:bg-[#1A1A1A] border border-[#C9A66B]/25 rounded-md px-4 py-3 text-sm text-[#444444] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] cursor-pointer transition-all"
            >
              {EVENT_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Guest Count Input & Slider */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="budget-guest-count-number" 
                className="text-xs uppercase tracking-wider font-semibold text-[#8B5E3C] dark:text-[#C9A66B]"
              >
                Expected Guest Count
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  id="budget-guest-count-number"
                  type="number"
                  min="10"
                  max="1000"
                  value={guestCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 10;
                    setGuestCount(Math.min(Math.max(val, 10), 1000));
                  }}
                  className="w-16 bg-white dark:bg-[#1A1A1A] border border-[#C9A66B]/25 rounded px-2 py-1 text-center text-xs font-bold text-[#8B5E3C] dark:text-[#C9A66B] focus:outline-none"
                  aria-label="Expected Guest Count Number"
                />
                <span className="text-xs text-[#444444]/70 dark:text-[#F7F1E8]/70">Guests</span>
              </div>
            </div>
            
            <input
              id="budget-guest-count-slider"
              type="range"
              min="10"
              max="1000"
              step="5"
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#C9A66B]/20 rounded-lg appearance-none cursor-pointer accent-[#8B5E3C]"
              aria-label="Expected Guest Count Slider"
            />

            <div className="flex justify-between text-[10px] text-[#444444]/50 dark:text-[#F7F1E8]/50 px-1">
              <span>10 Guests</span>
              <span>250 Guests</span>
              <span>500 Guests</span>
              <span>1000+ Guests</span>
            </div>
          </div>

          {/* Helper Note */}
          <div className="p-3 bg-[#8B5E3C]/5 border border-[#8B5E3C]/10 rounded-md text-[11px] text-[#8B5E3C] leading-normal flex items-start gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              This is a preliminary estimation based on classic custom menu baselines. Actual cost depends on selected courses, fine-wine menu pairings, and logistics details.
            </span>
          </div>
        </div>

        {/* Right Side: Outputs */}
        <div className="bg-[#8B5E3C]/5 dark:bg-white/5 rounded-xl border border-[#C9A66B]/15 p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8B5E3C] dark:text-[#C9A66B] font-semibold block mb-1">
              Estimated Pricing Range
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif text-[#1A1A1A] dark:text-white font-bold">
                ${results.priceRangeMin.toLocaleString()}
              </span>
              <span className="text-sm text-[#444444]/60 dark:text-[#F7F1E8]/60">to</span>
              <span className="text-3xl font-serif text-[#1A1A1A] dark:text-white font-bold">
                ${results.priceRangeMax.toLocaleString()}
              </span>
            </div>
            <span className="text-xs text-[#444444]/70 dark:text-[#F7F1E8]/70 mt-1 block">
              Midpoint target: ~${results.estimatedBudget.toLocaleString()} USD
            </span>

            {/* Recommended Package */}
            <div className="mt-6 pt-5 border-t border-[#C9A66B]/15">
              <span className="text-[10px] uppercase tracking-widest text-[#8B5E3C] dark:text-[#C9A66B] font-semibold block mb-2">
                Recommended Package Setup
              </span>
              <h4 className="text-sm font-semibold text-[#1A1A1A] dark:text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C9A66B]" />
                {results.packageName}
              </h4>
              <p className="text-xs text-[#444444]/80 dark:text-[#F7F1E8]/80 mt-1 leading-relaxed">
                {results.packageDescription}
              </p>
              
              <ul className="mt-3.5 space-y-2">
                {results.packageInclusions.map((inc, i) => (
                  <li key={i} className="text-xs text-[#444444]/75 dark:text-[#F7F1E8]/70 flex items-start gap-2">
                    <span className="text-[#8B5E3C] dark:text-[#C9A66B] font-bold select-none">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 py-3 border border-[#C9A66B]/40 hover:border-[#8B5E3C] hover:bg-[#8B5E3C]/5 text-xs uppercase tracking-widest font-semibold text-[#8B5E3C] dark:text-[#C9A66B] rounded transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Quote</span>
            </button>
            <Link
              href={`/inquiry?eventType=${eventType}&guestCount=${guestCount}&budget=${results.estimatedBudget}`}
              className="flex items-center justify-center gap-2 py-3 bg-[#8B5E3C] hover:bg-[#724D30] text-[#FFFDF9] text-xs uppercase tracking-widest font-semibold rounded shadow-md transition-colors"
            >
              <span>Detailed Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
