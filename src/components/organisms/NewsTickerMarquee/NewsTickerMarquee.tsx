// src/components/organisms/NewsTickerMarquee/NewsTickerMarquee.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  TrendingUp,
  Trophy,
  Shield,
  Zap,
  Globe,
  Star,
  Bell,
} from "lucide-react";

interface NewsItem {
  icon: React.ReactNode;
  text: string;
  highlight?: string;
  isNew?: boolean;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    icon: <Rocket size={14} className="text-red-400" />,
    text: "Kitchen Display System v3.0 Released",
    highlight: "NEW",
    isNew: true,
  },
  {
    icon: <TrendingUp size={14} className="text-emerald-400" />,
    text: "50,000+ Active Terminals Worldwide",
  },
  {
    icon: <Trophy size={14} className="text-amber-400" />,
    text: "Best POS Platform Award 2024",
    highlight: "AWARD",
  },
  {
    icon: <Shield size={14} className="text-blue-400" />,
    text: "PCI-DSS Level 1 Certified",
  },
  {
    icon: <Zap size={14} className="text-yellow-400" />,
    text: "99.99% Uptime SLA Guaranteed",
  },
  {
    icon: <Globe size={14} className="text-cyan-400" />,
    text: "Now Available in 12+ Countries",
    highlight: "EXPANDED",
  },
  {
    icon: <Star size={14} className="text-orange-400" />,
    text: "4.9/5 Average Merchant Rating",
  },
  {
    icon: <Bell size={14} className="text-purple-400" />,
    text: "Enterprise Multi-Store Hub Launched",
    highlight: "NEW",
    isNew: true,
  },
];

export default function NewsTickerMarquee() {
  // Double the items for seamless infinite loop
  const duplicatedItems = [...NEWS_ITEMS, ...NEWS_ITEMS];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 border-y border-slate-800/60">
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      <div className="py-3 sm:py-3.5">
        <motion.div
          className="flex items-center gap-6 sm:gap-10 whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-2.5 shrink-0"
            >
              {/* Separator dot (not on first item) */}
              {index > 0 && (
                <span className="w-1 h-1 rounded-full bg-slate-600 mr-2 sm:mr-4 shrink-0" />
              )}

              {/* Highlight badge */}
              {item.highlight && (
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${
                    item.isNew
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : item.highlight === "AWARD"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  }`}
                >
                  {item.highlight}
                </span>
              )}

              {/* Icon */}
              <span className="shrink-0">{item.icon}</span>

              {/* Text */}
              <span className="text-[12px] sm:text-[13px] font-semibold text-slate-300 tracking-wide">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
    </div>
  );
}
