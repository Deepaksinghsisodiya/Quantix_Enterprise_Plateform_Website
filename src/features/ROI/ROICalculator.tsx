// src/features/ROI/ROICalculator.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator,
  RotateCcw,
  ShieldCheck,
  Share2,
  Sparkles,
  Building2,
  ArrowRight,
  CheckCircle2,
  Plus,
  Minus,
  TrendingUp,
  Clock,
  Coins,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

export type BusinessType = 'restaurant' | 'retail';
export type CurrentSystem = 'legacy' | 'cloud' | 'manual';

interface ROIInputs {
  businessType: BusinessType;
  locations: number;
  dailyTransactions: number;
  currentSystem: CurrentSystem;
  employees: number;
}

const DEFAULT_INPUTS: ROIInputs = {
  businessType: 'restaurant',
  locations: 5,
  dailyTransactions: 180,
  currentSystem: 'legacy',
  employees: 12,
};

const SYSTEM_COMPARISONS: Record<
  CurrentSystem,
  { label: string; legacyCostPerStore: number; laborLagMins: number }
> = {
  legacy: { label: 'Legacy Enterprise (Aloha / Micros / NCR)', legacyCostPerStore: 190, laborLagMins: 45 },
  cloud: { label: 'Generic Cloud POS (Toast / Square / Lightspeed)', legacyCostPerStore: 140, laborLagMins: 25 },
  manual: { label: 'Manual / Basic Cash Register', legacyCostPerStore: 80, laborLagMins: 60 },
};

const AVG_HOURLY_RATE = 20;

