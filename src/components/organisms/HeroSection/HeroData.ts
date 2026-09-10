// src/components/organisms/HeroSection/HeroData.ts

export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  mobileHeadingLines?: [string, string, string];
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  backgroundImage: string;
  featureHighlights: string[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "platform",
    badge: "OPERATING PLATFORM FOR MULTI-LOCATION BRANDS",
    heading: "Run Every Location From One Platform",
    mobileHeadingLines: ["Run Every", "Location From", "One Platform"],
    subheading:
      "Enterprise POS, inventory, online ordering, payments, and analytics — connected across every store. Quantix Enterprise gives restaurant groups, retail chains, and franchises one centralized platform to manage locations, menus, inventory, and staff without juggling disconnected systems.",
    primaryCta: { label: "Start Your Free Trial", href: "/contact" },
    secondaryCta: { label: "Book an Enterprise Demo", href: "/contact/demo" },
    backgroundImage: "/images/foodhub_pos_terminal.jpg",
    featureHighlights: ["Manage Every Location", "One POS for Every Branch", "Connected Real-Time Data"],
  },
  {
    id: "inventory",
    badge: "CENTRALIZED MULTI-STORE INVENTORY",
    heading: "Manage Inventory Across Every Location",
    mobileHeadingLines: ["Manage Inventory", "Across Every", "Location"],
    subheading:
      "Stop managing inventory store by store. Know what every location has, what it's using, and what it needs — with automated low-stock replenishment, inter-branch transfers, and real-time COGS tracking.",
    primaryCta: { label: "Start Your Free Trial", href: "/contact" },
    secondaryCta: { label: "Book an Enterprise Demo", href: "/contact/demo" },
    backgroundImage: "/images/ent_supply_chain.jpg",
    featureHighlights: ["Automated Replenishment", "Inter-Branch Transfers", "Network-Wide Cost Control"],
  },
  {
    id: "analytics",
    badge: "BUSINESS INTELLIGENCE & VISIBILITY",
    heading: "See What's Happening Across Your Business",
    mobileHeadingLines: ["See What's", "Happening Across", "Your Business"],
    subheading:
      "Turn store sales, labor hours, and inventory usage across every location into actionable insights. Access executive roll-up reporting, live branch telemetry, and automated financial forecasting.",
    primaryCta: { label: "Start Your Free Trial", href: "/contact" },
    secondaryCta: { label: "Book an Enterprise Demo", href: "/contact/demo" },
    backgroundImage: "/images/retail_pos_analytics_bi.jpg",
    featureHighlights: ["Consolidated HQ Reports", "Real-Time Sales Telemetry", "Automated Margin Tracking"],
  },
  {
    id: "omnichannel",
    badge: "UNIFIED OMNICHANNEL COMMERCE",
    heading: "Bring Web, Mobile & In-Store Orders Together",
    mobileHeadingLines: ["Bring Web, Mobile", "& In-Store Orders", "Together"],
    subheading:
      "Seamlessly bridge e-commerce, in-app mobile ordering, curbside pickup (BOPIS), and physical registers into one synchronized operation without menu or catalog duplication.",
    primaryCta: { label: "Start Your Free Trial", href: "/contact" },
    secondaryCta: { label: "Book an Enterprise Demo", href: "/contact/demo" },
    backgroundImage: "/images/retail_omnichannel_fulfillment.jpg",
    featureHighlights: ["Click & Collect / BOPIS", "Instant Web Menu Sync", "Unified Loyalty Profiles"],
  },
];

export const HERO_AUTO_PLAY_INTERVAL_MS = 5000;
