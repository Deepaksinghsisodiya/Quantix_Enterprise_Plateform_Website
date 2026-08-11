import * as Yup from 'yup';
import type { ContactSalesFormValues } from '../Types/ContactTypes';

export const contactSalesValidationSchema: Yup.ObjectSchema<ContactSalesFormValues> = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  workEmail: Yup.string()
    .email('Please enter a valid work email')
    .required('Work email is required'),
  message: Yup.string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message cannot exceed 1000 characters')
    .required('Message is required'),
  captcha: Yup.string()
    .test('is-correct', 'Incorrect answer', (value) => value === '7' || value?.toLowerCase() === 'seven')
    .required('Please answer the anti-spam question'),
});
