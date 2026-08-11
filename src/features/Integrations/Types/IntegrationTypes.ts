export interface IntegrationDto {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  logoUrl?: string;
  websiteUrl?: string;
  isPopular?: boolean;
}

export interface ApiIntegrationsResponse {
  success: boolean;
  data: IntegrationDto[];
}
