"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles, Coffee, Cake, UtensilsCrossed } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const pathname = usePathname();
  const isScrolledRef = useRef(false);

  // Scroll listener to toggle background opacity/glass
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (scrolled !== isScrolledRef.current) {
        isScrolledRef.current = scrolled;
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initially in case of refresh down page
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(false);
      setActiveMega(null);
    });
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      mega: "services",
      items: [
        { name: "Wedding Catering", desc: "Exquisite culinary memories", href: "/weddings", icon: Sparkles },
        { name: "Corporate Events", desc: "Seamless corporate food operations", href: "/corporate", icon: Coffee },
        { name: "Birthday Parties", desc: "Vibrant family celebration spreads", href: "/birthdays", icon: Cake },
        { name: "Private Dining & Buffet", desc: "Exclusive tasting menus & banquets", href: "/services#dining", icon: UtensilsCrossed },
      ]
    },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 header-transition border-b ${
          isScrolled 
            ? "py-3 bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-md shadow-md border-[#C9A66B]/15" 
            : "py-6 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="text-xl md:text-2xl font-serif tracking-widest text-[#8B5E3C] dark:text-[#C9A66B] font-bold uppercase transition-colors">
              KAÈON
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#444444] dark:text-[#F7F1E8]/70 -mt-1 font-sans">
              Catering & Events
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => item.mega && setActiveMega(item.mega)}
                onMouseLeave={() => item.mega && setActiveMega(null)}
              >
                {item.mega ? (
                  <button className="flex items-center space-x-1 py-2 text-sm font-medium text-[#444444] dark:text-[#F7F1E8] hover:text-[#8B5E3C] dark:hover:text-[#C9A66B] transition-colors cursor-pointer">
                    <span>{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMega === item.mega ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link 
                    href={item.href}
                    className={`py-2 text-sm font-medium transition-colors ${
                      pathname === item.href 
                        ? "text-[#8B5E3C] dark:text-[#C9A66B] border-b border-[#C9A66B]" 
                        : "text-[#444444] dark:text-[#F7F1E8] hover:text-[#8B5E3C] dark:hover:text-[#C9A66B]"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Mega Menu Dropdown */}
                {item.mega && item.items && (
                  <AnimatePresence>
                    {activeMega === item.mega && (
                      <m.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-[420px] rounded-lg p-5 glass-panel shadow-2xl border border-[#C9A66B]/20"
                      >
                        <div className="grid grid-cols-1 gap-4">
                          <div className="border-b border-[#C9A66B]/10 pb-2 mb-1">
                            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8B5E3C] dark:text-[#C9A66B]">
                              Premium Event Inquiries
                            </h4>
                          </div>
                          {item.items.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <Link 
                                key={sub.name} 
                                href={sub.href}
                                className="flex items-start gap-3 p-2 rounded-md hover:bg-[#8B5E3C]/5 dark:hover:bg-[#C9A66B]/5 transition-colors group/sub"
                              >
                                <div className="p-1.5 rounded bg-[#8B5E3C]/10 dark:bg-[#C9A66B]/15 text-[#8B5E3C] dark:text-[#C9A66B]">
                                  <SubIcon className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-[#1A1A1A] dark:text-white group-hover/sub:text-[#8B5E3C] dark:group-hover/sub:text-[#C9A66B] transition-colors">
                                    {sub.name}
                                  </div>
                                  <div className="text-xs text-[#444444]/70 dark:text-[#F7F1E8]/70 mt-0.5">
                                    {sub.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/admin" 
              className="text-xs uppercase tracking-wider text-[#444444] dark:text-[#F7F1E8] hover:text-[#8B5E3C] dark:hover:text-[#C9A66B] transition-colors font-semibold"
            >
              Dashboard
            </Link>
            <Link
              href="/inquiry"
              className="btn-luxury px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#8B5E3C] hover:bg-[#724D30] text-[#FFFDF9] shadow-md hover:shadow-lg transition-all"
            >
              Book Event
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-[#444444] dark:text-[#F7F1E8] hover:text-[#8B5E3C] dark:hover:text-[#C9A66B] transition-colors cursor-pointer rounded-md"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={toggleMenu}
            aria-hidden="true"
          >
            <m.div
              id="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#FFFDF9] dark:bg-[#1A1A1A] p-6 shadow-2xl flex flex-col justify-between border-l border-[#C9A66B]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mt-12 flex flex-col space-y-6">
                <div className="border-b border-[#C9A66B]/15 pb-4">
                  <span className="text-xl font-serif tracking-widest text-[#8B5E3C] dark:text-[#C9A66B] font-bold uppercase">
                    KAÈON
                  </span>
                  <span className="block text-[8px] uppercase tracking-[0.25em] text-[#444444]/65 dark:text-[#F7F1E8]/70 mt-0.5">
                    Luxury Catering & Events
                  </span>
                </div>

                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.name} className="flex flex-col">
                      {item.items ? (
                        <>
                          <span className="text-xs uppercase tracking-wider font-semibold text-[#8B5E3C] dark:text-[#C9A66B] mb-2">
                            {item.name}
                          </span>
                          <div className="pl-4 border-l border-[#C9A66B]/25 flex flex-col space-y-3 mt-1">
                            {item.items.map((sub) => (
                              <Link 
                                key={sub.name} 
                                href={sub.href}
                                className="text-sm font-medium text-[#444444] dark:text-[#F7F1E8] hover:text-[#8B5E3C] transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-base font-semibold text-[#1A1A1A] dark:text-[#F7F1E8] hover:text-[#8B5E3C] dark:hover:text-[#C9A66B] transition-colors"
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <Link
                    href="/admin"
                    className="text-base font-semibold text-[#1A1A1A] dark:text-[#F7F1E8] hover:text-[#8B5E3C] dark:hover:text-[#C9A66B] transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                </nav>
              </div>

              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/inquiry"
                  className="w-full text-center py-3 bg-[#8B5E3C] text-white rounded-full text-xs font-semibold uppercase tracking-widest shadow-md hover:bg-[#724D30] transition-colors"
                >
                  Book Event
                </Link>
                <Link
                  href="/contact"
                  className="w-full text-center py-3 border border-[#8B5E3C] text-[#8B5E3C] dark:border-[#C9A66B] dark:text-[#C9A66B] rounded-full text-xs font-semibold uppercase tracking-widest transition-colors"
                >
                  Contact Concierge
                </Link>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
