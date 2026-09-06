'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogIn, UserPlus, Sparkles } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';
import { useContactModal } from '@/context/ContactModalContext';
import { ProfileDropdown } from '@/features/Profile';

export const NavAuthActions: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { openModal } = useContactModal();

  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedOutFlag = localStorage.getItem('quantix_has_logged_out');
      setHasLoggedOut(Boolean(loggedOutFlag));
    }
  }, [token]);

  // 1. LOGGED IN STATE (Desktop Header Dropdown)
  if (token) {
    return (
      <div className="hidden lg:flex items-center gap-3">
        <ProfileDropdown />
      </div>
    );
  }

  // 2. LOGGED OUT STATE (Has existing account -> Show Sign In + Claim 3 Months Free)
  if (hasLoggedOut) {
    return (
      <div className="hidden lg:flex items-center gap-3">
        <Link
          href="/sign-in"
          className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-primary/40 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-syne font-bold text-xs transition-all duration-300 hover:bg-primary/5 cursor-pointer"
        >
          <LogIn size={14} className="text-primary" />
          <span>Sign In</span>
        </Link>

        <button
          type="button"
          onClick={() => openModal('Claim Your 3 Months Free Trial', 'START_FREE_TRIAL')}
          className="flex items-center justify-center gap-2 h-10 px-5.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-syne font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md shadow-red-600/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
        >
          <Sparkles size={14} className="text-amber-300 fill-amber-300" />
          <span>Claim 3 Months Free</span>
        </button>
      </div>
    );
  }

  // 3. FIRST TIME VISIT STATE (No account yet -> Show Sign Up + Claim 3 Months Free)
  return (
    <div className="hidden lg:flex items-center gap-3">
      <Link
        href="/sign-up"
        className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-primary/40 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-syne font-bold text-xs transition-all duration-300 hover:bg-primary/5 cursor-pointer"
      >
        <UserPlus size={14} className="text-primary" />
        <span>Sign Up</span>
      </Link>

      <button
        type="button"
        onClick={() => openModal('Claim Your 3 Months Free Trial', 'START_FREE_TRIAL')}
        className="flex items-center justify-center gap-2 h-10 px-5.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-syne font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md shadow-red-600/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
      >
        <Sparkles size={14} className="text-amber-300 fill-amber-300" />
        <span>Claim 3 Months Free</span>
      </button>
    </div>
  );
};

export default NavAuthActions;
