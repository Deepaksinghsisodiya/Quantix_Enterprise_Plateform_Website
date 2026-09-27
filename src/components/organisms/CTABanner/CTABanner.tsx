'use client';

// src/components/organisms/CTABanner/CTABanner.tsx
// Wrapper — provides dynamic CMS data with zero-downtime fallback to CTAData.
import React from 'react';
import { CTA_DATA } from './CTAData';
import { CTAView } from './CTAView';
import { useGetPublicCtaBannerQuery } from './CtaBannerService';

export const CTABanner: React.FC = () => {
  const { data: cmsData } = useGetPublicCtaBannerQuery('Enterprise');

  const badge = cmsData?.badge || CTA_DATA.badge;
  const heading = cmsData?.heading || CTA_DATA.heading;
  const headingAccent = cmsData?.headingAccent !== undefined ? cmsData.headingAccent : CTA_DATA.headingAccent;
  const subheading = cmsData?.subheading || CTA_DATA.subheading;
  const primaryCta = cmsData?.primaryCta || CTA_DATA.primaryCta;
  const secondaryCta = cmsData?.secondaryCta || CTA_DATA.secondaryCta;
  const telemetryChips = cmsData?.telemetryChips && cmsData.telemetryChips.length > 0
    ? cmsData.telemetryChips
    : CTA_DATA.telemetryChips;
  const trustBadges = cmsData?.trustBadges && cmsData.trustBadges.length > 0
    ? cmsData.trustBadges
    : CTA_DATA.trustBadges;

  return (
    <CTAView
      badge={badge}
      heading={heading}
      headingAccent={headingAccent}
      subheading={subheading}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      telemetryChips={telemetryChips}
      trustBadges={trustBadges}
    />
  );
};

export default CTABanner;
