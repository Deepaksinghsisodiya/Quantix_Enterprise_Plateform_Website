// src/features/Newsletter/validation/NewsletterValidation.ts
import * as Yup from 'yup';

export const newsletterValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid work email address')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid work email address')
    .required('Work email is required'),
});
