// src/features/CaseStudies/components/CaseStudiesSection.tsx
'use client';

import React from 'react';
import { CaseStudyDto } from '../Types/CaseStudiesTypes';
import { DEFAULT_CASE_STUDIES } from '../constants/defaultCaseStudies';
import { CaseStudyCard } from './CaseStudyCard';
import { Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface CaseStudiesSectionProps {
  studies?: CaseStudyDto[];
  isLoading?: boolean;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  studies = [],
  isLoading = false,
}) => {
  const displayStudies = studies.length > 0 ? studies : DEFAULT_CASE_STUDIES;

  return (
    <section className="py-14 sm:py-20 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="site-container px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-syne font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
            <Award className="w-3.5 h-3.5" />
            Proven Impact & ROI
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight mb-4">
            Real Businesses. Quantified Growth.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            Discover how leading restaurants, multi-location retail chains, and enterprise brands modernize operations and accelerate revenue with Quantix.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {displayStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-syne font-bold text-sm hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-md active:scale-95"
          >
            Explore All Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
