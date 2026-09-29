// src/features/SocialProof/Types/SocialProofTypes.ts

export interface SocialProofMetricItem {
  metricId: string;
  siteVariant: string;
  value: string;
  numericValue?: number | null;
  prefix?: string | null;
  suffix?: string | null;
  decimals?: number | null;
  label: string;
  description?: string | null;
  iconKey?: string | null;
  accentColor?: string | null;
  sortOrder?: number | null;
  isActive?: boolean | null;
}

export interface SocialProofProps {
  metrics?: SocialProofMetricItem[] | null;
  className?: string;
}
