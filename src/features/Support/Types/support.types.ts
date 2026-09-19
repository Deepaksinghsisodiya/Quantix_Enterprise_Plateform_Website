export interface SupportPillar {
  id: string;
  title: string;
  badge: string;
  description: string;
  iconName: string;
  points: string[];
}

export interface SupportTrustBadge {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface SupportSectionProps {
  platformName?: string;
  className?: string;
}
