import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { setCredentials, logout } from '../redux/slices/authSlice';
import { ATMLoader } from '../components/atoms/ATMLoader';
import { getApiBaseUrl } from '@/lib/apiBaseUrl';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider – on client mount it checks for a stored access token in cookies.
 * If a token exists it attempts to fetch the current user (`/auth/me`).
 * While the async request is pending a global loader is rendered to avoid UI flash.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    if (!token) {
      setHydrating(false);
      return;
    }

    // Use the baseApi's raw fetch to avoid circular hook usage
    const fetchMe = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/auth/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!res.ok) throw new Error('unauthenticated');
        const data = await res.json();
        dispatch(setCredentials({ token, refreshToken, user: data.user }));
      } catch (e) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        dispatch(logout());
        // optional: redirect to sign‑in page
        router.replace('/sign-in');
      } finally {
        setHydrating(false);
      }
    };

    fetchMe();
  }, []);

  // Show a full‑screen loader while we are determining auth state
  if (hydrating) {
    return <ATMLoader fullScreen size="lg" />;
  }

  return <>{children}</>;
};
