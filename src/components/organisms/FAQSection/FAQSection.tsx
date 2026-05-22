// src/components/organisms/FAQSection/FAQSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
    <section className="bg-white py-24 border-t border-slate-100" id="faq">
      <div className="site-container">
        <div className="max-w-[700px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 mb-4">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-gray-600 text-sm font-semibold">
              Can't find what you're looking for?{" "}
              <a href="/contact" className="font-semibold text-blue-600 hover:underline">
                Contact our team.
              </a>
            </p>
          </div>

          {/* FAQ list */}
          <div className="w-full">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="mb-3 p-4 animate-pulse rounded-xl border border-slate-100 bg-white">
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
                    "mb-3 p-4 rounded-xl border transition-all duration-200 bg-white",
                    isOpen
                      ? "border-slate-200/80 shadow-xs"
                      : "border-slate-100/90 hover:bg-slate-50/30"
                  )}
                >
                  {/* Question */}
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="flex w-full items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-bold text-slate-800 text-xs sm:text-sm">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 ml-4"
                    >
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </motion.span>
                  </button>
                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{faq.answer}</p>
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
