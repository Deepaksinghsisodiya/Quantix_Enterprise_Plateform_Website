// src/features/Login/Types/LoginTypes.ts

export interface SignInFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface UserLoginDto {
  username?: string | null;
  password?: string | null;
  mfaCode?: string | null;
}

export interface RefreshTokenDto {
  refreshToken?: string | null;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string | null;
  accessToken?: string | null;
  user?: any;
}
