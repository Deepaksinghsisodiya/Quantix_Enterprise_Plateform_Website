'use client';

// src/features/FAQ/components/FAQAccordionItem.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQAccordionItemProps } from '../Types/FAQTypes';

export const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({
  faq,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-300 bg-white dark:bg-slate-900/90 overflow-hidden relative',
        isOpen
          ? 'border-[#FF4F00]/45 border-l-4 border-l-[#FF4F00] bg-gradient-to-r from-orange-500/[0.03] via-white to-white dark:via-slate-900 dark:to-slate-900 shadow-md shadow-orange-500/5'
          : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
      )}
    >
      {/* Question Header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left cursor-pointer group select-none p-3.5 sm:p-4 gap-2.5 sm:gap-3"
        aria-expanded={isOpen}
      >
        <div className="flex-1 pr-1">
          {/* Question Text */}
          <h3 className="font-syne font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-snug group-hover:text-[#FF4F00] transition-colors duration-200">
            {faq.question}
          </h3>
        </div>

        {/* Animated +/x indicator */}
        <div
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-300',
            isOpen
              ? 'bg-[#FF4F00] border-[#FF4F00] text-white shadow-sm'
              : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 group-hover:border-orange-500/40 group-hover:text-[#FF4F00] group-hover:bg-orange-500/5'
          )}
        >
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.4]" />
          </motion.div>
        </div>
      </button>

      {/* Expandable Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/80 mx-3.5 sm:mx-4">
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQAccordionItem;
