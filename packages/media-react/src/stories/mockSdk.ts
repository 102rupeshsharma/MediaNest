import { MediaCore } from '../index';
import type { MediaItem, NormalizedResponse, PexelsPhoto, PexelsVideo } from '@fotoowl/media-core';

export const mockPhotos: MediaItem[] = [
  {
    id: 1,
    type: 'photo',
    url: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewUrl: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Beautiful Mountain Landscape',
    width: 800,
    height: 600,
    photographer: 'Julius Silver',
    photographerUrl: 'https://www.pexels.com/@julius-silver-24075',
    originalPayload: {} as PexelsPhoto,
  },
  {
    id: 2,
    type: 'photo',
    url: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewUrl: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Autumn Forest Pathway',
    width: 800,
    height: 600,
    photographer: 'Pixabay',
    photographerUrl: 'https://www.pexels.com/@pixabay',
    originalPayload: {} as PexelsPhoto,
  },
  {
    id: 3,
    type: 'photo',
    url: 'https://images.pexels.com/photos/327394/pexels-photo-327394.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewUrl: 'https://images.pexels.com/photos/327394/pexels-photo-327394.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Calm Ocean Sunset',
    width: 800,
    height: 600,
    photographer: 'Pexels User',
    photographerUrl: 'https://www.pexels.com',
    originalPayload: {} as PexelsPhoto,
  },
  {
    id: 4,
    type: 'photo',
    url: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    previewUrl: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    title: 'Mystical Green Fern',
    width: 800,
    height: 600,
    photographer: 'Luis del Río',
    photographerUrl: 'https://www.pexels.com/@luisdelrio',
    originalPayload: {} as PexelsPhoto,
  },
];

export const mockVideos: MediaItem[] = [
  {
    id: 101,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e28981c11a709b0b2e3474de0b5&profile_id=165&oauth2_token_id=57447761',
    previewUrl: 'https://images.pexels.com/videos/3195394/pictures/out-of-focus-3195394.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Aerial View of Forest Hills',
    width: 1920,
    height: 1080,
    photographer: 'Tom Fisk',
    photographerUrl: 'https://www.pexels.com/@tomfisk',
    originalPayload: {} as PexelsVideo,
  },
  {
    id: 102,
    type: 'video',
    url: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27d239c0f4be1ea92f6ce6a218f77eb2ec0a8c2&profile_id=165&oauth2_token_id=57447761',
    previewUrl: 'https://images.pexels.com/videos/4611598/pictures/out-of-focus-4611598.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Crashing Waves on Sand',
    width: 1920,
    height: 1080,
    photographer: 'Kelly Lacy',
    photographerUrl: 'https://www.pexels.com/@kelly-lacy',
    originalPayload: {} as PexelsVideo,
  },
];

export class MockMediaCore extends MediaCore {
  constructor() {
    super({ apiKey: 'storybook-mock-key' });
  }

  override async getCuratedPhotos(page = 1, perPage = 15): Promise<NormalizedResponse<MediaItem>> {
    const startIndex = (page - 1) * perPage;
    const items = mockPhotos.slice(startIndex, startIndex + perPage);
    return {
      page,
      perPage,
      totalResults: mockPhotos.length,
      hasNextPage: startIndex + perPage < mockPhotos.length,
      items,
    };
  }

  override async searchPhotos(query: string, page = 1, perPage = 15): Promise<NormalizedResponse<MediaItem>> {
    const filtered = query.trim()
      ? mockPhotos.filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.photographer.toLowerCase().includes(query.toLowerCase())
        )
      : mockPhotos;
    const startIndex = (page - 1) * perPage;
    const items = filtered.slice(startIndex, startIndex + perPage);
    return {
      page,
      perPage,
      totalResults: filtered.length,
      hasNextPage: startIndex + perPage < filtered.length,
      items,
    };
  }

  override async searchVideos(query: string, page = 1, perPage = 15): Promise<NormalizedResponse<MediaItem>> {
    const filtered = query.trim()
      ? mockVideos.filter(
          (v) =>
            v.title.toLowerCase().includes(query.toLowerCase()) ||
            v.photographer.toLowerCase().includes(query.toLowerCase())
        )
      : mockVideos;
    const startIndex = (page - 1) * perPage;
    const items = filtered.slice(startIndex, startIndex + perPage);
    return {
      page,
      perPage,
      totalResults: filtered.length,
      hasNextPage: startIndex + perPage < filtered.length,
      items,
    };
  }
}

export const createMockSDK = () => new MockMediaCore();
