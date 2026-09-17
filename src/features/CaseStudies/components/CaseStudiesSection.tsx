'use client';

import React, { useState, useMemo } from 'react';
import { CaseStudyDto } from '../Types/CaseStudiesTypes';
import { DEFAULT_CASE_STUDIES } from '../constants/defaultCaseStudies';
import { CaseStudyCard } from './CaseStudyCard';
import { TrendingUp, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Utensils, Store, Building2, Layers } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CaseStudiesSectionProps {
  studies?: CaseStudyDto[];
  isLoading?: boolean;
  hideHeader?: boolean;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Industries', icon: Sparkles },
  { id: 'restaurant', label: 'Restaurants & QSR', icon: Utensils },
  { id: 'retail', label: 'Retail & Supermarkets', icon: Store },
  { id: 'hospitality', label: 'Hospitality & Bars', icon: Building2 },
];

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  studies = [],
  isLoading = false,
  hideHeader = false,
}) => {
  // Use real API studies when available, fallback to rich verified default data
  const rawStudies = studies && studies.length > 0 ? studies : DEFAULT_CASE_STUDIES;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const displayStudies = useMemo(() => {
    if (selectedCategory === 'all') return rawStudies;
    if (selectedCategory === 'restaurant') {
      return rawStudies.filter(
        (s) =>
          s.industry.toLowerCase().includes('restaurant') ||
          s.industry.toLowerCase().includes('qsr') ||
          s.industry.toLowerCase().includes('dining')
      );
    }
    if (selectedCategory === 'retail') {
      return rawStudies.filter(
        (s) =>
          s.industry.toLowerCase().includes('retail') ||
          s.industry.toLowerCase().includes('grocery') ||
          s.industry.toLowerCase().includes('market')
      );
    }
    if (selectedCategory === 'hospitality') {
      return rawStudies.filter(
        (s) =>
          s.industry.toLowerCase().includes('hospitality') ||
          s.industry.toLowerCase().includes('bars') ||
          s.industry.toLowerCase().includes('venues')
      );
    }
    return rawStudies;
  }, [rawStudies, selectedCategory]);

  // Mobile carousel state (1 card at a time)
  const [mobileIdx, setMobileIdx] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  // Desktop pagination state
  const [desktopPage, setDesktopPage] = useState<number>(0);
  const desktopPageSize = 6;
  const totalDesktopPages = Math.ceil(displayStudies.length / desktopPageSize);
  const desktopStart = desktopPage * desktopPageSize;
  const currentDesktopStudies = displayStudies.slice(desktopStart, desktopStart + desktopPageSize);

  const handleMobileNext = () => {
    setDirection(1);
    setMobileIdx((prev) => (prev < displayStudies.length - 1 ? prev + 1 : 0));
  };

  const handleMobilePrev = () => {
    setDirection(-1);
    setMobileIdx((prev) => (prev > 0 ? prev - 1 : displayStudies.length - 1));
  };

  return (
    <section
      className={
        hideHeader
          ? 'py-4 sm:py-6 relative overflow-hidden'
          : 'py-10 sm:py-16 lg:py-20 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300 relative overflow-hidden'
      }
    >
      {/* Background Ambient Aura */}
      {!hideHeader && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-linear-to-tr from-orange-500/5 via-amber-500/3 to-transparent blur-3xl pointer-events-none -z-10" />
      )}

      <div className="site-container max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Header - only show when not on the dedicated case studies page */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/25 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#FF4F00] mb-3 shadow-2xs">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.4] text-[#FF4F00] animate-pulse" />
              <span>PROVEN IMPACT & ROI</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-syne font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
              Real Businesses.{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500">
                Quantified Growth.
              </span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed">
              Discover how leading restaurants, multi-location retail chains, and enterprise brands modernize operations and accelerate revenue with Quantix.
            </p>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-90 rounded-md bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 p-6 animate-pulse flex flex-col justify-between"
              >
                <div className="flex justify-between items-center">
                  <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
                </div>
                <div className="h-20 w-full bg-orange-500/10 rounded-md my-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
                </div>
                <div className="h-10 w-full bg-slate-100 dark:bg-slate-800/60 rounded-md mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Industry Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setDesktopPage(0);
                  setMobileIdx(0);
                }}
                className={cn(
                  "inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-syne font-bold transition-all duration-200 cursor-pointer shadow-2xs",
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:border-orange-500/40 hover:text-primary"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5 stroke-[2.2]", isSelected ? "text-orange-400 dark:text-orange-600" : "text-slate-400")} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================= */}
        {/* DESKTOP VIEW (>= md): Clean 2 or 3-Column Paginated Grid */}
        {/* ======================================================= */}
        {!isLoading && displayStudies.length > 0 && (
          <div className="hidden md:block">
            <div
              className={
                currentDesktopStudies.length === 1
                  ? 'max-w-2xl mx-auto'
                  : currentDesktopStudies.length === 2
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
              }
            >
              {currentDesktopStudies.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  isFeatured={currentDesktopStudies.length === 1}
                />
              ))}
            </div>

            {/* Desktop Pagination Controls (if > 1 page) */}
            {totalDesktopPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => setDesktopPage((prev) => Math.max(0, prev - 1))}
                  disabled={desktopPage === 0}
                  className="h-9 w-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:border-orange-500 hover:text-[#FF4F00] transition-colors shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Previous desktop page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-400 px-2">
                  Page {desktopPage + 1} of {totalDesktopPages}
                </span>
                <button
                  onClick={() => setDesktopPage((prev) => Math.min(totalDesktopPages - 1, prev + 1))}
                  disabled={desktopPage === totalDesktopPages - 1}
                  className="h-9 w-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:border-orange-500 hover:text-[#FF4F00] transition-colors shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Next desktop page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================= */}
        {/* MOBILE VIEW (< md): 1-Card Compact Paginated Slider     */}
        {/* ======================================================= */}
        {!isLoading && displayStudies.length > 0 && (
          <div className="block md:hidden">
            <div className="relative min-h-95">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayStudies[mobileIdx]?.id || mobileIdx}
                  initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  <CaseStudyCard study={displayStudies[mobileIdx]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Carousel Navigation Controls */}
            {displayStudies.length > 1 && (
              <div className="flex items-center justify-between mt-5 px-1">
                {/* Previous Button */}
                <button
                  onClick={handleMobilePrev}
                  className="h-9 w-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 active:scale-95 shadow-xs cursor-pointer"
                  aria-label="Previous study"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Pagination Dots & Counter */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    {displayStudies.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDirection(i > mobileIdx ? 1 : -1);
                          setMobileIdx(i);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          i === mobileIdx
                            ? 'w-6 bg-[#FF4F00]'
                            : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold ml-1.5">
                    0{mobileIdx + 1} / 0{displayStudies.length}
                  </span>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleMobileNext}
                  className="h-9 w-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 active:scale-95 shadow-xs cursor-pointer"
                  aria-label="Next study"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom CTA on Homepage only */}
        {!hideHeader && displayStudies.length > 0 && (
          <div className="mt-10 sm:mt-14 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-md bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-syne font-bold text-xs sm:text-sm hover:bg-[#FF4F00] dark:hover:bg-[#FF4F00] dark:hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Explore All Case Studies</span>
              <ArrowRight className="w-4 h-4 stroke-[2.4]" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
