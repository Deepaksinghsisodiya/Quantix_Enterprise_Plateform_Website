'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  LineChart,
  ShieldCheck,
  Building2,
  Layers,
  Download,
  CheckCircle2,
  Clock,
  BookOpen,
  Server,
  Zap,
  Terminal,
  Database,
  Lock,
  FileText,
  Copy,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Cpu,
  Workflow,
  Flame,
  Code2,
  Sliders,
  Play,
  CheckCircle,
  Activity,
  HardDrive,
  Wifi,
  WifiOff,
  Radio,
  Share2,
} from 'lucide-react';
import { toast } from 'sonner';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

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
    id: 'offline-mesh',
    number: '01',
    shortTitle: 'Offline Till Mesh',
    badge: 'HYBRID CLOUD & OFFLINE TILL',
    title: 'Zero-Latency Offline Cashier Tills & Local Mesh Architecture',
    summary:
      'Decouple register checkout operations from internet dependencies. Registers operate on sub-second local IndexedDB caches during broadband blackouts with automated background cloud syncing.',
    deepDive:
      'In high-volume hospitality and retail enterprises, network failure cannot halt revenue. When WAN connectivity drops, cashier terminals automatically fall back to local storage within 5 milliseconds. Receipts print, cash drawers open, barcode scanners verify SKUs, and encrypted card charges queue safely until reconnection.',
    proTip:
      'Architecture Rule: Use IndexedDB with background Web Workers for transactional queuing. Never block checkout billing on remote synchronous HTTP promises.',
    simScenarioName: 'Simulate WAN / Broadband Blackout',
    simScenarioDesc: 'Cut live cloud connection to test local IndexedDB failover & receipt printing.',
    simInitialStatus: '● 100% ONLINE · Bi-directional gRPC stream active',
    simTriggeredStatus: '⚡ OFFLINE MODE ACTIVE · IndexedDB local cache engaged (0ms lag)',
    telemetryMetrics: {
      latency: '< 4ms',
      syncSpeed: 'Instant',
      offlineBuffer: '50k Txns',
      uptime: '99.999%',
    },
    nodes: {
      node1: { name: 'Register Till (POS-01)', type: 'Local Edge Client', status: 'IndexedDB Ready', detail: 'Local Cache Active' },
      node2: { name: 'Local Mesh Worker', type: 'WebSocket Broker', status: 'Failover Ready', detail: 'Zero WAN Reliance' },
      node3: { name: 'Cloud Central HQ', type: 'PostgreSQL / Redis', status: 'Auto-Sync Queue', detail: 'Idempotent Replay' },
    },
    codeSnippet: `// Local IndexedDB Offline Queue Worker
const offlineQueue = await db.transactions.add({
  terminalId: "NYC-TILL-01",
  orderRef: "ORD-98234",
  timestamp: Date.now(),
  grossTotal: 142.50,
  p2peToken: "tok_visa_88219",
  syncState: "QUEUED_LOCAL_STORAGE"
});`,
    checklist: [
      'Enable IndexedDB local browser/native storage on all registers for sub-second offline checkouts.',
      'Configure automatic background WebSocket reconciliation workers upon WAN re-connection.',
      'Deploy dual-band LAN printer routers with Ethernet & Bluetooth fallback.',
      'Establish master-satellite register pairing for local kitchen display routing during outages.',
    ],
  },
  {
    id: 'matrix-catalog',
    number: '02',
    shortTitle: 'Matrix Catalog & Pricing',
    badge: 'GLOBAL SKU & REGIONAL RULES',
    title: 'Central Matrix Catalog & Granular Branch Price Overrides',
    summary:
      'Manage thousands of global SKUs, modifier trees, and promotional bundles from HQ while empowering regional managers to adjust localized pricing and taxes.',
    deepDive:
      'Multi-unit franchise operations demand parent-child SKU inheritance. HQ maintains global barcode definitions, ingredient recipes, and baseline margins while branch managers retain role-gated authority to set localized pricing, promotional happy hours, or regional sales tax rules.',
    proTip:
      'Keep master product barcodes immutable from HQ while permitting localized price overrides authenticated via supervisor biometric/PIN overrides.',
    simScenarioName: 'Simulate Global 50-Store Price Push',
    simScenarioDesc: 'Broadcast instant SKU price promotion from HQ to 50 store branches simultaneously.',
    simInitialStatus: '● MASTER CATALOG SYNCED · 50 Locations Online',
    simTriggeredStatus: '⚡ PRICE PUSH BROADCASTED · 50/50 Terminals Updated in 180ms',
    telemetryMetrics: {
      latency: '180ms',
      syncSpeed: 'Global Broadcast',
      offlineBuffer: 'Unlimited SKUs',
      uptime: '100%',
    },
    nodes: {
      node1: { name: 'HQ Master Catalog', type: 'Central SKU Engine', status: 'Master Sync', detail: 'Global Metadata' },
      node2: { name: 'Override Rules Filter', type: 'Branch Policy Engine', status: 'Rule Evaluation', detail: 'Tax & Price Engine' },
      node3: { name: '50+ Store Terminals', type: 'Distributed POS Nodes', status: 'Menu Synchronized', detail: 'Sub-second Update' },
    },
    codeSnippet: `// Regional Price Override Rule Payload
{
  "sku": "SKU-BEV-9921",
  "title": "Signature Cold Brew 16oz",
  "basePrice": 4.50,
  "clusterOverrides": [
    { "regionId": "EAST-COAST-NYC", "price": 5.25, "tax": 0.08875 },
    { "regionId": "MIDWEST-CHI", "price": 4.75, "tax": 0.0825 }
  ]
}`,
    checklist: [
      'Implement parent-child SKU hierarchies with automated tax and margin inheritance.',
      'Schedule dynamic price campaigns with automated release and expiration timestamps.',
      'Configure localized modifier groupings for restaurant recipes & retail variant matrices.',
      'Enforce role-based override permissions with immutable supervisor audit logging.',
    ],
  },
  {
    id: 'inventory-sync',
    number: '03',
    shortTitle: 'Live Stock & Transfers',
    badge: 'SUPPLY CHAIN & TRANSFERS',
    title: 'Real-Time Inventory Telemetry & Inter-Branch Transfers',
    summary:
      'Eliminate stockout blind spots and inventory shrinkage with live recipe ingredient deductions, dynamic reorders, and barcode-verified inter-branch transfer work orders.',
    deepDive:
      'High-throughput commerce requires real-time stock ledger synchronization. Every register sale instantly decrements raw ingredient fractions or variant inventory. Inter-branch stock transfers enforce two-step barcode verification on dispatch and receiving to eliminate in-transit stock leakage.',
    proTip:
      'Two-Step Transfer Verification: Always require barcode verification on both transfer dispatch and receiving to eliminate in-transit stock discrepancies between warehouses.',
    simScenarioName: 'Simulate Inter-Branch Stock Transfer',
    simScenarioDesc: 'Dispatch 200 units from Central Hub to Regional Store with barcode verification.',
    simInitialStatus: '● WAREHOUSE STOCK HEALTHY · 10,400 Units Tracked',
    simTriggeredStatus: '⚡ TRANSFER DISPATCHED · Barcode verified & In-transit ledger locked',
    telemetryMetrics: {
      latency: '22ms',
      syncSpeed: 'Real-Time',
      offlineBuffer: 'Local Stock DB',
      uptime: '99.99%',
    },
    nodes: {
      node1: { name: 'Distribution Warehouse', type: 'Central Stock Ledger', status: 'Stock Allocated', detail: 'Stock Picked' },
      node2: { name: 'Transfer Dispatch Broker', type: 'Barcode Scan Validator', status: 'Work Order Active', detail: '2-Step Verification' },
      node3: { name: 'Receiving Store Outlet', type: 'Destination Ledger', status: 'Inventory Received', detail: 'Instant Stock Update' },
    },
    codeSnippet: `// Inter-Branch Stock Transfer Work Order
{
  "transferId": "TRF-2026-0912",
  "sourceWarehouse": "WH-CENTRAL-01",
  "destinationOutlet": "STORE-MIA-04",
  "sku": "RAW-COFFEE-ARABICA-10KG",
  "quantity": 25,
  "dispatchScanVerified": true,
  "status": "DISPATCH_CONFIRMED"
}`,
    checklist: [
      'Automate dynamic safety stock reorder thresholds driven by store sales velocity.',
      'Generate inter-branch transfer work orders with barcode audit verification on both ends.',
      'Deduct raw ingredient inventory fractions in real-time on every recipe checkout.',
      'Enable mobile handheld RF barcode scanning for perpetual cycle counts without downtime.',
    ],
  },
  {
    id: 'erp-pipelines',
    number: '04',
    shortTitle: 'ERP & Webhooks',
    badge: 'ERP & DATA LAKES',
    title: 'High-Throughput Webhooks to SAP, NetSuite & QuickBooks',
    summary:
      'Stream real-time checkout telemetry, end-of-day Z-reports, and tax ledgers directly into SAP, Oracle NetSuite, and QuickBooks via decoupled event queues.',
    deepDive:
      'Legacy POS systems rely on fragile overnight batch scripts. Quantix streams event-driven transactional payloads to cloud event queues (Kafka / Webhooks), feeding financial ledgers and executive BI analytics in real-time with zero system strain.',
    proTip:
      'Publish register sales to an asynchronous webhook queue to ensure accounting pipelines remain decoupled from till transaction uptime.',
    simScenarioName: 'Simulate 1,000 Transaction Webhook Surge',
    simScenarioDesc: 'Stream 1,000 live register sales events directly into ERP accounting ledger.',
    simInitialStatus: '● ERP DATA PIPELINE READY · 0 Queue Backlog',
    simTriggeredStatus: '⚡ 1,000 EVENTS INGESTED · 0 Dropped Payloads · 10k req/s throughput',
    telemetryMetrics: {
      latency: '12ms',
      syncSpeed: '10,000 req/s',
      offlineBuffer: 'Kafka Queue',
      uptime: '99.999%',
    },
    nodes: {
      node1: { name: 'Register Till Stream', type: 'Event Producer', status: 'Sales Emitted', detail: 'Real-time JSON' },
      node2: { name: 'Quantix Event Bridge', type: 'Idempotent Webhook Queue', status: 'Queue Processing', detail: 'Zero Loss Gateway' },
      node3: { name: 'SAP / NetSuite / BI', type: 'Enterprise ERP Ledger', status: 'Ledger Reconciled', detail: 'Continuous Sync' },
    },
    codeSnippet: `// POS Sales Telemetry Webhook Stream
POST /v1/webhooks/pos-telemetry-stream HTTP/1.1
Host: api.quantixpos.com
X-Signature-SHA256: 9e3a1f4b...
{
  "event": "order.settled",
  "branchId": "STORE-DAL-09",
  "grossTotal": 412.80,
  "taxAmount": 34.05,
  "paymentMethod": "EMV_CONTACTLESS",
  "erpStatus": "SYNCHRONIZED"
}`,
    checklist: [
      'Stream real-time checkout payloads to cloud data warehouses for executive BI dashboards.',
      'Automate daily shift closing, drawer float variance tracking, and bank deposit reconciliation.',
      'Enforce granular Role-Based Access Control (RBAC) with supervisor PIN authorization.',
      'Configure automated alerting triggers for register cash drawer anomalies.',
    ],
  },
  {
    id: 'security-pci',
    number: '05',
    shortTitle: 'PCI & Security',
    badge: 'SECURITY & COMPLIANCE',
    title: 'PCI-DSS Tier 1 Payment Tokenization & P2PE Security',
    summary:
      'Ensure end-to-end Point-to-Point Encryption (P2PE), EMV hardware tokenization, TLS 1.3 tunnels, and tamper-evident audit logging across all registers.',
    deepDive:
      'Maintaining PCI compliance across multi-unit franchise networks is simplified by isolating POS registers from cardholder data environments (CDE). EMV terminals encrypt and tokenize customer card data before it reaches register memory.',
    proTip:
      'Terminal machines should never touch or store raw PAN card data — all processing must be tokenized directly inside the EMV chip reader layer.',
    simScenarioName: 'Simulate EMV Chip Card Tokenization',
    simScenarioDesc: 'Process encrypted tap/chip payment with zero raw PAN exposure to register till.',
    simInitialStatus: '● P2PE VAULT ARMED · TLS 1.3 Tunnel Established',
    simTriggeredStatus: '⚡ TOKEN GENERATED · Card data isolated in hardware reader (Out of PCI Scope)',
    telemetryMetrics: {
      latency: '240ms',
      syncSpeed: 'P2PE Enforced',
      offlineBuffer: 'Encrypted Vault',
      uptime: '100%',
    },
    nodes: {
      node1: { name: 'EMV Chip Reader', type: 'Hardware Tokenizer', status: 'P2PE Encrypted', detail: 'Zero PAN Memory' },
      node2: { name: 'Encrypted Tunnel', type: 'TLS 1.3 Bridge', status: 'Secure Gateway', detail: 'Direct Token Transit' },
      node3: { name: 'Payment Processor Vault', type: 'Stripe / Auth.Net', status: 'Settlement Vault', detail: 'Token Stored' },
    },
    codeSnippet: `// Tokenized Payment Request (Zero PAN Scope)
{
  "terminalId": "READER-EMV-09",
  "p2peToken": "tok_p2pe_98a72fb301cc",
  "cardBrand": "VISA",
  "last4": "4242",
  "authCode": "AUTH_9021",
  "pciScope": "OUT_OF_SCOPE"
}`,
    checklist: [
      'Deploy Point-to-Point Encryption (P2PE) certified card readers to isolate POS registers.',
      'Maintain tamper-evident audit logging for all manager discounts and drawer opens.',
      'Enforce multi-factor authentication (MFA) and auto-timeouts on admin portals.',
      'Schedule automated daily cloud database backups with 256-bit encryption.',
    ],
  },
];

