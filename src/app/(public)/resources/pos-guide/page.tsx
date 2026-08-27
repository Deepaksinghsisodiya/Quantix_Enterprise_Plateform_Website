"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  Download,
  Flame,
  HardDrive,
  Play,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import FAQSection from "@/features/FAQ/FAQSection";
import type { FAQItem } from "@/features/FAQ/Types/FAQTypes";

interface BlueprintChapter {
  id: string;
  number: string;
  shortTitle: string;
  badge: string;
  title: string;
  summary: string;
  deepDive: string;
  proTip: string;
  simScenarioName: string;
  simScenarioDesc: string;
  simInitialStatus: string;
  simTriggeredStatus: string;
  telemetryMetrics: {
    latency: string;
    syncSpeed: string;
    offlineBuffer: string;
    uptime: string;
  };
  nodes: {
    node1: { name: string; type: string; status: string; detail: string };
    node2: { name: string; type: string; status: string; detail: string };
    node3: { name: string; type: string; status: string; detail: string };
  };
  codeSnippet: string;
  checklist: string[];
}

const CHAPTERS: BlueprintChapter[] = [
  {
    id: "offline-mesh",
    number: "01",
    shortTitle: "Offline Till Mesh",
    badge: "HYBRID CLOUD & OFFLINE TILL",
    title: "Zero-Latency Offline Cashier Tills & Local Mesh Architecture",
    summary:
      "Decouple register checkout operations from internet dependencies. Registers operate on sub-4ms local IndexedDB caches during broadband blackouts with automated background cloud syncing.",
    deepDive:
      "In high-volume hospitality and retail enterprises, network failure cannot halt revenue. When WAN connectivity drops, cashier terminals automatically fall back to local storage within 5 milliseconds. Receipts print, cash drawers open, barcode scanners verify SKUs, and encrypted card charges queue safely until reconnection.",
    proTip:
      "Architecture Rule: Use IndexedDB with background Web Workers for transactional queuing. Never block checkout billing on remote synchronous HTTP promises.",
    simScenarioName: "Simulate WAN / Broadband Blackout",
    simScenarioDesc: "Cut live cloud connection to test local IndexedDB failover & receipt printing.",
    simInitialStatus: "● 100% ONLINE · Bi-directional gRPC stream active",
    simTriggeredStatus: "⚡ OFFLINE MODE ACTIVE · IndexedDB local cache engaged (0ms lag)",
    telemetryMetrics: {
      latency: "< 4ms",
      syncSpeed: "Instant",
      offlineBuffer: "50k Txns",
      uptime: "99.999%",
    },
    nodes: {
      node1: { name: "Register Till (POS-01)", type: "Local Edge Client", status: "IndexedDB Ready", detail: "Local Cache Active" },
      node2: { name: "Local Mesh Worker", type: "WebSocket Broker", status: "Failover Ready", detail: "Zero WAN Reliance" },
      node3: { name: "Thermal Receipt Printer", type: "ESC/POS Network Node", status: "Raw Socket Ready", detail: "Direct TCP Output" },
    },
    codeSnippet: `// Offline Transaction Storage Pattern
async function processCheckoutOffline(cart, tender) {
  const record = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    cart,
    tender,
    synced: false
  };
  await db.transactions.add(record);
  await thermalPrinter.printReceipt(record);
  syncWorker.postMessage({ type: 'QUEUE_TRANSACTION' });
}`,
    checklist: [
      "Configure local IndexedDB storage quota for minimum 50,000 offline transaction records.",
      "Set up raw TCP sockets for thermal printers to bypass remote print spoolers.",
      "Implement exponential backoff retry algorithms for transactional cloud reconciliation.",
      "Deploy secondary battery backup (UPS) on core gateway routers and switch ports.",
    ],
  },
  {
    id: "central-broadcast",
    number: "02",
    shortTitle: "Central Menu Broadcast",
    badge: "CATALOG & FRANCHISE HQ",
    title: "1-Click Central Menu Rollouts & Regional Price Tiering",
    summary:
      "Publish menu updates, recipe modifications, and promotional campaigns across 50+ locations in under 15 seconds with automated franchisee royalty tracking.",
    deepDive:
      "Franchise brand consistency requires instantaneous global catalog updates without individual store intervention. Quantix allows HQ managers to deploy global price adjustments while maintaining store-specific overrides (airport concession markups, tax jurisdictions, and localized suppliers).",
    proTip:
      "Publishing Protocol: Always use atomic version increments for catalog pushes. Terminals hot-reload UI state without requiring cashier restart during trading hours.",
    simScenarioName: "Deploy Summer Menu to 50 Outlets",
    simScenarioDesc: "Push 120 revised menu items and regional pricing to 50 active store branches.",
    simInitialStatus: "● CATALOG V2.41 ACTIVE · 50 Locations Connected",
    simTriggeredStatus: "⚡ CATALOG V2.50 DEPLOYED · 50/50 Stores Updated in 8.2s · Zero Restarts",
    telemetryMetrics: {
      latency: "8.2s",
      syncSpeed: "50 Stores",
      offlineBuffer: "100%",
      uptime: "99.999%",
    },
    nodes: {
      node1: { name: "HQ Catalog Control Hub", type: "Central Schema Node", status: "V2.50 Minted", detail: "120 SKUs Modified" },
      node2: { name: "Regional Price Engine", type: "Tier Evaluator", status: "Pricing Applied", detail: "Tier 1 Metro / Tier 2 Air" },
      node3: { name: "Store Register Terminals", type: "Edge Consumer Fleet", status: "Live Synced", detail: "Hot Reload Complete" },
    },
    codeSnippet: `// Central Catalog Broadcast Payload
POST /api/v1/enterprise/catalog/broadcast
{
  "catalogVersion": "2.5.0",
  "scope": "ALL_NORTH_AMERICA_STORES",
  "regionalPriceTiers": {
    "TIER_METRO": { "markupPercent": 0.0 },
    "TIER_AIRPORT": { "markupPercent": 15.0 }
  },
  "effectiveTimestamp": "2026-06-01T00:00:00Z"
}`,
    checklist: [
      "Define regional pricing tiers (Airport, Flagship, Suburb, Franchisee).",
      "Configure automated royalty rate calculation on gross vs net revenue.",
      "Implement manager permission gates for temporary local item 86'ing.",
      "Establish catalog version rollbacks with 1-click snapshot restoration.",
    ],
  },
  {
    id: "erp-data-lake",
    number: "03",
    shortTitle: "ERP & NetSuite Telemetry",
    badge: "DATA PIPELINE & LEDGER",
    title: "Real-Time Transaction Streaming into SAP, Oracle & NetSuite",
    summary:
      "Stream itemized transaction payloads, COGS deductions, and cashier shift settlements directly into enterprise ERP ledgers via high-throughput webhooks.",
    deepDive:
      "Enterprise financial closing cycles demand granular transactional reconciliation. Quantix replaces slow batch CSV exports with event-driven gRPC and REST webhook pipelines. Every closed order posts gross revenue, sales tax liability, payment gateway fees, and raw ingredient stock deductions in real time.",
    proTip:
      "Data Lake Pattern: Stream raw JSON transaction envelopes into Snowflake / BigQuery for predictive BI forecasting and automated vendor reorder modeling.",
    simScenarioName: "Stream 10,000 Shift Orders to SAP",
    simScenarioDesc: "Simulate batch shift close and stream itemized revenue & tax ledgers into SAP S/4HANA.",
    simInitialStatus: "● SAP REST PIPELINE ACTIVE · Ledger in Sync",
    simTriggeredStatus: "⚡ 10,000 TRANSACTIONS STREAMED · $482,910.00 Settled · Zero Discrepancy",
    telemetryMetrics: {
      latency: "< 25ms",
      syncSpeed: "10k/sec",
      offlineBuffer: "Audit Safe",
      uptime: "99.999%",
    },
    nodes: {
      node1: { name: "POS Transaction Ingest", type: "Streaming Producer", status: "Event Emitted", detail: "JSON Envelope Packaged" },
      node2: { name: "Ledger Reconciliation Hub", type: "Tax & COGS Node", status: "Taxes Split", detail: "State/Local Tax Segregated" },
      node3: { name: "SAP S/4HANA Connector", type: "Enterprise ERP Sink", status: "Journal Posted", detail: "General Ledger Updated" },
    },
    codeSnippet: `// ERP Ledger Posting Webhook
POST https://erp.enterprise.com/v2/journals/pos-sync
{
  "storeId": "STORE_NY_042",
  "shiftId": "SHIFT_20260827_01",
  "grossSales": 482910.00,
  "salesTaxCollected": 42812.50,
  "cogsDeduction": 142800.00,
  "tenderBreakdown": {
    "visa_mastercard": 390200.00,
    "amex": 72500.00,
    "cash": 20210.00
  }
}`,
    checklist: [
      "Map POS SKU categories to ERP General Ledger (GL) account codes.",
      "Configure automated midnight shift balance reconciliation reports.",
      "Enable webhook signature verification (HMAC SHA-256) for all outbound events.",
      "Establish dead-letter queue (DLQ) alerts for failed API payload deliveries.",
    ],
  },
  {
    id: "stadium-rush",
    number: "04",
    shortTitle: "Stadium Burst Commerce",
    badge: "HIGH-BURST ARENA CONCESSIONS",
    title: "High-Concurrency Concession Checkouts & Mobile Hawker POS",
    summary:
      "Handle 100,000 transactions during 15-minute halftime rushes with sub-80ms contactless taps, zone-based menu routing, and portable hawker units.",
    deepDive:
      "Stadiums and concert arenas experience extreme peak-to-average transaction volume spikes. Quantix employs high-concurrency offline-first mobile terminals equipped with NFC tap-to-pay. Hawkers in seating bowls process credit cards with zero lag even in cellular dead zones.",
    proTip:
      "Halftime Optimization: Restrict concession register menus to 6 high-velocity combo SKUs during peak rush intervals to slash queue wait times by 40%.",
    simScenarioName: "Simulate Halftime Concession Spike",
    simScenarioDesc: "Process 2,500 simultaneous contactless NFC beverage orders across 80 stadium tills.",
    simInitialStatus: "● 80 CONCESSION TILLS IDLE · Ready for Halftime",
    simTriggeredStatus: "⚡ 2,500 ORDERS BILLED IN 90 SECONDS · Average Speed: 1.8s/Customer",
    telemetryMetrics: {
      latency: "< 80ms",
      syncSpeed: "1.8s Tap",
      offlineBuffer: "100%",
      uptime: "100%",
    },
    nodes: {
      node1: { name: "Handheld Hawker Terminal", type: "Mobile NFC POS", status: "Tap Authorizing", detail: "Sub-80ms EMV Token" },
      node2: { name: "Arena Edge Gateway", type: "Local Zone Broker", status: "Queue Clearing", detail: "80 Tills Concurrent" },
      node3: { name: "Concession Dispenser Screen", type: "Prep Station KDS", status: "Poured / Fulfilled", detail: "Instant Pour Signal" },
    },
    codeSnippet: `// Stadium Quick-Tender Processing
const quickSale = await arenaPOS.processExpressOrder({
  terminalId: "STADIUM_SEC_114_TILL_02",
  comboId: "HALFTIME_COMBO_BEER_PRETZEL",
  tenderType: "CONTACTLESS_EMV",
  offlineAuthorized: true,
  autoDispenseSignal: true
});`,
    checklist: [
      "Deploy dedicated Wi-Fi 6 / private LTE mesh for seating bowl hawker terminals.",
      "Pre-authorize offline credit card processing limits up to $100 per transaction.",
      "Configure fast-tap mode bypassing receipt prompts during stadium peak hours.",
      "Implement real-time keg and inventory tank telemetry with low-stock alerts.",
    ],
  },
  {
    id: "security-sso",
    number: "05",
    shortTitle: "PCI-DSS & SAML Security",
    badge: "SOC 2 & SAML 2.0 SSO",
    title: "Okta/Azure AD SAML SSO, P2PE Tokenization & Biometric Role Gates",
    summary:
      "Enterprise identity governance with automated employee provisioning, Point-to-Point Encryption (P2PE), and biometric manager price override logs.",
    deepDive:
      "Enterprise compliance requires strict isolation of payment data and rigorous role-based access control. Quantix integrates with Okta, Azure AD, and PingIdentity for automated staff provisioning. Card details never touch POS memory, eliminating PCI-DSS audit scope.",
    proTip:
      "Zero Trust Architecture: Enforce multi-factor authentication (MFA) for HQ administrative consoles and biometric/PIN validation for all register cash drawer overrides.",
    simScenarioName: "Simulate SAML 2.0 SSO Authentication",
    simScenarioDesc: "Authenticate 500 store managers via Okta SAML 2.0 and verify P2PE encryption keys.",
    simInitialStatus: "● OKTA SSO INTEGRATED · Zero Open PCI Scope",
    simTriggeredStatus: "⚡ 500 MANAGERS PROVISIONED · P2PE Hardware Validated · SOC 2 Compliant",
    telemetryMetrics: {
      latency: "< 50ms",
      syncSpeed: "Zero Scope",
      offlineBuffer: "100%",
      uptime: "99.999%",
    },
    nodes: {
      node1: { name: "Okta / Azure AD IdP", type: "Identity Provider", status: "SAML 2.0 Asserted", detail: "Role: Store General Manager" },
      node2: { name: "P2PE Terminal Encryptor", type: "Hardware SRED Node", status: "Keys Rotated", detail: "DUKPT Key Management" },
      node3: { name: "Audit & Security Vault", type: "SOC 2 Audit Stream", status: "Event Logged", detail: "Immutable Audit Trail" },
    },
    codeSnippet: `// SAML 2.0 Staff Authentication Middleware
export async function validateEnterpriseSession(req, res, next) {
  const token = req.headers['authorization'];
  const session = await oktaAuth.verifyJwt(token, {
    audience: 'api://quantix-enterprise-hq'
  });
  if (!session.claims.roles.includes('STORE_MANAGER')) {
    return res.status(403).json({ error: 'INSUFFICIENT_ENTERPRISE_PERMISSIONS' });
  }
  next();
}`,
    checklist: [
      "Configure SAML 2.0 SSO connector with Okta, Azure AD, or PingIdentity.",
      "Deploy PCI P2PE validated payment terminals to eliminate POS PCI scope.",
      "Set up role-based access control (RBAC) with granular void & refund limits.",
      "Enable automated audit log streaming to enterprise SIEM (Splunk, Datadog).",
    ],
  },
];

