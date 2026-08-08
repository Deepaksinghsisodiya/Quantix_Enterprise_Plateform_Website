// src/components/organisms/HeroSection/HeroData.ts
// All static slide data for the Hero carousel.

export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  backgroundImage: string;
  featureHighlights: string[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "restaurant",
    badge: "RESTAURANT POS & KITCHEN KDS",
    heading: "The All-in-One POS for Restaurants",
    subheading: "Manage tableside orders, real-time kitchen ticket routing, and floor plans — all from one fast device.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Request Demo →", href: "/contact/demo" },
    backgroundImage: "/images/kitchen_display_3d.png",
    featureHighlights: ["Kitchen Ticket Routing", "Visual Floor Maps", "Tableside Tablets"],
  },
  {
    id: "retail",
    badge: "RETAIL POS & BARCODE REGISTER",
    heading: "Smarter Retail Starts Here",
    subheading: "Offline-first barcode registers, live stock deductions, and customer rewards across every store branch.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Explore Retail →", href: "/features" },
    backgroundImage: "/images/pos_counter_3d.png",
    featureHighlights: ["Offline Local Till", "Barcode Fast Lookup", "Line Discounts"],
  },
  {
    id: "online",
    badge: "ONLINE ORDERING PORTAL",
    heading: "Commission-Free Direct Online Sales",
    subheading: "Launch a custom web ordering app for direct customer orders with instant register and kitchen dispatch.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "See Online Portal →", href: "/features" },
    backgroundImage: "/images/online_ordering_3d.png",
    featureHighlights: ["0% Commission Fees", "Branded Web Portal", "Auto Order Dispatch"],
  },
  {
    id: "enterprise",
    badge: "ENTERPRISE MULTI-STORE HUB",
    heading: "Run Your Business Across Multi-Stores",
    subheading: "Bank-grade encrypted multi-tenant cloud dashboard with global menu updates and warehouse stock transfers.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Enterprise Hub →", href: "/solutions/franchise" },
    backgroundImage: "/images/enterprise_hub_3d.png",
    featureHighlights: ["Multi-Tenant Isolation", "Global Menu Push", "Warehouse Sync"],
  },
];

export const HERO_AUTO_PLAY_INTERVAL_MS = 5000;
