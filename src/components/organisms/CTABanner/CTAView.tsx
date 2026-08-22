'use client';

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useContactModal } from "@/context/ContactModalContext";

export interface CTAViewProps {
  badge: string;
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const containerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const CTAView: React.FC<CTAViewProps> = ({
  badge,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openModal } = useContactModal();

  return (
    <section
      ref={ref}
      className="w-full bg-slate-950 py-10 sm:py-14 lg:py-20 text-center border-t border-slate-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute inset-0 mesh-bg opacity-[0.4] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-112.5 h-112.5 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-112.5 h-112.5 bg-primary-dark/15 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="site-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-light mb-6 shadow-sm">
            <Sparkles className="h-3 w-3 fill-primary-light" />
            {badge}
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black text-white tracking-tight leading-[1.15] sm:leading-[1.1]">
            {heading}
          </h2>

          <p className="mt-4 text-slate-400 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            {subheading}
          </p>

          <div className="mt-10 flex flex-row flex-wrap items-stretch justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <Link
              href={primaryCta.href || "/sign-up"}
              className="flex-1 min-w-35 sm:flex-none sm:w-auto bg-primary hover:bg-primary-light text-white font-extrabold px-4 sm:px-8 py-4 rounded-full text-xs sm:text-sm text-center shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 block sm:inline-block cursor-pointer"
            >
              {primaryCta.label}
            </Link>
            <button
              type="button"
              onClick={() => openModal("Schedule Enterprise Consultation", "CTA_TALK_TO_SALES")}
              className="flex-1 min-w-35 sm:flex-none sm:w-auto border border-slate-800 bg-transparent hover:bg-white/5 text-white font-extrabold px-4 sm:px-8 py-4 rounded-full text-xs sm:text-sm text-center transition-all duration-300 hover:scale-105 active:scale-95 block sm:inline-block cursor-pointer"
            >
              {secondaryCta?.label || "Talk to Enterprise Architect"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAView;
