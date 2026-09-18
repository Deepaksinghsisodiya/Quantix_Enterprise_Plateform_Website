"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Zap, CheckCircle2 } from "lucide-react";
import { BusinessProblemItem, CardTabMode } from "../Types/businessProblems.types";

interface BusinessProblemCardProps {
  problem: BusinessProblemItem;
  activeTab: CardTabMode;
  onToggleTab: (tab: CardTabMode) => void;
}

export const BusinessProblemCard: React.FC<BusinessProblemCardProps> = ({
  problem,
  activeTab,
  onToggleTab,
}) => {
  const Icon = problem.icon;
  const isSolution = activeTab === "solution";

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border bg-white dark:bg-slate-900/95 p-3.5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 ${
        isSolution
          ? "border-[#FF4F00]/50 dark:border-[#FF4F00]/60 ring-2 sm:ring-4 ring-[#FF4F00]/10 shadow-[0_10px_35px_rgba(255,79,0,0.12)]"
          : "border-slate-200/90 dark:border-slate-800/90 hover:border-orange-500/30 dark:hover:border-orange-500/30 hover:shadow-lg"
      }`}
    >
      {/* Top Brand Accent Hairline */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 ${
          isSolution
            ? "bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-400 opacity-100"
            : "bg-gradient-to-r from-amber-400 via-orange-400 to-[#FF4F00] opacity-40 group-hover:opacity-100"
        }`}
      />

      <div className="relative z-10">
        {/* Card Header Row: Icon + Severity Tag */}
        <div className="flex items-center justify-between gap-2">
          <div
            className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border transition-all duration-300 ${
              isSolution
                ? "bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white border-[#FF4F00] shadow-sm shadow-orange-500/25"
                : "bg-orange-500/10 dark:bg-orange-500/15 text-[#FF4F00] border-orange-500/20 ring-2 sm:ring-4 ring-orange-500/5"
            }`}
          >
            {isSolution ? <Zap size={17} className="sm:w-[19px] sm:h-[19px]" /> : <Icon size={17} className="sm:w-[19px] sm:h-[19px]" />}
          </div>

          <span
            className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border shrink-0 transition-colors ${
              isSolution
                ? "text-[#FF4F00] dark:text-orange-400 bg-orange-500/10 border-orange-500/30"
                : "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            }`}
          >
            {isSolution ? "QUANTIX SOLVED" : problem.severity}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="mt-2.5 sm:mt-4 font-syne text-sm sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {problem.title}
        </h3>

        <p className="mt-1 sm:mt-2 text-[11.5px] sm:text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-400">
          {problem.description}
        </p>

        {/* Visual Comparison Micro-Meter (Mobile-tuned Data Proof) */}
        <div
          className={`mt-2.5 sm:mt-3.5 rounded-xl border p-2 sm:p-3 text-[10px] sm:text-[11px] font-mono leading-relaxed transition-all duration-300 ${
            isSolution
              ? "border-[#FF4F00]/25 bg-orange-500/[0.05] dark:bg-orange-500/[0.08]"
              : "border-slate-200/90 dark:border-slate-800/90 bg-slate-50/80 dark:bg-slate-800/40"
          }`}
        >
          <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/60 dark:border-slate-700/60">
            <span className="flex items-center gap-1 text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <problem.visualMeter.icon size={10} className={isSolution ? "text-[#FF4F00]" : "text-slate-400"} />
              <span>Live Operational Reality:</span>
            </span>
            <span
              className={`text-[8px] sm:text-[9px] font-bold uppercase px-1.5 py-0.2 rounded shrink-0 ${
                isSolution
                  ? "bg-orange-500/15 text-[#FF4F00] dark:text-orange-400"
                  : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
              }`}
            >
              {isSolution ? "Real-Time Sync" : "Legacy Friction"}
            </span>
          </div>
          <p
            className={`font-semibold leading-relaxed break-words text-[10.5px] sm:text-[11px] ${
              isSolution ? "text-[#FF4F00] dark:text-orange-400" : "text-slate-700 dark:text-slate-300"
            }`}
          >
            {isSolution ? problem.visualMeter.quantixText : problem.visualMeter.legacyText}
          </p>
        </div>

        {/* Interactive Segmented Switcher */}
        <div className="mt-2.5 sm:mt-3.5">
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800/80 p-0.5 sm:p-1 border border-slate-200/80 dark:border-slate-700/80 text-[10px] sm:text-[11px] font-bold">
            <button
              type="button"
              onClick={() => onToggleTab("problem")}
              className={`flex-1 py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer select-none ${
                !isSolution
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200/60 dark:border-slate-700/60"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              <ShieldAlert size={11} className={!isSolution ? "text-amber-500 shrink-0" : "text-slate-400 shrink-0"} />
              <span className="truncate">Legacy Friction</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleTab("solution")}
              className={`flex-1 py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer select-none ${
                isSolution
                  ? "bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] text-white shadow-sm shadow-orange-500/25 font-bold"
                  : "text-slate-500 hover:text-[#FF4F00] dark:text-slate-400 dark:hover:text-orange-400"
              }`}
            >
              <Zap size={11} className={isSolution ? "text-white shrink-0" : "text-[#FF4F00] shrink-0"} />
              <span className="truncate">Quantix Fix</span>
            </button>
          </div>

          {/* Tab Dynamic Content */}
          <div className="mt-2 sm:mt-2.5 min-h-[64px] sm:min-h-[78px]">
            <AnimatePresence mode="wait">
              {!isSolution ? (
                <motion.div
                  key="impact"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="rounded-xl border border-amber-500/25 bg-amber-500/[0.05] dark:bg-amber-500/[0.08] p-2 sm:p-2.5"
                >
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 pb-1 border-b border-amber-500/20">
                    <ShieldAlert size={10} className="shrink-0" />
                    <span>System Impact</span>
                  </div>
                  <p className="mt-1 text-[11px] sm:text-xs font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                    {problem.impact}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="fix"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="rounded-xl border border-[#FF4F00]/30 bg-orange-500/[0.05] dark:bg-orange-500/[0.1] p-2 sm:p-2.5"
                >
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF4F00] pb-1 border-b border-orange-500/20">
                    <Zap size={10} className="shrink-0 text-[#FF4F00]" />
                    <span>Quantix Resolution</span>
                  </div>
                  <div className="mt-1 space-y-0.5 sm:space-y-1">
                    {problem.fix.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-1.5 text-[11px] sm:text-xs font-medium text-slate-900 dark:text-slate-100">
                        <CheckCircle2 size={11} className="text-[#FF4F00] shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
