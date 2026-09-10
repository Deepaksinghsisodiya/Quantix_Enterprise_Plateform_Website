import type { FooterLink, SocialLink } from '../types/FooterTypes';

export const RESTAURANT_SITE_URL = process.env.NEXT_PUBLIC_RESTAURANT_URL || 'http://localhost:3002';
export const RETAIL_SITE_URL = process.env.NEXT_PUBLIC_RETAIL_URL || 'http://localhost:3001';

export const PRODUCT_LINKS: FooterLink[] = [
  { href: RESTAURANT_SITE_URL, label: "Restaurant POS System" },
  { href: RETAIL_SITE_URL, label: "Retail Register Platform" },
  { href: "/pricing", label: "Plans & Pricing" },
  { href: "/integrations", label: "Integrations Ecosystem" },
  { href: "/downloads", label: "Register Apps & Drivers" },
];

export const COMPANY_LINKS: FooterLink[] = [
  { href: "/blog", label: "Engineering & Retail Blog", badge: "Live" },
  { href: "/help", label: "Help & Knowledge Centre" },
  { href: "/case-studies", label: "Customer Case Studies" },
  { href: "/about", label: "About Quantix Enterprise" },
  { href: "/roi-calculator", label: "ROI Savings Calculator" },
];

export const INDUSTRY_LINKS: FooterLink[] = [
  { href: "/solutions/fine-dining", label: "Fine Dining & Restaurants" },
  { href: "/solutions/fashion-retail", label: "Retail & Boutiques" },
  { href: "/solutions/grocery", label: "Supermarkets & Grocery" },
  { href: "/solutions/franchise", label: "Multi-Store Franchises" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/pci", label: "PCI-DSS Security" },
  { href: "/status", label: "Live System Status" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://youtube.com/@quantixpos", ariaLabel: "YouTube", icon: "youtube" },
  { href: "https://instagram.com/quantixpos", ariaLabel: "Instagram", icon: "instagram" },
  { href: "https://facebook.com/quantixpos", ariaLabel: "Facebook", icon: "facebook" },
];

export const FOOTER_COPYRIGHT = "© 2026 Quantix Enterprise Inc. All rights reserved.";
export const FOOTER_COMPLIANCE = "PCI-DSS Tier 1 Certified · SOC 2 Type II · 256-bit Encrypted";
