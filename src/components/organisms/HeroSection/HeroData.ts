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
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "retail",
    badge: "RETAIL POS",
    heading: "SMARTER RETAIL STARTS HERE",
    subheading: "Sync inventory, manage staff, and delight customers across every location.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Explore Retail →", href: "#services" },
    backgroundImage: "/images/hero-retail.jpg",
  },
  {
    id: "restaurant",
    badge: "RESTAURANT POS",
    heading: "THE ALL-IN-ONE POS FOR RESTAURANTS",
    subheading: "Manage tables, orders, and kitchen flow in real time — all from one device.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Contact Sales →", href: "#contact" },
    backgroundImage: "/images/hero-restaurant.jpg",
  },
  {
    id: "cloud",
    badge: "CLOUD POS",
    heading: "RUN YOUR BUSINESS FROM THE CLOUD",
    subheading: "Access real-time sales data, inventory levels, and analytics from anywhere in the world on any device.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "See Pricing →", href: "#pricing" },
    backgroundImage: "/images/hero-cafe.jpg",
  },
  {
    id: "local",
    badge: "LOCAL BILLING POS",
    heading: "OFFLINE-FIRST LOCAL BILLING TERMINAL",
    subheading: "Keep selling even when the internet goes down. Seamless local billing with automatic cloud sync when reconnected.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "See Offline Mode →", href: "#services" },
    backgroundImage: "/images/hero-local.png",
  },
];

export const HERO_AUTO_PLAY_INTERVAL_MS = 5000;
