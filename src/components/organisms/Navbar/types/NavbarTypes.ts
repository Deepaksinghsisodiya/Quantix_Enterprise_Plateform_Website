import type React from 'react';

export interface NavLink {
  label: string;
  href: string;
  desc: string;
  hasMegaMenu?: boolean;
}

export type IconComponent = React.ComponentType<{ size?: number; className?: string }>;
export type MobileMenuIcon = IconComponent;

export interface QuickMobileTool {
  label: string;
  href: string;
  icon: IconComponent;
}

export interface MegaMenuItem {
  title: string;
  desc: string;
  href: string;
  icon: IconComponent;
  badge?: string;
  category?: string;
}

export interface MegaMenuPromoCard {
  badge: string;
  title: string;
  desc: string;
  ctaText: string;
  href?: string;
  modalAction?: { label: string; tag: string };
  imageSrc?: string;
}

export interface MegaMenuData {
  categoryTitle: string;
  items: MegaMenuItem[];
  promoCard?: MegaMenuPromoCard;
}

export interface MobileMenuItem {
  title: string;
  desc: string;
  href: string;
  icon: IconComponent;
  badge?: string;
}

export interface MobileMenuGroup {
  title: string;
  items: MobileMenuItem[];
}

export interface MobileMenuSection extends NavLink {
  icon: IconComponent;
  groups: MobileMenuGroup[];
}

export interface UserProfile {
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface NavbarViewProps {
  scrolled: boolean;
  mobileOpen: boolean;
  mobileSubMenu: string | null;
  openMegaMenu: string | null;
  pathname: string;
  isLoggedIn: boolean;
  user: UserProfile | null;
  navLinks: NavLink[];
  productsMegaData: MegaMenuData[];
  solutionsMegaData: MegaMenuData[];
  mobileMenuSections: MobileMenuSection[];
  onToggleMobile: () => void;
  onCloseMobile: () => void;
  onSetMobileSubMenu: (label: string | null) => void;
  onSetOpenMegaMenu: (label: string | null) => void;
  onOpenContactModal: (title: string, tag: string) => void;
  onLogout: () => void;
  onBrandClick: (e: React.MouseEvent) => void;
}
