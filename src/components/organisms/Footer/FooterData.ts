// src/components/organisms/Footer/FooterData.ts
// All static data for the Footer — links, social handles, legal copy.
// Keep data here so FooterView.tsx stays pure JSX.

export interface FooterLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  ariaLabel: string;
  icon: 'twitter' | 'linkedin' | 'github';
}

export const PRODUCT_LINKS: FooterLink[] = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/integrations", label: "Integrations" },
  { href: "/downloads", label: "Downloads" },
  { href: "/changelog", label: "Changelog" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/api-docs", label: "API Docs" },
];

export const COMPANY_LINKS: FooterLink[] = [
  { href: "/about", label: "About Us" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press Kit" },
  { href: "/contact", label: "Contact" },
];

export const INDUSTRY_LINKS: FooterLink[] = [
  { href: "/industries/retail", label: "Retail POS" },
  { href: "/industries/restaurant", label: "Restaurant POS" },
  { href: "/industries/grocery", label: "Grocery" },
  { href: "/industries/cafes", label: "Cafes & Bars" },
  { href: "/industries/food-trucks", label: "Food Trucks" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/gdpr", label: "GDPR" },
  { href: "/pci", label: "PCI Compliance" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://twitter.com/quantix", ariaLabel: "Twitter", icon: "twitter" },
  { href: "https://linkedin.com/company/quantix", ariaLabel: "LinkedIn", icon: "linkedin" },
  { href: "https://github.com/quantix", ariaLabel: "GitHub", icon: "github" },
];

export const FOOTER_COPYRIGHT = "© 2025 Quantix, Inc. All rights reserved.";
export const FOOTER_COMPLIANCE = "PCI DSS Compliant · SOC 2 Type II · GDPR Ready";
