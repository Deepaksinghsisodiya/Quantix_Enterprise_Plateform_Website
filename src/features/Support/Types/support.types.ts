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

export interface SupportChannel {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlightColor: string;
  slaTag: string;
  features: string[];
}

export interface SupportSlaMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}
