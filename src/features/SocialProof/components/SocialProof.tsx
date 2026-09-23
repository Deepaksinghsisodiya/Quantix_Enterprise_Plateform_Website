// src/features/SocialProof/components/SocialProof.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Store,
  Globe2,
  UtensilsCrossed,
  ShoppingBag,
  Zap,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';
import { useInView, animate } from 'framer-motion';
import type { SocialProofProps, SocialProofMetricItem } from '../Types/SocialProofTypes';

const ICON_MAP: Record<string, React.ElementType> = {
  Store,
  TrendingUp,
  ShieldCheck,
  Globe2,
  UtensilsCrossed,
  ShoppingBag,
  Zap,
  Users,
  Award,
  Sparkles,
};

interface MetricColorTheme {
  laserBeam: string;
  spotlight: string;
  iconBg: string;
  iconText: string;
  iconRing: string;
  hoverRing: string;
  hoverShadow: string;
  labelHover: string;
}

const COLOR_THEMES: Record<string, MetricColorTheme> = {
  orange: {
    laserBeam: 'via-[#FF4F00]',
    spotlight: 'rgba(255,79,0,0.08)',
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/20',
    iconText: 'text-[#FF4F00]',
    iconRing: 'ring-orange-500/5 dark:ring-orange-500/10',
    hoverRing: 'group-hover:ring-orange-500/25',
    hoverShadow: 'group-hover:shadow-orange-500/15',
    labelHover: 'group-hover:text-[#FF4F00] dark:group-hover:text-orange-400',
  },
  emerald: {
    laserBeam: 'via-emerald-500',
    spotlight: 'rgba(16,185,129,0.08)',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    iconText: 'text-emerald-600 dark:text-emerald-400',
    iconRing: 'ring-emerald-500/5 dark:ring-emerald-500/10',
    hoverRing: 'group-hover:ring-emerald-500/25',
    hoverShadow: 'group-hover:shadow-emerald-500/15',
    labelHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
  },
  blue: {
    laserBeam: 'via-blue-500',
    spotlight: 'rgba(59,130,246,0.08)',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    iconText: 'text-blue-600 dark:text-blue-400',
    iconRing: 'ring-blue-500/5 dark:ring-blue-500/10',
    hoverRing: 'group-hover:ring-blue-500/25',
    hoverShadow: 'group-hover:shadow-blue-500/15',
    labelHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
  },
  purple: {
    laserBeam: 'via-purple-500',
    spotlight: 'rgba(168,85,247,0.08)',
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    iconText: 'text-purple-600 dark:text-purple-400',
    iconRing: 'ring-purple-500/5 dark:ring-purple-500/10',
    hoverRing: 'group-hover:ring-purple-500/25',
    hoverShadow: 'group-hover:shadow-purple-500/15',
    labelHover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
  },
  rose: {
    laserBeam: 'via-rose-500',
    spotlight: 'rgba(244,63,94,0.08)',
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/20',
    iconText: 'text-rose-600 dark:text-rose-400',
    iconRing: 'ring-rose-500/5 dark:ring-rose-500/10',
    hoverRing: 'group-hover:ring-rose-500/25',
    hoverShadow: 'group-hover:shadow-rose-500/15',
    labelHover: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
  },
  amber: {
    laserBeam: 'via-amber-500',
    spotlight: 'rgba(245,158,11,0.08)',
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    iconText: 'text-amber-600 dark:text-amber-400',
    iconRing: 'ring-amber-500/5 dark:ring-amber-500/10',
    hoverRing: 'group-hover:ring-amber-500/25',
    hoverShadow: 'group-hover:shadow-amber-500/15',
    labelHover: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
  },
};

const DEFAULT_METRICS: SocialProofMetricItem[] = [
  {
    metricId: 'default-1',
    siteVariant: 'Enterprise',
    value: '50K+',
    numericValue: 50,
    prefix: null,
    suffix: 'K+',
    decimals: 0,
    label: 'Active Outlets',
    description: 'Multi-unit store networks',
    iconKey: 'Store',
    accentColor: 'orange',
    sortOrder: 1,
    isActive: true,
  },
  {
    metricId: 'default-2',
    siteVariant: 'Enterprise',
    value: '$250M+',
    numericValue: 250,
    prefix: '$',
    suffix: 'M+',
    decimals: 0,
    label: 'Annual GMV',
    description: 'Processed without latency',
    iconKey: 'TrendingUp',
    accentColor: 'emerald',
    sortOrder: 2,
    isActive: true,
  },
  {
    metricId: 'default-3',
    siteVariant: 'Enterprise',
    value: '99.99%',
    numericValue: 99.99,
    prefix: null,
    suffix: '%',
    decimals: 2,
    label: 'Uptime SLA',
    description: 'Offline dual-mesh fallback',
    iconKey: 'ShieldCheck',
    accentColor: 'blue',
    sortOrder: 3,
    isActive: true,
  },
  {
    metricId: 'default-4',
    siteVariant: 'Enterprise',
    value: '47+',
    numericValue: 47,
    prefix: null,
    suffix: '+',
    decimals: 0,
    label: 'Global Markets',
    description: 'Multi-tax & fiscal compliance',
    iconKey: 'Globe2',
    accentColor: 'purple',
    sortOrder: 4,
    isActive: true,
  },
];

