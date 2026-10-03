'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavLink } from '../../config/navTypes';
import { isPrimaryLinkActive } from '../../config/navConfig';

interface DesktopNavItemProps {
  link: NavLink;
  pathname: string;
  openMegaMenu: string | null;
  onMouseEnter: (label: string) => void;
  onMouseLeave: () => void;
}

export const DesktopNavItem: React.FC<DesktopNavItemProps> = ({
  link,
  pathname,
  openMegaMenu,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isDropdown = Boolean(link.hasMegaMenu);
  const isMenuOpen = openMegaMenu === link.label;
  const isActive = isPrimaryLinkActive(link, pathname);
  const isHighlighted = isMenuOpen || isActive;

  return (
    <li
      role="none"
      className="relative py-1.5 px-0.5 group cursor-pointer"
      onMouseEnter={() => {
        if (isDropdown) {
          onMouseEnter(link.label);
        } else {
          onMouseLeave();
        }
      }}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={link.href}
        role="menuitem"
        aria-expanded={isDropdown ? isMenuOpen : undefined}
        onClick={(e) => {
          if (isDropdown) {
            onMouseEnter(link.label);
          }
        }}
        className={cn(
          'relative z-10 px-3 py-1.5 rounded-lg text-[14.5px] font-semibold transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          isHighlighted
            ? 'text-primary bg-primary/10 dark:bg-primary/15 font-bold shadow-2xs'
            : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          {link.label}
          {isDropdown && (
            <ChevronDown
              size={12}
              className={cn(
                'transition-transform duration-200 ease-out shrink-0',
                isMenuOpen ? 'rotate-180 text-primary' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
              )}
            />
          )}
        </span>
      </Link>
    </li>
  );
};
