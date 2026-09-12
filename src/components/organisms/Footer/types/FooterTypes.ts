export interface FooterLink {
  href: string;
  label: string;
  badge?: string;
}

export interface SocialLink {
  href: string;
  ariaLabel: string;
  icon: 'twitter' | 'x' | 'linkedin' | 'github' | 'youtube' | 'instagram' | string;
}
