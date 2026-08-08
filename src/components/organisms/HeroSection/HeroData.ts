// src/components/organisms/HeroSection/HeroData.ts
// All static slide data for the Hero carousel mapped to the 4 main product lines:
// 1. Restaurant POS
// 2. Retail POS
// 3. Enterprise POS
// 4. Custom POS

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
    heading: "The All-in-One Restaurant POS",
    subheading: "Manage tableside orders, real-time kitchen ticket routing, split bills, and visual floor plans — all from one fast device.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Request Demo →", href: "/contact/demo" },
    backgroundImage: "/images/kitchen_display_3d.png",
    featureHighlights: ["Kitchen Ticket Routing", "Visual Floor Maps", "Tableside Ordering"],
  },
  {
    id: "retail",
    badge: "RETAIL POS & BARCODE REGISTER",
    heading: "Smarter Retail & Inventory POS",
    subheading: "Offline-first barcode checkout, live stock deductions, matrix inventory, and customer rewards across every store branch.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Explore Retail POS →", href: "/features/offline-registers" },
    backgroundImage: "/images/pos_counter_3d.png",
    featureHighlights: ["Offline Local Till", "Fast Barcode Lookup", "Stock Level Sync"],
  },
  {
    id: "enterprise",
    badge: "ENTERPRISE POS PLATFORM",
    heading: "Multi-Store Enterprise POS Cloud",
    subheading: "Bank-grade encrypted multi-tenant cloud dashboard with global menu updates, multi-store stock sync, and central analytics.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Enterprise Hub →", href: "/enterprise-vs-standalone" },
    backgroundImage: "/images/enterprise_hub_3d.png",
    featureHighlights: ["Multi-Tenant Isolation", "Global Menu Push", "Central Analytics"],
  },
  {
    id: "custom",
    badge: "CUSTOM POS SOLUTIONS",
    heading: "Tailored Custom POS Architecture",
    subheading: "Custom software workflows, proprietary hardware API bridges, white-label branding, and dedicated corporate SLA support.",
    primaryCta: { label: "Contact Custom Team", href: "/contact" },
    secondaryCta: { label: "Request Quote →", href: "/contact" },
    backgroundImage: "/images/online_ordering_3d.png",
    featureHighlights: ["Custom Workflows", "API & Webhook Bridge", "Dedicated SLA Line"],
  },
];

export const HERO_AUTO_PLAY_INTERVAL_MS = 5000;
