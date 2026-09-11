'use client';

import React from 'react';
import { useGetAnnouncementsQuery } from '../Service/AnnouncementService';
import AnnouncementTicker from './AnnouncementTicker';
import { FALLBACK_ANNOUNCEMENTS } from '../constants/fallbackAnnouncements';

export const AnnouncementTickerWrapper: React.FC = () => {
  const { data: announcements, isLoading, isError } = useGetAnnouncementsQuery();

  // Use API data if available, otherwise fall back to static data
  const displayData =
    !isLoading && (isError || !announcements || announcements.length === 0)
      ? FALLBACK_ANNOUNCEMENTS
      : announcements ?? [];

  return <AnnouncementTicker announcements={displayData} isLoading={isLoading} />;
};

export default AnnouncementTickerWrapper;
