export interface EstimationResult {
  estimatedBudget: number;
  priceRangeMin: number;
  priceRangeMax: number;
  packageName: string;
  packageDescription: string;
  packageInclusions: string[];
}

export const EVENT_TYPES = [
  { id: "wedding", name: "Wedding Catering", baseCost: 3500, perGuest: 75 },
  { id: "corporate", name: "Corporate Catering", baseCost: 1500, perGuest: 45 },
  { id: "birthday", name: "Birthday Party", baseCost: 1200, perGuest: 35 },
  { id: "private", name: "Luxury Dining / Private Event", baseCost: 2500, perGuest: 110 },
  { id: "buffet", name: "Buffet Services", baseCost: 1000, perGuest: 30 },
  { id: "live_counter", name: "Live Counters", baseCost: 1800, perGuest: 50 },
];

export function calculateEventBudget(eventTypeId: string, guestCount: number): EstimationResult {
  const eventType = EVENT_TYPES.find(e => e.id === eventTypeId) || EVENT_TYPES[0];
  
  const baseCost = eventType.baseCost;
  const guestCost = guestCount * eventType.perGuest;
  const estimatedBudget = baseCost + guestCost;
  
  // Calculate a nice price range (-10% to +15% of the total estimate)
  const priceRangeMin = Math.round((estimatedBudget * 0.9) / 100) * 100;
  const priceRangeMax = Math.round((estimatedBudget * 1.15) / 100) * 100;

  // Determine packages based on event type and guest numbers
  let packageName = "Signature Gold Package";
  let packageDescription = "Our most popular selection, combining gourmet visual presentation with exquisite multi-course cuisine.";
  let packageInclusions = [
    "5 Appoint-styled Appetizers",
    "Choice of 3 Exquisite Main Courses",
    "Artisanal Bread & Salad Bars",
    "2 Gourmet Desserts & Tea service",
    "Professional Waitstaff & Setup",
  ];

  if (estimatedBudget < 4000) {
    packageName = "Classic Silver Package";
    packageDescription = "A refined buffet setup presenting elegant and delicious options, perfect for intimate gatherings.";
    packageInclusions = [
      "3 Signature Appetizers",
      "Choice of 2 Main Courses",
      "Traditional Salad Bar",
      "Warm Dessert & Fresh Beverages",
      "Buffet Warmers & Table Styling",
    ];
  } else if (estimatedBudget > 12000) {
    packageName = "Imperial Royal Platinum";
    packageDescription = "The ultimate culinary showcase. Features live cooking theaters, luxury plating, and rare premium ingredients.";
    packageInclusions = [
      "Custom Mixology Bar & Welcome Drinks",
      "7 Michelin-Inspired Hors d'œuvres",
      "5-Course Plated Fine Dining Menu",
      "Interactive Live Culinary Theatre / Chef stations",
      "Premium Gold-rimmed Tableware & Custom Florals",
      "Dedicated Sommelier & Butler Service",
    ];
  }

  return {
    estimatedBudget,
    priceRangeMin,
    priceRangeMax,
    packageName,
    packageDescription,
    packageInclusions,
  };
}

export function generateWhatsAppMessage({
  eventType,
  guestCount,
  date,
  budget,
  location,
}: {
  eventType: string;
  guestCount: number;
  date: string;
  budget: string;
  location: string;
}): string {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : "To be decided";

  const message = `Hello,

I'm interested in booking an event with your premium catering services.

Event Type: ${eventType}
Guest Count: ${guestCount} guests
Date: ${formattedDate}
Budget Target: ${budget}
Location: ${location || "To be decided"}

Please share a quotation and menu package details. Thank you!`;

  return encodeURIComponent(message);
}
