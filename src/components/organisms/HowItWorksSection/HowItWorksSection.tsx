// src/components/organisms/HowItWorksSection/HowItWorksSection.tsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users2, Settings2, TrendingUp } from "lucide-react";
import { cn } from "../../../lib/utils";

interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: <Users2 className="h-5 w-5 text-white" />,
    title: "Create your account",
    description:
      "Sign up in 2 minutes. Choose your industry — retail or restaurant. No credit card needed for your free trial.",
  },
  {
    number: 2,
    icon: <Settings2 className="h-5 w-5 text-white" />,
    title: "Configure your store",
    description:
      "Add products, menu items, pricing, tax rates, and payment methods. Import existing data via CSV or API.",
  },
  {
    number: 3,
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "Go live and grow",
    description:
      "Start accepting payments immediately. Real-time analytics help you make smarter decisions from day one.",
  },
];

/**
 * HowItWorksSection – three step guide with animated entry and solid connectors.
 */
export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.15 },
    }),
  };

  return (
    <section className="bg-gray-50 py-20" ref={ref} id="how-it-works">
      <div className="site-container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-primary mb-4">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Up and running in minutes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            No technical expertise needed. We handle the setup so you can focus on your business.
          </p>
        </div>

        {/* Steps container */}
        <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:gap-0 md:items-start">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <motion.div
                custom={idx}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={container}
                className="relative flex flex-col items-center text-center max-w-xs"
              >
                {/* Icon container with badge */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 shadow-md">
                  {step.icon}
                  {/* Badge */}
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-[10px] font-bold text-white shadow-sm">
                    {step.number}
                  </div>
                </div>
                <h3 className="mt-6 text-base font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed max-w-[240px]">{step.description}</p>
              </motion.div>
              {/* Solid line between steps (except after last) */}
              {idx < steps.length - 1 && (
                <div className="hidden h-[1px] w-20 bg-slate-200 md:block mt-7 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
