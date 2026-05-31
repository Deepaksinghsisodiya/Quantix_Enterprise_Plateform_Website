// src/components/organisms/CTABanner/CTAView.tsx
// Pure UI — receives copy as props, renders the CTA section.
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

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

  return (
    <section
      ref={ref}
      className="w-full bg-slate-950 py-24 text-center border-t border-slate-900 relative overflow-hidden"
    >
      {/* Tech grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="site-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-6 shadow-sm">
            <Sparkles className="h-3 w-3 fill-blue-400" />
            {badge}
          </div>

          <h2 className="text-3xl font-syne font-black text-white sm:text-5xl uppercase tracking-tight leading-tight">
            {heading}
          </h2>

          <p className="mt-4 text-slate-400 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            {subheading}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
            <Link
              href={primaryCta.href}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/20 text-xs text-center transition-all duration-200 hover:scale-105 active:scale-95 block sm:inline-block"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="w-full sm:w-auto border border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white font-bold px-8 py-4 rounded-full text-xs text-center bg-transparent transition-all duration-200 hover:scale-105 active:scale-95 block sm:inline-block"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAView;
