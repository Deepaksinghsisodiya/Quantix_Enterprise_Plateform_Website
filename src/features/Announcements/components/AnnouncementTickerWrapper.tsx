'use client';

import React from 'react';
import { useGetAnnouncementsQuery } from '../Service/AnnouncementService';
import AnnouncementTicker from './AnnouncementTicker';

export const AnnouncementTickerWrapper: React.FC = () => {
  const { data: announcements, isLoading, isError } = useGetAnnouncementsQuery();

  // If loading, show ticker skeleton
  if (isLoading) {
    return <AnnouncementTicker announcements={[]} isLoading={true} />;
  }

  // If Admin has no active announcements or error, collapse section completely
  if (isError || !announcements || announcements.length === 0) {
    return null;
  }

  return <AnnouncementTicker announcements={announcements} isLoading={false} />;
};

export default AnnouncementTickerWrapper;
