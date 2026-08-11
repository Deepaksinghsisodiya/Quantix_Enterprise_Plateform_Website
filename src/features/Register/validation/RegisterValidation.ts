import * as Yup from 'yup';
import type { SignUpFormValues, SignupPlanCode } from '../Types/RegisterTypes';

export const registerValidationSchema: Yup.ObjectSchema<SignUpFormValues> = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid work email')
    .required('Work email is required'),
  company: Yup.string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
  phone: Yup.string()
    .matches(/^[+\d][\d\s().-]{6,20}$/, 'Please enter a valid phone number')
    .required('Contact phone is required'),
  country: Yup.string().required('Country is required'),
  merchantType: Yup.string()
    .oneOf(['Enterprise', 'Standalone'], 'Please select a valid merchant type')
    .required('Merchant type is required'),
  planId: Yup.mixed<SignupPlanCode>().oneOf(['free', 'basic', 'pro', 'enterprise', 'standard', 'advance', 'premium', '']).defined(),
  billingCycle: Yup.string()
    .oneOf(['Daily', 'Monthly', 'Annual'], 'Please select a valid billing cycle')
    .required('Billing cycle is required'),
});
