'use client';

// src/components/organisms/CTABanner/CTABanner.tsx
import React from 'react';
import { CTAView } from './CTAView';
import { useGetPublicCtaBannerQuery } from './CtaBannerService';

/**
 * Authentic, content-matching skeleton loader for Final CTA Banner
 */
export const CtaBannerSkeleton: React.FC = () => {
  return (
    <section className="w-full py-12 lg:py-14 relative select-none">
      <div className="site-container px-3.5 sm:px-6">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#080B11] border border-slate-800/90 py-8 sm:py-12 lg:py-16 px-4 sm:px-8 text-center shadow-2xl">
          {/* Ambient Lighting Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-48 sm:h-72 bg-gradient-to-b from-[#FF4F00]/20 via-orange-500/5 to-transparent blur-3xl pointer-events-none z-0" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-36 bg-gradient-to-t from-amber-500/10 to-transparent blur-2xl pointer-events-none z-0" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Eyebrow Badge Skeleton */}
            <div className="h-6 w-56 sm:w-64 rounded-full bg-slate-800/90 animate-pulse mb-3.5 sm:mb-5" />

            {/* Master Headline Skeleton */}
            <div className="space-y-3 w-full flex flex-col items-center">
              <div className="h-8 sm:h-11 w-4/5 max-w-lg rounded-2xl bg-slate-800/80 animate-pulse" />
              <div className="h-8 sm:h-11 w-3/5 max-w-sm rounded-2xl bg-slate-800/80 animate-pulse" />
            </div>

            {/* Subtitle Skeleton */}
            <div className="mt-4 space-y-2 w-full flex flex-col items-center">
              <div className="h-3.5 w-full max-w-xl rounded bg-slate-800/60 animate-pulse" />
              <div className="h-3.5 w-4/5 max-w-lg rounded bg-slate-800/60 animate-pulse" />
            </div>

            {/* Multi-Location Telemetry Chips Skeleton */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-5 sm:mt-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-7 w-36 sm:w-44 rounded-full border border-slate-800 bg-slate-900/90 animate-pulse"
                />
              ))}
            </div>

            {/* Dual Action Dock Skeleton */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
              <div className="h-11 sm:h-12 flex-1 rounded-xl sm:rounded-2xl bg-slate-800 animate-pulse" />
              <div className="h-11 sm:h-12 flex-1 rounded-xl sm:rounded-2xl bg-slate-800/70 border border-slate-700/60 animate-pulse" />
            </div>

            {/* Bottom Guarantees Skeleton */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full">
              <div className="h-3.5 w-32 rounded bg-slate-800/60 animate-pulse" />
              <div className="h-3.5 w-36 rounded bg-slate-800/60 animate-pulse" />
              <div className="h-3.5 w-36 rounded bg-slate-800/60 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export interface CTABannerProps {
  platformVariant?: 'Enterprise' | 'Restaurant' | 'Retail';
}

export const CTABanner: React.FC<CTABannerProps> = ({ platformVariant = 'Enterprise' }) => {
  const { data: cmsData, isLoading, isError } = useGetPublicCtaBannerQuery(platformVariant);

  // Loading state: Show content-matching skeleton loader while API resolves
  if (isLoading) {
    return <CtaBannerSkeleton />;
  }

  // Complete section hiding: If error, null, or inactive, render absolutely nothing
  if (isError || !cmsData || !cmsData.isActive || !cmsData.heading) {
    return null;
  }

  return (
    <CTAView
      badge={cmsData.badge || undefined}
      heading={cmsData.heading}
      headingAccent={cmsData.headingAccent || undefined}
      subheading={cmsData.subheading || undefined}
      primaryCta={{
        label: cmsData.primaryCta?.label || 'Get Started',
        href: cmsData.primaryCta?.href || '/contact',
      }}
      secondaryCta={{
        label: cmsData.secondaryCta?.label || 'Schedule Consultation',
        href: cmsData.secondaryCta?.href || '/contact',
      }}
      telemetryChips={cmsData.telemetryChips || []}
      trustBadges={cmsData.trustBadges || []}
    />
  );
};

export default CTABanner;
