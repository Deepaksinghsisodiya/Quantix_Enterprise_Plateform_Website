// src/features/SocialProof/SocialProofStats.tsx
import React from 'react';
import { SocialProof } from './components/SocialProof';
import { SocialProofData } from './Types/SocialProofTypes';

export interface SocialProofStatsProps {
  stats: SocialProofData | null;
  isLoading: boolean;
}

export const SocialProofStats: React.FC<SocialProofStatsProps> = ({ stats, isLoading }) => {
  return <SocialProof stats={stats} isLoading={isLoading} />;
};

export default SocialProofStats;
