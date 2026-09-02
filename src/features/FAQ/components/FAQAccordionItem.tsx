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
        'p-4 sm:p-5 rounded-2xl border transition-all duration-300 bg-white dark:bg-slate-900',
        isOpen
          ? 'border-[#FF4D00]/50 bg-orange-500/[0.03] dark:bg-orange-950/10 shadow-lg shadow-orange-500/5'
          : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      )}
    >
      {/* Question Header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left cursor-pointer group select-none"
      >
        <span className="font-syne font-bold text-slate-900 dark:text-white text-xs sm:text-sm pr-3 leading-snug group-hover:text-[#FF4D00] transition-colors duration-200">
          {faq.question}
        </span>

        {/* Animated +/x indicator */}
        <div
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
            isOpen
              ? 'bg-[#FF4D00] border-[#FF4D00] text-white shadow-sm'
              : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 dark:group-hover:bg-slate-700 dark:group-hover:text-slate-200'
          )}
        >
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
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
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3">
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
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
