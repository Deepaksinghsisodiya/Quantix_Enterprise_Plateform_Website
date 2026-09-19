'use client';

import React from 'react';
import type { SupportSectionProps } from '../Types/support.types';
import SupportHeader from './SupportHeader';
import SupportTrustBar from './SupportTrustBar';
import SupportPhotoCard from './SupportPhotoCard';
import SupportOfferingsList from './SupportOfferingsList';

export const SupportSection: React.FC<SupportSectionProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`py-14 sm:py-20 lg:py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden relative select-none transition-colors ${className}`}
    >
      {/* Dynamic Background Ambiance Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Reactive Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-radial from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="site-container relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header with Authentic Copy */}
        <SupportHeader />

        {/* Real Trust Badges Bar */}
        <SupportTrustBar />

        {/* 2-Column Split: Photo Card (Left) + Detailed Offerings (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Photo Card with verified tag */}
          <div className="lg:col-span-5">
            <SupportPhotoCard />
          </div>

          {/* Right Column: 4 Real Offerings Pillars + Modal Trigger */}
          <div className="lg:col-span-7">
            <SupportOfferingsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
