'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

export const ROICalculatorSection: React.FC = () => {
  const { openModal } = useContactModal();
  const [locations, setLocations] = useState<number>(3);
  const [dailyOrders, setDailyOrders] = useState<number>(150);

  // Calculations based on industry benchmarks
  const timeSavedPerMonth = Math.round(locations * dailyOrders * 0.08); // hrs per month
  const monthlySavings = Math.round(locations * (dailyOrders * 0.45 + 320)); // $ per month
  const paybackDays = Math.max(4, Math.round(18 / locations));

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-slate-900 border-t border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary-dark dark:text-primary-light mb-4">
            <Calculator size={13} className="stroke-[2.5]" />
            ESTIMATE YOUR RETURN ON INVESTMENT
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Calculate How Much You Save With <span className="text-primary dark:text-primary-light">Quantix</span>
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto">
            Adjust the sliders below to see your estimated monthly labor, inventory error reduction, and operational cost savings.
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto bg-white dark:bg-slate-950 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 dark:border-slate-800 shadow-2xl items-center">
          {/* Sliders Input Side (7 cols) */}
          <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 pb-8 lg:pb-0">
            {/* Slider 1: Number of Locations */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs sm:text-sm font-syne font-bold text-slate-900 dark:text-white">
                <span>Number of Locations / Outlets</span>
                <span className="text-primary font-mono text-base font-black px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
                  {locations} {locations === 1 ? 'Location' : 'Locations'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={locations}
                onChange={(e) => setLocations(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>1 Location</span>
                <span>15 Outlets</span>
                <span>30+ Outlets</span>
              </div>
            </div>

            {/* Slider 2: Daily Orders per Location */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs sm:text-sm font-syne font-bold text-slate-900 dark:text-white">
                <span>Average Daily Orders / Transactions</span>
                <span className="text-primary font-mono text-base font-black px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
                  {dailyOrders} Orders/day
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={500}
                step={10}
                value={dailyOrders}
                onChange={(e) => setDailyOrders(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>30 Orders</span>
                <span>250 Orders</span>
                <span>500+ Orders</span>
              </div>
            </div>
          </div>

          {/* Results Output Side (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-6">
            <div className="w-full space-y-4">
              {/* Monthly Savings Result */}
              <div className="p-4 sm:p-5 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-dark dark:text-primary-light block mb-1">
                  ESTIMATED MONTHLY SAVINGS
                </span>
                <motion.div
                  key={monthlySavings}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl sm:text-4xl font-syne font-black text-primary dark:text-primary-light font-mono tracking-tight"
                >
                  ${monthlySavings.toLocaleString()}
                </motion.div>
                <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                  Saved via reduced order errors & faster staff checkouts
                </span>
              </div>

              {/* Time Saved & Payback */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                  <div className="flex items-center justify-center gap-1 text-primary text-xs font-bold mb-0.5">
                    <Clock size={12} /> Time Saved
                  </div>
                  <div className="text-base font-black font-syne text-slate-900 dark:text-white">
                    {timeSavedPerMonth} hrs/mo
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                  <div className="flex items-center justify-center gap-1 text-primary text-xs font-bold mb-0.5">
                    <TrendingUp size={12} /> Payback Period
                  </div>
                  <div className="text-base font-black font-syne text-slate-900 dark:text-white">
                    {paybackDays} Days
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => openModal("Lock In Your Savings Plan", "CLAIM MY SAVINGS")}
              className="w-full rounded-xl bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-syne font-black text-xs uppercase tracking-wider py-3.5 px-5 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Claim These Savings</span>
              <ArrowRight size={15} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
