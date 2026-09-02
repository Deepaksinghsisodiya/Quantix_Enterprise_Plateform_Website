// src/features/Profile/Types/ProfileTypes.ts

export interface UserProfileDto {
  id?: string;
  userId?: string;
  email: string;
  fullName?: string;
  username?: string;
  role?: string;
  merchantId?: string;
  companyName?: string;
  businessNature?: string;
  phone?: string;
  status?: string;
  createdAt?: string;
}

export interface ChangePasswordDto {
  userId?: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message?: string;
  data?: any;
}
