// src/features/SocialProof/SocialProofStats.tsx
import React from 'react';
import { SocialProofData } from './Types/SocialProofTypes';

export interface SocialProofStatsProps {
  stats: SocialProofData | null;
  isLoading: boolean;
}

const DEFAULT_STATS: SocialProofData = {
  merchants: 50000,
  transactions: 1000000,
  uptime: 99.9,
  rating: 4.9,
  countries: 47,
};

export const SocialProofStats: React.FC<SocialProofStatsProps> = ({ stats, isLoading }) => {
  const displayStats = stats || DEFAULT_STATS;

  // Format numbers cleanly
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M+`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-8 rounded-3xl shadow-xl text-center">
      <div className="space-y-1">
        <h2 className="text-3xl md:text-4xl font-syne font-black text-primary">
          {isLoading ? "..." : formatNumber(displayStats.transactions)}
        </h2>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Transactions</p>
      </div>
      <div className="space-y-1 border-l border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl md:text-4xl font-syne font-black text-primary">
          {isLoading ? "..." : formatNumber(displayStats.merchants)}
        </h2>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Active Merchants</p>
      </div>
      <div className="space-y-1 border-l border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl md:text-4xl font-syne font-black text-primary">
          {isLoading ? "..." : `${displayStats.uptime}%`}
        </h2>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Terminal Uptime</p>
      </div>
      <div className="space-y-1 border-l border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl md:text-4xl font-syne font-black text-primary">
          {isLoading ? "..." : `${displayStats.countries}+`}
        </h2>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Countries</p>
      </div>
    </div>
  );
};

export default SocialProofStats;
