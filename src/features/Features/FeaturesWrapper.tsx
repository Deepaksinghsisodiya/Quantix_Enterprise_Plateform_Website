// src/features/Features/FeaturesWrapper.tsx
'use client';

import React from 'react';
import { useGetHomepageFeaturesQuery } from './Service/FeaturesService';
import FeaturesSection from './FeaturesSection';

export const FeaturesWrapper: React.FC = () => {
  const { data: features = [], isLoading, isError, refetch } = useGetHomepageFeaturesQuery({
    siteVariant: 'Enterprise',
  });

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
