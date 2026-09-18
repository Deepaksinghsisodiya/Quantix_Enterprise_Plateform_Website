import {
  TrendingDown,
  AlertTriangle,
  Layers,
  ArrowRightLeft,
  RefreshCw,
  LineChart,
} from "lucide-react";
import { BusinessProblemItem } from "../Types/businessProblems.types";

export const BUSINESS_PROBLEMS: BusinessProblemItem[] = [
  {
    id: "inventory",
    shortTabLabel: "Inventory",
    icon: TrendingDown,
    tag: "Store-by-Store Chaos",
    severity: "CRITICAL",
    title: "Disconnected Inventory & Stockouts",
    description:
      "One branch runs out of bestsellers while another holds surplus stock that expires. HQ lacks multi-unit inventory telemetry.",
    impact: "Revenue loss, uncoordinated food waste & unmonitored shrinkage across outlets.",
    visualMeter: {
      icon: ArrowRightLeft,
      legacyText: "Downtown 0% Stock ❌ • Uptown 180% Surplus ⚠️",
      quantixText: "Quantix Auto-Transfer: Stock rebalanced in 1-Click ✅",
    },
    fix: [
      "Multi-Store Auto-Dispatch & Stock Rebalancing Engine",
      "1-Tap Inter-Branch Warehouse Transfer & GRN Audit",
    ],
  },
  {
    id: "menu-pricing",
    shortTabLabel: "Pricing",
    icon: AlertTriangle,
    tag: "Fragmented Operations",
    severity: "HIGH RISK",
    title: "Manual Menu & Price Updating",
    description:
      "Headquarters manually keys in price changes, combos, and promo rules location-by-location across disconnected registers.",
    impact: "Human input errors, pricing inconsistencies & eroded brand profit margins.",
    visualMeter: {
      icon: RefreshCw,
      legacyText: "500 Tills updated manually store-by-store (3+ days) ❌",
      quantixText: "Global Master Rollout: 500 Tills synced in < 2.4s ⚡",
    },
    fix: [
      "Centralized 1-Click Menu & Price Push Across All Outlets",
      "Real-Time Modifier, Combo & Promo Sync to Every Till",
    ],
  },
  {
    id: "reporting",
    shortTabLabel: "Reporting",
    icon: Layers,
    tag: "Zero Real-Time Visibility",
    severity: "BLINDSPOT",
    title: "Delayed, Incomplete Reporting",
    description:
      "Leadership waits days or weeks for end-of-month spreadsheets from individual stores rather than seeing live sales telemetry.",
    impact: "Slow decisions & zero real-time visibility on multi-unit labor and margins.",
    visualMeter: {
      icon: LineChart,
      legacyText: "Spreadsheets consolidated 3 weeks after month-end ❌",
      quantixText: "Live Sub-Second Sales & Margin Telemetry BI ✅",
    },
    fix: [
      "Live Hourly Sales & Financial Telemetry BI Dashboard",
      "Automated Multi-Location P&L, Labor & Waste Analytics",
    ],
  },
];
