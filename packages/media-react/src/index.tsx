import React, { createContext, useContext, useEffect, useRef } from 'react';
import { MediaCore, MediaItem, NormalizedResponse } from '@fotoowl/media-core';
import { useQuery, QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query';

/**
 * React context containing the instantiated {@link MediaCore} SDK instance.
 * Typically consumed via the {@link useMediaSDK} hook rather than directly.
 */
export const MediaContext = createContext<MediaCore | null>(null);

/**
 * Hook to access the active {@link MediaCore} SDK instance from the context.
 * Must be used within a {@link MediaProvider}.
 * 
 * @returns The active {@link MediaCore} instance.
 * @throws {Error} If called outside of a {@link MediaProvider} context.
 * 
 * @example
 * ```tsx
 * const sdk = useMediaSDK();
 * // Use sdk to interact with media services directly
 * ```
 */
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

/**
 * Props for the {@link MediaProvider} component.
 */
export interface MediaProviderProps {
  /** The instantiated {@link MediaCore} SDK instance. */
  sdk: MediaCore;
  /** Optional custom QueryClient for TanStack React Query. If not provided, a default client is used. */
  queryClient?: QueryClient;
  /** The child components that need access to the SDK and React Query contexts. */
  children: React.ReactNode;
}

/**
 * Context provider that makes the {@link MediaCore} SDK instance and QueryClient
 * available to all child components. All React hooks in this library must be used
 * within this provider.
 * 
 * @param props - Component properties (see {@link MediaProviderProps})
 * @returns A JSX element wrapping children with SDK and QueryClient contexts.
 * 
 * @example
 * ```tsx
 * import { createMediaSDK, MediaProvider } from '@fotoowl/media-react';
 * 
 * const sdk = createMediaSDK({ apiKey: 'YOUR_API_KEY' });
 * 
 * function App() {
 *   return (
 *     <MediaProvider sdk={sdk}>
 *       <MyComponent />
 *     </MediaProvider>
 *   );
 * }
 * ```
 */
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

/**
 * Hook to fetch a paginated list of curated photos using React Query.
 * 
 * @param page - The page number to fetch (defaults to 1).
 * @param perPage - The number of items to fetch per page (defaults to 15).
 * @returns A query result object containing the list of curated {@link MediaItem} elements, loading state, and error.
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useCuratedPhotos(1, 10);
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * return (
 *   <div>
 *     {data?.items.map(photo => (
 *       <img key={photo.id} src={photo.url} alt={photo.title} />
 *     ))}
 *   </div>
 * );
 * ```
 */
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

/**
 * Hook to search for photos by query string using React Query.
 * The query is disabled if the query string is empty or only whitespace.
 * 
 * @param query - The search query string.
 * @param page - The page number to fetch (defaults to 1).
 * @param perPage - The number of items to fetch per page (defaults to 15).
 * @returns A query result object containing search results of {@link MediaItem} elements.
 * 
 * @example
 * ```tsx
 * const { data, isLoading } = useSearchPhotos('nature', 1, 10);
 * ```
 */
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

/**
 * Hook to search for videos by query string using React Query.
 * The query is disabled if the query string is empty or only whitespace.
 * 
 * @param query - The search query string.
 * @param page - The page number to fetch (defaults to 1).
 * @param perPage - The number of items to fetch per page (defaults to 15).
 * @returns A query result object containing search results of {@link MediaItem} elements.
 * 
 * @example
 * ```tsx
 * const { data, isLoading } = useSearchVideos('ocean', 1, 10);
 * ```
 */
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

/**
 * Callback options for the {@link useMediaEvents} hook.
 */
export interface UseMediaEventsCallbacks {
  /** Callback triggered when a media item is viewed. */
  onView?: (item: MediaItem) => void;
  /** Callback triggered when a media item is downloaded. */
  onDownload?: (item: MediaItem) => void;
}

/**
 * Hook to subscribe to SDK-level media events such as 'view' and 'download'.
 * Handles clean subscription and unsubscription on mount/unmount and when dependencies change.
 * 
 * @param callbacks - The callbacks to execute when events are triggered. See {@link UseMediaEventsCallbacks}.
 * 
 * @example
 * ```tsx
 * useMediaEvents({
 *   onView: (item) => console.log('Item viewed:', item.id),
 *   onDownload: (item) => console.log('Item downloaded:', item.id),
 * });
 * ```
 */
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
