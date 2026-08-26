'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Download,
  Building2,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  ChevronRight,
  FileText,
  TrendingUp,
  ShieldCheck,
  Search,
  X,
  Zap,
  SlidersHorizontal,
  FileCode2,
  HardDrive,
  ShieldAlert,
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';
import { toast } from 'sonner';

interface Resource {
  id: string;
  title: string;
  category: 'franchise' | 'inventory' | 'erp' | 'security';
  categoryLabel: string;
  categoryColor: string;
  type: 'Guide' | 'Excel Model' | 'Checklist' | 'Whitepaper';
  description: string;
  readTime: string;
  fileSize: string;
  fileName: string;
  image: string;
  href?: string;
}

const RESOURCES_LIST: Resource[] = [
  {
    id: '1',
    title: 'Multi-Store POS Rollout & Central Telemetry Architecture',
    category: 'franchise',
    categoryLabel: 'Franchise & Multi-Store',
    categoryColor: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
    type: 'Guide',
    description:
      'Step-by-step architecture for deploying central menu distribution, branch price overrides, and store telemetry across 50+ locations.',
    readTime: '8 min read',
    fileSize: '2.1 MB',
    fileName: 'quantix_franchise_pos_architecture.pdf',
    image: '/images/ent_franchise_portal.png',
    href: '/resources/pos-guide',
  },
  {
    id: '2',
    title: 'Real-Time Matrix Stock Sync & Warehouse Replenishment Model',
    category: 'inventory',
    categoryLabel: 'Inventory & Supply Chain',
    categoryColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    type: 'Excel Model',
    description:
      'Automated spreadsheet formulas for multi-outlet safety stock, reorder thresholds, variance reconciliation, and shrinkage tracking.',
    readTime: 'Excel Tool',
    fileSize: '940 KB',
    fileName: 'quantix_inventory_safety_stock_model.xlsx',
    image: '/images/ent_supply_chain_bundle.png',
  },
  {
    id: '3',
    title: 'Connecting POS Telemetry to SAP & NetSuite ERP Data Lakes',
    category: 'erp',
    categoryLabel: 'ERP & Integrations',
    categoryColor: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
    type: 'Whitepaper',
    description:
      'Technical guide for streaming real-time transactional sales payloads and shift ledgers using high-throughput REST webhooks.',
    readTime: '10 min read',
    fileSize: '3.4 MB',
    fileName: 'quantix_pos_to_erp_integration_guide.pdf',
    image: '/images/ent_guide_blueprint.png',
    href: '/api-docs',
  },
  {
    id: '4',
    title: 'PCI-DSS Tier 1 Payment Tokenization & P2PE Security Brief',
    category: 'security',
    categoryLabel: 'Security & Compliance',
    categoryColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
    type: 'Whitepaper',
    description:
      'How Point-to-Point Encryption (P2PE) and EMV tokenization isolate branch registers from PCI scope and secure customer data.',
    readTime: '7 min read',
    fileSize: '2.7 MB',
    fileName: 'quantix_pci_tier1_security_brief.pdf',
    image: '/images/nav_payment_bundle.png',
    href: '/resources/pos-guide',
  },
  {
    id: '5',
    title: '8-Step Zero-Downtime POS Hardware Migration Framework',
    category: 'franchise',
    categoryLabel: 'Store Operations',
    categoryColor: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
    type: 'Checklist',
    description:
      'A proven checklist for replacing legacy till hardware, receipt printers, and cash drawers without interrupting store trading hours.',
    readTime: '5 min read',
    fileSize: '1.2 MB',
    fileName: 'quantix_hardware_migration_checklist.pdf',
    image: '/images/nav_restaurant_bundle.png',
    href: '/help',
  },
  {
    id: '6',
    title: 'Role-Based Access Control (RBAC) & Supervisor Governance Matrix',
    category: 'security',
    categoryLabel: 'Security & Governance',
    categoryColor: 'text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20',
    type: 'Checklist',
    description:
      'Pre-configured permission schemes for Cashiers, Shift Supervisors, Store Managers, and HQ Admins with biometric override policies.',
    readTime: 'SOP Sheet',
    fileSize: '1.1 MB',
    fileName: 'quantix_enterprise_rbac_matrix.pdf',
    image: '/images/ent_global_pos_bundle.png',
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Resources' },
  { id: 'franchise', label: 'Franchise & Multi-Store' },
  { id: 'inventory', label: 'Inventory & Stock' },
  { id: 'erp', label: 'ERP & Webhooks' },
  { id: 'security', label: 'Security & PCI' },
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return RESOURCES_LIST.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch =
        !search.trim() ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const handleDownload = (title: string, fileName: string, size: string) => {
    toast.success(`Downloading: ${title}`, {
      description: `Saved as ${fileName} (${size}). Access granted.`,
    });
  };

  return (
    <div className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* 1. Modern SaaS Hero Header */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-linear-to-b from-slate-50/70 via-white to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-bold uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
            <Sparkles size={13} className="text-primary" />
            <span>Enterprise Knowledge Hub</span>
          </div>

          <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.12] tracking-tight">
            Engineering Blueprints & Playbooks
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Essential architecture guides, Excel inventory models, and SOP checklists built for high-volume retail chains and franchise networks.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs focus-within:ring-2 focus-within:ring-primary/20 transition-all p-1">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 ml-3.5 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search playbooks, Excel models, SOP checklists..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all border cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-primary border-primary text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Flagship POS Architecture Guide Banner */}
      <section className="py-10 sm:py-14 bg-slate-50/60 dark:bg-slate-900/20 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-blue-500 to-indigo-600" />

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-syne font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  FLAGSHIP BLUEPRINT
                </span>
                <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <Clock size={12} />
                  12 min read
                </span>
              </div>

              <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                The Enterprise POS & Franchise Architecture Master Playbook
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Master multi-store till terminal deployments, offline-first IndexedDB caches, live matrix inventory sync, and high-throughput ERP data pipelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  'Hybrid cloud & offline till registers',
                  'Central catalog & branch price overrides',
                  'Inter-branch stock transfer pipelines',
                  'PCI-DSS Tier 1 tokenization & P2PE',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href="/resources/pos-guide"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    handleDownload(
                      'Enterprise POS Master Guide',
                      'quantix_enterprise_pos_master_guide.pdf',
                      '4.8 MB'
                    )
                  }
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-syne font-bold text-xs transition-all cursor-pointer border border-slate-200/80 dark:border-slate-700"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm group">
                <Image
                  src="/images/hero_multi_location_hq.jpg"
                  alt="Enterprise POS Blueprint"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-primary px-2 py-0.5 rounded">
                    Architecture Blueprint
                  </span>
                  <p className="text-xs font-syne font-bold mt-1">
                    Multi-location telemetry, offline till cache & ERP connector schemas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curated Resource Cards Grid */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <h2 className="font-syne text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Technical Playbooks & SOPs
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Showing {filtered.length} curated enterprise resources
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-14 px-4 max-w-md mx-auto rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <Search className="mx-auto h-8 w-8 text-slate-400 mb-2" />
              <h3 className="font-syne text-base font-bold text-slate-900 dark:text-white">No documents found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                No matching documents for "{search}". Try searching with different keywords.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('all');
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-syne font-black uppercase tracking-wider px-2.5 py-0.5 rounded border ${item.categoryColor}`}>
                        {item.categoryLabel}
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <Clock size={11} />
                        {item.readTime}
                      </span>
                    </div>

                    <h3 className="font-syne text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-5 flex items-center justify-between">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                      >
                        <span>View Document</span>
                        <ChevronRight size={13} />
                      </Link>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400">
                        {item.type}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDownload(item.title, item.fileName, item.fileSize)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                      title="Download File"
                    >
                      <Download size={13} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Downloadable Toolkits & Models */}
      <section className="py-12 sm:py-16 bg-slate-50/70 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-syne font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <FileSpreadsheet size={13} />
              <span>Executive Toolkits</span>
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Ready-To-Use Worksheets & Excel Models
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Pre-built financial formulas, safety stock calculators, and printable governance matrices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="text-[10px] font-syne font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  EXCEL (.XLSX) MODEL
                </span>
                <h3 className="font-syne text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Franchise Inventory Replenishment & Safety Stock Model
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Automated spreadsheet with formula models for safety stock, reorder levels, and shrinkage audits.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleDownload(
                    'Inventory Replenishment Model',
                    'quantix_inventory_safety_stock_model.xlsx',
                    '940 KB'
                  )
                }
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-xs font-syne font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download size={13} />
                <span>Download Spreadsheet</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="text-[10px] font-syne font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                  FINANCIAL ROI TOOL
                </span>
                <h3 className="font-syne text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Multi-Location Annual TCO & POS ROI Forecaster
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Compare multi-location annual licensing savings, hardware costs, and transaction fees.
                </p>
              </div>
              <Link
                href="/roi-calculator"
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 hover:text-white text-xs font-syne font-bold flex items-center justify-center gap-2 transition-all"
              >
                <TrendingUp size={13} />
                <span>Launch ROI Forecaster</span>
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="text-[10px] font-syne font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                  PRINTABLE SOP MATRIX
                </span>
                <h3 className="font-syne text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Role-Based Security & Permission Matrix Blueprint
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Permission schemes for Cashiers, Store Managers, District Supervisors, and HQ Admins.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleDownload(
                    'RBAC Permission Matrix',
                    'quantix_enterprise_rbac_matrix.pdf',
                    '1.1 MB'
                  )
                }
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-xs font-syne font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download size={13} />
                <span>Download PDF SOP</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTABanner */}
      <CTABanner />
    </div>
  );
}
