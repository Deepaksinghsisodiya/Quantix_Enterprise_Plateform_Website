import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: Record<string, any> | null;
}

const getInitialToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return Cookies.get('accessToken') || null;
  }
  return null;
};

const getInitialRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return Cookies.get('refreshToken') || null;
  }
  return null;
};

const getInitialUser = (): Record<string, any> | null => {
  if (typeof window !== 'undefined') {
    const raw = Cookies.get('authUser');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
  }
  return null;
};

const initialState: AuthState = {
  token: getInitialToken(),
  refreshToken: getInitialRefreshToken(),
  user: getInitialUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; refreshToken?: string | null; user?: any }>) {
      state.token = action.payload.token;
      if (action.payload.refreshToken !== undefined) {
        state.refreshToken = action.payload.refreshToken;
      }
      if (action.payload.user !== undefined) {
        state.user = action.payload.user;
      }
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
