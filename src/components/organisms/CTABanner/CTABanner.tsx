// src/components/organisms/CTABanner/CTABanner.tsx
// Wrapper — provides static copy and telemetry data to CTAView.
import React from "react";
import { CTA_DATA } from "./CTAData";
import { CTAView } from "./CTAView";

export const CTABanner: React.FC = () => {
  return (
    <CTAView
      badge={CTA_DATA.badge}
      heading={CTA_DATA.heading}
      headingAccent={CTA_DATA.headingAccent}
      subheading={CTA_DATA.subheading}
      primaryCta={CTA_DATA.primaryCta}
      secondaryCta={CTA_DATA.secondaryCta}
      telemetryChips={CTA_DATA.telemetryChips}
      trustBadges={CTA_DATA.trustBadges}
    />
  );
};

export default CTABanner;
