// src/features/SocialProof/components/SocialProofWrapper.tsx
'use client';

import React from 'react';
import { SocialProof } from './SocialProof';
import { useGetSocialProofMetricsQuery } from '../Service/SocialProofService';

export interface SocialProofWrapperProps {
  className?: string;
}

export const SocialProofWrapper: React.FC<SocialProofWrapperProps> = ({ className = "" }) => {
  const { data: metrics = null, isLoading } = useGetSocialProofMetricsQuery();

  return (
    <SocialProof
      metrics={metrics}
      isLoading={isLoading}
      className={className}
    />
  );
};

export default SocialProofWrapper;