const GUIDE_FAQS: FAQItem[] = [
  {
    id: "offline-architecture",
    question: "How does the zero-latency offline till mesh prevent store downtime?",
    answer: "Quantix stores products, pricing, and active transaction records in a local IndexedDB cache on each register. Terminals process sales, print receipts, and queue encrypted charges locally, syncing automatically to cloud servers when network connectivity restores.",
  },
  {
    id: "multi-store-push",
    question: "How quickly can catalog and price updates be deployed across 50+ locations?",
    answer: "Using our atomic versioning broadcast protocol, catalog changes and regional price updates deploy to 50+ branches in under 15 seconds without requiring terminal restarts or cashier interruption.",
  },
  {
    id: "erp-connectors",
    question: "Which enterprise ERP and accounting platforms are supported?",
    answer: "Quantix provides native, bi-directional integration pipelines for SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics 365, and QuickBooks Online, automatically posting daily revenue, sales tax, and COGS journal entries.",
  },
  {
    id: "stadium-scale",
    question: "Can Quantix handle high-throughput stadium and arena peak rushes?",
    answer: "Yes. In high-concurrency stadium environments, Quantix processes thousands of transactions per minute with sub-80ms contactless EMV taps, express combo menus, and portable mobile hawker POS terminals.",
  },
];

