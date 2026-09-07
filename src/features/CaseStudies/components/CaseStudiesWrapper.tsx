// src/features/CaseStudies/components/CaseStudiesWrapper.tsx
'use client';

import React from 'react';
import { useGetCaseStudiesQuery } from '../Service/CaseStudiesService';
import CaseStudiesSection from './CaseStudiesSection';

export const CaseStudiesWrapper: React.FC = () => {
  const { data: studies = [], isLoading } = useGetCaseStudiesQuery();

  return <CaseStudiesSection studies={studies} isLoading={isLoading} />;
};

export default CaseStudiesWrapper;
