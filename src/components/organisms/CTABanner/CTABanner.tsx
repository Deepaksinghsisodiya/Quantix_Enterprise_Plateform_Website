// src/components/organisms/CTABanner/CTABanner.tsx
import React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../../lib/utils";
import { ATMButton } from "../../atoms/ATMButton";

export const CTABanner = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      ref={ref}
      className="w-full bg-slate-900 py-24 text-center border-t border-slate-800"
    >
      <div className="site-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-black text-white sm:text-4xl tracking-tight">
            Ready to modernize your business?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Join 2,000+ businesses already using Quantix. Start your 3-day free trial — no credit card needed.
          </p>
          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-4">
            <button className="bg-blue-600 text-white hover:bg-blue-700 font-bold px-6 py-3 rounded-full shadow-sm text-xs cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25">
              Start Free Trial
            </button>
            <button className="border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-bold px-6 py-3 rounded-full text-xs cursor-pointer bg-transparent transition-all duration-200 hover:scale-105 active:scale-95">
              Talk to Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
