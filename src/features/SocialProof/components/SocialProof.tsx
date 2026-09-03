// src/features/SocialProof/components/SocialProof.tsx
'use client';

import React from 'react';
import { ShieldCheck, TrendingUp, Store, Globe2 } from 'lucide-react';
import { SocialProofProps, SocialProofData } from '../Types/SocialProofTypes';

const DEFAULT_STATS: SocialProofData = {
  merchants: 50000,
  transactions: 100000000,
  uptime: 99.99,
  rating: 4.9,
  countries: 47,
  gmvProcessed: '$250M+',
  activeTerminals: 12500,
};

export const SocialProof: React.FC<SocialProofProps> = ({ stats, isLoading, className = "" }) => {
  const displayStats = stats || DEFAULT_STATS;

  // Clean, accurate numbers format for all screen sizes
  const formatNumber = (num?: number, fallback: string = '50K+') => {
    if (num === undefined || num === null) return fallback;
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B+`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(0)}M+`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K+`;
    return num.toLocaleString();
  };

  return (
    <div className={`relative w-full rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-lg sm:shadow-xl shadow-slate-900/5 backdrop-blur-xl p-3.5 sm:p-5 md:p-7 overflow-hidden ${className}`}>
      {/* Top Accent Gradient Hairline */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
        {/* 1. Merchants */}
        <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-100/80 dark:border-slate-800/60 hover:border-orange-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform mb-1 sm:mb-2 shadow-xs">
            <Store className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            {isLoading ? (
              <span className="inline-block w-14 sm:w-20 h-6 sm:h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            ) : (
              formatNumber(displayStats.merchants, '50K+')
            )}
          </h3>
          <p className="text-[10px] sm:text-xs font-syne font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-0.5 sm:mt-1">
            Active Store Chains
          </p>
          <p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 font-medium hidden sm:block mt-0.5">
            Multi-unit franchises & networks
          </p>
        </div>

        {/* 2. GMV / Transactions */}
        <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-100/80 dark:border-slate-800/60 hover:border-emerald-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform mb-1 sm:mb-2 shadow-xs">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            {isLoading ? (
              <span className="inline-block w-14 sm:w-20 h-6 sm:h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            ) : (
              displayStats.gmvProcessed || `${formatNumber(displayStats.transactions, '100M+')} Vol`
            )}
          </h3>
          <p className="text-[10px] sm:text-xs font-syne font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-0.5 sm:mt-1">
            Annual GMV Flow
          </p>
          <p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 font-medium hidden sm:block mt-0.5">
            Processed seamlessly without lag
          </p>
        </div>

        {/* 3. Uptime SLA */}
        <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-100/80 dark:border-slate-800/60 hover:border-blue-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform mb-1 sm:mb-2 shadow-xs">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="flex items-center justify-center gap-1">
            <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              {isLoading ? (
                <span className="inline-block w-14 sm:w-20 h-6 sm:h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              ) : (
                `${displayStats.uptime || 99.99}%`
              )}
            </h3>
            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" title="Live SLA Active" />
          </div>
          <p className="text-[10px] sm:text-xs font-syne font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-0.5 sm:mt-1">
            Enterprise SLA
          </p>
          <p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 font-medium hidden sm:block mt-0.5">
            Offline-first dual mesh failover
          </p>
        </div>

        {/* 4. Global Markets */}
        <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-100/80 dark:border-slate-800/60 hover:border-purple-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform mb-1 sm:mb-2 shadow-xs">
            <Globe2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            {isLoading ? (
              <span className="inline-block w-14 sm:w-20 h-6 sm:h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            ) : (
              `${displayStats.countries || 47}+`
            )}
          </h3>
          <p className="text-[10px] sm:text-xs font-syne font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-0.5 sm:mt-1">
            Global Markets
          </p>
          <p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 font-medium hidden sm:block mt-0.5">
            Multi-tax & fiscal compliance
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
