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
    id: "hardware",
    question: "What hardware is compatible with Quantix POS?",
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

  return (
    <section className="bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 py-24 border-t border-slate-100" id="faq">
      <div className="site-container">
        <div className="max-w-[720px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-200/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-4 shadow-sm">
              FAQ
            </div>
            <h2 className="text-3xl font-syne font-black text-gray-900 md:text-5xl uppercase leading-tight">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-slate-500 font-medium text-base">
              Can't find what you're looking for?{" "}
              <a href="/contact" className="font-bold text-blue-600 hover:underline">
                Contact our team.
              </a>
            </p>
          </div>

          {/* FAQ list */}
          <div className="w-full space-y-3.5">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-5 animate-pulse rounded-2xl border border-slate-100 bg-white">
                    <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  </div>
                ))
              : displayFAQs.map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={cn(
                        "p-5 rounded-2xl border transition-all duration-300 bg-white",
                        isOpen
                          ? "border-blue-200/60 bg-blue-50/5 shadow-[0_4px_20px_rgba(37,99,235,0.02)]"
                          : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/30"
                      )}
                    >
                      {/* Question */}
                      <button
                        type="button"
                        onClick={() => toggle(faq.id)}
                        className="flex w-full items-center justify-between text-left cursor-pointer group"
                      >
                        <span className="font-syne font-bold text-slate-800 text-sm sm:text-base pr-4 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                          {faq.question}
                        </span>
                        
                        {/* Interactive toggle indicator */}
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                            isOpen
                              ? "bg-blue-50 border-blue-100 text-blue-600"
                              : "bg-slate-50 border-slate-200/50 text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-100/50"
                          )}
                        >
                          <motion.div
                            animate={{ rotate: isOpen ? 135 : 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                            className="flex items-center justify-center"
                          >
                            <Plus className="h-4 w-4 stroke-[2.5]" />
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
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3.5 border-t border-slate-100/80 mt-3.5">
                              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
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
