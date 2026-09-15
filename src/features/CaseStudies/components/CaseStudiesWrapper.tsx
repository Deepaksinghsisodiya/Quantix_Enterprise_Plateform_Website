// src/features/CaseStudies/components/CaseStudiesWrapper.tsx
'use client';

import React from 'react';
import { useGetCaseStudiesQuery } from '../Service/CaseStudiesService';
import CaseStudiesSection from './CaseStudiesSection';

export interface CaseStudiesWrapperProps {
  hideHeader?: boolean;
}

export const CaseStudiesWrapper: React.FC<CaseStudiesWrapperProps> = ({ hideHeader = false }) => {
  const { data: studies = [], isLoading } = useGetCaseStudiesQuery();

  return <CaseStudiesSection studies={studies} isLoading={isLoading} hideHeader={hideHeader} />;
};

export default CaseStudiesWrapper;
