// src/features/FAQ/Constants/FAQConstants.ts
import { FAQItem } from '../Types/FAQTypes';

/** Default FAQs shown when the API returns no data */
export const DEFAULT_ENTERPRISE_FAQS: FAQItem[] = [
  {
    id: 'ent-trial',
    question: 'How long is the free trial and what does it include?',
    answer:
      'Our 14-day free trial gives full access to all features — multi-branch sync, catalog management, real-time reporting, and offline checkout. No credit card required to get started.',
    isPopular: true,
  },
  {
    id: 'ent-offline',
    question: 'What happens to operations if the store loses internet connectivity?',
    answer:
      'Every terminal runs an offline-first IndexedDB cache. Staff can continue scanning items, processing cash / offline card authorisations, and printing receipts. When connectivity restores, all transactions auto-reconcile without duplicates.',
  },
  {
    id: 'ent-erp',
    question: 'Can Quantix connect to SAP, Oracle, or a custom ERP?',
    answer:
      'Yes. Quantix exposes RESTful webhooks and GraphQL endpoints for real-time inventory-ledger syncing, automated purchase-order creation, GL journal entries, and audit-trail feeds into any ERP.',
  },
  {
    id: 'ent-hardware',
    question: 'What hardware and peripherals are supported?',
    answer:
      'Quantix is compatible with ESC/POS thermal receipt printers (Epson, Star Micronics), PAX / Verifone EMV readers, 2D barcode scanners, customer-facing displays, cash drawers, and precision weighing scales.',
  },
  {
    id: 'ent-security',
    question: 'Is my business data secure on the cloud?',
    answer:
      'Absolutely. All data in transit is encrypted with TLS 1.3 and stored with AES-256 database encryption. Tokenised payment gateways ensure no sensitive card credentials ever touch local terminal disks. We are SOC-2 Type II, PCI-DSS, and GDPR compliant.',
  },
  {
    id: 'ent-support',
    question: 'What level of technical onboarding and support is included?',
    answer:
      'Enterprise tiers include a dedicated Technical Account Manager, 24/7/365 priority SLA support, custom hardware staging and provisioning, and zero-downtime over-the-air firmware updates.',
  },
];

export const FAQ_ENDPOINT = '/help-centre/faqs' as const;
export const FAQ_CATEGORY_ENDPOINT = (category: string) =>
  `/help-centre/faqs?category=${encodeURIComponent(category)}` as const;
