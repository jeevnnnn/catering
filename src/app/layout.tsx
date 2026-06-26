import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import MotionProvider from "@/components/MotionProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

const BASE_URL = "https://kaeonstudios.com";
const OG_IMAGE = "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&auto=format&fit=crop&q=80";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "KAÈON | Premium Catering & Bespoke Event Management",
    template: "%s | KAÈON Catering",
  },
  description:
    "Exquisite culinary art, destination weddings, corporate galas, and bespoke event management. Curating Michelin-standard catering experiences globally.",
  keywords: [
    "luxury catering", "wedding catering", "corporate catering", "event management",
    "Michelin catering", "destination wedding", "private dining", "bespoke events",
  ],
  authors: [{ name: "KAÈON Catering", url: BASE_URL }],
  creator: "Kaeon Studios",
  alternates: { canonical: "/" },
  openGraph: {
    title: "KAÈON | Premium Catering & Bespoke Event Management",
    description:
      "Michelin-inspired plated menus, visual table styling, and seamless management for high-end events.",
    url: BASE_URL,
    siteName: "KAÈON Catering",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "KAÈON Premium Dining Table Design" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KAÈON | Premium Catering & Bespoke Event Management",
    description: "Michelin-inspired plated menus and visual table styling for luxury destination weddings and events.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Rich JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: "KAÈON Luxury Catering & Events",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80",
      telephone: "+442079460958",
      email: "concierge@kaeoncatering.com",
      priceRange: "$$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mayfair Grand Estate, Suite 400A",
        addressLocality: "London",
        postalCode: "W1J 8DJ",
        addressCountry: "GB",
      },
      geo: { "@type": "GeoCoordinates", latitude: 51.5074, longitude: -0.1278 },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
      url: BASE_URL,
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "KAÈON Catering",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=200&auto=format&fit=crop&q=80",
      },
      sameAs: ["https://instagram.com", "https://facebook.com"],
    },
    {
      "@type": "Service",
      name: "Luxury Event Catering",
      provider: { "@id": `${BASE_URL}/#localbusiness` },
      serviceType: "Catering & Event Management",
      areaServed: "Worldwide",
      description:
        "Premium multi-course Michelin plated dining, gourmet buffets, live cooking counters, and event design.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the minimum guest size for KAÈON event catering?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We cater events from intimate fine dining gatherings of 10 guests up to grand banquets of 1000+ guests.",
          },
        },
        {
          "@type": "Question",
          name: "Can KAÈON manage custom event decorations and vendor coordination?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we provide end-to-end event planning including custom table layouts, floral backdrops, entertainment, and professional photography.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#8B5E3C" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#444444] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <Navbar />
          <main id="main-content" className="flex-grow pt-20" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <FloatingCTA />
        </MotionProvider>
      </body>
    </html>
  );
}
