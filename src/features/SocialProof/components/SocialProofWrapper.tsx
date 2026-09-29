// src/features/SocialProof/components/SocialProofWrapper.tsx
'use client';

import React from 'react';
import { SocialProof } from './SocialProof';
import { SocialProofSkeleton } from './SocialProofSkeleton';
import { useGetSocialProofMetricsQuery } from '../Service/SocialProofService';

export interface SocialProofWrapperProps {
  className?: string;
}

export const SocialProofWrapper: React.FC<SocialProofWrapperProps> = ({ className = "" }) => {
  const { data: metrics, isLoading, isError } = useGetSocialProofMetricsQuery();

  if (isLoading) {
    return <SocialProofSkeleton className={className} />;
  }

  // Backend error or Admin has not published any metrics → collapse the section
  if (isError || !metrics || metrics.length === 0) {
    return null;
  }

  return <SocialProof metrics={metrics} className={className} />;
};

export default SocialProofWrapper;
