// src/features/Pricing/PricingWrapper.tsx
import React from 'react';
import { useGetPricingPlansQuery } from './services/PricingServices';
import PricingSection from './PricingSection';

export const PricingWrapper: React.FC = () => {
  const { data: plans = [], isLoading } = useGetPricingPlansQuery();

  return <PricingSection plans={plans} isLoading={isLoading} />;
};

export default PricingWrapper;
