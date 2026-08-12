'use client';

import React from 'react';
import Link from 'next/link';
import { User, LogOut, Phone } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetMeQuery } from '@/features/Login/services/LoginServices';
import { logout } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useContactModal } from '@/context/ContactModalContext';
import { useRouter } from 'next/navigation';

export const NavAuthActions: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { data: meData } = useGetMeQuery(undefined, { skip: !token });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { openModal } = useContactModal();

  const handleLogout = async () => {
    try {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      dispatch(logout());
      toast.success('Successfully signed out. Have a great day!');
      router.push('/');
    } catch (err) {
      toast.error('Logout failed.');
    }
  };

  if (token) {
    return (
      <div className="hidden lg:flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 select-none">
          <User size={13} className="text-primary" />
          <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-slate-800 dark:text-slate-200">
            {meData?.data?.username || meData?.username || 'Admin'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-600 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white font-bold text-[11px] tracking-[0.08em] uppercase transition-all duration-300 hover:scale-[1.04] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30"
        >
          <LogOut size={13} />
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-3">
      <a
        href="tel:+18005550199"
        className="hidden xl:flex items-center justify-center gap-2 h-10 px-4.5 rounded-xl border border-primary/40 hover:border-primary text-primary-dark dark:text-primary-light font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.04] active:scale-95 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        <Phone size={14} className="text-primary dark:text-primary-light" />
        Call Now
      </a>
      <button
        type="button"
        onClick={() => openModal()}
        className="flex items-center justify-center h-10 px-5.5 rounded-xl bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.06] active:scale-95 shadow-md shadow-primary/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        Contact sales
      </button>
    </div>
  );
};
