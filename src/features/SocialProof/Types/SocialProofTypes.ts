// src/features/SocialProof/types/SocialProofTypes.ts

export interface SocialProofData {
  merchants?: number;
  transactions?: number;
  uptime?: number;
  rating?: number;
  countries?: number;
  gmvProcessed?: string | number;
  activeTerminals?: number;
}

export interface ApiSocialProofResponse {
  success: boolean;
  message?: string;
  data: SocialProofData;
}

export interface SocialProofProps {
  stats: SocialProofData | null;
  isLoading: boolean;
  className?: string;
}
