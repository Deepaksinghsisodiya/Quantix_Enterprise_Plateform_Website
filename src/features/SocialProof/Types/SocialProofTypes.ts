// src/features/SocialProof/Types/SocialProofTypes.ts

export interface SocialProofMetricItem {
  metricId: string;
  siteVariant: string;
  value: string;
  numericValue: number | null;
  prefix: string | null;
  suffix: string | null;
  decimals: number;
  label: string;
  description: string | null;
  iconKey: string;
  accentColor: string;
  sortOrder: number;
  isActive: boolean;
}

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
  data: SocialProofMetricItem[];
}

export interface SocialProofProps {
  metrics?: SocialProofMetricItem[] | null;
  stats?: SocialProofData | null;
  isLoading: boolean;
  className?: string;
}
