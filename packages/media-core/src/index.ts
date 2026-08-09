import { HttpClient } from './client';
import { EventEmitter } from './emitter';
import {
  MediaItem,
  NormalizedResponse,
  PexelsPhoto,
  PexelsPhotoResponse,
  PexelsVideo,
  PexelsVideoResponse,
  SDKOptions,
  Listener,
} from './types';

export * from './types';
export { EventEmitter } from './emitter';
export { HttpClient } from './client';

export class MediaCore {
  private client: HttpClient;
  private emitter: EventEmitter;
  private isInitialized = false;

  constructor(options?: SDKOptions) {
    this.client = new HttpClient(options?.cacheTtlMs);
    this.emitter = new EventEmitter();
    if (options?.apiKey) {
      this.init(options.apiKey);
    }
  }

  init(apiKey: string): void {
    if (!apiKey) {
      throw new Error('API Key is required for initialization.');
    }
    this.client.setApiKey(apiKey);

    if (!this.isInitialized) {
      this.on('view', (payload) => {
        console.info('[MediaCore Event] view:', payload);
      });
      this.on('download', (payload) => {
        console.info('[MediaCore Event] download:', payload);
      });
      this.isInitialized = true;
    }
  }

  getApiKey(): string {
    return this.client.getApiKey();
  }

  async searchPhotos(
    query: string,
    page = 1,
    perPage = 15,
  ): Promise<NormalizedResponse<MediaItem>> {
    const raw: PexelsPhotoResponse = await this.client.request('https://api.pexels.com/v1/search', {
      query,
      page,
      per_page: perPage,
    });

    return {
      page: raw.page,
      perPage: raw.per_page,
      totalResults: raw.total_results,
      hasNextPage: !!raw.next_page,
      items: (raw.photos || []).map(mapPhotoToMediaItem),
    };
  }

  async searchVideos(
    query: string,
    page = 1,
    perPage = 15,
  ): Promise<NormalizedResponse<MediaItem>> {
    const raw: PexelsVideoResponse = await this.client.request(
      'https://api.pexels.com/videos/search',
      { query, page, per_page: perPage },
    );

    return {
      page: raw.page,
      perPage: raw.per_page,
      totalResults: raw.total_results,
      hasNextPage: !!raw.next_page,
      items: (raw.videos || []).map(mapVideoToMediaItem),
    };
  }

  async getCuratedPhotos(page = 1, perPage = 15): Promise<NormalizedResponse<MediaItem>> {
    const raw: PexelsPhotoResponse = await this.client.request(
      'https://api.pexels.com/v1/curated',
      { page, per_page: perPage },
    );

    return {
      page: raw.page,
      perPage: raw.per_page,
      totalResults: raw.total_results,
      hasNextPage: !!raw.next_page,
      items: (raw.photos || []).map(mapPhotoToMediaItem),
    };
  }

  async getPhotoById(id: string | number): Promise<MediaItem> {
    const raw: PexelsPhoto = await this.client.request(`https://api.pexels.com/v1/photos/${id}`);
    return mapPhotoToMediaItem(raw);
  }

  // --- Tracking & Events ---

  trackView(item: MediaItem): void {
    this.emit('view', item);
  }

  trackDownload(item: MediaItem): void {
    this.emit('download', item);
  }

  on(event: 'view' | 'download', listener: Listener<MediaItem>): void {
    this.emitter.on(event, listener);
  }

  off(event: 'view' | 'download', listener: Listener<MediaItem>): void {
    this.emitter.off(event, listener);
  }

  emit(event: string, payload: unknown): void {
    this.emitter.emit(event, payload);
  }

  clearCache(): void {
    this.client.clearCache();
  }
}

function mapPhotoToMediaItem(photo: PexelsPhoto): MediaItem {
  return {
    id: photo.id,
    type: 'photo',
    url: photo.src.large2x || photo.src.original,
    previewUrl: photo.src.large || photo.src.medium,
    title: photo.alt || `Photo by ${photo.photographer}`,
    width: photo.width,
    height: photo.height,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    originalPayload: photo,
  };
}

function mapVideoToMediaItem(video: PexelsVideo): MediaItem {
  const file =
    video.video_files.find((f) => f.file_type === 'video/mp4' && f.quality === 'hd') ||
    video.video_files.find((f) => f.file_type === 'video/mp4') ||
    video.video_files[0];

  return {
    id: video.id,
    type: 'video',
    url: file?.link || video.url,
    previewUrl: video.image,
    title: `Video by ${video.user.name}`,
    width: video.width,
    height: video.height,
    photographer: video.user.name,
    photographerUrl: video.user.url,
    duration: video.duration,
    originalPayload: video,
  };
}

export function createMediaSDK(options?: SDKOptions): MediaCore {
  return new MediaCore(options);
}
