// src/features/CaseStudies/components/CaseStudyCard.tsx
'use client';

import React from 'react';
import { Building2, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { CaseStudyDto } from '../Types/CaseStudiesTypes';
import Link from 'next/link';

interface CaseStudyCardProps {
  study: CaseStudyDto;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 p-6 sm:p-8 overflow-hidden">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-amber-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Industry Tag & ROI Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
            <Building2 className="w-3.5 h-3.5 text-primary" />
            {study.industry}
          </span>
          {study.statValue && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-syne font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              {study.statValue}
            </span>
          )}
        </div>

        {/* Company Name & Title */}
        <h4 className="text-xs font-syne font-bold text-primary tracking-wide uppercase mb-1">
          {study.companyName}
        </h4>
        <h3 className="text-lg sm:text-xl font-syne font-black text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors duration-200 mb-4">
          {study.title}
        </h3>

        {/* Challenge & Solution Grid */}
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-4 mb-6">
          <div>
            <span className="font-bold block text-xs uppercase tracking-wider text-primary/90 mb-1">
              Challenge:
            </span>
            <p className="line-clamp-2 text-xs sm:text-sm">{study.challenge}</p>
          </div>
          <div>
            <span className="font-bold block text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Result:
            </span>
            <p className="line-clamp-2 text-xs sm:text-sm">{study.result}</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {study.statLabel || "Verified Enterprise Result"}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-syne font-bold text-primary group-hover:translate-x-1 transition-transform">
          Read Story <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

export default CaseStudyCard;
