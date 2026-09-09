// src/features/CaseStudies/components/CaseStudyCard.tsx
'use client';

import React from 'react';
import { Building2, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { CaseStudyDto } from '../Types/CaseStudiesTypes';
import Link from 'next/link';

interface CaseStudyCardProps {
  study: CaseStudyDto;
  isFeatured?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, isFeatured = false }) => {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-300 p-6 sm:p-8 overflow-hidden ${isFeatured ? 'max-w-3xl mx-auto w-full' : ''
        }`}
    >
      {/* Top Accent Gradient Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-amber-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
            <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
            {study.industry}
          </span>

          {study.statValue && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-syne font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shrink-0 shadow-sm">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
              {study.statValue}
            </span>
          )}
        </div>

        {/* Company Eyebrow */}
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <h4 className="text-xs font-syne font-black text-primary tracking-wider uppercase">
            {study.companyName}
          </h4>
        </div>

        {/* Main Title */}
        <h3 className="text-xl sm:text-2xl font-syne font-black text-slate-950 dark:text-white leading-snug group-hover:text-primary transition-colors duration-200 mb-6">
          {study.title}
        </h3>

        {/* Challenge & Result Boxes */}
        <div className="space-y-3.5 mb-6">
          {/* Challenge Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              Operational Challenge
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {study.challenge}
            </p>
          </div>

          {/* Result Box */}
          <div className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-500/20">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              Verified Outcome
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              {study.result}
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA & Metadata */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-2">
        <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 font-medium">
          <Sparkles className="w-3 h-3 text-amber-500" />
          {study.statLabel || "Verified Enterprise Impact"}
        </span>

        <Link
          href={`/case-studies/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-syne font-bold text-primary group-hover:translate-x-1 transition-transform"
        >
          Read Full Story <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default CaseStudyCard;
