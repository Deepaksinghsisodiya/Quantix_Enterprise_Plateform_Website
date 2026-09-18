// src/features/SocialProof/components/SocialProof.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, TrendingUp, Store, Globe2 } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';
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

// Smooth count-up helper component triggered when scrolled into view
const AnimatedNumber: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  fallbackText?: string;
}> = ({ target, suffix = '', prefix = '', decimals = 0, fallbackText }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [current, setCurrent] = useState(0);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isInView || target <= 0) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (val) => {
        if (isMountedRef.current) {
          setCurrent(decimals > 0 ? parseFloat(val.toFixed(decimals)) : Math.round(val));
        }
      },
    });
    return () => {
      controls.stop();
    };
  }, [isInView, target, decimals]);

  if (!target && fallbackText) {
    return <span>{fallbackText}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {isInView ? (decimals > 0 ? current.toFixed(decimals) : current.toLocaleString()) : 0}
      {suffix}
    </span>
  );
};

export const SocialProof: React.FC<SocialProofProps> = ({ stats, isLoading, className = '' }) => {
  const displayStats = stats || DEFAULT_STATS;

  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-slate-900/5 dark:shadow-black/50 backdrop-blur-2xl overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Ambient background illumination */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_-20%,rgba(255,79,0,0.06),transparent_75%)]" />

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4">

        {/* 1. Active Outlets */}
        <div className="relative overflow-hidden cursor-default flex flex-col items-center justify-center text-center p-3.5 sm:p-5 md:p-6 border-r border-b md:border-b-0 border-slate-200/70 dark:border-slate-800/70 group transition-all duration-300">
          {/* Top Laser Beam on Hover */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FF4F00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Soft Spotlight Aura */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,79,0,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 text-[#FF4F00] ring-4 ring-orange-500/5 dark:ring-orange-500/10 mb-2 sm:mb-2.5 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:ring-orange-500/25 group-hover:shadow-lg group-hover:shadow-orange-500/15 transition-all duration-300 ease-out">
            <Store className="h-4.5 w-4.5 sm:h-5 sm:w-5 stroke-[2.2]" />
          </div>

          <div className="relative z-10 group-hover:scale-[1.04] transition-transform duration-300 ease-out origin-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-syne font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300">
              {isLoading ? (
                <span className="inline-block w-14 sm:w-20 h-6 sm:h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              ) : (
                <AnimatedNumber target={50} suffix="K+" fallbackText="50K+" />
              )}
            </h3>
          </div>

          <p className="relative z-10 text-[10.5px] sm:text-xs font-syne font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mt-1 group-hover:text-[#FF4F00] dark:group-hover:text-orange-400 transition-colors duration-200">
            Active Outlets
          </p>
          <p className="relative z-10 text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">
            Multi-unit store networks
          </p>
        </div>

        {/* 2. GMV Flow */}
        <div className="relative overflow-hidden cursor-default flex flex-col items-center justify-center text-center p-3.5 sm:p-5 md:p-6 border-b md:border-b-0 md:border-r border-slate-200/70 dark:border-slate-800/70 group transition-all duration-300">
          {/* Top Laser Beam on Hover */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Soft Spotlight Aura */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 ring-4 ring-emerald-500/5 dark:ring-emerald-500/10 mb-2 sm:mb-2.5 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:ring-emerald-500/25 group-hover:shadow-lg group-hover:shadow-emerald-500/15 transition-all duration-300 ease-out">
            <TrendingUp className="h-4.5 w-4.5 sm:h-5 sm:w-5 stroke-[2.2]" />
          </div>

          <div className="relative z-10 group-hover:scale-[1.04] transition-transform duration-300 ease-out origin-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-syne font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300">
              {isLoading ? (
                <span className="inline-block w-14 sm:w-20 h-6 sm:h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              ) : displayStats.gmvProcessed ? (
                <span>{displayStats.gmvProcessed}</span>
              ) : (
                <AnimatedNumber target={250} prefix="$" suffix="M+" fallbackText="$250M+" />
              )}
            </h3>
          </div>

          <p className="relative z-10 text-[10.5px] sm:text-xs font-syne font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
            Annual GMV
          </p>
          <p className="relative z-10 text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">
            Processed without latency
          </p>
        </div>

        {/* 3. Uptime SLA */}
        <div className="relative overflow-hidden cursor-default flex flex-col items-center justify-center text-center p-3.5 sm:p-5 md:p-6 border-r border-slate-200/70 dark:border-slate-800/70 group transition-all duration-300">
          {/* Top Laser Beam on Hover */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Soft Spotlight Aura */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 ring-4 ring-blue-500/5 dark:ring-blue-500/10 mb-2 sm:mb-2.5 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:ring-blue-500/25 group-hover:shadow-lg group-hover:shadow-blue-500/15 transition-all duration-300 ease-out">
            <ShieldCheck className="h-4.5 w-4.5 sm:h-5 sm:w-5 stroke-[2.2]" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>

          <div className="relative z-10 group-hover:scale-[1.04] transition-transform duration-300 ease-out origin-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-syne font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300">
              {isLoading ? (
                <span className="inline-block w-14 sm:w-20 h-6 sm:h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              ) : (
                <AnimatedNumber target={displayStats.uptime || 99.99} suffix="%" decimals={2} fallbackText="99.99%" />
              )}
            </h3>
          </div>

          <p className="relative z-10 text-[10.5px] sm:text-xs font-syne font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            Uptime SLA
          </p>
          <p className="relative z-10 text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">
            Offline dual-mesh fallback
          </p>
        </div>

        {/* 4. Global Markets */}
        <div className="relative overflow-hidden cursor-default flex flex-col items-center justify-center text-center p-3.5 sm:p-5 md:p-6 group transition-all duration-300">
          {/* Top Laser Beam on Hover */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Soft Spotlight Aura */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 ring-4 ring-purple-500/5 dark:ring-purple-500/10 mb-2 sm:mb-2.5 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:ring-purple-500/25 group-hover:shadow-lg group-hover:shadow-purple-500/15 transition-all duration-300 ease-out">
            <Globe2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 stroke-[2.2]" />
          </div>

          <div className="relative z-10 group-hover:scale-[1.04] transition-transform duration-300 ease-out origin-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-syne font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300">
              {isLoading ? (
                <span className="inline-block w-14 sm:w-20 h-6 sm:h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              ) : (
                <AnimatedNumber target={displayStats.countries || 47} suffix="+" fallbackText="47+" />
              )}
            </h3>
          </div>

          <p className="relative z-10 text-[10.5px] sm:text-xs font-syne font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
            Global Markets
          </p>
          <p className="relative z-10 text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">
            Multi-tax & fiscal compliance
          </p>
        </div>

      </div>
    </div>
  );
};

export default SocialProof;
