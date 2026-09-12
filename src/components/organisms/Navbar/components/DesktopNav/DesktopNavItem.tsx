'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavLink } from '../../config/navTypes';

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
  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`));
  const isHighlighted = openMegaMenu ? isMenuOpen : isActive;

  return (
    <li
      role="none"
      className="relative py-2.5 px-3 group cursor-pointer"
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
          'relative z-10 text-[15px] font-semibold transition-all duration-300 block hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm',
          isHighlighted
            ? 'text-primary font-bold'
            : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white'
        )}
      >
        <span className="inline-flex items-center gap-1">
          {link.label}
          {isDropdown && (
            <ChevronDown
              size={12}
              className={cn(
                'transition-transform duration-300 ease-out shrink-0',
                isMenuOpen ? 'rotate-180 text-primary' : 'text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
              )}
            />
          )}
        </span>
      </Link>

      {/* Bottom border line for active/hover states */}
      <span
        className={cn(
          'absolute bottom-0 left-3 right-3 h-[2px] bg-primary transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100',
          isHighlighted && 'scale-x-100'
        )}
      />
    </li>
  );
};
