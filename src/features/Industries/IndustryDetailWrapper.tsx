'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetIndustryBySlugQuery } from './services/IndustriesServices';
import IndustryDetail from './IndustryDetail';

export const IndustryDetailWrapper: React.FC = () => {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug.toLowerCase() : "";

  const { data: apiIndustry = null, isLoading } = useGetIndustryBySlugQuery(slug, {
    skip: !slug,
  });

  return (
    <IndustryDetail 
      slug={slug} 
      apiIndustry={apiIndustry} 
      isLoading={isLoading} 
    />
  );
};

export default IndustryDetailWrapper;
