// src/features/Features/FeaturesWrapper.tsx
import React from 'react';
import { useGetFeaturesQuery } from './services/FeaturesServices';
import FeaturesSection from './FeaturesSection';

export const FeaturesWrapper: React.FC = () => {
  const { data: features = [], isLoading, isError, refetch } = useGetFeaturesQuery();

  return (
    <FeaturesSection 
      features={features} 
      isLoading={isLoading} 
      isError={isError} 
      onRetry={refetch} 
    />
  );
};

export default FeaturesWrapper;
