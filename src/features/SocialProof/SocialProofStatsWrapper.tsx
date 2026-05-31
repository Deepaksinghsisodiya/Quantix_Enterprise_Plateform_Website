// src/features/SocialProof/SocialProofStatsWrapper.tsx
import React from 'react';
import { useGetSocialProofQuery } from './Service/SocialProofService';
import SocialProofStats from './SocialProofStats';

export const SocialProofStatsWrapper: React.FC = () => {
  const { data: stats = null, isLoading } = useGetSocialProofQuery();

  return <SocialProofStats stats={stats} isLoading={isLoading} />;
};

export default SocialProofStatsWrapper;
