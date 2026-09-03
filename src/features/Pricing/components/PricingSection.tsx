// src/features/Pricing/components/PricingSection.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Sparkles, ShieldCheck, HelpCircle, Building2, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { useGetBillingPlansQuery } from '../services/PricingServices';
import { BillingCycle, ApiBillingPlan } from '../Types/PricingTypes';
import { FALLBACK_ENTERPRISE_PLANS } from '../Constants/PricingConstants';
import { PricingCard } from './PricingCard';
import { PricingComparisonTable } from './PricingComparisonTable';
import { PricingSkeleton } from './PricingSkeleton';

export const PricingSection: React.FC = () => {
  const { data: response, isLoading } = useGetBillingPlansQuery();
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showSkeleton = !mounted || isLoading;

  // Instant zero-delay data with live API synchronization & robust null-safety
  const { hybridPlans, restaurantPlans, retailPlans } = useMemo(() => {
    let raw: ApiBillingPlan[] = FALLBACK_ENTERPRISE_PLANS;
    if (response?.data) {
      if (Array.isArray(response.data) && response.data.length > 0) {
        raw = response.data;
      } else if (response.data && typeof response.data === 'object') {
        const d = response.data as any;
        if (Array.isArray(d.plans) && d.plans.length > 0) {
          raw = d.plans;
        } else {
          const collected: ApiBillingPlan[] = [];
          Object.values(d).forEach((val: any) => {
            if (val && Array.isArray(val.plans)) {
              collected.push(...val.plans);
            }
          });
          if (collected.length > 0) {
            raw = collected;
          }
        }
      }
    }

    const entPlans = (raw || []).filter(
      (p) => p && (p.isActive ?? true) && (p.isPublic ?? true) && !p.isDeprecated && (p.planType === 'EnterpriseCloud' || !p.planType)
    );

    const finalHybrid = entPlans.filter((p) => p?.flavour === 'BOT' || !p?.flavour).sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));
    const finalRest = entPlans.filter((p) => p?.flavour === 'RES').sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));
    const finalRetail = entPlans.filter((p) => p?.flavour === 'RET').sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));

    return {
      hybridPlans: finalHybrid.length > 0 ? finalHybrid : FALLBACK_ENTERPRISE_PLANS.filter((p) => p.flavour === 'BOT' || !p.flavour),
      restaurantPlans: finalRest.length > 0 ? finalRest : FALLBACK_ENTERPRISE_PLANS.filter((p) => p.flavour === 'RES'),
      retailPlans: finalRetail.length > 0 ? finalRetail : FALLBACK_ENTERPRISE_PLANS.filter((p) => p.flavour === 'RET'),
    };
  }, [response]);

  return (
    <section
      className="relative pt-[110px] sm:pt-32 lg:pt-36 pb-16 sm:pb-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 overflow-hidden transition-colors font-sans"
      id="pricing"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF4D00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200 px-3.5 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#FF4D00] mb-3.5 shadow-2xs dark:bg-orange-950/30 dark:border-orange-900/40">
            <Sparkles className="h-3.5 w-3.5 stroke-[2.5]" />
            ENTERPRISE CLOUD PRICING
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            Simple, transparent pricing
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed px-2">
            Enterprise cloud infrastructure for multi-location brands, dining chains, and retail franchises. Scale without limits.
          </p>
        </div>

        {/* Global Billing Cycle Toggle */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <div className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/60 dark:border-slate-700/60 shadow-inner max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              className={cn(
                'rounded-full px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap',
                billing === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs ring-1 ring-slate-200/60 dark:ring-slate-600'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBilling('annual')}
              className={cn(
                'rounded-full px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap',
                billing === 'annual'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs ring-1 ring-slate-200/60 dark:ring-slate-600'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              Annual Billing
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-500/15 px-2 py-0.5 text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                Save 16%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Sections Flow */}
        <div className="space-y-12 sm:space-y-20">
          {/* ─── SECTION 1: Hybrid / Multi-Brand Enterprise Plans ─── */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#FF4D00] flex items-center justify-center border border-orange-200 dark:border-orange-900/40 shrink-0 mt-0.5">
                  <Building2 size={18} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-xl font-syne font-bold text-slate-900 dark:text-white leading-snug">
                      1. Hybrid Enterprise Cloud (Restaurant + Retail)
                    </h2>
                    <span className="text-[10px] font-extrabold text-[#FF4D00] bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Universal Footprint
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Single master licence running both restaurant dining & retail barcode POS networks side-by-side
                  </p>
                </div>
              </div>
            </div>

            {showSkeleton ? (
              <PricingSkeleton count={3} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                {hybridPlans.map((plan) => (
                  <PricingCard key={plan.planId} plan={plan} billing={billing} />
                ))}
              </div>
            )}
          </div>

          {/* ─── SECTION 2: Restaurant Enterprise Chains ─── */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center border border-red-200 dark:border-red-900/40 shrink-0 mt-0.5">
                  <UtensilsCrossed size={18} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-xl font-syne font-bold text-slate-900 dark:text-white leading-snug">
                      2. Restaurant Enterprise Cloud Chains
                    </h2>
                    <span className="text-[10px] font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      For Dining Franchises
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Managed cloud clusters for 15 to 100+ dining outlets with central recipe governance, ERP data bridge, and 500GB storage
                  </p>
                </div>
              </div>
            </div>

            {showSkeleton ? (
              <PricingSkeleton count={3} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                {restaurantPlans.map((plan) => (
                  <PricingCard key={plan.planId} plan={plan} billing={billing} />
                ))}
              </div>
            )}
          </div>

          {/* ─── SECTION 3: Retail Enterprise Chains ─── */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center border border-blue-200 dark:border-blue-900/40 shrink-0 mt-0.5">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-xl font-syne font-bold text-slate-900 dark:text-white leading-snug">
                      3. Retail Enterprise Franchise Networks
                    </h2>
                    <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      For Store Networks
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Managed cloud cluster for 15 to 100+ stores with central warehouse inventory transfer, supplier bridge, and 500GB storage
                  </p>
                </div>
              </div>
            </div>

            {showSkeleton ? (
              <PricingSkeleton count={3} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                {retailPlans.map((plan) => (
                  <PricingCard key={plan.planId} plan={plan} billing={billing} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ─── DETAILED INTERACTIVE COMPARISON TABLE (23 FEATURES) ─── */}
        <PricingComparisonTable />

        {/* Security / FAQ strip */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-900/40 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Zero Hidden Setup Fees • Month-to-Month Flexibility
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Cancel, upgrade, or switch tiers anytime directly from your merchant console.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="text-xs font-bold text-[#FF4D00] hover:text-[#E03E00] underline underline-offset-4 shrink-0 flex items-center gap-1"
          >
            <HelpCircle size={14} />
            Need custom franchise quotes? Talk to Sales
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
