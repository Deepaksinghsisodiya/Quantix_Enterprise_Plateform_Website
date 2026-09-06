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
} from 'lucide-react';
import { ATMButton } from '@/components/atoms';

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
    <div className="absolute top-full right-0 mt-2.5 w-76 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/15 dark:shadow-black/80 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-900 dark:text-slate-100 font-sans">
      {/* 1. Header: Customer Identity */}
      <div className="p-4 bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-800/50 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF4D00] to-[#E03E00] text-white font-syne text-base font-black shadow-md shadow-orange-500/20 uppercase">
            {avatarInitial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
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
          </div>
        </div>

        {/* Company / Workspace Pill */}
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300">
          <Building2 size={13} className="text-[#FF4D00] shrink-0" />
          <span className="truncate">{displayCompany}</span>
        </div>
      </div>

      {/* 2. Primary Action: Go to Admin Portal */}
      <div className="p-3 bg-orange-50/60 dark:bg-orange-950/20 border-b border-orange-100 dark:border-orange-900/30">
        <a
          href={adminPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF4D00] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C83400] text-white font-syne text-xs font-bold tracking-wide shadow-md shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
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
            onClose();
            onOpenChangePassword();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-[#FF4D00] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
        >
          <KeyRound size={14} className="text-slate-400" />
          <span>Change Password</span>
        </button>

        <Link
          href="/resources"
          onClick={onClose}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-[#FF4D00] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
        >
          <BookOpen size={14} className="text-slate-400" />
          <span>Enterprise Guides</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenSupport();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-[#FF4D00] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
        >
          <Headset size={14} className="text-slate-400" />
          <span>Contact Support</span>
        </button>
      </div>

      {/* 4. Footer: Log Out */}
      <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
        <ATMButton
          type="button"
          variant="danger"
          size="sm"
          fullWidth
          onClick={onLogout}
          leftIcon={<LogOut size={13} />}
        >
          Sign Out
        </ATMButton>
      </div>
    </div>
  );
};

export default ProfileDropdownMenu;
