// src/features/CaseStudies/constants/defaultCaseStudies.ts
import { CaseStudyDto } from '../Types/CaseStudiesTypes';

export const DEFAULT_CASE_STUDIES: CaseStudyDto[] = [
  {
    id: "cs-1",
    slug: "foodflow-empire-120-outlets",
    title: "How FoodFlow Group Scaled 120+ Outlets with Zero Database Desync",
    companyName: "FoodFlow Enterprise",
    industry: "Restaurant & QSR",
    challenge: "Handling peak Friday dinner volume across 120 restaurants with fragmented POS systems causing 4% order loss and delayed inventory reporting.",
    solution: "Deployed Quantix Cloud POS with offline-mesh sync, synchronized Kitchen Display System (KDS), and centralized real-time inventory ledger.",
    result: "Achieved 99.99% uptime during peak holidays, 18-minute faster table turnovers, and $1.4M saved in annual inventory leakages.",
    statLabel: "Annual Cost Savings",
    statValue: "$1.4M+",
    createdAt: "2026-01-15T00:00:00.000Z",
  },
  {
    id: "cs-2",
    slug: "bloom-fashion-retail-chain",
    title: "Unifying 45 Stores and Warehouse Logistics for Bloom Retail",
    companyName: "Bloom Retail Brands",
    industry: "Retail & Apparel",
    challenge: "Stock desynchronization between physical retail outlets and regional distribution centers led to frequent out-of-stock cancellations.",
    solution: "Implemented Quantix Central Master SKU Catalogue with real-time barcode scanning and automated inter-branch stock transfers.",
    result: "Reduced inventory shrinkage by 64%, increased omnichannel sales fulfillment by 42%, and cut register checkout time to 12 seconds.",
    statLabel: "Checkout Speed",
    statValue: "12s Avg",
    createdAt: "2026-02-10T00:00:00.000Z",
  },
  {
    id: "cs-3",
    slug: "bella-italia-franchise-expansion",
    title: "Franchise Acceleration: Launching 18 New Bistro Locations in 6 Months",
    companyName: "Bella Italia Franchises",
    industry: "Hospitality & Dining",
    challenge: "Training new franchise managers on disparate legacy software took 3+ weeks per location, delaying rollouts and increasing onboarding costs.",
    solution: "Standardized on Quantix Intuitive Touch POS with 15-minute onboarding wizard and automated fiscal compliance in 4 countries.",
    result: "Store rollout lead time slashed from 21 days to 48 hours. Staff training time dropped by 80%.",
    statLabel: "Rollout Velocity",
    statValue: "48h / Store",
    createdAt: "2026-03-01T00:00:00.000Z",
  }
];
