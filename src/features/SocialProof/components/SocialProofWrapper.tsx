// src/features/SocialProof/components/SocialProofWrapper.tsx
'use client';

import React from 'react';
import { SocialProof } from './SocialProof';
import { useGetSocialProofQuery } from '../Service/SocialProofService';

export interface SocialProofWrapperProps {
  className?: string;
}

export const SocialProofWrapper: React.FC<SocialProofWrapperProps> = ({ className = "" }) => {
  const { data: stats = null, isLoading } = useGetSocialProofQuery();

  return (
    <SocialProof
      stats={stats}
      isLoading={isLoading}
      className={className}
    />
  );
};

export default SocialProofWrapper;
