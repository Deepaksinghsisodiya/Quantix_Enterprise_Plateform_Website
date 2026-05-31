// src/features/ROI/ROICalculator.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, DollarSign, Clock, TrendingUp, Calendar, RotateCcw, ShieldCheck, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export type BusinessType = 'restaurant' | 'retail';
export type CurrentSystem = 'manual' | 'competitor' | 'none';

interface ROIInputs {
  businessType: BusinessType;
  locations: number;
  dailyTransactions: number;
  currentSystem: CurrentSystem;
  employees: number;
}

const DEFAULT_INPUTS: ROIInputs = {
  businessType: 'restaurant',
  locations: 1,
  dailyTransactions: 100,
  currentSystem: 'manual',
  employees: 5,
};

const AVG_MINUTES_SAVED_PER_DAY: Record<CurrentSystem, number> = {
  manual: 45,
  competitor: 20,
  none: 60,
};

const AVG_HOURLY_RATE = 18;

export const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ROIInputs>(DEFAULT_INPUTS);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateInput = <K extends keyof ROIInputs>(key: K, value: ROIInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setInputs(DEFAULT_INPUTS);
    setShowResults(false);
  };

  const results = useMemo(() => {
    const { businessType, locations, dailyTransactions, currentSystem, employees } = inputs;
    const subscriptionPrice = locations <= 1 ? 49 : locations <= 5 ? 99 : 249;

    const minutesSaved = AVG_MINUTES_SAVED_PER_DAY[currentSystem];
    const timeSavedMinutes = employees * minutesSaved * 30;
    const timeSavedHours = timeSavedMinutes / 60;
    const labourSavings = timeSavedHours * AVG_HOURLY_RATE;

    const errorRate = currentSystem === 'manual' ? 0.03 : currentSystem === 'none' ? 0.05 : 0.01;
    const avgOrderValue = businessType === 'restaurant' ? 22 : 35;
    const errorReduction = dailyTransactions * 30 * avgOrderValue * errorRate * 0.8;

    const wasteMultiplier = businessType === 'restaurant' ? 0.04 : 0.02;
    const revenue = dailyTransactions * avgOrderValue * 30;
    const wasteReduction = revenue * wasteMultiplier * locations;

    const costSaved = labourSavings + errorReduction + wasteReduction;
    const monthlySavings = Math.max(0, costSaved - subscriptionPrice);
    const roiPercentage = subscriptionPrice > 0 ? Math.round((monthlySavings / subscriptionPrice) * 100) : 0;
    const paybackDays = monthlySavings > 0 ? Math.ceil(subscriptionPrice / (monthlySavings / 30)) : 0;
    const timeSavedWeek = Math.round((timeSavedHours / 30) * 7 * 10) / 10;

    return {
      monthlySavings: Math.round(monthlySavings),
      timeSavedPerWeek: timeSavedWeek,
      roiPercentage,
      paybackDays: Math.max(1, paybackDays),
      subscriptionPrice,
      breakdown: {
        labourSavings: Math.round(labourSavings),
        errorReduction: Math.round(errorReduction),
        wasteReduction: Math.round(wasteReduction),
      }
    };
  }, [inputs]);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/roi-calculator?biz=${inputs.businessType}&loc=${inputs.locations}&txn=${inputs.dailyTransactions}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        toast.success('ROI Share link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      });
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto py-12">
      {/* Configuration Form Card */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 sm:p-10 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        
        <div className="flex items-center gap-3 text-white mb-8 border-b border-slate-800/60 pb-4">
          <Calculator className="text-blue-500" />
          <h3 className="text-lg font-syne font-bold uppercase tracking-tight">Your Business Profile</h3>
        </div>

        <div className="space-y-6">
          {/* Business Type Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Business Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(['restaurant', 'retail'] as BusinessType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateInput('businessType', type)}
                    className={`rounded-xl py-3 text-xs font-bold capitalize transition-all cursor-pointer border ${
                      inputs.businessType === type
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Setup System */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current POS setup</label>
              <div className="grid grid-cols-3 gap-2">
                {(['manual', 'competitor', 'none'] as CurrentSystem[]).map((sys) => (
                  <button
                    key={sys}
                    type="button"
                    onClick={() => updateInput('currentSystem', sys)}
                    className={`rounded-xl py-3 text-[10px] font-bold capitalize transition-all cursor-pointer border ${
                      inputs.currentSystem === sys
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sys === 'competitor' ? 'Other POS' : sys}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Location / Volume Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Locations</span>
                <span className="text-white font-mono font-bold">{inputs.locations}</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={inputs.locations}
                onChange={(e) => updateInput('locations', Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg appearance-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Daily Transactions</span>
                <span className="text-white font-mono font-bold">{inputs.dailyTransactions}</span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={inputs.dailyTransactions}
                onChange={(e) => updateInput('dailyTransactions', Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg appearance-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Employees count</span>
                <span className="text-white font-mono font-bold">{inputs.employees}</span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={inputs.employees}
                onChange={(e) => updateInput('employees', Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex gap-3 pt-6 border-t border-slate-800/60 mt-6">
            <button
              onClick={() => setShowResults(true)}
              className="rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 px-8 text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-blue-600/20"
            >
              Analyze Savings ROI &rarr;
            </button>
            <button
              onClick={reset}
              className="rounded-xl border border-slate-800 hover:bg-slate-900 py-3.5 px-6 text-xs font-bold text-slate-400 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* ROI Results Panels */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="space-y-6"
          >
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/20 border border-slate-800 p-5 rounded-2xl text-center space-y-1 backdrop-blur-sm">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <DollarSign size={16} />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">${results.monthlySavings.toLocaleString()}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Monthly Savings</div>
              </div>

              <div className="bg-slate-900/20 border border-slate-800 p-5 rounded-2xl text-center space-y-1 backdrop-blur-sm">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
                  <Clock size={16} />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">{results.timeSavedPerWeek} hrs</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Time Saved / Wk</div>
              </div>

              <div className="bg-slate-900/20 border border-slate-800 p-5 rounded-2xl text-center space-y-1 backdrop-blur-sm">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto">
                  <TrendingUp size={16} />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">{results.roiPercentage}%</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Projected ROI</div>
              </div>

              <div className="bg-slate-900/20 border border-slate-800 p-5 rounded-2xl text-center space-y-1 backdrop-blur-sm">
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                  <Calendar size={16} />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">{results.paybackDays} days</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Payback Period</div>
              </div>
            </div>

            {/* Visual breakdown progress metrics */}
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 backdrop-blur-md space-y-6">
              <h4 className="text-xs font-syne font-bold uppercase text-slate-400 tracking-wider">Estimated Savings Breakdown</h4>
              
              <div className="space-y-4">
                {[
                  { label: 'Labor Cost Optimization', value: results.breakdown.labourSavings, pct: Math.round((results.breakdown.labourSavings / (results.breakdown.labourSavings + results.breakdown.errorReduction + results.breakdown.wasteReduction)) * 100) || 0, color: 'bg-blue-600' },
                  { label: 'Error reduction (80% recovery)', value: results.breakdown.errorReduction, pct: Math.round((results.breakdown.errorReduction / (results.breakdown.labourSavings + results.breakdown.errorReduction + results.breakdown.wasteReduction)) * 100) || 0, color: 'bg-emerald-500' },
                  { label: 'Waste mitigation', value: results.breakdown.wasteReduction, pct: Math.round((results.breakdown.wasteReduction / (results.breakdown.labourSavings + results.breakdown.errorReduction + results.breakdown.wasteReduction)) * 100) || 0, color: 'bg-purple-500' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white font-mono">${item.value.toLocaleString()}/mo ({item.pct}%)</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Secure verification footers */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                  <ShieldCheck size={14} className="text-emerald-500" /> Based on benchmark average POS rates
                </div>
                <button
                  onClick={handleShare}
                  className="rounded-xl border border-slate-800 hover:bg-slate-900 py-2.5 px-4 text-xs font-bold text-slate-300 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Share2 size={13} /> {copied ? 'Copied!' : 'Share ROI Results'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ROICalculator;
