// src/features/Pricing/components/PricingSection.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Sparkles, ShieldCheck, HelpCircle, Building2, UtensilsCrossed, ShoppingBag, Monitor, Cloud, ChevronRight } from 'lucide-react';
import { useGetBillingPlansQuery } from '../services/PricingServices';
import { BillingCycle, ApiBillingPlan } from '../Types/PricingTypes';
import { FALLBACK_ENTERPRISE_PLANS } from '../Constants/PricingConstants';
import { PricingCard } from './PricingCard';
import { PricingComparisonTable } from './PricingComparisonTable';
import { PricingSkeleton } from './PricingSkeleton';

export const PricingSection: React.FC = () => {
  const { data: response, isLoading } = useGetBillingPlansQuery();
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [activeCategory, setActiveCategory] = useState<'standalone' | 'cloud' | 'enterprise'>('standalone');
  const [flavourFilter, setFlavourFilter] = useState<'ALL' | 'BOT' | 'RES' | 'RET'>('ALL');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showSkeleton = !mounted || isLoading;

  // Extract all plans from API payload or fallbacks
  const { standalonePlans, cloudPlans, enterprisePlans } = useMemo(() => {
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

    const validPlans = (raw || []).filter(
      (p) => p && (p.isActive ?? true) && (p.isPublic ?? true) && !p.isDeprecated
    );

    const sortAsc = (a: ApiBillingPlan, b: ApiBillingPlan) =>
      Number(a?.planPricePerDay ?? a?.sortOrder ?? 0) - Number(b?.planPricePerDay ?? b?.sortOrder ?? 0);

    const finalStandalone = validPlans
      .filter((p) => p?.planType === 'StandalonePos')
      .sort(sortAsc);

    const finalCloud = validPlans
      .filter((p) => p?.planType === 'StandaloneCloud')
      .sort(sortAsc);

    const finalEnterprise = validPlans
      .filter((p) => p?.planType === 'EnterpriseCloud' || (!p?.planType && (p?.planPricePerDay ?? 0) >= 50))
      .sort(sortAsc);

    return {
      standalonePlans:
        finalStandalone.length > 0 ? finalStandalone : FALLBACK_ENTERPRISE_PLANS.filter((p) => p.planType === 'StandalonePos'),
      cloudPlans:
        finalCloud.length > 0 ? finalCloud : FALLBACK_ENTERPRISE_PLANS.filter((p) => p.planType === 'StandaloneCloud'),
      enterprisePlans:
        finalEnterprise.length > 0 ? finalEnterprise : FALLBACK_ENTERPRISE_PLANS.filter((p) => p.planType === 'EnterpriseCloud'),
    };
  }, [response]);

  const activePlans = useMemo(() => {
    let list: ApiBillingPlan[] = [];
    if (activeCategory === 'standalone') list = standalonePlans;
    else if (activeCategory === 'cloud') list = cloudPlans;
    else list = enterprisePlans;

    if (flavourFilter === 'ALL') return list;
    const filtered = list.filter((p) => p.flavour === flavourFilter);
    return filtered.length > 0 ? filtered : list;
  }, [activeCategory, flavourFilter, standalonePlans, cloudPlans, enterprisePlans]);

  return (
    <div className="w-full font-sans text-slate-900 dark:text-white transition-colors duration-300">
      {/* ─── 1. Page Hero Header (Why Quantix / Resources Style) ─── */}
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-100 dark:border-slate-800/80 pb-8 sm:pb-12 lg:pb-14 relative overflow-hidden" id="pricing-hero">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-20"
          style={{ backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        {/* Warm top ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-72 bg-gradient-to-b from-orange-400/15 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5 flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-300 dark:text-slate-600" />
            <span className="text-primary font-bold">Enterprise Pricing</span>
          </nav>

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/50 text-xs font-black uppercase tracking-widest text-[#FF4F00] mb-5 sm:mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] animate-pulse" />
            <Sparkles size={12} />
            Enterprise Tier Architecture
          </div>

          {/* Heading & Billing Switcher Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-4">
            <div>
              <h1 className="font-syne text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] text-slate-950 dark:text-white max-w-3xl mb-4">
                The POS Platform Built for{' '}
                <span
                  className="relative inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #FF4F00 0%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Predictable Scale
                </span>
              </h1>

              <p className="max-w-2xl text-sm sm:text-[0.9375rem] text-slate-600 dark:text-slate-400 font-medium leading-[1.75]">
                Zero proprietary hardware lock-in, 0% platform commission, and transparent monthly or annual billing across all your enterprise locations.
              </p>
            </div>

            {/* Global Billing Cycle Toggle */}
            <div className="shrink-0 mb-2">
              <div className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/60 dark:border-slate-700/60 shadow-inner">
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  className={cn(
                    'rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap',
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
                    'rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap',
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
          </div>

          {/* Trust Stats Strip (Why Quantix 4-column strip) */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-100 dark:border-slate-800/80">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0">
              {[
                { v: '0%', l: 'Platform Commission', sub: 'Keep 100% of your daily sales', accent: '#FF4F00' },
                { v: '$6/day', l: 'Starting Rate', sub: 'Full POS station installed locally', accent: '#059669' },
                { v: '$0', l: 'Setup or Termination Fee', sub: 'Cancel or switch anytime', accent: '#2563EB' },
                { v: '99.99%', l: 'Contractual Uptime SLA', sub: 'Native offline failover engine', accent: '#7C3AED' },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={`flex flex-col px-4 sm:px-6 py-4 sm:py-0 rounded-xl sm:rounded-none ${i !== 0 ? 'sm:border-l sm:border-slate-100 dark:sm:border-slate-800/80' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-1 h-10 rounded-full shrink-0 hidden sm:block mt-1"
                      style={{ background: s.accent }}
                    />
                    <div className="w-full">
                      <div
                        className="font-syne font-black text-xl sm:text-2xl leading-none tracking-tight mb-1"
                        style={{ color: s.accent }}
                      >
                        {s.v}
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5 leading-snug">
                        {s.l}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 leading-snug hidden sm:block">
                        {s.sub}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Pricing Plans Section (Proper py-12 sm:py-16 lg:py-20) ─── */}
      <section className="py-12 sm:py-16 lg:py-20 relative bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-slate-800/80" id="pricing">
        <div className="site-container px-4 sm:px-6 lg:px-8">
          {/* Quick Plan Matcher by Business Scale */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-5 sm:mb-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#FF4D00]" />
              Quick Match by Scale:
            </span>
            <div className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/80 dark:border-slate-700/80 flex-wrap justify-center gap-1">
              <button
                type="button"
                onClick={() => setActiveCategory('standalone')}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1',
                  activeCategory === 'standalone'
                    ? 'bg-white dark:bg-slate-900 text-[#FF4D00] shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                🛒 Single Store (1 Till)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('cloud')}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1',
                  activeCategory === 'cloud'
                    ? 'bg-white dark:bg-slate-900 text-[#FF4D00] shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                ⚡ Multi-Till &amp; Cloud (2–10 Tills)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('enterprise')}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1',
                  activeCategory === 'enterprise'
                    ? 'bg-white dark:bg-slate-900 text-[#FF4D00] shadow-xs ring-1 ring-slate-200/80 dark:ring-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                🏢 Multi-Chain Network (15–100+ Outlets)
              </button>
            </div>
          </div>

          {/* Main Category Switcher (Ascending Price Order: Standalone -> Cloud -> Enterprise) */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="grid grid-cols-3 gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm w-full max-w-xl mx-auto">
              <button
                type="button"
                onClick={() => setActiveCategory('standalone')}
                className={cn(
                  'flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer text-center',
                  activeCategory === 'standalone'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <Monitor size={15} className={activeCategory === 'standalone' ? 'text-[#FF4D00]' : 'text-slate-400'} />
                <span className="truncate">Standalone POS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('cloud')}
                className={cn(
                  'flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer text-center',
                  activeCategory === 'cloud'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <Cloud size={15} className={activeCategory === 'cloud' ? 'text-[#FF4D00]' : 'text-slate-400'} />
                <span className="truncate">Cloud POS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('enterprise')}
                className={cn(
                  'flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer text-center',
                  activeCategory === 'enterprise'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <Building2 size={15} className={activeCategory === 'enterprise' ? 'text-[#FF4D00]' : 'text-slate-400'} />
                <span className="truncate">Enterprise Cloud</span>
              </button>
            </div>
          </div>

          {/* Industry Flavour Filter Pills */}
          <div className="flex justify-center items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">Industry:</span>
            {[
              { id: 'ALL', label: 'All Industries' },
              { id: 'BOT', label: 'Hybrid Multi-Brand' },
              { id: 'RES', label: 'Restaurant' },
              { id: 'RET', label: 'Retail' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFlavourFilter(f.id as any)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border',
                  flavourFilter === f.id
                    ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Selected Tier Header Summary */}
          <div className="max-w-2xl mx-auto text-center mb-6 sm:mb-8 px-2">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              {activeCategory === 'standalone' && (
                <>
                  <strong className="text-slate-900 dark:text-white">Standalone POS: </strong>
                  Single-location on-premise billing stations with offline-first billing from $6/day.
                </>
              )}
              {activeCategory === 'cloud' && (
                <>
                  <strong className="text-slate-900 dark:text-white">Cloud POS: </strong>
                  Isolated cloud instance with live inventory sync, multi-till support, and online orders from $20/day.
                </>
              )}
              {activeCategory === 'enterprise' && (
                <>
                  <strong className="text-slate-900 dark:text-white">Enterprise Cloud: </strong>
                  High-capacity multi-outlet franchise architecture with unlimited scalability from $60/day.
                </>
              )}
            </p>
          </div>

          {/* Active Plans Cards Grid */}
          {showSkeleton ? (
            <PricingSkeleton count={3} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch w-full mx-auto">
              {activePlans.map((plan) => (
                <PricingCard key={plan.planId} plan={plan} billing={billing} />
              ))}
            </div>
          )}

          {/* Single-Outlet / Standalone Hint Banner */}
          <div className="mt-8 sm:mt-10 text-center px-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Want a full feature-by-feature matrix?{' '}
              <a
                href="#comparison-table"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#FF4D00] hover:underline font-semibold"
              >
                See detailed interactive feature comparison table below &darr;
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ─── 3. Detailed Interactive Comparison Table (Proper py-12 sm:py-16 lg:py-20) ─── */}
      <section className="py-12 sm:py-16 lg:py-20 relative bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80" id="comparison-table">
        <div className="site-container px-4 sm:px-6 lg:px-8">
          <PricingComparisonTable />

          {/* Security / FAQ strip */}
          <div className="mt-10 sm:mt-14 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
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
    </div>
  );
};

export default PricingSection;