export const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ROIInputs>(DEFAULT_INPUTS);
  const [copied, setCopied] = useState(false);

  const updateInput = <K extends keyof ROIInputs>(key: K, value: ROIInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (locations: number, txns: number, employees: number) => {
    setInputs((prev) => ({
      ...prev,
      locations,
      dailyTransactions: txns,
      employees,
    }));
    toast.success(`Loaded preset: ${locations} locations model`);
  };

  const reset = () => {
    setInputs(DEFAULT_INPUTS);
    toast.info('ROI Forecaster reset to default parameters.');
  };

  const results = useMemo(() => {
    const { businessType, locations, dailyTransactions, currentSystem, employees } = inputs;
    const systemMeta = SYSTEM_COMPARISONS[currentSystem];

    // Monthly subscription with Quantix
    const quantixMonthlyPerStore = locations >= 10 ? 69 : locations >= 3 ? 79 : 89;
    const quantixTotalMonthly = quantixMonthlyPerStore * locations;
    const legacyTotalMonthly = systemMeta.legacyCostPerStore * locations;
    const softwareSavingsMonthly = Math.max(0, legacyTotalMonthly - quantixTotalMonthly);

    // Labor Savings Calculation
    const timeSavedMinutesPerEmpPerDay = systemMeta.laborLagMins;
    const totalTimeSavedHoursMonth = (employees * timeSavedMinutesPerEmpPerDay * 30) / 60;
    const laborSavingsMonthly = totalTimeSavedHoursMonth * AVG_HOURLY_RATE;

    // Error & Void Shrinkage Reduction
    const avgOrderValue = businessType === 'restaurant' ? 28 : 42;
    const monthlyGrossRevenue = dailyTransactions * avgOrderValue * 30 * locations;
    const shrinkageRecoveryPct =
      currentSystem === 'legacy' ? 0.012 : currentSystem === 'manual' ? 0.025 : 0.008;
    const shrinkageSavingsMonthly = monthlyGrossRevenue * shrinkageRecoveryPct;

    // Total Monthly & Annual Savings
    const totalMonthlySavings = softwareSavingsMonthly + laborSavingsMonthly + shrinkageSavingsMonthly;
    const totalAnnualSavings = totalMonthlySavings * 12;

    // ROI Multiplier & Payback
    const roiPercentage =
      quantixTotalMonthly > 0 ? Math.round((totalMonthlySavings / quantixTotalMonthly) * 100) : 0;
    const paybackDays =
      totalMonthlySavings > 0
        ? Math.max(7, Math.ceil(quantixTotalMonthly / (totalMonthlySavings / 30)))
        : 12;
    const timeSavedPerWeekHours = Math.round((totalTimeSavedHoursMonth / 4.33) * 10) / 10;

    return {
      totalMonthlySavings: Math.round(totalMonthlySavings),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      softwareSavingsMonthly: Math.round(softwareSavingsMonthly),
      laborSavingsMonthly: Math.round(laborSavingsMonthly),
      shrinkageSavingsMonthly: Math.round(shrinkageSavingsMonthly),
      timeSavedPerWeekHours,
      roiPercentage,
      paybackDays,
      quantixTotalMonthly,
      legacyTotalMonthly,
    };
  }, [inputs]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/roi-calculator?type=${inputs.businessType}&loc=${inputs.locations}&txn=${inputs.dailyTransactions}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        toast.success('ROI calculation link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Quick Presets Row for Instant Mobile Calculation */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-syne font-bold uppercase tracking-wider text-slate-500">
          <Sparkles size={13} className="text-[#FF4F00]" />
          <span>Quick Scale Presets:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'Single Store', loc: 1, txn: 90, emp: 4 },
            { label: '3-5 Units', loc: 5, txn: 180, emp: 14 },
            { label: '15+ Chain', loc: 15, txn: 350, emp: 45 },
            { label: '50+ Enterprise', loc: 50, txn: 500, emp: 120 },
          ].map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p.loc, p.txn, p.emp)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                inputs.locations === p.loc
                  ? 'bg-primary border-primary text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/40'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Controls on Left, Live KPI Dash on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column (5 Cols): Interactive Sliders & Inputs */}
        <div className="lg:col-span-5 p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-amber-500 to-primary" />

          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Calculator size={18} className="text-primary" />
              <h2 className="font-syne text-sm sm:text-base font-bold uppercase tracking-tight">
                Store Parameters
              </h2>
            </div>
            <button
              type="button"
              onClick={reset}
              className="text-xs text-slate-400 hover:text-primary font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          {/* Business Sector Toggle */}
          <div className="space-y-1.5">
            <label className="text-[10.5px] font-syne font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Business Sector
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateInput('businessType', 'restaurant')}
                className={`py-2.5 px-3 rounded-xl text-xs font-syne font-bold transition-all border cursor-pointer ${
                  inputs.businessType === 'restaurant'
                    ? 'bg-primary border-primary text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                }`}
              >
                🍽️ Restaurant / Bar
              </button>
              <button
                type="button"
                onClick={() => updateInput('businessType', 'retail')}
                className={`py-2.5 px-3 rounded-xl text-xs font-syne font-bold transition-all border cursor-pointer ${
                  inputs.businessType === 'retail'
                    ? 'bg-primary border-primary text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                }`}
              >
                🛍️ Retail / Grocery
              </button>
            </div>
          </div>

          {/* Current POS System Baseline */}
          <div className="space-y-1.5">
            <label className="text-[10.5px] font-syne font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current System Baseline
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['legacy', 'cloud', 'manual'] as CurrentSystem[]).map((sys) => (
                <button
                  key={sys}
                  type="button"
                  onClick={() => updateInput('currentSystem', sys)}
                  className={`py-2 px-1.5 rounded-xl text-[11px] font-syne font-bold capitalize transition-all border cursor-pointer text-center leading-snug ${
                    inputs.currentSystem === sys
                      ? 'bg-primary border-primary text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                  }`}
                >
                  {sys === 'legacy' ? 'Legacy POS' : sys === 'cloud' ? 'Other Cloud' : 'Manual Tills'}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Locations */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Store Outlets:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateInput('locations', Math.max(1, inputs.locations - 1))}
                  className="h-6 w-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center justify-center cursor-pointer"
                  aria-label="Decrease locations"
                >
                  <Minus size={11} />
                </button>
                <span className="text-primary font-mono font-black text-sm w-16 text-center">
                  {inputs.locations} {inputs.locations === 1 ? 'Store' : 'Stores'}
                </span>
                <button
                  type="button"
                  onClick={() => updateInput('locations', Math.min(100, inputs.locations + 1))}
                  className="h-6 w-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center justify-center cursor-pointer"
                  aria-label="Increase locations"
                >
                  <Plus size={11} />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={inputs.locations}
              onChange={(e) => updateInput('locations', Number(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1 Store</span>
              <span>50 Stores</span>
              <span>100+ Stores</span>
            </div>
          </div>

          {/* Slider 2: Daily Transactions */}
          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Daily Txns per Store:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateInput('dailyTransactions', Math.max(20, inputs.dailyTransactions - 20))}
                  className="h-6 w-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center justify-center cursor-pointer"
                  aria-label="Decrease txns"
                >
                  <Minus size={11} />
                </button>
                <span className="text-primary font-mono font-black text-sm w-20 text-center">
                  {inputs.dailyTransactions} / day
                </span>
                <button
                  type="button"
                  onClick={() => updateInput('dailyTransactions', Math.min(1000, inputs.dailyTransactions + 20))}
                  className="h-6 w-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center justify-center cursor-pointer"
                  aria-label="Increase txns"
                >
                  <Plus size={11} />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={20}
              max={1000}
              step={20}
              value={inputs.dailyTransactions}
              onChange={(e) => updateInput('dailyTransactions', Number(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>20 / day</span>
              <span>500 / day</span>
              <span>1,000+ / day</span>
            </div>
          </div>

          {/* Slider 3: Staff Count */}
          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Total Staff Members:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateInput('employees', Math.max(2, inputs.employees - 2))}
                  className="h-6 w-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center justify-center cursor-pointer"
                  aria-label="Decrease staff"
                >
                  <Minus size={11} />
                </button>
                <span className="text-primary font-mono font-black text-sm w-16 text-center">
                  {inputs.employees} Staff
                </span>
                <button
                  type="button"
                  onClick={() => updateInput('employees', Math.min(250, inputs.employees + 2))}
                  className="h-6 w-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center justify-center cursor-pointer"
                  aria-label="Increase staff"
                >
                  <Plus size={11} />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={2}
              max={250}
              value={inputs.employees}
              onChange={(e) => updateInput('employees', Number(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>2 Staff</span>
              <span>100 Staff</span>
              <span>250+ Staff</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Real-Time KPI Dash & Savings Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Hero Metric Box */}
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-primary/10 via-amber-500/5 to-transparent dark:from-primary/20 dark:via-slate-900/60 dark:to-slate-900 border border-primary/30 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-syne font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                FORECASTED ANNUAL NET SAVINGS
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                ⚡ {results.roiPercentage}% Annual ROI
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                Total Projected Annual Benefit
              </p>
              <h3 className="font-syne text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-none">
                ${results.totalAnnualSavings.toLocaleString()}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium pt-1">
                Equivalent to <strong className="text-primary font-mono">${results.totalMonthlySavings.toLocaleString()} / month</strong> in bottom-line operational & software recovery.
              </p>
            </div>

            {/* 4 Mini KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-3 border-t border-primary/20">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
                <p className="text-[9.5px] text-slate-400 font-bold uppercase">Time Saved</p>
                <p className="text-sm sm:text-base font-mono font-black text-primary mt-0.5">
                  {results.timeSavedPerWeekHours} hrs/wk
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
                <p className="text-[9.5px] text-slate-400 font-bold uppercase">Payback Time</p>
                <p className="text-sm sm:text-base font-mono font-black text-slate-900 dark:text-white mt-0.5">
                  {results.paybackDays} Days
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
                <p className="text-[9.5px] text-slate-400 font-bold uppercase">SaaS Cut</p>
                <p className="text-sm sm:text-base font-mono font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  -${results.softwareSavingsMonthly}/mo
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
                <p className="text-[9.5px] text-slate-400 font-bold uppercase">ROI Multiplier</p>
                <p className="text-sm sm:text-base font-mono font-black text-primary mt-0.5">
                  {results.roiPercentage}%
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown Progress Bars */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-syne font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Where Your Savings Come From:
            </h3>

            <div className="space-y-4">
              {/* Labor */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Staff Shift Settlement & Order Lag Efficiency</span>
                  <span className="text-primary font-mono">${results.laborSavingsMonthly.toLocaleString()} / mo</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '65%' }} />
                </div>
              </div>

              {/* Software */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Software License Elimination vs High-Fee POS</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">${results.softwareSavingsMonthly.toLocaleString()} / mo</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: '45%' }} />
                </div>
              </div>

              {/* Shrinkage */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Order Void Errors & Shrinkage Recovery</span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono">${results.shrinkageSavingsMonthly.toLocaleString()} / mo</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: '35%' }} />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <ShieldCheck size={14} className="text-primary" />
                <span>Audited model for {inputs.locations} locations</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:border-primary/40 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Share2 size={12} />
                  <span>{copied ? 'Link Copied!' : 'Share ROI'}</span>
                </button>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-syne font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Book Audit</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
