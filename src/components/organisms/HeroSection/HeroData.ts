export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  mobileHeadingLines: [string, string, string];
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  backgroundImage: string;
  featureHighlights: string[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "restaurant",
    badge: "RESTAURANT POS",
    heading: "The All-in-One Restaurant POS",
    mobileHeadingLines: ["The All-in-One", "Restaurant", "POS"],
    subheading:
      "Manage tableside orders, kitchen ticket routing, split bills, and visual floor plans from one restaurant-ready POS.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Request Demo", href: "/contact/demo" },
    backgroundImage: "/images/ss2-ai.png",
    featureHighlights: ["Kitchen Ticket Routing", "Visual Floor Maps", "Tableside Ordering"],
  },
  {
    id: "retail",
    badge: "RETAIL POS",
    heading: "Smarter Retail & Inventory POS",
    mobileHeadingLines: ["Smarter Retail", "& Inventory", "POS"],
    subheading:
      "Run barcode checkout, local billing, stock deductions, customer rewards, and cashier workflows across every store branch.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Explore Retail POS", href: "/features/offline-registers" },
    backgroundImage: "/images/ss3-ai.png",
    featureHighlights: ["Offline Local Till", "Fast Barcode Lookup", "Stock Level Sync"],
  },
  {
    id: "enterprise",
    badge: "ENTERPRISE POS",
    heading: "Enterprise POS for Multi-Store Teams",
    mobileHeadingLines: ["Enterprise POS", "for Multi-Store", "Teams"],
    subheading:
      "Centralize branch operations with menu rollouts, staff controls, inventory visibility, and reporting for growing chains.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Enterprise Hub", href: "/enterprise-vs-standalone" },
    backgroundImage: "/images/ss1-ai.png",
    featureHighlights: ["Branch Controls", "Menu Rollouts", "Central Analytics"],
  },
  {
    id: "cloud",
    badge: "CLOUD POS",
    heading: "Run Every Location From the Cloud",
    mobileHeadingLines: ["Run Every", "Location From the", "Cloud"],
    subheading:
      "Track sales, inventory, staff activity, and operational reports from anywhere your business needs visibility.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Explore Cloud POS", href: "/enterprise-vs-standalone" },
    backgroundImage: "/images/inventory_sync_3d.png",
    featureHighlights: ["Live Dashboards", "Inventory Sync", "Remote Management"],
  },
  {
    id: "custom",
    badge: "CUSTOM SOLUTIONS",
    heading: "Custom POS Solutions for Complex Workflows",
    mobileHeadingLines: ["Custom POS", "Solutions for", "Complex Workflows"],
    subheading:
      "Build tailored workflows, API bridges, white-label experiences, and hardware integrations around your operating model.",
    primaryCta: { label: "Contact Custom Team", href: "/contact" },
    secondaryCta: { label: "Request Quote", href: "/contact" },
    backgroundImage: "/images/online_ordering_3d.png",
    featureHighlights: ["Custom Workflows", "API Bridges", "White-Label Options"],
  },
];

export const HERO_AUTO_PLAY_INTERVAL_MS = 5000;
