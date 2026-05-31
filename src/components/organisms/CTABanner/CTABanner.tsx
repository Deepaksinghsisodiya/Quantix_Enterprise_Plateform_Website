// src/components/organisms/CTABanner/CTABanner.tsx
// Wrapper — provides static copy (or future API data) to CTAView.
import React from "react";
import { CTA_DATA } from "./CTAData";
import { CTAView } from "./CTAView";

export const CTABanner: React.FC = () => {
  return (
    <CTAView
      badge={CTA_DATA.badge}
      heading={CTA_DATA.heading}
      subheading={CTA_DATA.subheading}
      primaryCta={CTA_DATA.primaryCta}
      secondaryCta={CTA_DATA.secondaryCta}
    />
  );
};

export default CTABanner;