const FAQS = [
  {
    q: 'How does Quantix POS handle register transactions when internet is lost?',
    a: 'Every register till uses an offline-first architecture powered by local browser IndexedDB storage. Cashiers can continue scanning barcodes, processing cash sales, printing receipts, and queueing card charges offline. Once connection is restored, background sync workers batch and verify all transactions with HQ automatically.',
  },
  {
    q: 'Can we push price updates to select store branches without affecting the entire franchise network?',
    a: 'Yes. The Quantix HQ Master Catalog supports cluster-based and outlet-level price overrides. You can apply custom pricing, localized sales taxes, or promotional markdowns to specific branches while keeping global SKU definitions synchronized across the brand.',
  },
  {
    q: 'What ERP systems can be connected with Quantix POS telemetry?',
    a: 'Quantix provides high-throughput REST webhooks and gRPC event streaming connectors for SAP ERP, Oracle NetSuite, QuickBooks Online, Microsoft Dynamics 365, and custom Snowflake/BigQuery data warehouses.',
  },
  {
    q: 'Are Quantix POS registers compliant with PCI-DSS Tier 1 standards?',
    a: 'Yes. Quantix uses certified Point-to-Point Encryption (P2PE) and tokenization. Cardholder data is tokenized directly inside the hardware EMV chip terminal before ever touching the POS register memory, drastically reducing your audit compliance scope.',
  },
];

