// src/features/CaseStudies/components/CaseStudyCard.tsx
'use client';

import React from 'react';
import { Building2, TrendingUp, CheckCircle2, ArrowRight, Sparkles, Zap } from 'lucide-react';
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
      transition={{ duration: 0.2 }}
      className={`group relative flex flex-col justify-between rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-md hover:shadow-2xl hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-300 p-5 sm:p-7 overflow-hidden h-full ${
        isFeatured ? 'max-w-3xl mx-auto w-full' : ''
      }`}
    >
      {/* Top Accent Glowing Laser Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Subtle Radial Ambient Glow on Hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_top_right,#FF4F0012,transparent_65%)]" />

      <div className="relative z-10">
        {/* Header Row: Company Eyebrow & Industry Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {study.companyName}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 shrink-0 shadow-2xs">
            <Building2 className="w-3 h-3 text-[#FF4F00]" />
            <span>{study.industry}</span>
          </span>
        </div>

        {/* Hero Stat Box: Metric-First */}
        <div className="my-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-orange-500/[0.07] via-amber-500/[0.04] to-transparent border border-orange-500/25 dark:border-orange-500/30 flex items-center justify-between gap-3 shadow-2xs group-hover:border-orange-500/40 transition-colors">
          <div>
            <div className="text-2xl sm:text-3xl font-syne font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 tracking-tight leading-none">
              {study.statValue || '+38%'}
            </div>
            <div className="text-[10px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              {study.statLabel || 'Verified Outcome'}
            </div>
          </div>
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00] shrink-0 border border-orange-500/20 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
          </div>
        </div>

        {/* Main Title - Fully visible, no ellipses */}
        <h3 className="text-sm sm:text-base font-syne font-extrabold text-slate-950 dark:text-white leading-snug group-hover:text-[#FF4F00] transition-colors duration-200 mb-3.5">
          {study.title}
        </h3>

        {/* Challenge ➔ Outcome Pipeline - Fully visible, no ellipses */}
        <div className="space-y-2.5 mb-5">
          {/* Pain Point */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/70">
            <span className="px-1.5 py-0.5 rounded text-[8.5px] font-mono font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
              PAIN
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal text-xs sm:text-[13px]">
              {study.challenge}
            </p>
          </div>

          {/* Verified Outcome */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/[0.06] dark:bg-emerald-950/20 border border-emerald-500/20">
            <span className="px-1.5 py-0.5 rounded text-[8.5px] font-mono font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
              OUTCOME
            </span>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium text-xs sm:text-[13px]">
              {study.result}
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA & Verified Enterprise Badge */}
      <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          Verified ROI
        </span>

        <Link
          href={`/case-studies/${study.slug}`}
          className="inline-flex items-center gap-1 text-xs font-syne font-bold text-[#FF4F00] group-hover:translate-x-1 transition-all"
        >
          <span>Read Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;
