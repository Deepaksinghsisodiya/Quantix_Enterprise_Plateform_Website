'use client';

// src/components/organisms/CTABanner/CTAView.tsx
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Sparkles, ArrowRight, Headphones, CheckCircle2 } from "lucide-react";
import { useContactModal } from "@/context/ContactModalContext";

export interface TelemetryChip {
  id: string;
  label: string;
  dotColor?: string;
  pingColor?: string;
}

export interface CTAViewProps {
  badge: string;
  heading: string;
  headingAccent?: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  telemetryChips?: TelemetryChip[];
  trustBadges?: string[];
}

export const CTAView: React.FC<CTAViewProps> = ({
  badge,
  heading,
  headingAccent = "One Unified Platform?",
  subheading,
  primaryCta,
  secondaryCta,
  telemetryChips,
  trustBadges,
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { openModal } = useContactModal();

  const chips: TelemetryChip[] =
    telemetryChips && telemetryChips.length > 0
      ? telemetryChips
      : [
          {
            id: "offline-mesh",
            label: "100% Offline LAN Mesh",
            dotColor: "bg-emerald-500",
            pingColor: "bg-emerald-400",
          },
          {
            id: "cloud-sync",
            label: "Real-Time Cloud HQ Sync",
            dotColor: "bg-[#FF4F00]",
            pingColor: "bg-orange-400",
          },
          {
            id: "security",
            label: "SOC-2 & PCI-DSS Certified",
            dotColor: "bg-amber-500",
            pingColor: "bg-amber-400",
          },
        ];

  const badges: string[] =
    trustBadges && trustBadges.length > 0
      ? trustBadges
      : [
          "14-Day Full Enterprise Access",
          "Zero Setup Fees or Hidden Costs",
          "Dedicated White-Glove Onboarding",
        ];

  return (
    <section
      ref={ref}
      className="w-full py-12 lg:py-14 relative"
    >
      <div className="site-container px-3.5 sm:px-6">
        {/* Main Banner Card */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#080B11] border border-slate-800/90 py-8 sm:py-12 lg:py-16 px-4 sm:px-8 text-center shadow-2xl">
          {/* Ambient Lighting & High-Tech Backdrop Grid */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-48 sm:h-72 bg-gradient-to-b from-[#FF4F00]/20 via-orange-500/5 to-transparent blur-3xl pointer-events-none z-0" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-36 bg-gradient-to-t from-amber-500/10 to-transparent blur-2xl pointer-events-none z-0" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow Badge — Full text visible on mobile without ugly truncate cutoffs */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#FF4F00] mb-3.5 sm:mb-5 shadow-2xs max-w-full select-none">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.4] text-[#FF4F00] animate-pulse shrink-0" />
                <span className="leading-tight text-center">{badge}</span>
              </div>

              {/* Master Headline */}
              <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-syne font-black text-white tracking-tight leading-[1.2] sm:leading-[1.14]">
                {heading}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-400 block sm:inline mt-1 sm:mt-0">
                  {headingAccent}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 dark:text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
                {subheading}
              </p>

              {/* Multi-Location Telemetry Chips (Mobile-friendly wrap) */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mt-5 sm:mt-6">
                {chips.map((chip) => (
                  <div
                    key={chip.id}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-800 bg-slate-900/90 backdrop-blur-md text-[10px] sm:text-xs font-mono font-medium text-slate-200 shadow-xs"
                  >
                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          chip.pingColor || "bg-emerald-400"
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 ${
                          chip.dotColor || "bg-emerald-500"
                        }`}
                      />
                    </span>
                    <span className="whitespace-nowrap">{chip.label}</span>
                  </div>
                ))}
              </div>

              {/* Dual Action Dock (Mobile Touch-Friendly Buttons) */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 max-w-sm sm:max-w-none mx-auto w-full">
                {/* Primary Action Button */}
                <Link
                  href={primaryCta.href || "/contact"}
                  className="relative overflow-hidden group inline-flex items-center justify-center gap-2 min-h-11 sm:min-h-12 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] text-white font-syne font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-500/25 active:scale-95 transition-all duration-300 cursor-pointer touch-manipulation"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <span>{primaryCta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>

                {/* Secondary Enterprise Architect Button */}
                <button
                  type="button"
                  onClick={() =>
                    openModal(
                      "Schedule Enterprise Architecture Review",
                      "CTA_ENTERPRISE_CONSULT"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 min-h-11 sm:min-h-12 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-700/80 hover:border-orange-500/50 bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-syne font-bold text-xs sm:text-sm tracking-wide backdrop-blur-md active:scale-95 transition-all duration-300 cursor-pointer touch-manipulation"
                >
                  <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2] text-[#FF4F00] shrink-0" />
                  <span>{secondaryCta?.label || "Talk to Solutions Architect"}</span>
                </button>
              </div>

              {/* Bottom Enterprise Guarantees (Trust Strip) */}
              {badges.length > 0 && (
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-[10.5px] sm:text-xs text-slate-400 font-medium">
                  {badges.map((badgeText, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 stroke-[2.4] shrink-0" />
                      <span>{badgeText}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAView;
