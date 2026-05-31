// src/features/Downloads/Types/DownloadsTypes.ts

export interface DownloadPackageDto {
  packageId: string;
  name: string;
  version: string;
  description: string;
  platform: string;
  fileSize?: string;
  downloadUrl?: string;
  releaseDate?: string;
  isLatest?: boolean;
  changelog?: string;
}

export interface ApiDownloadsResponse {
  success: boolean;
  data: DownloadPackageDto[];
}

export interface ApiLatestDownloadResponse {
  success: boolean;
  data: DownloadPackageDto;
}
