import type { FooterLink, SocialLink } from '../types/FooterTypes';

export const RESTAURANT_SITE_URL = process.env.NEXT_PUBLIC_RESTAURANT_URL || 'http://localhost:3002';
export const RETAIL_SITE_URL = process.env.NEXT_PUBLIC_RETAIL_URL || 'http://localhost:3001';

export const PRODUCT_LINKS: FooterLink[] = [
  { href: "/products/cloud-pos", label: "Cloud POS" },
  { href: "/products/enterprise-pos", label: "Cloud HQ" },
  { href: "/products/custom-service", label: "Inventory Management" },
  { href: "/products/retail-pos", label: "Online Ordering" },
  { href: "/products/enterprise-pos", label: "Enterprise Analytics" },
  { href: "/integrations", label: "Payment Processing" },
  { href: "/integrations", label: "Integrations Ecosystem" },
];

export const INDUSTRY_LINKS: FooterLink[] = [
  { href: RESTAURANT_SITE_URL, label: "Restaurants & Dining" },
  { href: `${RESTAURANT_SITE_URL}/solutions/qsr`, label: "Quick-Service (QSR)" },
  { href: RETAIL_SITE_URL, label: "Retail & Boutiques" },
  { href: "/solutions/grocery", label: "Grocery & Supermarkets" },
  { href: "/solutions/franchise", label: "Multi-Store Franchises" },
];

export const COMPANY_LINKS: FooterLink[] = [
  { href: "/help/getting-started", label: "POS Implementation Guide" },
  { href: "/blog", label: "Resource Hub & Blog", badge: "Live" },
  { href: "/case-studies", label: "Customer Case Studies" },
  { href: "/roi-calculator", label: "ROI Savings Calculator" },
  { href: "/downloads", label: "Register Apps & Drivers" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { href: "/about", label: "About Quantix" },
  { href: "/pricing", label: "Plans & Pricing" },
  { href: "/contact", label: "Contact Enterprise Sales" },
  { href: "/help", label: "24/7 Technical Support" },
  { href: "/status", label: "Live System Status" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://youtube.com/@quantixpos", ariaLabel: "YouTube", icon: "youtube" },
  { href: "https://instagram.com/quantixpos", ariaLabel: "Instagram", icon: "instagram" },
  { href: "https://facebook.com/quantixpos", ariaLabel: "Facebook", icon: "facebook" },
];

export const FOOTER_COPYRIGHT = "© 2026 Quantix Enterprise Inc. All rights reserved.";
export const FOOTER_COMPLIANCE = "PCI-DSS Tier 1 Certified · SOC 2 Type II · 256-bit Encrypted";
