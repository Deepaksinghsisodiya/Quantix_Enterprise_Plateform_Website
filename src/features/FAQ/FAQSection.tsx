'use client';

// src/features/FAQ/FAQSection.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { FAQSectionProps } from './Types/FAQTypes';
import FAQAccordionItem from './components/FAQAccordionItem';
import FAQSkeleton from './components/FAQSkeleton';

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs = [],
  isLoading = false,
  title = 'Frequently Asked Questions',
  subtitle = "Have questions? We're here to help. Can't find what you're looking for?",
  badgeText = 'FREQUENTLY ASKED QUESTIONS',
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  // Hide section only if not loading and zero FAQs available
  if (!isLoading && faqs.length === 0) return null;

  return (
    <section
      className="py-8 sm:py-12 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300 relative overflow-hidden"
      id="faq"
    >
      <div className="site-container px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header — Clean & Centered */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-[10px] font-black uppercase tracking-widest text-[#FF4F00] mb-2.5 shadow-2xs">
              <Sparkles className="w-3 h-3 stroke-[2.4] text-[#FF4F00] animate-pulse" />
              <span>{badgeText}</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-syne font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug">
              {title}
            </h2>

            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-lg mx-auto">
              {subtitle}{' '}
              <Link href="/contact" className="font-semibold text-[#FF4F00] hover:underline inline-flex items-center gap-0.5">
                <span>Contact our team</span>
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </Link>
            </p>
          </div>

          {/* 2-2 ke Pair me Grid (Desktop md:grid-cols-2, Mobile 1-Column) with Reduced Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 items-start">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <FAQSkeleton key={`faq-skel-${i}`} />
              ))
            ) : (
              faqs.map((faq, index) => {
                const anyFaq = faq as any;
                const itemId = faq.id || faq.faqId || anyFaq._id || `${faq.question || 'faq'}-${index}`;
                return (
                  <FAQAccordionItem
                    key={itemId}
                    faq={faq}
                    isOpen={openId === itemId}
                    onToggle={() => toggle(itemId)}
                  />
                );
              })
            )}
          </div>

          {/* Bottom Help Text */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Still have questions?{' '}
              <Link
                href="/contact"
                className="font-syne font-bold text-[#FF4F00] hover:underline inline-flex items-center gap-1 ml-1"
              >
                <span>Speak with an Enterprise Specialist</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
