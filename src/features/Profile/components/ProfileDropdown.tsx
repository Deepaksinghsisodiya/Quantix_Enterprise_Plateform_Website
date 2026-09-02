// src/features/Profile/components/ProfileDropdown.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  LogOut,
  ChevronDown,
  KeyRound,
  ExternalLink,
  BookOpen,
  Headset,
  Building2,
  CheckCircle2,
  Sparkles,
  Store,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useGetProfileQuery } from '../Service/ProfileService';
import { ChangePasswordModal } from './ChangePasswordModal';
import { useContactModal } from '@/context/ContactModalContext';

export const ProfileDropdown: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const authUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { openModal } = useContactModal();

  const { data: liveProfile } = useGetProfileQuery(undefined, { skip: !token });

  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!token) return null;

  // Resolve user info from live API or auth storage
  const rawAuthUser = authUser as any;
  const displayName = liveProfile?.fullName || liveProfile?.username || rawAuthUser?.fullName || rawAuthUser?.username || 'Enterprise Admin';
  const displayEmail = liveProfile?.email || rawAuthUser?.email || '';
  const displayCompany = liveProfile?.companyName || rawAuthUser?.companyName || 'Quantix Enterprise';
  const displayRole = liveProfile?.role || rawAuthUser?.role || 'Enterprise Admin';
  const merchantId = liveProfile?.merchantId || rawAuthUser?.merchantId || '';

  const adminPortalUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'https://quantixadmin.foreteksolution.in/login';

  const handleLogout = () => {
    try {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('authUser');
      if (typeof window !== 'undefined') {
        localStorage.setItem('quantix_has_logged_out', 'true');
      }
      dispatch(logout());
      setIsOpen(false);
      toast.success('Successfully logged out.');
      router.push('/');
    } catch {
      toast.error('Logout failed.');
    }
  };

  return (
    <>
      <div className="relative font-sans" ref={dropdownRef}>
        {/* Avatar Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF4D00]/20 shadow-2xs group"
        >
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-gradient-to-tr from-[#FF4D00] via-[#FF621F] to-[#E03E00] text-white font-syne text-xs font-black shadow-xs uppercase">
            {displayName.charAt(0)}
          </div>

          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate max-w-[110px]">
              {displayName}
            </span>
            <span className="text-[10px] text-slate-400 truncate max-w-[110px]">
              {displayCompany}
            </span>
          </div>

          <ChevronDown
            size={13}
            className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Card */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-300/40 dark:shadow-black/70 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-900 dark:text-slate-100">
            
            {/* 1. Header: Customer Identity */}
            <div className="p-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/60 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF4D00] to-[#E03E00] text-white font-syne text-sm font-black shadow-sm uppercase">
                    {displayName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-[13px] font-syne font-bold text-slate-900 dark:text-white truncate">
                      {displayName}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{displayEmail}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-extrabold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/80 shrink-0">
                  <CheckCircle2 size={10} className="text-emerald-600" />
                  Active
                </span>
              </div>

              {/* Store & ID Pill */}
              <div className="flex items-center justify-between text-[11px] bg-white dark:bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 mt-2">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium truncate">
                  <Store size={12} className="text-[#FF4D00] shrink-0" />
                  <span className="truncate">{displayCompany}</span>
                </div>
                {merchantId && (
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    ID: {merchantId.slice(0, 8)}...
                  </span>
                )}
              </div>
            </div>

            {/* 2. Primary Highlight Action: Go to Admin Portal */}
            <div className="p-3 bg-orange-50/50 dark:bg-orange-950/20 border-b border-orange-100 dark:border-orange-900/30">
              <a
                href={adminPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#E03E00] text-white font-syne text-xs font-bold tracking-wide shadow-md shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-300 fill-amber-300" />
                  <span>Go to Admin Panel</span>
                </div>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* 3. Action Links List */}
            <div className="p-2 space-y-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsPasswordModalOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-[#FF4D00] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
              >
                <KeyRound size={14} className="text-slate-400 group-hover:text-[#FF4D00]" />
                <span>Change Password</span>
              </button>

              <Link
                href="/resources"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-[#FF4D00] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
              >
                <BookOpen size={14} className="text-slate-400" />
                <span>POS Guides & Tutorials</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openModal('Merchant Priority Support', 'SUPPORT_REQUEST');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-[#FF4D00] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
              >
                <Headset size={14} className="text-slate-400" />
                <span>Contact Support</span>
              </button>
            </div>

            {/* 4. Footer: Log Out */}
            <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left cursor-pointer"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default ProfileDropdown;
