// src/features/Profile/components/ProfileDropdownMenu.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
  LogOut,
  KeyRound,
  ExternalLink,
  BookOpen,
  Headset,
  Sparkles,
  Building2,
  ChevronRight,
} from 'lucide-react';

interface ProfileDropdownMenuProps {
  displayName: string;
  displayEmail: string;
  displayCompany: string;
  avatarInitial: string;
  adminPortalUrl: string;
  onClose: () => void;
  onOpenChangePassword: () => void;
  onOpenSupport: () => void;
  onLogout: () => void;
}

export const ProfileDropdownMenu: React.FC<ProfileDropdownMenuProps> = ({
  displayName,
  displayEmail,
  displayCompany,
  avatarInitial,
  adminPortalUrl,
  onClose,
  onOpenChangePassword,
  onOpenSupport,
  onLogout,
}) => {
  return (
    <div className="absolute top-full right-0 mt-2.5 w-80 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-slate-900/20 dark:shadow-black/80 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-150 text-slate-900 dark:text-slate-100 font-sans">
      {/* 1. Header: Customer Identity */}
      <div className="p-4 bg-linear-to-b from-slate-50/90 to-white dark:from-slate-800/60 dark:to-slate-900/80 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-[#FF4D00] to-[#E03E00] text-white font-syne text-base font-black shadow-md shadow-orange-500/25 ring-2 ring-[#FF4D00]/20 uppercase">
            {avatarInitial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1.5">
              <h4 className="text-xs sm:text-sm font-syne font-bold text-slate-900 dark:text-white truncate">
                {displayName}
              </h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5" title={displayEmail}>
              {displayEmail}
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 text-[10.5px] font-medium text-slate-700 dark:text-slate-300 max-w-full">
              <Building2 size={12} className="text-[#FF4D00] shrink-0" />
              <span className="truncate">{displayCompany}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Command Center Action */}
      <div className="p-3 bg-linear-to-b from-orange-50/70 to-amber-50/40 dark:from-orange-950/30 dark:to-slate-900/40 border-b border-orange-100/80 dark:border-orange-900/30">
        <a
          href={adminPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-linear-to-r from-[#FF4D00] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C83400] text-white shadow-md shadow-orange-500/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-xs">
              <Sparkles size={15} className="text-amber-200 fill-amber-200" />
            </div>
            <div className="text-left">
              <p className="text-xs font-syne font-bold leading-tight">Launch Admin Portal</p>
              <p className="text-[10px] text-white/85 leading-tight mt-0.5 font-normal">
                Enterprise operations & branches
              </p>
            </div>
          </div>
          <ExternalLink size={14} className="text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
        </a>
      </div>

      {/* 3. Action Links List */}
      <div className="p-2 space-y-1 text-xs">
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenChangePassword();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-[#FF4D00] hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <KeyRound size={14} className="text-slate-400 group-hover:text-[#FF4D00] transition-colors" />
            <span className="font-medium">Change Password</span>
          </div>
          <ChevronRight size={13} className="text-slate-400 group-hover:text-[#FF4D00] group-hover:translate-x-0.5 transition-all" />
        </button>

        <Link
          href="/resources"
          onClick={onClose}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-[#FF4D00] hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen size={14} className="text-slate-400 group-hover:text-[#FF4D00] transition-colors" />
            <span className="font-medium">Guides & Documentation</span>
          </div>
          <ChevronRight size={13} className="text-slate-400 group-hover:text-[#FF4D00] group-hover:translate-x-0.5 transition-all" />
        </Link>

        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenSupport();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-[#FF4D00] hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <Headset size={14} className="text-slate-400 group-hover:text-[#FF4D00] transition-colors" />
            <span className="font-medium">24/7 Priority Support</span>
          </div>
          <ChevronRight size={13} className="text-slate-400 group-hover:text-[#FF4D00] group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* 4. Footer: Sign Out */}
      <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer border border-transparent hover:border-rose-200 dark:hover:border-rose-900/40"
        >
          <LogOut size={13} />
          <span>Sign Out of Account</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdownMenu;
