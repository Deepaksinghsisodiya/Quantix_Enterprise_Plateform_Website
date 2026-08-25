import * as Yup from 'yup';

export const step1ValidationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required').min(2, 'Name must be at least 2 characters'),
  email: Yup.string().email('Invalid email address').required('Work Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export const step2ValidationSchema = Yup.object().shape({
  companyName: Yup.string().required('Enterprise / Company Name is required').min(2, 'Company Name must be at least 2 characters'),
  locations: Yup.string().required('Please select the number of locations'),
});

export const registerValidationSchema = step1ValidationSchema;
