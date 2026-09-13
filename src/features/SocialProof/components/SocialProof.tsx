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
      className={`relative w-full rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 backdrop-blur-2xl p-4 sm:p-6 md:p-8 overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Subtle Ambient Radial Lighting in background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(255,79,0,0.06),transparent_70%)]" />

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        
        {/* 1. Merchants / Active Store Chains */}
        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex flex-col items-center justify-center text-center p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 hover:border-orange-500/30 hover:bg-orange-500/5 dark:hover:bg-orange-500/10 transition-all duration-300 group cursor-default shadow-2xs"
        >
          <div className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-[#FF4F00] group-hover:scale-110 group-hover:shadow-md group-hover:shadow-orange-500/20 transition-all duration-300 mb-2">
            <Store className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5 stroke-[2.2]" />
          </div>
          
          <h3 className="text-xl sm:text-3xl md:text-3xl lg:text-4xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            {isLoading ? (
              <span className="inline-block w-16 sm:w-20 h-7 sm:h-9 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            ) : (
              <AnimatedNumber target={50} suffix="K+" fallbackText="50K+" />
            )}
          </h3>
          
          <p className="text-[10.5px] sm:text-xs font-syne font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mt-1">
            Active Store Chains
          </p>
          <p className="text-[9.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">
            Multi-unit franchises & networks
          </p>
        </motion.div>

        {/* 2. GMV / Transactions */}
        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex flex-col items-center justify-center text-center p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 hover:border-emerald-500/30 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 transition-all duration-300 group cursor-default shadow-2xs"
        >
          <div className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-emerald-500/20 transition-all duration-300 mb-2">
            <TrendingUp className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5 stroke-[2.2]" />
          </div>
          
          <h3 className="text-xl sm:text-3xl md:text-3xl lg:text-4xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            {isLoading ? (
              <span className="inline-block w-16 sm:w-20 h-7 sm:h-9 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            ) : displayStats.gmvProcessed ? (
              <span>{displayStats.gmvProcessed}</span>
            ) : (
              <AnimatedNumber target={100} suffix="M+ Vol" fallbackText="100M+ Vol" />
            )}
          </h3>
          
          <p className="text-[10.5px] sm:text-xs font-syne font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mt-1">
            Annual GMV Flow
          </p>
          <p className="text-[9.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">
            Processed seamlessly without lag
          </p>
        </motion.div>

        {/* 3. Uptime SLA */}
        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex flex-col items-center justify-center text-center p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 hover:border-blue-500/30 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 transition-all duration-300 group cursor-default shadow-2xs"
        >
          <div className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-blue-500/20 transition-all duration-300 mb-2">
            <ShieldCheck className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5 stroke-[2.2]" />
          </div>
          
          <div className="flex items-center justify-center gap-1.5">
            <h3 className="text-xl sm:text-3xl md:text-3xl lg:text-4xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              {isLoading ? (
                <span className="inline-block w-16 sm:w-20 h-7 sm:h-9 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              ) : (
                <AnimatedNumber target={displayStats.uptime || 99.9} suffix="%" decimals={1} fallbackText="99.9%" />
              )}
            </h3>
            <span className="relative flex h-2 w-2 mb-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          
          <p className="text-[10.5px] sm:text-xs font-syne font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mt-1">
            Enterprise SLA
          </p>
          <p className="text-[9.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">
            Offline-first dual mesh failover
          </p>
        </motion.div>

        {/* 4. Global Markets */}
        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex flex-col items-center justify-center text-center p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 hover:border-purple-500/30 hover:bg-purple-500/5 dark:hover:bg-purple-500/10 transition-all duration-300 group cursor-default shadow-2xs"
        >
          <div className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-500/20 transition-all duration-300 mb-2">
            <Globe2 className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5 stroke-[2.2]" />
          </div>
          
          <h3 className="text-xl sm:text-3xl md:text-3xl lg:text-4xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            {isLoading ? (
              <span className="inline-block w-16 sm:w-20 h-7 sm:h-9 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            ) : (
              <AnimatedNumber target={displayStats.countries || 47} suffix="+" fallbackText="47+" />
            )}
          </h3>
          
          <p className="text-[10.5px] sm:text-xs font-syne font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mt-1">
            Global Markets
          </p>
          <p className="text-[9.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">
            Multi-tax & fiscal compliance
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default SocialProof;
