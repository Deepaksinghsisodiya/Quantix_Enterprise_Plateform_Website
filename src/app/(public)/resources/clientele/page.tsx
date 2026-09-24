// src/app/(public)/resources/clientele/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import ClientelePageClient from './ClientelePageClient';

export const metadata: Metadata = {
  title: 'Clientele & Enterprise Brand Partners | Quantix Platform',
  description:
    'Discover the multi-location enterprise brands, restaurant chains, and retail franchises powered daily by Quantix Cloud POS and operating infrastructure.',
};

export default function EnterpriseClientelePage() {
  return <ClientelePageClient siteVariant="Enterprise" />;
}
