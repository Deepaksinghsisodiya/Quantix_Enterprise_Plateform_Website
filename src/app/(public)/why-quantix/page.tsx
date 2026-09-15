import React from 'react';
import type { Metadata } from 'next';
import WhyQuantixClient from './WhyQuantixClient';

export const metadata: Metadata = {
  title: 'Why Quantix POS | Enterprise ROI, Trust & Competitive Advantage',
  description:
    'Discover why 50,000+ multi-store retail and restaurant locations choose Quantix over legacy and locked-in POS hardware.',
};

export default function WhyQuantixPage() {
  return <WhyQuantixClient />;
}
