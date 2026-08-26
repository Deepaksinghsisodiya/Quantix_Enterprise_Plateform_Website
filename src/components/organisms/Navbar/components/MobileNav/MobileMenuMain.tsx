'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, User, LogOut, LogIn, Headset, UserPlus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOBILE_MENU_SECTIONS, QUICK_MOBILE_TOOLS } from '../../config/navConfig';
import type { MobileMenuSection, QuickMobileTool } from '../../config/navTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useContactModal } from '@/context/ContactModalContext';

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
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { openModal } = useContactModal();

  const [hasLoggedOut, setHasLoggedOut] = useState(false);

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
      if (typeof window !== 'undefined') {
        localStorage.setItem('quantix_has_logged_out', 'true');
        setHasLoggedOut(true);
      }
      dispatch(logout());
      toast.success('Successfully signed out.');
      onClose();
    } catch (err) {
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
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  const isMobileSectionActive = (section: MobileMenuSection) =>
    isMenuHrefActive(section.href) ||
    section.groups.some((group) => group.items.some((item) => isMenuHrefActive(item.href)));

  return (
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
            POS Platform
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
                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-0.5 overflow-hidden shadow-2xs">
                        <Image
                          src={link.imageSrc}
                          alt={link.label}
                          fill
                          sizes="32px"
                          className="object-contain p-0.5"
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

        {/* Quick Tools Grid */}
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

        {/* Auth CTA Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="sticky bottom-0 z-10 mx-auto mt-2 flex w-full max-w-md flex-col gap-2.5 border-t border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-3.5"
        >
          {token ? (
            <>
              <div className="flex items-center gap-2.5 justify-center rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 shadow-xs select-none">
                <User size={15} className="text-primary" />
                <span className="text-[13px] font-syne font-bold uppercase tracking-normal text-slate-800 dark:text-slate-200">
                  Hi, {user?.username || 'Enterprise Admin'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openModal('Enterprise Priority Support', 'MOBILE_NAV_CONTACT');
                }}
                className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[13px] font-syne font-bold uppercase tracking-normal text-slate-800 dark:text-slate-200 hover:border-primary/40 hover:text-primary transition-all"
              >
                <Headset size={15} className="text-primary" />
                <span>Contact Enterprise Support</span>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 text-[13px] font-syne font-extrabold uppercase tracking-normal text-white shadow-md shadow-rose-600/15 transition-all duration-200 hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/25"
              >
                <LogOut size={15} />
                Log Out
              </button>
            </>
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
  );
};
