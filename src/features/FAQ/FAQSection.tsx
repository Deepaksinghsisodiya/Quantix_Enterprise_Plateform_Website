'use client';

// src/features/FAQ/FAQSection.tsx
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FAQSectionProps } from './Types/FAQTypes';
import FAQAccordionItem from './components/FAQAccordionItem';
import FAQSkeleton from './components/FAQSkeleton';

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs = [],
  isLoading = false,
  title = 'Frequently Asked Questions',
  subtitle = "Can't find what you're looking for?",
  badgeText = 'FAQ',
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const isSingleItem = !isLoading && faqs.length === 1;
  const useGrid = isLoading || faqs.length > 1;

  // Hide section entirely if API returned nothing and we're not loading
  if (!isLoading && faqs.length === 0) return null;

  return (
    <section
      className="bg-white dark:bg-slate-950 py-8 sm:py-12 border-b border-slate-100 dark:border-slate-800 transition-colors"
      id="faq"
    >
      <div className="site-container">
        <div className={cn('mx-auto', isSingleItem ? 'max-w-2xl' : 'max-w-5xl')}>

          {/* Section Header */}
          <div className="mx-auto mb-6 sm:mb-8 max-w-xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FF4D00] mb-3">
              {badgeText}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-syne font-extrabold text-slate-900 dark:text-white leading-snug">
              {title}
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              {subtitle}{' '}
              <a href="/contact" className="font-semibold text-[#FF4D00] hover:underline">
                Contact our team.
              </a>
            </p>
          </div>

          {/* FAQ Grid / List */}
          <div
            className={cn(
              'w-full',
              useGrid
                ? 'grid gap-3 sm:gap-4 md:grid-cols-2 md:items-start'
                : 'space-y-3'
            )}
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <FAQSkeleton key={i} />)
              : faqs.map((faq) => (
                  <FAQAccordionItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={() => toggle(faq.id)}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
