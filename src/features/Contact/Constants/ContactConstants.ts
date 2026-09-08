// src/features/Contact/Constants/ContactConstants.ts

export const DEFAULT_COUNTRY_CODE = '+1';

export const US_COUNTRY_CODES = [
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'AU' },
] as const;

export const INQUIRY_TYPES = [
  'General',
  'Live Demo',
  'Sales',
  'Custom Quote',
  'Multi-Location Rollout',
  'Support',
  'Partnership',
] as const;

export const CONTACT_OPERATING_HOURS = {
  days: 'Mon - Sun',
  time: '9 AM - 8 PM EST',
  status: 'Online Now',
} as const;
