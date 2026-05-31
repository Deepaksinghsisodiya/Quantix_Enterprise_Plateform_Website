// src/features/Demo/Types/DemoTypes.ts

export interface DemoRequestPayload {
  contactName: string;
  email: string;
  phone: string;
  companyName: string;
  businessType: string;
  preferredMerchantType?: string;
  preferredTime?: string;
  areasOfInterest?: string;
}

export interface Screenshot {
  id: string;
  src: string;
  title: string;
}

export interface DemoMedia {
  videoThumbnail: string;
  videoUrl: string;
  screenshots: Screenshot[];
}
