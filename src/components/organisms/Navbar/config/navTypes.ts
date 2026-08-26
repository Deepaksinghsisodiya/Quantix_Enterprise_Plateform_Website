import type React from 'react';

export type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

export interface NavLink {
  label: string;
  href: string;
  desc?: string;
  hasMegaMenu?: boolean;
}

export interface MegaMenuItem {
  title: string;
  desc: string;
  href: string;
  icon: IconComponent;
  badge?: string;
  iconColor?: string;
}

export interface MegaMenuCategory {
  categoryTitle: string;
  items: MegaMenuItem[];
}

export interface MegaMenuPromoCard {
  badge: string;
  title: string;
  desc: string;
  ctaText: string;
  href?: string;
  modalAction?: { label: string; tag: string };
  imageSrc?: string;
  badgeColor?: string;
}

export interface MegaMenuSectionData {
  promoCard?: MegaMenuPromoCard;
  promoCards?: MegaMenuPromoCard[];
  categories: MegaMenuCategory[];
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
  imageSrc?: string;
  badge?: string;
}

export interface QuickMobileTool {
  label: string;
  href: string;
  icon: IconComponent;
}

export interface UserProfile {
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
}
