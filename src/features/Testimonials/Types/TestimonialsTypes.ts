// src/features/Testimonials/Types/TestimonialsTypes.ts

export interface TestimonialDto {
  id?: string;
  testimonialId?: string;
  title?: string;
  quote?: string;
  body?: string;
  author?: string;
  person?: string;
  personName?: string;
  role?: string;
  theirRole?: string;
  personRole?: string;
  company?: string;
  companyName?: string;
  industry?: 'Retail' | 'Restaurant' | 'Enterprise' | string;
  rating?: number;
  merchantType?: string;
  speaksTo?: 'Not set' | 'Enterprise merchants' | 'Standalone merchants' | string;
  avatarColor?: string;
  initials?: string;
  avatarUrl?: string;
  image?: string;
  imageUrl?: string;
  mediaAssetId?: string;
  linkUrl?: string;
  page?: string;
  order?: number;
  sortOrder?: number;
  isPublished?: boolean;
  published?: boolean;
  isActive?: boolean;
  highlightStat?: string;
  statLabel?: string;
  videoUrl?: string;
  duration?: string;
  createdAt?: string;
}

export interface ApiTestimonialsResponse {
  success: boolean;
  message?: string;
  data: TestimonialDto[];
}
