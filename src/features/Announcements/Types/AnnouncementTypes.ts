// src/features/Announcements/Types/AnnouncementTypes.ts

export type AnnouncementKind = 'News' | 'Event' | 'Notice';

export interface AnnouncementDto {
  announcementId?: string;
  id?: string;
  title: string;
  body?: string;
  kind?: AnnouncementKind;
  linkUrl?: string;
  pageSlug?: string;
  sortOrder?: number;
  isActive?: boolean;
  isPinned?: boolean;
  publishFrom?: string;
  publishUntil?: string;
  eventStartsAt?: string;
  eventEndsAt?: string;
  location?: string;
  mediaAssetId?: string;
  createdAt?: string;
}

export interface ApiAnnouncementsResponse {
  success: boolean;
  message?: string;
  data: AnnouncementDto[];
}
