// src/features/Profile/validation/ChangePasswordValidation.ts
import * as Yup from 'yup';

export const ChangePasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current temporary password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Must contain at least one special character (@, #, $, etc.)'),
  confirmPassword: Yup.string()
    .required('Please confirm your new password')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});
