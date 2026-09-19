import * as Yup from 'yup';
import type { SignInFormValues } from '../Types/LoginTypes';

export const loginValidationSchema: Yup.ObjectSchema<SignInFormValues> = Yup.object({
  email: Yup.string().required('Username or email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean().required(),
});
