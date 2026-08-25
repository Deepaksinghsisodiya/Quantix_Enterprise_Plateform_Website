// src/features/ROI/ROICalculator.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  Calendar,
  RotateCcw,
  ShieldCheck,
  Share2,
  Sparkles,
  Building2,
  Layers,
  ArrowRight,
  CheckCircle2,
  Download,
  Flame,
  Check,
  Zap,
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

const SYSTEM_COMPARISONS: Record<CurrentSystem, { label: string; legacyCostPerStore: number; laborLagMins: number }> = {
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
    const shrinkageRecoveryPct = currentSystem === 'legacy' ? 0.012 : currentSystem === 'manual' ? 0.025 : 0.008;
    const shrinkageSavingsMonthly = monthlyGrossRevenue * shrinkageRecoveryPct;

    // Total Monthly & Annual Savings
    const totalMonthlySavings = softwareSavingsMonthly + laborSavingsMonthly + shrinkageSavingsMonthly;
    const totalAnnualSavings = totalMonthlySavings * 12;

    // ROI Multiplier & Payback
    const roiPercentage = quantixTotalMonthly > 0 ? Math.round((totalMonthlySavings / quantixTotalMonthly) * 100) : 0;
    const paybackDays = totalMonthlySavings > 0 ? Math.max(7, Math.ceil(quantixTotalMonthly / (totalMonthlySavings / 30))) : 12;
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
    <div className="w-full space-y-10">
      {/* 2-Column Split: Controls on Left, Live KPI Dash on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5.5 Cols): Interactive Sliders & Inputs */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkSurface/70 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary-light to-amber-500" />

          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Calculator size={18} className="text-primary" />
              <h2 className="font-syne text-base sm:text-lg font-bold">Store Parameters</h2>
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
          <div className="space-y-2">
            <label className="text-[11px] font-syne font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Business Sector
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateInput('businessType', 'restaurant')}
                className={`py-2.5 px-4 rounded-xl text-xs font-syne font-bold transition-all border cursor-pointer ${
                  inputs.businessType === 'restaurant'
                    ? 'bg-primary border-primary text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-darkBg/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                }`}
              >
                🍽️ Food & Restaurant
              </button>
              <button
                type="button"
                onClick={() => updateInput('businessType', 'retail')}
                className={`py-2.5 px-4 rounded-xl text-xs font-syne font-bold transition-all border cursor-pointer ${
                  inputs.businessType === 'retail'
                    ? 'bg-primary border-primary text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-darkBg/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                }`}
              >
                🛍️ Retail & Grocery
              </button>
            </div>
          </div>

          {/* Current POS System Baseline */}
          <div className="space-y-2">
            <label className="text-[11px] font-syne font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current POS Vendor Baseline
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['legacy', 'cloud', 'manual'] as CurrentSystem[]).map((sys) => (
                <button
                  key={sys}
                  type="button"
                  onClick={() => updateInput('currentSystem', sys)}
                  className={`py-2.5 px-2 rounded-xl text-[11px] font-syne font-bold capitalize transition-all border cursor-pointer text-center ${
                    inputs.currentSystem === sys
                      ? 'bg-primary border-primary text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-darkBg/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                  }`}
                >
                  {sys === 'legacy' ? 'Legacy POS' : sys === 'cloud' ? 'Other Cloud' : 'Manual Tills'}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Locations */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Store Locations:</span>
              <span className="text-primary font-mono font-black text-sm">{inputs.locations} Locations</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={inputs.locations}
              onChange={(e) => updateInput('locations', Number(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-slate-200 dark:bg-darkBg rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1 Store</span>
              <span>50 Stores</span>
              <span>100+ Stores</span>
            </div>
          </div>

          {/* Slider 2: Daily Transactions Per Store */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Daily Txns per Store:</span>
              <span className="text-primary font-mono font-black text-sm">{inputs.dailyTransactions} Txns / day</span>
            </div>
            <input
              type="range"
              min={20}
              max={1000}
              step={20}
              value={inputs.dailyTransactions}
              onChange={(e) => updateInput('dailyTransactions', Number(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-slate-200 dark:bg-darkBg rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>20 / day</span>
              <span>500 / day</span>
              <span>1,000+ / day</span>
            </div>
          </div>

          {/* Slider 3: Total Employees across network */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Total Staff / Cashiers:</span>
              <span className="text-primary font-mono font-black text-sm">{inputs.employees} Staff</span>
            </div>
            <input
              type="range"
              min={2}
              max={250}
              value={inputs.employees}
              onChange={(e) => updateInput('employees', Number(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-slate-200 dark:bg-darkBg rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>2 Staff</span>
              <span>100 Staff</span>
              <span>250+ Staff</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Real-time KPI Dash & Savings Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Hero Metric Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-primary/15 via-primary/5 to-transparent dark:from-primary/20 dark:via-darkSurface/70 dark:to-darkBg border border-primary/30 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-syne font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                PROIECTED ANNUAL BOTTOM-LINE SAVINGS
              </span>
              <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                ⚡ {results.roiPercentage}% ROI
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                Total Estimated Annual Net Benefit
              </p>
              <h3 className="font-syne text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                ${results.totalAnnualSavings.toLocaleString()}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                Equivalent to <strong className="text-primary font-mono">${results.totalMonthlySavings.toLocaleString()} / month</strong> in recurring operational & software savings.
              </p>
            </div>

            {/* 4 Mini KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-primary/20">
              <div className="p-3 rounded-2xl bg-white dark:bg-darkBg border border-slate-200/80 dark:border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Time Saved</p>
                <p className="text-sm sm:text-base font-mono font-black text-primary mt-0.5">{results.timeSavedPerWeekHours} hrs/wk</p>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-darkBg border border-slate-200/80 dark:border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Payback Window</p>
                <p className="text-sm sm:text-base font-mono font-black text-slate-900 dark:text-white mt-0.5">{results.paybackDays} Days</p>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-darkBg border border-slate-200/80 dark:border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Software Cost</p>
                <p className="text-sm sm:text-base font-mono font-black text-emerald-500 mt-0.5">-${results.softwareSavingsMonthly}/mo</p>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-darkBg border border-slate-200/80 dark:border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">ROI Multiplier</p>
                <p className="text-sm sm:text-base font-mono font-black text-primary mt-0.5">{results.roiPercentage}%</p>
              </div>
            </div>
          </div>

          {/* Breakdown Progress Bars */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-darkSurface/60 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-syne font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              Where Your Savings Come From:
            </h3>

            <div className="space-y-3.5">
              {/* Labor */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Staff Labor & Shift Settlement Efficiency</span>
                  <span className="text-primary font-mono">${results.laborSavingsMonthly.toLocaleString()} / mo</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-darkBg overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              {/* Software */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Software License Elimination vs Legacy POS</span>
                  <span className="text-emerald-500 font-mono">${results.softwareSavingsMonthly.toLocaleString()} / mo</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-darkBg overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              {/* Shrinkage */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Order Void Error & Ingredient Shrinkage Recovery</span>
                  <span className="text-amber-500 font-mono">${results.shrinkageSavingsMonthly.toLocaleString()} / mo</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-darkBg overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <ShieldCheck size={14} className="text-primary" />
                <span>Model calculated for {inputs.locations} locations</span>
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-darkBg hover:border-primary/40 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 size={12} />
                <span>{copied ? 'Link Copied!' : 'Share ROI Model'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