export default function POSGuidePage() {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simTriggered, setSimTriggered] = useState<boolean>(false);

  const chapter = CHAPTERS[activeChapterIndex];

  const handleSimulate = () => {
    setSimRunning(true);
    toast.info(`Executing simulation: ${chapter.simScenarioName}...`);
    setTimeout(() => {
      setSimRunning(false);
      setSimTriggered(true);
      toast.success(`Simulation completed successfully!`);
    }, 900);
  };

  const handleChapterChange = (index: number) => {
    setActiveChapterIndex(index);
    setSimTriggered(false);
    setSimRunning(false);
  };

  const toggleChecklist = (id: string) => {
    setCompletedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalChecklistItems = CHAPTERS.reduce((acc, m) => acc + m.checklist.length, 0);
  const completionPercentage = Math.round((completedItems.size / totalChecklistItems) * 100);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Architecture Playbook URL copied to clipboard!');
    }
  };

  const handleExportPDF = () => {
    toast.success('Downloading POS Architecture Master Playbook (PDF)', {
      description: 'Saved as quantix_pos_architecture_playbook_2026.pdf (4.8 MB).',
    });
  };

  return (
    <div className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-darkBg transition-colors duration-300">
      {/* 1. Glassmorphic Action Bar (Clear of fixed navbar with pt-32 sm:pt-36 pb-3.5) */}
      <div className="bg-slate-50/90 dark:bg-darkSurface/60 border-b border-slate-200/80 dark:border-slate-800/80 pt-32 sm:pt-36 pb-3.5 backdrop-blur-md sticky top-0 z-40">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
            <Link href="/resources" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft size={13} />
              <span>Resources</span>
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
              <Flame size={13} className="text-primary" />
              <span>Enterprise Architecture Simulator</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-darkBg border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:border-primary/40 hover:text-primary transition-all cursor-pointer shadow-2xs text-xs"
            >
              <Copy size={12} />
              <span>Share</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-syne font-bold transition-all cursor-pointer shadow-md hover:shadow-primary/20 text-xs"
            >
              <Download size={12} />
              <span>Export PDF (4.8 MB)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Simulator Stage & Chapter Navigator */}
      <section className="py-8 sm:py-12 bg-linear-to-b from-slate-50/50 via-white to-slate-50/50 dark:from-darkBg dark:via-darkSurface/20 dark:to-darkBg border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 space-y-6">

          {/* Header & Simulator Readiness Pill */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary">
                <Activity size={12} className="animate-pulse text-primary" />
                <span>Quantix Multi-Store POS Architecture Console</span>
              </div>
              <h1 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white leading-tight">
                Interactive POS Architecture Playbook
              </h1>
            </div>

            {/* Live Readiness Meter */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-darkSurface/80 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-4">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Readiness Score</p>
                <p className="text-lg font-mono font-black text-primary">{completionPercentage}%</p>
              </div>
              <div className="w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-primary to-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Chapter Rail */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
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
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-syne font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 ${isActive
                      ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                      : 'bg-white dark:bg-darkSurface/60 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                    }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${isActive
                        ? 'bg-white text-primary'
                        : isDone
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                  >
                    {isDone ? '✓' : ch.number}
                  </span>
                  <span>{ch.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Main 2-Column Interactive Simulator Display */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkSurface/70 border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-8 relative overflow-hidden">
            {/* Top glowing laser line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary-light to-amber-500" />

            {/* Chapter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="space-y-1.5">
                <span className="text-[10px] font-syne font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                  {chapter.badge}
                </span>
                <h2 className="font-syne text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 dark:text-white leading-tight">
                  {chapter.title}
                </h2>
              </div>

              {/* 4-KPI Grid for this chapter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-darkBg border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Latency</p>
                  <p className="text-xs font-mono font-black text-primary">{chapter.telemetryMetrics.latency}</p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-darkBg border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Buffer</p>
                  <p className="text-xs font-mono font-black text-slate-900 dark:text-white">{chapter.telemetryMetrics.offlineBuffer}</p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-darkBg border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Uptime</p>
                  <p className="text-xs font-mono font-black text-emerald-500">{chapter.telemetryMetrics.uptime}</p>
                </div>
              </div>
            </div>

            {/* Two-Column Split (Left: Blueprint Specs / Right: Interactive Simulator Terminal) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column (6.5 Cols): Deep Dive, Pro Tip & Interactive Checklist */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
                    {chapter.summary}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    {chapter.deepDive}
                  </p>
                </div>

                {/* Pro-Tip Box */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed flex items-start gap-2.5">
                  <span className="text-base leading-none">💡</span>
                  <div>
                    <strong className="font-syne font-bold mr-1">Architecture Pro-Tip:</strong>
                    <span>{chapter.proTip}</span>
                  </div>
                </div>

                {/* Interactive Action Checklist */}
                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-syne font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Production Rollout Checklist:
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
                          className={`w-full text-left p-3 rounded-xl border text-xs font-medium flex items-start gap-2.5 transition-all cursor-pointer ${isChecked
                              ? 'bg-primary/10 border-primary/30 text-primary-dark dark:text-primary-light shadow-2xs'
                              : 'bg-slate-50 dark:bg-darkBg/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/30'
                            }`}
                        >
                          <span
                            className={`h-4.5 w-4.5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isChecked
                                ? 'bg-primary border-primary text-white'
                                : 'border-slate-400 bg-white dark:bg-darkBg'
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

              {/* Right Column (5.5 Cols): Visual Interactive Architecture Topology & Live Simulator */}
              <div className="lg:col-span-5 space-y-4">

                {/* Live Topology Sandbox */}
                <div className="p-5 rounded-3xl bg-slate-50 dark:bg-darkBg border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                      <Cpu size={14} className="text-primary" />
                      <span>Topology Visualizer</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      Live Telemetry
                    </span>
                  </div>

                  {/* 3 Interactive Node Blocks */}
                  <div className="space-y-2.5">
                    {/* Node 1 */}
                    <div className={`p-3 rounded-2xl border transition-all ${simTriggered
                        ? 'bg-primary/10 border-primary/40 shadow-xs'
                        : 'bg-white dark:bg-darkSurface/80 border-slate-200/80 dark:border-slate-800'
                      }`}>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>{chapter.nodes.node1.name}</span>
                        <span className="text-[10px] font-mono text-primary">{chapter.nodes.node1.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {chapter.nodes.node1.type} · {chapter.nodes.node1.detail}
                      </p>
                    </div>

                    {/* Animated Connection Pulse */}
                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                      <span>gRPC Sync Pipeline</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                    </div>

                    {/* Node 2 */}
                    <div className="p-3 rounded-2xl bg-white dark:bg-darkSurface/80 border border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>{chapter.nodes.node2.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{chapter.nodes.node2.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {chapter.nodes.node2.type} · {chapter.nodes.node2.detail}
                      </p>
                    </div>

                    {/* Animated Connection Pulse */}
                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                      <span>Event Bus Stream</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                    </div>

                    {/* Node 3 */}
                    <div className="p-3 rounded-2xl bg-white dark:bg-darkSurface/80 border border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>{chapter.nodes.node3.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{chapter.nodes.node3.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {chapter.nodes.node3.type} · {chapter.nodes.node3.detail}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Scenario Trigger Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={simRunning}
                      onClick={handleSimulate}
                      className="w-full py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                    >
                      {simRunning ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <Play size={14} className="fill-white" />
                      )}
                      <span>{simRunning ? 'Running Simulation...' : chapter.simScenarioName}</span>
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

                {/* Code Snippet Box */}
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300">
                      <Code2 size={13} className="text-primary" />
                      <span>Telemetry Payload</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">JSON API</span>
                  </div>
                  <pre className="text-[10.5px] font-mono bg-slate-950 p-3 rounded-xl overflow-x-auto text-emerald-400 border border-slate-800/80">
                    {chapter.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>

            {/* Bottom Chapter Switcher Controls */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={activeChapterIndex === 0}
                onClick={() => handleChapterChange(Math.max(0, activeChapterIndex - 1))}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-syne font-bold transition-all border ${activeChapterIndex === 0
                    ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                    : 'bg-white dark:bg-darkBg border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-primary/40 cursor-pointer shadow-2xs'
                  }`}
              >
                <ChevronLeft size={14} />
                <span>Previous Chapter</span>
              </button>

              <div className="text-xs text-slate-400 font-bold">
                Chapter <span className="text-slate-900 dark:text-white font-mono font-bold">{activeChapterIndex + 1}</span> of {CHAPTERS.length}
              </div>

              <button
                type="button"
                disabled={activeChapterIndex === CHAPTERS.length - 1}
                onClick={() => handleChapterChange(Math.min(CHAPTERS.length - 1, activeChapterIndex + 1))}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-syne font-bold transition-all border ${activeChapterIndex === CHAPTERS.length - 1
                    ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                    : 'bg-primary border-primary text-white hover:bg-primary-dark cursor-pointer shadow-md'
                  }`}
              >
                <span>Next Chapter</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Integrated FAQ Section */}
      <section className="py-10 sm:py-14 bg-white dark:bg-darkBg border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-syne font-black uppercase tracking-wider text-primary">
              ARCHITECTURE FAQ
            </span>
            <h2 className="font-syne text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
              Frequently Asked Technical Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-darkSurface/40 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-4 text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span className="font-syne">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={15} className="text-primary shrink-0" /> : <ChevronDown size={15} className="text-slate-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="p-4 border-t border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium bg-white dark:bg-darkBg/90">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom CTABanner */}
      <CTABanner />
    </div>
  );
}
