// src/features/Register/Constants/SignUpConstants.ts
import { SignUpFormValues } from '../Types/SignUpTypes';

export const INITIAL_SIGNUP_VALUES: SignUpFormValues = {
  companyName: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  country: 'United States',
  businessNature: 'Enterprise',
  agreedToTerms: true,
};

export const COUNTRY_OPTIONS = [
  { value: 'US', label: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { value: 'IN', label: 'India', flag: '🇮🇳', dialCode: '+91' },
  { value: 'GB', label: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { value: 'CA', label: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { value: 'AE', label: 'United Arab Emirates', flag: '🇦🇪', dialCode: '+971' },
  { value: 'AU', label: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { value: 'SG', label: 'Singapore', flag: '🇸🇬', dialCode: '+65' },
  { value: 'DE', label: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { value: 'SA', label: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966' },
];
