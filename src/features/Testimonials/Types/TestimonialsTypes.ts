// src/features/Testimonials/Types/TestimonialsTypes.ts

export interface TestimonialDto {
  id: string;
  quote: string;
  author: string;
  role: string;
  industry: 'Retail' | 'Restaurant';
  avatarColor?: string;
  initials?: string;
}

export interface ApiTestimonialsResponse {
  success: boolean;
  data: TestimonialDto[];
}
