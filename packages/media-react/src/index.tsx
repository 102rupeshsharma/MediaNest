import React, { createContext, useContext, useEffect, useRef } from 'react';
import { MediaCore, MediaItem, NormalizedResponse } from '@fotoowl/media-core';
import { useQuery, QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query';

export const MediaContext = createContext<MediaCore | null>(null);

export const useMediaSDK = (): MediaCore => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaSDK must be used within a MediaProvider');
  }
  return context;
};

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export interface MediaProviderProps {
  sdk: MediaCore;
  queryClient?: QueryClient;
  children: React.ReactNode;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({
  sdk,
  queryClient = defaultQueryClient,
  children,
}) => {
  return (
    <MediaContext.Provider value={sdk}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MediaContext.Provider>
  );
};

export function useCuratedPhotos(
  page = 1,
  perPage = 15,
): UseQueryResult<NormalizedResponse<MediaItem>, Error> {
  const sdk = useMediaSDK();
  return useQuery({
    queryKey: ['curatedPhotos', page, perPage],
    queryFn: () => sdk.getCuratedPhotos(page, perPage),
  });
}

export function useSearchPhotos(
  query: string,
  page = 1,
  perPage = 15,
): UseQueryResult<NormalizedResponse<MediaItem>, Error> {
  const sdk = useMediaSDK();
  const trimmed = query.trim();
  return useQuery({
    queryKey: ['searchPhotos', trimmed, page, perPage],
    queryFn: () => sdk.searchPhotos(trimmed, page, perPage),
    enabled: trimmed.length > 0,
  });
}

export function useSearchVideos(
  query: string,
  page = 1,
  perPage = 15,
): UseQueryResult<NormalizedResponse<MediaItem>, Error> {
  const sdk = useMediaSDK();
  const trimmed = query.trim();
  return useQuery({
    queryKey: ['searchVideos', trimmed, page, perPage],
    queryFn: () => sdk.searchVideos(trimmed, page, perPage),
    enabled: trimmed.length > 0,
  });
}

export interface UseMediaEventsCallbacks {
  onView?: (item: MediaItem) => void;
  onDownload?: (item: MediaItem) => void;
}

export function useMediaEvents({ onView, onDownload }: UseMediaEventsCallbacks = {}): void {
  const sdk = useMediaSDK();

  const callbacksRef = useRef({ onView, onDownload });

  useEffect(() => {
    callbacksRef.current = { onView, onDownload };
  }, [onView, onDownload]);

  useEffect(() => {
    const handleView = (item: MediaItem) => {
      if (callbacksRef.current.onView) {
        callbacksRef.current.onView(item);
      }
    };

    const handleDownload = (item: MediaItem) => {
      if (callbacksRef.current.onDownload) {
        callbacksRef.current.onDownload(item);
      }
    };

    sdk.on('view', handleView);
    sdk.on('download', handleDownload);

    return () => {
      sdk.off('view', handleView);
      sdk.off('download', handleDownload);
    };
  }, [sdk]);
}
export { MediaCore };
export { createMediaSDK } from '@fotoowl/media-core';
export type { MediaItem } from '@fotoowl/media-core';
