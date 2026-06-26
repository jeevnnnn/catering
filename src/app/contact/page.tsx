import type { Metadata } from "next";
import React from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Instagram, Facebook } from "lucide-react";

export const metadata: Metadata = {
  title: "Connect With Our Event Designers | Contact Us",
  description: "Get in touch with our Mayfair headquarters. Schedule a menu tasting session or request event proposals.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "KAÈON Luxury Catering - Contact Us",
    url: "https://kaeonstudios.com/contact",
  },
};

export default function ContactPage() {
  const whatsAppNumber = "+442079460958";
  const defaultMsg = encodeURIComponent("Hello, I would like to book a catering event consultation. Please connect me with a designer.");

  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] py-16 px-6 font-sans">
      
      {/* Title Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B5E3C] font-extrabold block">
          Concierge Services
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1A1A] mt-3">
          Connect With Our Event Designers
        </h1>
        <p className="text-xs sm:text-sm text-[#444444]/80 max-w-xl mx-auto mt-4 leading-relaxed font-light">
          Whether planning an intimate fine-dining dinner party or a grand destination wedding, our specialists are ready to curate your proposal.
        </p>
        <div className="w-16 h-0.5 bg-[#C9A66B] mx-auto mt-6" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        
        {/* Left 5 Columns: Address details */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="glass-panel border border-[#C9A66B]/20 rounded-xl p-8 space-y-6">
            <h3 className="text-base font-serif font-bold text-[#1A1A1A] border-b border-[#C9A66B]/15 pb-3">
              Headquarters Concierge
            </h3>
            
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded bg-[#8B5E3C]/10 text-[#8B5E3C] mt-0.5">
                <MapPin className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8B5E3C]">Office Address</h4>
                <p className="text-sm text-[#1A1A1A] font-medium mt-1">Mayfair Grand Estate, Suite 400A</p>
                <p className="text-xs text-[#444444]/75 mt-0.5">London, W1J 8DJ, United Kingdom</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded bg-[#8B5E3C]/10 text-[#8B5E3C] mt-0.5">
                <Phone className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8B5E3C]">Phone Hotlines</h4>
                <p className="text-sm text-[#1A1A1A] font-medium mt-1">
                  <a href="tel:+442079460958" className="hover:underline">+44 20 7946 0958</a>
                </p>
                <p className="text-xs text-[#444444]/65">General reservation & calendar scheduling</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded bg-[#8B5E3C]/10 text-[#8B5E3C] mt-0.5">
                <Mail className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8B5E3C]">Electronic Mail</h4>
                <p className="text-sm text-[#1A1A1A] font-medium mt-1">
                  <a href="mailto:concierge@kaeoncatering.com" className="hover:underline">concierge@kaeoncatering.com</a>
                </p>
                <p className="text-xs text-[#444444]/65">Request proposals & vendor coordination</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded bg-[#8B5E3C]/10 text-[#8B5E3C] mt-0.5">
                <Clock className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8B5E3C]">Office Operations</h4>
                <p className="text-sm text-[#1A1A1A] font-medium mt-1">Monday - Saturday</p>
                <p className="text-xs text-[#444444]/75 mt-0.5">9:00 AM to 8:00 PM GMT</p>
              </div>
            </div>
          </div>

          {/* Social connections & WhatsApp */}
          <div className="glass-panel border border-[#C9A66B]/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href={`https://wa.me/${whatsAppNumber}?text=${defaultMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold uppercase tracking-wider shadow"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Direct Chat</span>
            </a>

            <div className="flex items-center gap-3">
              <a href="https://instagram.com" aria-label="Instagram" className="p-2.5 rounded-full border border-[#C9A66B]/20 hover:border-[#8B5E3C] text-[#8B5E3C] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="p-2.5 rounded-full border border-[#C9A66B]/20 hover:border-[#8B5E3C] text-[#8B5E3C] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right 7 Columns: Mock Google Maps Visual */}
        <div className="lg:col-span-7 h-[420px] lg:h-auto rounded-xl overflow-hidden border border-[#C9A66B]/25 relative bg-[#8B5E3C]/5 shadow-inner">
          <div className="absolute inset-0 bg-[#FFFDF9]/10 pointer-events-none z-10" />
          {/* A luxury, clean minimalist SVG map simulation with elegant markers to represent Google Maps beautifully */}
          <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 space-y-4">
            <MapPin className="w-12 h-12 text-[#8B5E3C] animate-pulse" />
            <h4 className="text-base font-serif font-bold text-[#1A1A1A]">Mayfair Grand Estate Maps</h4>
            <p className="text-xs text-[#444444]/75 max-w-sm">
              We host client tasting sessions in our Mayfair estate presentation kitchen. Available by booking invitation only.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#8B5E3C] hover:bg-[#724D30] text-white text-xs font-semibold uppercase tracking-widest rounded shadow transition-all"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
