// src/features/Features/Types/FeaturesTypes.ts

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: 'BarChart2' | 'Package' | 'CreditCard' | 'Users' | 'Globe' | 'Shield' | 'Headphones' | 'Lock' | 'RefreshCw';
  color: string;
}

export interface ApiFeaturesResponse {
  success: boolean;
  data: Feature[];
}
