'use client';

// src/features/FAQ/FAQSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQItem } from "./Types/FAQTypes";

export interface FAQSectionProps {
  faqs: FAQItem[];
  isLoading: boolean;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "trial",
    question: "How long is the free trial and what does it include?",
    answer: "Our free trial lasts for 3 days and grants full access to all features (including catalog items, real-time matrix sync, and offline receipts). No credit card is required to sign up."
  },
  {
    id: "offline",
    question: "Does Quantix POS run if the internet goes offline?",
    answer: "Yes, Quantix POS runs on an offline-first indexed caching layer. You can check out carts, scan barcode SKUs, and store sales locally. Transactions automatically sync to the server when connection is restored."
  },
  {
    id: "compatibility",
    question: "What devices and terminals are compatible with Quantix POS?",
    answer: "Quantix is fully compatible with standard thermal receipt printers, Bluetooth card readers, barcode scanners, cash drawers, and weighing scale devices."
  },
  {
    id: "security",
    question: "Is my business data secure on the cloud?",
    answer: "Absolutely. We encrypt all data in transit using SSL/TLS protocols and secure stored data using database encryption. We comply with standard PCI checkout policies."
  }
];

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, isLoading }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const displayFAQs = faqs.length > 0 ? faqs : DEFAULT_FAQS;
  const isSingleFAQ = !isLoading && displayFAQs.length === 1;
  const useTwoColumnLayout = isLoading || displayFAQs.length > 1;

  return (
    <section className="bg-white dark:bg-slate-950 py-6 sm:py-8 border-b border-slate-100 dark:border-slate-800 transition-colors" id="faq">
      <div className="site-container">
        <div className={cn("mx-auto", isSingleFAQ ? "max-w-180" : "max-w-5xl")}>
          {/* Header */}
          <div className="mx-auto mb-5 max-w-170 text-center sm:mb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary-light mb-2 shadow-xs">
              FAQ
            </div>
            <h2 className="text-xl sm:text-2xl font-syne font-extrabold text-slate-900 dark:text-white md:text-3xl leading-snug">
              Frequently Asked Questions
            </h2>
            <p className="mt-1.5 text-slate-500 dark:text-slate-400 font-medium text-xs sm:text-sm">
              Can't find what you're looking for?{" "}
              <a href="/contact" className="font-bold text-primary hover:underline">
                Contact our team.
              </a>
            </p>
          </div>

          {/* FAQ list */}
          <div
            className={cn(
              "w-full",
              useTwoColumnLayout ? "grid gap-2.5 sm:gap-3 md:grid-cols-2 md:items-start" : "space-y-2.5"
            )}
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-3.5 sm:p-4 animate-pulse rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-800 rounded mb-2" />
                    <div className="h-3 w-5/6 bg-gray-200 dark:bg-slate-800 rounded" />
                  </div>
                ))
              : displayFAQs.map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={cn(
                        "p-3.5 sm:p-4 rounded-xl border transition-all duration-300 bg-white dark:bg-slate-900",
                        isOpen
                          ? "border-primary/60 bg-primary/5 shadow-[0_4px_20px_rgba(37,99,235,0.02)]"
                          : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      )}
                    >
                      {/* Question */}
                      <button
                        type="button"
                        onClick={() => toggle(faq.id)}
                        className="flex w-full items-center justify-between text-left cursor-pointer group"
                      >
                        <span className="font-syne font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm pr-3 leading-snug group-hover:text-primary transition-colors duration-200">
                          {faq.question}
                        </span>
                        
                        {/* Interactive toggle indicator */}
                        <div
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                            isOpen
                              ? "bg-primary/10 border-primary/20 text-primary"
                              : "bg-slate-50 border-slate-200/60 text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-100"
                          )}
                        >
                          <motion.div
                            animate={{ rotate: isOpen ? 135 : 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                            className="flex items-center justify-center"
                          >
                            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                          </motion.div>
                        </div>
                      </button>
                      
                      {/* Answer */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 mt-2.5">
                              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
