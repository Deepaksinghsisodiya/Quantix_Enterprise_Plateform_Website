// src/features/CaseStudies/components/CaseStudyCard.tsx
'use client';

import React from 'react';
import { Building2, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { CaseStudyDto } from '../Types/CaseStudiesTypes';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CaseStudyCardProps {
  study: CaseStudyDto;
  isFeatured?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, isFeatured = false }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-12px_rgba(255,79,0,0.12)] hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-300 p-6 sm:p-7 overflow-hidden h-full ${
        isFeatured ? 'max-w-3xl mx-auto w-full' : ''
      }`}
    >
      {/* Top Accent Glowing Laser Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Subtle Radial Ambient Glow on Hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_top_right,rgba(255,79,0,0.08),transparent_65%)]" />

      <div className="relative z-10">
        {/* Header Row: Company Eyebrow & Industry Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider truncate">
              {study.companyName}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 shrink-0 shadow-2xs">
            <Building2 className="w-3 h-3 text-[#FF4F00]" />
            <span>{study.industry}</span>
          </span>
        </div>

        {/* Hero Stat Box: Metric-First */}
        <div className="my-4 p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500/[0.08] via-amber-500/[0.04] to-transparent border border-orange-500/20 dark:border-orange-500/30 flex items-center justify-between gap-3 shadow-2xs group-hover:border-orange-500/40 transition-colors">
          <div>
            <div className="text-2xl sm:text-3xl font-syne font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 tracking-tight leading-none">
              {study.statValue || '+38%'}
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mt-1">
              {study.statLabel || 'Verified Outcome'}
            </div>
          </div>
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] flex items-center justify-center text-white shrink-0 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5 stroke-[2.4]" />
          </div>
        </div>

        {/* Main Title - Fully visible, no ellipses */}
        <h3 className="text-base sm:text-lg font-syne font-black text-slate-950 dark:text-white leading-snug group-hover:text-[#FF4F00] transition-colors duration-200 mb-4">
          {study.title}
        </h3>

        {/* Challenge ➔ Outcome Pipeline - Fully visible */}
        <div className="space-y-2.5 mb-6">
          {/* Pain Point */}
          <div className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
            <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0 mt-0.5">
              CHALLENGE
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal text-xs sm:text-[13px]">
              {study.challenge}
            </p>
          </div>

          {/* Verified Outcome */}
          <div className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-emerald-500/[0.06] dark:bg-emerald-950/25 border border-emerald-500/20">
            <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
              RESULT
            </span>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium text-xs sm:text-[13px]">
              {study.result}
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA & Verified Enterprise Badge */}
      <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Verified ROI Ledger</span>
        </span>

        <Link
          href={`/case-studies/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-syne font-bold text-[#FF4F00] hover:text-[#FF6B2B] transition-all group-hover:translate-x-1"
        >
          <span>Read Full Study</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;
