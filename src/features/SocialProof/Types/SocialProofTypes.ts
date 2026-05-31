// src/features/SocialProof/Types/SocialProofTypes.ts

export interface SocialProofData {
  merchants: number;
  transactions: number;
  uptime: number;
  rating: number;
  countries: number;
}

export interface ApiSocialProofResponse {
  success: boolean;
  data: SocialProofData;
}
