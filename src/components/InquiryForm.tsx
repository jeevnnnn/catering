"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { saveLead } from "@/lib/firebase";
import { EVENT_TYPES } from "@/lib/calculator-logic";
import { Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().min(1, "Please select a date"),
  guestCount: z.preprocess(
    (val) => Number(val),
    z.number().min(5, "Minimum guest count is 5").max(5000, "Maximum guest count is 5000")
  ),
  budget: z.preprocess(
    (val) => Number(val),
    z.number().min(200, "Minimum target budget is $200")
  ),
  location: z.string().min(3, "Please provide a location detail"),
  requirements: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export default function InquiryForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Read URL query parameters if they came from the calculator
  const paramEventType = searchParams.get("eventType") || "";
  const paramGuestCount = searchParams.get("guestCount") || "";
  const paramBudget = searchParams.get("budget") || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      eventType: paramEventType,
      guestCount: paramGuestCount ? Number(paramGuestCount) : 50,
      budget: paramBudget ? Number(paramBudget) : 5000,
      location: "",
      requirements: "",
    },
  });

  // Handle URL updates if query parameters change dynamically
  useEffect(() => {
    reset({
      eventType: paramEventType || EVENT_TYPES[0].id,
      guestCount: paramGuestCount ? Number(paramGuestCount) : 50,
      budget: paramBudget ? Number(paramBudget) : 5000,
      location: "",
      requirements: "",
    });
  }, [paramEventType, paramGuestCount, paramBudget, reset]);

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    try {
      await saveLead(data);
      
      // Celebrate!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#8B5E3C", "#C9A66B", "#FFFDF9"],
      });

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-16 px-6 glass-panel rounded-2xl border border-[#C9A66B]/20 max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6">
        <div className="p-4 rounded-full bg-[#8B5E3C]/10 text-[#C9A66B]">
          <CheckCircle2 className="w-16 h-16" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-serif text-[#1A1A1A] font-semibold uppercase tracking-wider">
          Inquiry Successfully Sent
        </h3>
        <p className="text-sm text-[#444444] max-w-md leading-relaxed mx-auto">
          Your request has been logged by our VIP concierge desk. A dedicated menu coordinator will contact you shortly via phone or email.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="mt-4 px-6 py-2.5 bg-[#8B5E3C] hover:bg-[#724D30] text-[#FFFDF9] text-xs font-semibold uppercase tracking-widest rounded-full transition-colors cursor-pointer"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full max-w-4xl mx-auto rounded-2xl glass-panel shadow-2xl border border-[#C9A66B]/20 p-6 md:p-10 font-sans"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-[#C9A66B]/15 pb-4">
        <Sparkles className="w-6 h-6 text-[#8B5E3C] dark:text-[#C9A66B]" />
        <div>
          <h3 className="text-lg font-semibold font-serif text-[#1A1A1A]">
            VIP Booking & Catering Inquiry
          </h3>
          <p className="text-xs text-[#444444]/75 mt-0.5">
            Please fill in the details below. Our planning team will curate a unique, custom-themed experience proposal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact Info Section */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-[#8B5E3C] font-semibold border-b border-[#C9A66B]/10 pb-1 mb-2">
            1. Client Contact Details
          </h4>

          <div>
            <label htmlFor="name" className="block text-xs font-medium text-[#444444] mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Lord / Lady Surname"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full bg-[#FFFDF9] border border-[#C9A66B]/25 rounded px-3 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] transition-colors"
            />
            {errors.name && <span id="name-error" role="alert" className="text-[10px] text-red-600 mt-1 block">{errors.name.message}</span>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-[#444444] mb-1">Phone Number</label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="+44 7700 900077"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="w-full bg-[#FFFDF9] border border-[#C9A66B]/25 rounded px-3 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] transition-colors"
            />
            {errors.phone && <span id="phone-error" role="alert" className="text-[10px] text-red-600 mt-1 block">{errors.phone.message}</span>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-[#444444] mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="client@prestige.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full bg-[#FFFDF9] border border-[#C9A66B]/25 rounded px-3 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] transition-colors"
            />
            {errors.email && <span id="email-error" role="alert" className="text-[10px] text-red-600 mt-1 block">{errors.email.message}</span>}
          </div>
        </div>

        {/* Event Setup Section */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-[#8B5E3C] font-semibold border-b border-[#C9A66B]/10 pb-1 mb-2">
            2. Event Design Details
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventType" className="block text-xs font-medium text-[#444444] mb-1">Event Type</label>
              <select
                id="eventType"
                {...register("eventType")}
                aria-invalid={!!errors.eventType}
                className="w-full bg-[#FFFDF9] border border-[#C9A66B]/25 rounded px-2.5 py-2 text-sm text-[#444444] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] cursor-pointer"
              >
                <option value="">Choose...</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              {errors.eventType && <span role="alert" className="text-[10px] text-red-600 mt-1 block">{errors.eventType.message}</span>}
            </div>

            <div>
              <label htmlFor="eventDate" className="block text-xs font-medium text-[#444444] mb-1">Event Date</label>
              <input
                id="eventDate"
                type="date"
                {...register("eventDate")}
                min={new Date().toISOString().split("T")[0]}
                aria-invalid={!!errors.eventDate}
                className="w-full bg-[#FFFDF9] border border-[#C9A66B]/25 rounded px-2 py-1.5 text-sm text-[#444444] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
              />
              {errors.eventDate && <span role="alert" className="text-[10px] text-red-600 mt-1 block">{errors.eventDate.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="guestCount" className="block text-xs font-medium text-[#444444] mb-1">Guest Count</label>
              <input
                id="guestCount"
                type="number"
                {...register("guestCount")}
                className="w-full bg-[#FFFDF9] border border-[#C9A66B]/25 rounded px-3 py-2 text-sm text-[#1A1A1A] focus:outline-none"
              />
              {errors.guestCount && <span className="text-[10px] text-red-500 mt-1 block">{errors.guestCount.message}</span>}
            </div>

            <div>
              <label htmlFor="budget" className="block text-xs font-medium text-[#444444] mb-1">Target Budget ($)</label>
              <input
                id="budget"
                type="number"
                {...register("budget")}
                className="w-full bg-[#FFFDF9] border border-[#C9A66B]/25 rounded px-3 py-2 text-sm text-[#1A1A1A] focus:outline-none"
              />
              {errors.budget && <span className="text-[10px] text-red-500 mt-1 block">{errors.budget.message}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-xs font-medium text-[#444444] mb-1">Event Venue / Location</label>
            <input
              id="location"
              type="text"
              {...register("location")}
              placeholder="e.g. Blenheim Palace Garden, Oxford"
              className="w-full bg-[#FFFDF9] border border-[#C9A66B]/25 rounded px-3 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
            />
            {errors.location && <span className="text-[10px] text-red-500 mt-1 block">{errors.location.message}</span>}
          </div>
        </div>

      </div>

      {/* Special Requests (Full Width) */}
      <div className="mt-6 flex flex-col space-y-2">
        <label htmlFor="requirements" className="block text-xs font-medium text-[#444444]">Culinary Preferences & Event Details</label>
        <textarea
          id="requirements"
          {...register("requirements")}
          rows={4}
          placeholder="Mention details like dietary restrictions, theme colors, bar preferences, live cooking counters, decoration style, photography needs, etc."
          className="w-full bg-[#FFFDF9] border border-[#C9A66B]/25 rounded px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] transition-all resize-none"
        ></textarea>
      </div>

      {/* Submit Trigger */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="btn-luxury flex items-center justify-center gap-2 px-8 py-3.5 bg-[#8B5E3C] hover:bg-[#724D30] disabled:opacity-60 disabled:cursor-not-allowed text-[#FFFDF9] text-xs font-semibold uppercase tracking-widest rounded-md shadow-lg transition-colors cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Invitation Proposal</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
