// src/components/organisms/FAQSection/FAQSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetFAQsQuery } from "@/redux/services/faqApi";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Dummy data used while loading or if API not ready
const dummyFAQs: FAQItem[] = [
  {
    id: "1",
    question: "Do I need a credit card for the free trial?",
    answer:
      "No credit card required. Sign up and get full platform access for 3 days completely free.",
  },
  {
    id: "2",
    question: "What hardware does Quantix support?",
    answer:
      "Quantix works on iPad, Android tablets, and any web browser. We support receipt printers, barcode scanners, cash drawers, and card readers via integrations.",
  },
  {
    id: "3",
    question: "Can I switch plans or cancel anytime?",
    answer:
      "Yes. You can upgrade, downgrade, or cancel your plan at any time from your account settings with no cancellation fees.",
  },
  {
    id: "4",
    question: "How does multi-location support work?",
    answer:
      "Manage all your branches from a single dashboard. Each location has its own inventory, staff, and reports but you can view consolidated data across all locations.",
  },
  {
    id: "5",
    question: "Is my data secure and backed up?",
    answer:
      "Quantix is PCI DSS compliant with end-to‑end encryption, SOC 2 Type II certification, and automatic daily backups with 99.9% uptime SLA.",
  },
  {
    id: "6",
    question: "Do you offer onboarding support?",
    answer:
      "Yes. All plans include free onboarding support. Professional and Enterprise plans include a dedicated onboarding specialist and priority support.",
  },
];

export const FAQSection = () => {
  const { data, isLoading } = useGetFAQsQuery();
  const faqs = data?.length ? data : dummyFAQs;
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

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
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-5 animate-pulse rounded-2xl border border-slate-100 bg-white">
                    <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  </div>
                ))
              : faqs.map((faq) => {
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
                        
                        {/* Interactive toggle indicator using Plus icon */}
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
