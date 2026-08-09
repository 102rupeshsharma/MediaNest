export interface PexelsPhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSrc;
  alt: string;
}

export interface PexelsVideoFile {
  id: number;
  quality: 'hd' | 'sd' | 'hls';
  file_type: string;
  width: number | null;
  height: number | null;
  link: string;
}

export interface PexelsVideoPicture {
  id: number;
  picture: string;
  nr: number;
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: PexelsVideoFile[];
  video_pictures: PexelsVideoPicture[];
}

export interface PexelsPhotoResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
  prev_page?: string;
  total_results: number;
}

export interface PexelsVideoResponse {
  page: number;
  per_page: number;
  videos: PexelsVideo[];
  next_page?: string;
  prev_page?: string;
  total_results: number;
}

export interface MediaItem {
  id: string | number;
  type: 'photo' | 'video';
  url: string;
  previewUrl: string;
  title: string;
  width: number;
  height: number;
  photographer: string;
  photographerUrl: string;
  duration?: number;
  originalPayload: PexelsPhoto | PexelsVideo;
}

export interface NormalizedResponse<T> {
  page: number;
  perPage: number;
  items: T[];
  totalResults: number;
  hasNextPage: boolean;
}

export interface SDKOptions {
  cacheTtlMs?: number;
  apiKey?: string;
}

export type Listener<T = any> = (payload: T) => void;
