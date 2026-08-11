import type React from 'react';

export interface NavLink {
  label: string;
  href: string;
  desc: string;
}

export type MobileMenuIcon = React.ComponentType<{ size?: number; className?: string }>;

export interface MobileMenuItem {
  title: string;
  desc: string;
  href: string;
  icon: MobileMenuIcon;
  badge?: string;
}

export interface MobileMenuGroup {
  title: string;
  items: MobileMenuItem[];
}

export interface MobileMenuSection extends NavLink {
  icon: MobileMenuIcon;
  groups: MobileMenuGroup[];
}
