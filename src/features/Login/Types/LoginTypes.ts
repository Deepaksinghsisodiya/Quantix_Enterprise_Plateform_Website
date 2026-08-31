// src/features/Login/Types/LoginTypes.ts

export interface SignInFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserLoginDto {
  email?: string | null;
  username?: string | null;
  password?: string | null;
  mfaCode?: string | null;
  rememberMe?: boolean;
}

export interface RefreshTokenDto {
  refreshToken?: string | null;
}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  data?: {
    token?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: Record<string, any>;
    merchantId?: string;
  };
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: Record<string, any>;
}
