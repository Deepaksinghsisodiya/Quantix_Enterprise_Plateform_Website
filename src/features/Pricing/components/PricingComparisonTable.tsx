import React, { useState, useMemo } from 'react';
import { Check, Minus, Sparkles, Layers, ChevronDown, Monitor, Cloud, Building2, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureItem {
  name: string;
  standalone: boolean | string;
  cloud: boolean | string;
  enterprise: boolean | string;
}

interface FeatureCategory {
  category: string;
  features: FeatureItem[];
}

const COMPARISON_DATA: FeatureCategory[] = [
  {
    category: '1. Core POS & Checkout Engine (7 Features)',
    features: [
      { name: 'Offline-First Billing Engine (Zero Internet Lag)', standalone: true, cloud: true, enterprise: true },
      { name: 'Multi-Channel Checkout (Dine-in, Takeout, Barcode)', standalone: true, cloud: true, enterprise: true },
      { name: 'Split Checks, Table Mapping & Seat Ordering', standalone: true, cloud: true, enterprise: true },
      { name: 'Thermal Receipt & Kitchen Order Printing', standalone: true, cloud: true, enterprise: true },
      { name: 'Item Modifiers, Combos, Variants & Size Matrices', standalone: true, cloud: true, enterprise: true },
      { name: 'Cash Drawer Float, Shift Count & Safe Drops', standalone: true, cloud: true, enterprise: true },
      { name: 'Customer Facing Display (CFD) Support', standalone: false, cloud: true, enterprise: true },
    ],
  },
  {
    category: '2. Kitchen, Hardware & Store Operations (5 Features)',
    features: [
      { name: 'Kitchen Display System (KDS) Station Routing', standalone: 'Basic', cloud: true, enterprise: true },
      { name: 'Multi-Course Kitchen Pacing Logs', standalone: false, cloud: true, enterprise: true },
      { name: 'Barcode Scanners, Weight Scales & Pole Displays', standalone: true, cloud: true, enterprise: true },
      { name: 'Bring-Your-Own-Processor (BYOP) Card Terminals', standalone: true, cloud: true, enterprise: true },
      { name: 'Digital E-Receipts & QR Contactless Menus', standalone: false, cloud: true, enterprise: true },
    ],
  },
  {
    category: '3. Inventory, Supply Chain & Recipe Costing (5 Features)',
    features: [
      { name: 'Real-time Stock Deductions & Ingredient Costing', standalone: 'Basic', cloud: true, enterprise: true },
      { name: 'Automated Low-Stock Email & SMS Reordering Alerts', standalone: false, cloud: true, enterprise: true },
      { name: 'Multi-Store Warehouse Stock Transfers & Dispatches', standalone: false, cloud: 'Up to 5', enterprise: 'Unlimited' },
      { name: 'Supplier Purchase Orders & GRN Receiving Audits', standalone: false, cloud: true, enterprise: true },
      { name: 'Batch Number, Expiry & Wastage Tracking', standalone: false, cloud: true, enterprise: true },
    ],
  },
  {
    category: '4. Enterprise Cloud, Intelligence & Support (6 Features)',
    features: [
      { name: 'Centralized Multi-Location SKU & Menu Sync', standalone: false, cloud: true, enterprise: true },
      { name: 'Staff Role-Based Permissions & Clock-In Timecards', standalone: 'Basic', cloud: true, enterprise: true },
      { name: 'Real-Time Hourly Sales & Financial Telemetry BI', standalone: 'Daily Summary', cloud: 'Live Cloud BI', enterprise: 'Data Lake Export' },
      { name: 'Customer Loyalty Points, Gift Cards & Promos', standalone: false, cloud: true, enterprise: true },
      { name: 'Open REST API, Webhooks & ERP Bridge', standalone: false, cloud: 'Standard API', enterprise: 'Dedicated Webhooks' },
      { name: '24/7 Dedicated SLA Account Manager Support', standalone: 'Email Support', cloud: 'Priority Chat', enterprise: 'Dedicated 24/7 SLA' },
    ],
  },
];

type TierKey = 'standalone' | 'cloud' | 'enterprise';

const TIERS: { key: TierKey; label: string; sub: string; icon: any; popular?: boolean }[] = [
  { key: 'standalone', label: 'Standalone POS', sub: 'From $6/day', icon: Monitor },
  { key: 'cloud', label: 'Cloud POS', sub: 'From $20/day', icon: Cloud, popular: true },
  { key: 'enterprise', label: 'Enterprise Cloud', sub: 'From $60/day', icon: Building2 },
];

export const PricingComparisonTable: React.FC = () => {
  const [selectedMobileTier, setSelectedMobileTier] = useState<TierKey>('cloud');
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  const toggleCategory = (index: number) => {
    setOpenCategories((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return COMPARISON_DATA;
    const q = searchQuery.toLowerCase().trim();
    return COMPARISON_DATA.map((group) => ({
      ...group,
      features: group.features.filter(
        (f) => f.name.toLowerCase().includes(q) || group.category.toLowerCase().includes(q)
      ),
    })).filter((group) => group.features.length > 0);
  }, [searchQuery]);

  const totalFilteredCount = useMemo(
    () => filteredData.reduce((acc, g) => acc + g.features.length, 0),
    [filteredData]
  );

  const renderValue = (val: boolean | string, isPopular = false) => {
    if (typeof val === 'boolean') {
      return val ? (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
          <Check size={13} className="stroke-[3]" />
          Included
        </span>
      ) : (
        <span className="inline-flex items-center text-[11px] font-medium text-slate-400 dark:text-slate-600">
          <Minus size={14} />
          Not included
        </span>
      );
    }
    return (
      <span
        className={cn(
          'inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-md',
          isPopular
            ? 'text-[#FF4D00] bg-orange-50 dark:bg-orange-950/40'
            : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
        )}
      >
        {val}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 shadow-2xs">
          <Layers size={13} className="text-[#FF4D00]" />
          DETAILED FEATURE MATRIX
        </div>
        <h2 className="text-2xl sm:text-4xl font-syne font-black tracking-tight text-slate-900 dark:text-white">
          Compare all 23 core modules across plans
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Everything included with zero hidden surprises. Compare standalone, cloud, and enterprise tiers side by side.
        </p>
      </div>

      {/* Feature Search Box */}
      <div className="max-w-md mx-auto mb-6 sm:mb-8 px-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 23 modules (e.g. KDS, Barcode, Offline, Inventory, API)..."
            className="w-full h-10 sm:h-11 pl-10 pr-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15 outline-none transition-all shadow-xs"
          />
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 text-center">
            Showing {totalFilteredCount} matching module(s)
          </p>
        )}
      </div>

      {/* Empty Search Result State */}
      {filteredData.length === 0 && (
        <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 mb-8 max-w-xl mx-auto">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
            No modules matching &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-xs text-slate-500 mb-3">Try searching for &apos;Inventory&apos;, &apos;KDS&apos;, &apos;Offline&apos;, or &apos;API&apos;.</p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-xs font-bold text-[#FF4D00] hover:underline cursor-pointer"
          >
            Clear search to show all 23 core modules &rarr;
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          1. MOBILE VIEW: Native Segmented App Experience (< 768px)
          ───────────────────────────────────────────────────────────── */}
      <div className="block md:hidden">
        {/* Sticky Segmented Tier Switcher on Mobile */}
        <div className="sticky top-16 z-30 mb-5 p-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="grid grid-cols-3 gap-1">
            {TIERS.map((tier) => {
              const Icon = tier.icon;
              const isSelected = selectedMobileTier === tier.key;
              return (
                <button
                  key={tier.key}
                  type="button"
                  onClick={() => setSelectedMobileTier(tier.key)}
                  className={cn(
                    'py-2 px-1.5 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer text-center relative',
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon size={16} className={isSelected ? 'text-[#FF4D00]' : 'text-slate-400'} />
                  <span className="text-[11px] font-syne font-bold leading-tight mt-1">
                    {tier.label}
                  </span>
                  <span className="text-[9px] opacity-75 font-mono">
                    {tier.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Accordion Groups */}
        <div className="space-y-4">
          {filteredData.map((group, groupIdx) => {
            const isOpen = openCategories[groupIdx] !== false;
            return (
              <div
                key={groupIdx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleCategory(groupIdx)}
                  className="w-full py-3.5 px-4 bg-slate-50/80 dark:bg-slate-800/60 flex items-center justify-between text-left transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-800"
                >
                  <span className="text-xs font-syne font-bold text-slate-900 dark:text-white">
                    {group.category}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      'text-slate-400 transition-transform duration-200',
                      isOpen ? 'rotate-180' : ''
                    )}
                  />
                </button>

                {/* Features List */}
                {isOpen && (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {group.features.map((feature, fIdx) => {
                      const val = feature[selectedMobileTier];
                      return (
                        <div
                          key={fIdx}
                          className="py-3 px-4 flex items-center justify-between gap-3 text-xs"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200 leading-snug">
                            {feature.name}
                          </span>
                          <div className="shrink-0">
                            {renderValue(val, selectedMobileTier === 'cloud')}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. DESKTOP VIEW: Generous Full 4-Column Table (>= 768px)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:block rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xl overflow-hidden backdrop-blur-xs">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/80">
              <th className="py-5 px-6 text-xs font-syne font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 w-2/5">
                Platform Modules (23 Features)
              </th>
              <th className="py-5 px-4 text-center text-xs font-syne font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 w-1/5">
                <div>Standalone POS</div>
                <span className="text-[10px] font-mono font-normal text-slate-500">From $6/day</span>
              </th>
              <th className="py-5 px-4 text-center text-xs font-syne font-bold uppercase tracking-wider text-[#FF4D00] w-1/5 bg-orange-500/5 dark:bg-orange-500/10">
                <div className="flex items-center justify-center gap-1">
                  <Sparkles size={11} className="fill-[#FF4D00]" />
                  <span>Cloud POS</span>
                </div>
                <span className="text-[10px] font-mono font-normal text-slate-500">From $20/day</span>
              </th>
              <th className="py-5 px-4 text-center text-xs font-syne font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 w-1/5">
                <div>Enterprise Cloud</div>
                <span className="text-[10px] font-mono font-normal text-slate-500">From $60/day</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
            {filteredData.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                <tr className="bg-slate-100/60 dark:bg-slate-800/50 font-syne font-bold text-slate-900 dark:text-white">
                  <td colSpan={4} className="py-3 px-6 text-xs tracking-wide text-slate-700 dark:text-slate-300">
                    {group.category}
                  </td>
                </tr>

                {group.features.map((feature, featureIdx) => (
                  <tr
                    key={featureIdx}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-medium text-slate-800 dark:text-slate-200">
                      {feature.name}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {typeof feature.standalone === 'boolean' ? (
                        feature.standalone ? (
                          <div className="flex justify-center">
                            <Check size={16} className="text-emerald-500 stroke-[2.5]" />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Minus size={16} className="text-slate-300 dark:text-slate-600" />
                          </div>
                        )
                      ) : (
                        <span className="font-semibold text-[11px] text-slate-600 dark:text-slate-400">
                          {feature.standalone}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center bg-orange-500/5 dark:bg-orange-500/10">
                      {typeof feature.cloud === 'boolean' ? (
                        feature.cloud ? (
                          <div className="flex justify-center">
                            <Check size={16} className="text-emerald-500 stroke-[2.5]" />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Minus size={16} className="text-slate-300 dark:text-slate-600" />
                          </div>
                        )
                      ) : (
                        <span className="font-bold text-[11px] text-[#FF4D00]">
                          {feature.cloud}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? (
                          <div className="flex justify-center">
                            <Check size={16} className="text-emerald-500 stroke-[2.5]" />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Minus size={16} className="text-slate-300 dark:text-slate-600" />
                          </div>
                        )
                      ) : (
                        <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">
                          {feature.enterprise}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingComparisonTable;
