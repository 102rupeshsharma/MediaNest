---
name: 'fotoowl-wiring-data'
description: 'Rules and patterns for wiring Pexels API data flows, SDK client auth, and event subscriptions using @fotoowl/media-react.'
---

# Wiring Pexels SDK Data in React

This guide outlines rules for AI coding assistants to integrate, initialize, and fetch Pexels media content using the `@fotoowl/media-react` wrappers.

## 1. Provider Initialization

Wrap the root layout in `<MediaProvider>`:

```tsx
import { createMediaSDK } from '@fotoowl/media-core';
import { MediaProvider } from '@fotoowl/media-react';

const sdk = createMediaSDK();
sdk.init(import.meta.env.VITE_PEXELS_API_KEY);

export default function App() {
  return (
    <MediaProvider sdk={sdk}>
      <YourAppContent />
    </MediaProvider>
  );
}
```

## 2. API Hooks

Use these query hooks for data fetching (backed by TanStack Query):

- `useCuratedPhotos(page?: number, perPage?: number)`
- `useSearchPhotos(query: string, page?: number, perPage?: number)`
- `useSearchVideos(query: string, page?: number, perPage?: number)`

### Usage Rules:

- Query hooks return a standard TanStack Query result (`{ data, isLoading, isError, refetch }`).
- For search queries, do not perform empty searches; hooks automatically disable fetching when `query.trim()` is empty.
- Infinite scroll grids should maintain local `page` state and append data items in a `useEffect` loop.

## 3. Event Subscriptions

Use `useMediaEvents` to register page tracking events (`view` and `download`) using the React Ref pattern to avoid performance overhead:

```tsx
import { useMediaEvents } from '@fotoowl/media-react';
```

To emit tracking events explicitly in components:

```tsx
const sdk = useMediaSDK();

// On view
sdk.trackView(item);

// On download
sdk.trackDownload(item);
```
