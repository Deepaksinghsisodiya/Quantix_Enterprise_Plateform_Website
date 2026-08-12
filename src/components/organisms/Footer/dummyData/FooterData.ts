import type { FooterLink, SocialLink } from '../types/FooterTypes';

export const PRODUCT_LINKS: FooterLink[] = [
  { href: "/features/offline-registers", label: "Cloud POS Registers" },
  { href: "/features/table-management", label: "Kitchen Display (KDS)" },
  { href: "/features/online-ordering", label: "Online Ordering Portal" },
  { href: "/features/smart-inventory", label: "Inventory & Stock Sync" },
  { href: "/pricing", label: "Plans & Pricing" },
  { href: "/integrations", label: "Integrations & Hardware" },
  { href: "/downloads", label: "Desktop & Mobile Apps" },
];

export const COMPANY_LINKS: FooterLink[] = [
  { href: "/about", label: "About Quantix Enterprise" },
  { href: "/careers", label: "Careers", badge: "Hiring" },
  { href: "/blog", label: "Industry Insights & Blog" },
  { href: "/press", label: "Press Kit & Media" },
  { href: "/contact/sales", label: "Contact Sales Team" },
  { href: "/contact/demo", label: "Book Personalized Demo" },
];

export const INDUSTRY_LINKS: FooterLink[] = [
  { href: "/solutions/quick-service", label: "Restaurants & QSR" },
  { href: "/solutions/fashion-retail", label: "Retail & Boutiques" },
  { href: "/solutions/grocery", label: "Supermarkets & Grocery" },
  { href: "/solutions/cafe-bakery", label: "Cafes & Bakeries" },
  { href: "/solutions/franchise", label: "Multi-Store Franchises" },
  { href: "/solutions/food-trucks", label: "Food Trucks & Pop-ups" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/pci", label: "PCI-DSS Security" },
  { href: "/gdpr", label: "GDPR Compliance" },
  { href: "/sla", label: "Service SLA (99.99%)" },
  { href: "/status", label: "Live System Status" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://twitter.com/quantix", ariaLabel: "Twitter", icon: "twitter" },
  { href: "https://linkedin.com/company/quantix", ariaLabel: "LinkedIn", icon: "linkedin" },
  { href: "https://github.com/quantix", ariaLabel: "GitHub", icon: "github" },
];

export const FOOTER_COPYRIGHT = "© 2025 Quantix Enterprise Inc. All rights reserved.";
export const FOOTER_COMPLIANCE = "PCI-DSS Tier 1 Certified · SOC 2 Type II · 256-bit Encrypted";
