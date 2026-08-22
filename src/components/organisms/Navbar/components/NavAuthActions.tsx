'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, LogIn, ChevronDown, Phone } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetMeQuery } from '@/features/Login/services/LoginServices';
import { logout } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useContactModal } from '@/context/ContactModalContext';
import { useRouter } from 'next/navigation';

export const NavAuthActions: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const { data: meData } = useGetMeQuery(undefined, { skip: !token });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { openModal } = useContactModal();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (token) {
    const displayUsername = user?.username || meData?.data?.username || meData?.username || 'Enterprise Admin';
    const displayEmail = user?.email || meData?.data?.email || meData?.email || 'admin@enterprise.com';

    const handleLogout = async () => {
      try {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        dispatch(logout());
        setIsDropdownOpen(false);
        toast.success('Successfully signed out. Have a great day!');
        router.push('/');
      } catch (err) {
        toast.error('Logout failed.');
      }
    };

    return (
      <div className="hidden lg:flex items-center gap-3 relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
            <span className="text-xs font-bold uppercase">{displayUsername.charAt(0)}</span>
          </div>
          <ChevronDown size={14} className={`text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-black/40 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate capitalize">{displayUsername}</p>
              <p className="text-xs font-medium text-slate-500 truncate">{displayEmail}</p>
            </div>

            <div className="p-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-3">
      <Link
        href="/sign-in"
        className="hidden xl:flex items-center justify-center gap-2 h-10 px-4.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[13px] transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className="flex items-center justify-center h-10 px-5.5 rounded-xl bg-primary hover:bg-primary-light text-white font-extrabold text-[13px] transition-all duration-300 hover:scale-[1.06] active:scale-95 shadow-md shadow-primary/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        Start Free Trial
      </Link>
    </div>
  );
};