export default function EnterprisePosGuidePage() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [simRunning, setSimRunning] = useState(false);
  const [simTriggered, setSimTriggered] = useState(false);

  const chapter = CHAPTERS[activeChapterIndex];

  const handleChapterChange = (index: number) => {
    setActiveChapterIndex(index);
    setSimTriggered(false);
    setSimRunning(false);
  };

  const toggleChecklist = (itemId: string) => {
    const next = new Set(completedItems);
    if (next.has(itemId)) {
      next.delete(itemId);
    } else {
      next.add(itemId);
    }
    setCompletedItems(next);
  };

  const handleSimulate = () => {
    setSimRunning(true);
    setTimeout(() => {
      setSimRunning(false);
      setSimTriggered(true);
      toast.success(chapter.simScenarioName, {
        description: chapter.simTriggeredStatus,
      });
    }, 800);
  };

  const totalChecklistItems = CHAPTERS.reduce((acc, m) => acc + m.checklist.length, 0);
  const completionPercentage = Math.round((completedItems.size / totalChecklistItems) * 100);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Enterprise Architecture Guide URL copied to clipboard!");
    }
  };

  const handleExportPDF = () => {
    toast.success("Downloading Enterprise POS Architecture Blueprint (PDF)", {
      description: "Saved as quantix_enterprise_pos_blueprint_2026.pdf (2.1 MB).",
    });
  };

  return (
    <div className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* 1. Clean Hero Header Section */}
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
        {/* Animated Breathing Ambient Light */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-linear-to-b from-primary/20 via-primary/10 to-transparent blur-3xl pointer-events-none -z-10"
        />

        <div className="site-container px-4 sm:px-6">
          {/* Breadcrumb row & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
              <Link href="/resources" className="hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft size={13} />
                <span>Resources Hub</span>
              </Link>
              <span>/</span>
              <span className="text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
                <Flame size={13} className="text-primary" />
                <span>Enterprise Architecture Blueprint</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:text-primary transition-all cursor-pointer shadow-2xs text-xs"
              >
                <Copy size={12} />
                <span>Share</span>
              </button>
              <button
                type="button"
                onClick={handleExportPDF}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all cursor-pointer shadow-xs text-xs"
              >
                <Download size={12} />
                <span>Export PDF (2.1 MB)</span>
              </button>
            </div>
          </div>

          {/* Title & Readiness Gauge */}
          <div className="pt-6 sm:pt-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] sm:text-xs font-black uppercase tracking-wider text-primary shadow-xs">
                <Sparkles size={13} className="text-primary animate-pulse" />
                <span>ENTERPRISE ARCHITECTURE PLAYBOOK</span>
              </div>
              <h1 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.18] tracking-tight">
                Multi-Store POS Rollout & Central Architecture Guide
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Step-by-step blueprints for zero-latency offline till mesh, central franchise menu rollouts, SAP/NetSuite ERP data pipelines, and stadium rush checkouts.
              </p>
            </div>

            {/* Readiness Meter Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-4 shrink-0">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rollout Readiness</p>
                <p className="text-xl font-mono font-black text-primary">{completionPercentage}%</p>
              </div>
              <div className="w-24 sm:w-28 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-primary to-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Chapter Stage Section */}
      <section className="section-py bg-white dark:bg-slate-950">
        <div className="site-container px-4 sm:px-6 space-y-6">
          {/* Chapter Quick-Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x touch-pan-x">
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeChapterIndex === idx;
              const completedCount = ch.checklist.filter((_, cIdx) =>
                completedItems.has(`${ch.id}-${cIdx}`)
              ).length;
              const isDone = completedCount === ch.checklist.length && ch.checklist.length > 0;

              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleChapterChange(idx)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 snap-center ${
                    isActive
                      ? "bg-primary border-primary text-white shadow-xs shadow-primary/25 scale-102 ring-2 ring-primary/20"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isActive
                        ? "bg-white text-primary"
                        : isDone
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {isDone ? "✓" : ch.number}
                  </span>
                  <span>{ch.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Main Interactive Display Box */}
          <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6 sm:space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary-light to-amber-500" />

            {/* Chapter Top Row: Title + Telemetry Metrics */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-md border border-primary/20">
                  {chapter.badge}
                </span>
                <h2 className="font-syne text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  {chapter.title}
                </h2>
              </div>

              {/* 3 Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-2 shrink-0">
                <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 text-center">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Latency</p>
                  <p className="text-xs font-mono font-black text-primary">{chapter.telemetryMetrics.latency}</p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 text-center">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Throughput</p>
                  <p className="text-xs font-mono font-black text-slate-900 dark:text-white">{chapter.telemetryMetrics.syncSpeed}</p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 text-center">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">SLA Uptime</p>
                  <p className="text-xs font-mono font-black text-emerald-500">{chapter.telemetryMetrics.uptime}</p>
                </div>
              </div>
            </div>

            {/* Two-Column Responsive Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Deep Dive & Action Checklist */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-2.5">
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
                    {chapter.summary}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    {chapter.deepDive}
                  </p>
                </div>

                {/* Pro-Tip Callout Box */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed flex items-start gap-2.5">
                  <span className="text-base leading-none">💡</span>
                  <div>
                    <strong className="font-bold mr-1">Enterprise Architecture Rule:</strong>
                    <span>{chapter.proTip}</span>
                  </div>
                </div>

                {/* Interactive Checklist */}
                <div className="space-y-2.5 pt-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Deployment Verification Checklist:
                  </p>
                  <div className="space-y-2">
                    {chapter.checklist.map((item, idx) => {
                      const itemId = `${chapter.id}-${idx}`;
                      const isChecked = completedItems.has(itemId);

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleChecklist(itemId)}
                          className={`w-full text-left p-3 rounded-xl border text-xs font-medium flex items-start gap-2.5 transition-all cursor-pointer ${
                            isChecked
                              ? "bg-primary/10 border-primary/30 text-primary-dark dark:text-primary-light shadow-2xs"
                              : "bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/30"
                          }`}
                        >
                          <span
                            className={`h-4.5 w-4.5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? "bg-primary border-primary text-white"
                                : "border-slate-400 bg-white dark:bg-slate-900"
                            }`}
                          >
                            {isChecked && <Check size={11} strokeWidth={3} />}
                          </span>
                          <span className="leading-snug">{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Topology Sandbox & Code Payload */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-3.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                      <Cpu size={14} className="text-primary" />
                      <span>Enterprise Edge Topology</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      Local Node Active
                    </span>
                  </div>

                  {/* 3 Topology Nodes */}
                  <div className="space-y-2">
                    <div
                      className={`p-3 rounded-xl border transition-all ${
                        simTriggered
                          ? "bg-primary/10 border-primary/40 shadow-xs"
                          : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>{chapter.nodes.node1.name}</span>
                        <span className="text-[10px] font-mono text-primary">{chapter.nodes.node1.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {chapter.nodes.node1.type} · {chapter.nodes.node1.detail}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                      <span>Bi-directional Data Pipeline</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>{chapter.nodes.node2.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{chapter.nodes.node2.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {chapter.nodes.node2.type} · {chapter.nodes.node2.detail}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                      <span>Immutable Audit Stream</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>{chapter.nodes.node3.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{chapter.nodes.node3.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {chapter.nodes.node3.type} · {chapter.nodes.node3.detail}
                      </p>
                    </div>
                  </div>

                  {/* Simulator Trigger */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={simRunning}
                      onClick={handleSimulate}
                      className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                    >
                      {simRunning ? (
                        <RefreshCw size={13} className="animate-spin" />
                      ) : (
                        <Play size={13} className="fill-white" />
                      )}
                      <span>{simRunning ? "Simulating Topology Stream..." : chapter.simScenarioName}</span>
                    </button>

                    <p className="text-[11px] text-center font-mono mt-2 text-slate-500 dark:text-slate-400">
                      {simTriggered ? (
                        <span className="text-emerald-500 font-bold">{chapter.simTriggeredStatus}</span>
                      ) : (
                        <span>{chapter.simInitialStatus}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Code Box */}
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300">
                      <Code2 size={13} className="text-primary" />
                      <span>Enterprise Protocol Payload</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">JSON API Schema</span>
                  </div>
                  <pre className="text-[10.5px] font-mono bg-slate-950 p-3 rounded-xl overflow-x-auto text-emerald-400 border border-slate-800/80">
                    {chapter.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>

            {/* Bottom Chapter Switcher Controls */}
            <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                disabled={activeChapterIndex === 0}
                onClick={() => handleChapterChange(Math.max(0, activeChapterIndex - 1))}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeChapterIndex === 0
                    ? "opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-primary/40 cursor-pointer shadow-2xs"
                }`}
              >
                <ChevronLeft size={14} />
                <span>Previous Blueprint</span>
              </button>

              <div className="text-xs text-slate-400 font-bold">
                Blueprint <span className="text-slate-900 dark:text-white font-mono font-bold">{activeChapterIndex + 1}</span> of {CHAPTERS.length}
              </div>

              <button
                type="button"
                disabled={activeChapterIndex === CHAPTERS.length - 1}
                onClick={() => handleChapterChange(Math.min(CHAPTERS.length - 1, activeChapterIndex + 1))}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeChapterIndex === CHAPTERS.length - 1
                    ? "opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400"
                    : "bg-primary border-primary text-white hover:bg-primary-dark cursor-pointer shadow-xs"
                }`}
              >
                <span>Next Blueprint</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Real Enterprise Architecture FAQ (Shared 2-Column Responsive Layout) */}
      <FAQSection faqs={GUIDE_FAQS} />

      {/* 4. Production CTA Banner */}
      <CTABanner />
    </div>
  );
}
