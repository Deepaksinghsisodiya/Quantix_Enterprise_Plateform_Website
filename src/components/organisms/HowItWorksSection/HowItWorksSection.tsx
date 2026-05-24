// src/components/organisms/HowItWorksSection/HowItWorksSection.tsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users2, Settings2, TrendingUp } from "lucide-react";
import { cn } from "../../../lib/utils";

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: <Users2 className="h-5 w-5 text-white" />,
    title: "Create your account",
    description:
      "Sign up in 2 minutes. Choose your industry — retail or restaurant. No credit card needed for your free trial.",
  },
  {
    number: "02",
    icon: <Settings2 className="h-5 w-5 text-white" />,
    title: "Configure your store",
    description:
      "Add products, menu items, pricing, tax rates, and payment methods. Import existing data via CSV or API.",
  },
  {
    number: "03",
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "Go live and grow",
    description:
      "Start accepting payments immediately. Real-time analytics help you make smarter decisions from day one.",
  },
];

/**
 * HowItWorksSection – step-by-step workflow guide designed as premium watermarked cards.
 */
export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section 
      className="bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 py-24 border-b border-slate-100" 
      ref={ref} 
      id="how-it-works"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-200/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-4 shadow-sm">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl font-syne font-black text-gray-900 md:text-5xl uppercase leading-tight">
            Up and running in minutes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 font-medium">
            No technical expertise needed. We handle the setup so you can focus on your business.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              custom={idx}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="relative flex flex-col items-start p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.05)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden cursor-pointer"
            >
              {/* Massive Watermarked Step Number in Top-Right Corner */}
              <span className="absolute top-6 right-8 text-6xl sm:text-7xl font-syne font-black text-slate-100/90 group-hover:text-blue-500/8 transition-colors duration-300 pointer-events-none select-none">
                {step.number}
              </span>

              {/* Icon Container with Gradient and Soft Shadow */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {step.icon}
              </div>

              {/* Step Content */}
              <h3 className="mt-8 text-lg font-syne font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed font-medium transition-colors duration-300 group-hover:text-slate-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