// Smooth count-up helper component triggered when scrolled into view
const AnimatedNumber: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  fallbackText?: string;
}> = ({ target, suffix = '', prefix = '', decimals = 0, fallbackText }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [current, setCurrent] = useState(0);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isInView || target <= 0) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (val) => {
        if (isMountedRef.current) {
          setCurrent(decimals > 0 ? parseFloat(val.toFixed(decimals)) : Math.round(val));
        }
      },
    });
    return () => {
      controls.stop();
    };
  }, [isInView, target, decimals]);

  if (!target && fallbackText) {
    return <span>{fallbackText}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {isInView ? (decimals > 0 ? current.toFixed(decimals) : current.toLocaleString()) : 0}
      {suffix}
    </span>
  );
};

export const SocialProof: React.FC<SocialProofProps> = ({ metrics, isLoading, className = '' }) => {
  const displayMetrics = metrics && metrics.length > 0 ? metrics : DEFAULT_METRICS;

  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-slate-900/5 dark:shadow-black/50 backdrop-blur-2xl overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Ambient background illumination */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_-20%,rgba(255,79,0,0.06),transparent_75%)]" />

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4">
        {displayMetrics.map((metric, idx) => {
          const Icon = ICON_MAP[metric.iconKey] || Sparkles;
          const theme = COLOR_THEMES[metric.accentColor?.toLowerCase()] || COLOR_THEMES.orange;
          const isLastInRow = (idx + 1) % 2 === 0;
          const isLastTotal = idx === displayMetrics.length - 1;

          return (
            <div
              key={metric.metricId || idx}
              className={`relative overflow-hidden cursor-default flex flex-col items-center justify-center text-center p-3.5 sm:p-5 md:p-6 group transition-all duration-300 ${
                idx < displayMetrics.length - 1 ? 'md:border-r border-slate-200/70 dark:border-slate-800/70' : ''
              } ${
                idx < 2 ? 'border-b md:border-b-0 border-slate-200/70 dark:border-slate-800/70' : ''
              } ${
                !isLastInRow ? 'border-r md:border-r-0 border-slate-200/70 dark:border-slate-800/70' : ''
              }`}
            >
              {/* Top Laser Beam on Hover */}
              <div
                className={`pointer-events-none absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent ${theme.laserBeam} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Soft Spotlight Aura */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at center, ${theme.spotlight}, transparent 70%)`,
                }}
              />

              {/* Icon Container */}
              <div
                className={`relative z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-2xl ${theme.iconBg} ${theme.iconText} ring-4 ${theme.iconRing} mb-2 sm:mb-2.5 group-hover:-translate-y-1.5 group-hover:scale-110 ${theme.hoverRing} group-hover:shadow-lg ${theme.hoverShadow} transition-all duration-300 ease-out`}
              >
                <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5 stroke-[2.2]" />
                {metric.iconKey === 'ShieldCheck' && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                )}
              </div>

              {/* Metric Value */}
              <div className="relative z-10 group-hover:scale-[1.04] transition-transform duration-300 ease-out origin-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-syne font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300">
                  {isLoading ? (
                    <span className="inline-block w-14 sm:w-20 h-6 sm:h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                  ) : metric.numericValue ? (
                    <AnimatedNumber
                      target={Number(metric.numericValue)}
                      prefix={metric.prefix || ''}
                      suffix={metric.suffix || ''}
                      decimals={metric.decimals || 0}
                      fallbackText={metric.value}
                    />
                  ) : (
                    <span>{metric.value}</span>
                  )}
                </h3>
              </div>

              {/* Metric Label */}
              <p
                className={`relative z-10 text-[10.5px] sm:text-xs font-syne font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mt-1 ${theme.labelHover} transition-colors duration-200`}
              >
                {metric.label}
              </p>

              {/* Metric Sub-caption */}
              {metric.description && (
                <p className="relative z-10 text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">
                  {metric.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialProof;
