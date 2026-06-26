import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Calendar, Award } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-[#F7F1E8] border-t border-[#C9A66B]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <span className="text-2xl font-serif tracking-widest text-[#C9A66B] font-bold uppercase">
              KAÈON
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#F7F1E8]/60 -mt-1 font-sans">
              Catering & Events
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[#F7F1E8]/70">
            Crafting michelin-inspired catering experiences and bespoke luxury event atmospheres for destination weddings, high-profile corporate functions, and intimate elite celebrations.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <Award className="w-5 h-5 text-[#C9A66B]" />
            <span className="text-[10px] uppercase tracking-wider text-[#C9A66B] font-semibold">
              Michelin-Star Plated Culinary Standard
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A66B] font-semibold mb-6">
            Explore Services
          </h4>
          <ul className="space-y-3.5 text-xs text-[#F7F1E8]/80">
            <li>
              <Link href="/weddings" className="hover:text-[#C9A66B] transition-colors">
                Wedding Catering & Planning
              </Link>
            </li>
            <li>
              <Link href="/corporate" className="hover:text-[#C9A66B] transition-colors">
                Corporate Gala & Conferences
              </Link>
            </li>
            <li>
              <Link href="/birthdays" className="hover:text-[#C9A66B] transition-colors">
                Luxury Birthday Events
              </Link>
            </li>
            <li>
              <Link href="/services#dining" className="hover:text-[#C9A66B] transition-colors">
                Private Fine Dining Exclusives
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-[#C9A66B] transition-colors">
                Event Galleries & Portfolio
              </Link>
            </li>
          </ul>
        </div>

        {/* Business Hours & Map Link */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A66B] font-semibold mb-6">
            Business Concierge
          </h4>
          <ul className="space-y-3.5 text-xs text-[#F7F1E8]/80">
            <li className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#C9A66B] shrink-0" />
              <div>
                <p className="font-semibold text-white">Office Hours</p>
                <p className="text-[11px] text-[#F7F1E8]/60">Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Headquarters</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#C9A66B] transition-colors text-[11px] text-[#F7F1E8]/60 underline underline-offset-2"
                >
                  Mayfair Grand Estate, Suite 400A, London, UK
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact Concierge & Socials */}
        <div className="flex flex-col space-y-6">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A66B] font-semibold mb-6">
              Connect Directly
            </h4>
            <ul className="space-y-3 text-xs text-[#F7F1E8]/80">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <a href="tel:+442079460958" className="hover:text-[#C9A66B] transition-colors">
                  +44 20 7946 0958
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <a href="mailto:concierge@kaeoncatering.com" className="hover:text-[#C9A66B] transition-colors">
                  concierge@kaeoncatering.com
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4 pt-1">
            <a 
              href="https://instagram.com" 
              aria-label="Instagram Profile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full border border-[#C9A66B]/25 hover:border-[#C9A66B] text-[#F7F1E8]/80 hover:text-[#C9A66B] transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://facebook.com" 
              aria-label="Facebook Page" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full border border-[#C9A66B]/25 hover:border-[#C9A66B] text-[#F7F1E8]/80 hover:text-[#C9A66B] transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <Link 
              href="/inquiry"
              aria-label="Event Inquiry Calendar"
              className="p-2 rounded-full border border-[#C9A66B]/25 hover:border-[#C9A66B] text-[#F7F1E8]/80 hover:text-[#C9A66B] transition-all"
            >
              <Calendar className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto px-6 border-t border-[#F7F1E8]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F7F1E8]/50">
        <div>
          &copy; {currentYear} KAÈON Luxury Catering. All rights reserved.
        </div>
        <div className="flex items-center gap-1 font-sans">
          <span>Designed & Developed by</span>
          <a 
            href="https://www.kaeonstudios.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#C9A66B] hover:text-[#8B5E3C] transition-colors font-semibold"
          >
            Kaeon Studios
          </a>
        </div>
      </div>
    </footer>
  );
}
