'use client';

import React from 'react';
import { useGetIndustriesQuery } from './Service/IndustriesService';
import IndustriesSection from './IndustriesSection';

export const IndustriesSectionWrapper: React.FC = () => {
  const { data: apiIndustries = [], isLoading } = useGetIndustriesQuery();

  return <IndustriesSection apiIndustries={apiIndustries} isLoading={isLoading} />;
};

export default IndustriesSectionWrapper;
