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
    id: "hq",
    badge: "CENTRALIZED HQ OPERATIONS",
    heading: "Unified Control for Enterprise Networks",
    mobileHeadingLines: ["Unified Control", "for Enterprise", "Networks"],
    subheading:
      "Control thousands of locations, menus, and staff permissions from a single, unified enterprise dashboard built for scale.",
    primaryCta: { label: "Contact Sales", href: "/contact" },
    secondaryCta: { label: "Request Demo", href: "/contact/demo" },
    backgroundImage: "/images/ent_cloud_hq.jpg",
    featureHighlights: ["Global Menu Management", "Role-Based Permissions", "Live Enterprise Sync"],
  },
  {
    id: "inventory",
    badge: "GLOBAL INVENTORY VISIBILITY",
    heading: "Smart Supply Chain & Multi-Store Inventory",
    mobileHeadingLines: ["Smart Supply Chain", "& Multi-Store", "Inventory"],
    subheading:
      "Real-time stock tracking, automated warehouse transfers, and smart supply chain algorithms for multi-store retail and restaurant chains.",
    primaryCta: { label: "Contact Sales", href: "/contact" },
    secondaryCta: { label: "Explore Inventory", href: "/products/inventory" },
    backgroundImage: "/images/ent_supply_chain.jpg",
    featureHighlights: ["Automated Transfers", "Warehouse Management", "Real-Time Tracking"],
  },
  {
    id: "analytics",
    badge: "CUSTOM BI & ANALYTICS",
    heading: "Data-Driven Enterprise Intelligence",
    mobileHeadingLines: ["Data-Driven", "Enterprise", "Intelligence"],
    subheading:
      "Drill-down reporting, custom data lakes, and API-driven business intelligence for enterprise decision-makers and stakeholders.",
    primaryCta: { label: "Contact Sales", href: "/contact" },
    secondaryCta: { label: "View Analytics", href: "/products/analytics" },
    backgroundImage: "/images/retail_pos_analytics_bi.jpg",
    featureHighlights: ["Custom Data Lakes", "API-Driven BI", "Drill-Down Reporting"],
  },
  {
    id: "omnichannel",
    badge: "OMNICHANNEL FULFILLMENT",
    heading: "Seamless Unified Commerce Experience",
    mobileHeadingLines: ["Seamless Unified", "Commerce", "Experience"],
    subheading:
      "Seamlessly bridge e-commerce, in-app ordering, and physical POS networks into one cohesive operation for your customers.",
    primaryCta: { label: "Contact Sales", href: "/contact" },
    secondaryCta: { label: "Explore Omnichannel", href: "/products/omnichannel" },
    backgroundImage: "/images/retail_omnichannel_fulfillment.jpg",
    featureHighlights: ["E-Commerce Sync", "In-App Ordering", "Unified Customer Profiles"],
  },
];

export const HERO_AUTO_PLAY_INTERVAL_MS = 5000;
