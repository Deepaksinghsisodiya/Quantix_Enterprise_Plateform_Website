'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  LogOut,
  LogIn,
  Headset,
  UserPlus,
  Sparkles,
  ExternalLink,
  KeyRound,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOBILE_MENU_SECTIONS, QUICK_MOBILE_TOOLS } from '../../config/navConfig';
import type { MobileMenuSection, QuickMobileTool } from '../../config/navTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useContactModal } from '@/context/ContactModalContext';
import { useGetProfileQuery } from '@/features/Profile';
import { ATMButton } from '@/components/atoms';

interface MobileMenuMainProps {
  pathname: string;
  onSetSubMenu: (label: string) => void;
  onClose: () => void;
}

export const MobileMenuMain: React.FC<MobileMenuMainProps> = ({
  pathname,
  onSetSubMenu,
  onClose,
}) => {
  const token = useAppSelector((state) => state.auth.token);
  const authUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { openModal, openPasswordModal } = useContactModal();

  const { data: liveProfile } = useGetProfileQuery(undefined, { skip: !token });

  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const rawAuthUser = (authUser || {}) as any;
  const rawProfile = (liveProfile || {}) as any;
  const displayEmail = rawProfile?.email || rawAuthUser?.email || '';

  const resolveDisplayName = () => {
    const explicitName = rawProfile?.fullName || rawProfile?.name || rawAuthUser?.fullName || rawAuthUser?.name;
    if (explicitName && explicitName.trim() && explicitName.trim() !== displayEmail) {
      return explicitName.trim();
    }
    if (displayEmail && displayEmail.includes('@')) {
      const local = displayEmail.split('@')[0];
      const cleaned = local.replace(/[._-]+/g, ' ').replace(/\d+/g, '').trim();
      if (cleaned.length >= 3) {
        return cleaned.replace(/\b\w/g, (c: string) => c.toUpperCase());
      }
      return local;
    }
    return 'Enterprise User';
  };

  const displayName = resolveDisplayName();
  const displayCompany = rawProfile?.companyName || rawAuthUser?.companyName || 'Quantix Enterprise';
  const avatarInitial = (displayName || displayEmail || 'Q').charAt(0).toUpperCase();

  const getAdminPortalUrl = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:4173/login';
      }
    }
    return process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'https://quantixadmin.foreteksolution.in/';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedOutFlag = localStorage.getItem('quantix_has_logged_out');
      setHasLoggedOut(Boolean(loggedOutFlag));
    }
  }, [token]);

  const handleLogout = () => {
    try {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('authUser');
      if (typeof window !== 'undefined') {
        localStorage.setItem('quantix_has_logged_out', 'true');
        setHasLoggedOut(true);
      }
      dispatch(logout());
      toast.success('Successfully signed out.');
      onClose();
    } catch {
      toast.error('Logout failed.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 120, damping: 14 } },
  };

  const isMenuHrefActive = (href: string) =>
    pathname === href || (href !== '/' && href !== '#' && pathname.startsWith(`${href}/`));

  const isMobileSectionActive = (section: MobileMenuSection) =>
    isMenuHrefActive(section.href) ||
    section.groups?.some((group) => group.items?.some((item) => isMenuHrefActive(item.href)));

  return (
    <>
      <div className="h-full overflow-y-auto overscroll-contain px-3.5 pt-3.5 pb-[calc(env(safe-area-inset-bottom)+112px)] min-[380px]:px-4 sm:px-5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-full max-w-md flex-col gap-3"
        >
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-extrabold uppercase tracking-normal text-slate-400">
              Navigation Menu
            </span>
            <span className="rounded-full border border-primary/10 bg-white dark:bg-slate-900 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-normal text-primary shadow-xs">
              Enterprise
            </span>
          </div>

          <div className="grid auto-rows-fr grid-cols-2 gap-2.5">
            {MOBILE_MENU_SECTIONS.map((link, index) => {
              const isActive = isMobileSectionActive(link);
              const LinkIcon = link.icon;
              const isWideSection =
                MOBILE_MENU_SECTIONS.length % 2 === 1 && index === MOBILE_MENU_SECTIONS.length - 1;

              return (
                <motion.div
                  key={link.label}
                  variants={itemVariants}
                  className={cn(isWideSection && 'col-span-2')}
                >
                  <button
                    type="button"
                    onClick={() => onSetSubMenu(link.label)}
                    aria-label={`Open ${link.label} menu`}
                    aria-pressed={isActive}
                    className={cn(
                      'group/nav relative flex w-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border px-3 py-3 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 min-h-26.25',
                      isActive
                        ? 'border-primary bg-primary text-white shadow-md shadow-primary/20'
                        : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:border-primary/30 hover:bg-primary/5'
                    )}
                  >
                    {isActive && (
                      <span className="absolute inset-x-3 top-0 h-0.5 rounded-b-full bg-white/65" />
                    )}
                    <span className="flex items-start justify-between gap-2">
                      {link.imageSrc ? (
                        <span className="relative flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center bg-transparent p-0 overflow-hidden">
                          <Image
                            src={link.imageSrc}
                            alt={link.label}
                            fill
                            sizes="64px"
                            className="object-contain drop-shadow-sm"
                          />
                        </span>
                      ) : (
                        <span
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                            isActive
                              ? 'border-white/20 bg-white/15 text-white'
                              : 'border-primary/15 bg-primary/10 text-primary group-hover/nav:bg-primary group-hover/nav:text-white'
                          )}
                        >
                          <LinkIcon size={16} />
                        </span>
                      )}
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all',
                          isActive
                            ? 'border-white/20 bg-white/15 text-white'
                            : 'border-slate-200 text-slate-400 group-hover/nav:border-primary/20 group-hover/nav:text-primary'
                        )}
                      >
                        <ChevronRight size={13} className="transition-transform group-hover/nav:translate-x-0.5" />
                      </span>
                    </span>
                    <span className="mt-2 block min-w-0">
                      <span
                        className={cn(
                          'block font-syne text-[12px] font-black uppercase leading-[1.12] tracking-normal transition-colors duration-200',
                          isActive ? 'text-white' : 'text-slate-900 dark:text-white'
                        )}
                      >
                        {link.label}
                      </span>
                      {link.desc && (
                        <span
                          className={cn(
                            'mt-0.5 block text-[10px] font-medium leading-snug tracking-normal normal-case line-clamp-1',
                            isActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                          )}
                        >
                          {link.desc}
                        </span>
                      )}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={itemVariants} className="space-y-2 border-t border-slate-200/70 dark:border-slate-800 pt-3">
            <div className="px-1 text-[10px] font-extrabold uppercase tracking-normal text-slate-400">
              Tools & Support
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {QUICK_MOBILE_TOOLS.map((tool: QuickMobileTool) => {
                const ToolIcon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={onClose}
                    className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-2 text-center text-[10px] font-extrabold uppercase tracking-normal text-slate-700 dark:text-slate-200 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary/5 hover:text-primary hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 min-[380px]:text-[11px]"
                  >
                    <ToolIcon size={13} className="shrink-0 text-primary" />
                    {tool.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Mobile Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.25 }}
            className="mx-auto mt-4 flex w-full max-w-md flex-col gap-3 border-t border-slate-200/80 dark:border-slate-800 pt-4 pb-2"
          >
            {token ? (
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/50 dark:from-slate-900/90 dark:via-slate-900 dark:to-slate-950 p-4 shadow-sm space-y-3.5">
                {/* 1. Customer Identity Header */}
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF4D00] to-[#E03E00] text-white font-syne text-sm font-black shadow-sm uppercase">
                    {avatarInitial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <p className="text-xs font-syne font-bold text-slate-900 dark:text-white truncate">
                        {displayName}
                      </p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5" title={displayEmail}>
                      {displayEmail}
                    </p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-300 font-medium truncate flex items-center gap-1 mt-1 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-md w-fit">
                      <Building2 size={11} className="text-[#FF4D00] shrink-0" />
                      <span className="truncate">{displayCompany}</span>
                    </p>
                  </div>
                </div>

                {/* 2. Primary Action: Open Admin Dashboard */}
                <a
                  href={getAdminPortalUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#FF4D00] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C83400] text-white font-syne shadow-md shadow-orange-500/20 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-xs">
                      <Sparkles size={15} className="text-amber-200 fill-amber-200" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold leading-tight">Go to Admin Panel</p>
                      <p className="text-[10px] text-white/85 leading-tight mt-0.5">Enterprise operations & branches portal</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </a>

                {/* 3. Account Settings List */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openPasswordModal();
                    }}
                    className="flex w-full items-center justify-between p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-slate-700 dark:text-slate-200 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <KeyRound size={14} className="text-slate-400" />
                      <span className="font-medium">Change Password</span>
                    </div>
                    <ChevronRight size={13} className="text-slate-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openModal('Enterprise Priority Support', 'MOBILE_NAV_CONTACT');
                    }}
                    className="flex w-full items-center justify-between p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-slate-700 dark:text-slate-200 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Headset size={14} className="text-slate-400" />
                      <span className="font-medium">Help & Support</span>
                    </div>
                    <ChevronRight size={13} className="text-slate-400" />
                  </button>
                </div>

                {/* 4. Sign Out */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50"
                >
                  <LogOut size={13} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openModal('Start Your 14-Day Free Trial', 'START_FREE_TRIAL');
                  }}
                  className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-[13px] font-syne font-extrabold uppercase tracking-normal text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <UserPlus size={15} />
                  <span>Start a Free Trial</span>
                </button>
                <Link
                  href={hasLoggedOut ? "/sign-in" : "/sign-up"}
                  onClick={onClose}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[13px] font-syne font-bold uppercase tracking-normal text-slate-800 dark:text-slate-200 hover:border-primary/40 hover:text-primary transition-all"
                >
                  {hasLoggedOut ? <LogIn size={15} className="text-primary" /> : <UserPlus size={15} className="text-primary" />}
                  <span>{hasLoggedOut ? "Sign In to Account" : "Sign Up"}</span>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default MobileMenuMain;
