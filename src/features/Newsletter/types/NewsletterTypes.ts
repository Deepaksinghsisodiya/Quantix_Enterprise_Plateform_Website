// src/features/Newsletter/types/NewsletterTypes.ts

export interface NewsletterFormValues {
  email: string;
}

export interface NewsletterSubscribeDto {
  email: string;
}

export interface NewsletterApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface NewsletterFormProps {
  isLoading?: boolean;
  placeholder?: string;
  buttonText?: string;
  variant?: 'footer' | 'card' | 'inline';
}

export interface NewsletterWrapperProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: 'footer' | 'card' | 'inline';
  className?: string;
}
