// src/features/Clientele/components/ClienteleWrapper.tsx
'use client';

import React from 'react';
import { useGetClienteleQuery } from '../Service/ClienteleService';
import ClienteleMarquee from './ClienteleMarquee';

export const ClienteleWrapper: React.FC = () => {
  const { data: clientele = [], isLoading } = useGetClienteleQuery();

  return <ClienteleMarquee clientele={clientele} isLoading={isLoading} />;
};

export default ClienteleWrapper;
