'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, LogIn, ChevronDown, UserPlus, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import { useContactModal } from '@/context/ContactModalContext';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const NavAuthActions: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { openModal } = useContactModal();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has previously logged out or has existing account
    if (typeof window !== 'undefined') {
      const loggedOutFlag = localStorage.getItem('quantix_has_logged_out');
      setHasLoggedOut(Boolean(loggedOutFlag));
    }
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      if (typeof window !== 'undefined') {
        localStorage.setItem('quantix_has_logged_out', 'true');
        setHasLoggedOut(true);
      }
      dispatch(logout());
      setIsDropdownOpen(false);
      toast.success('Successfully signed out. You can sign in anytime!');
      router.push('/');
    } catch (err) {
      toast.error('Logout failed.');
    }
  };

  // 1. LOGGED IN STATE
  if (token) {
    const displayUsername = user?.username || 'Enterprise Admin';
    const displayEmail = user?.email || 'admin@enterprise.com';

    return (
      <div className="hidden lg:flex items-center gap-3 relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-darkSurface/80 dark:hover:bg-darkSurface border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white font-syne">
            <span className="text-xs font-bold uppercase">{displayUsername.charAt(0)}</span>
          </div>
          <span className="text-xs font-syne font-bold text-slate-800 dark:text-slate-200 max-w-30 truncate">
            {displayUsername}
          </span>
          <ChevronDown size={14} className={`text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-darkBg border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-black/60 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-darkSurface/50">
              <p className="text-sm font-syne font-bold text-slate-900 dark:text-white truncate capitalize">{displayUsername}</p>
              <p className="text-xs font-medium text-slate-500 truncate">{displayEmail}</p>
            </div>

            <div className="p-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-syne font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
              >
                <LogOut size={15} />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. LOGGED OUT STATE (Has existing account -> Show Sign In + Start a Free Trial at right end)
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
          onClick={() => openModal('Start Your 14-Day Free Trial', 'START_FREE_TRIAL')}
          className="flex items-center justify-center gap-2 h-10 px-5.5 rounded-xl bg-primary hover:bg-primary-light text-white font-syne font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.04] active:scale-95 shadow-md shadow-primary/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Sparkles size={14} className="text-amber-300" />
          <span>Start a Free Trial</span>
        </button>
      </div>
    );
  }

  // 3. FIRST TIME VISIT STATE (No account yet -> Show Sign Up + Start a Free Trial at right end)
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
        onClick={() => openModal('Start Your 14-Day Free Trial', 'START_FREE_TRIAL')}
        className="flex items-center justify-center gap-2 h-10 px-5.5 rounded-xl bg-primary hover:bg-primary-light text-white font-syne font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.04] active:scale-95 shadow-md shadow-primary/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Sparkles size={14} className="text-amber-300" />
        <span>Start a Free Trial</span>
      </button>
    </div>
  );
};
