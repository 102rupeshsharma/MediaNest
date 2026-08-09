import { createContext, useContext } from 'react';
import { MediaCore } from '@fotoowl/media-core';

export const MediaNativeContext = createContext<MediaCore | null>(null);

export const useMediaNativeCore = () => {
  const context = useContext(MediaNativeContext);
  if (!context) {
    throw new Error('useMediaNativeCore must be used within a MediaNativeProvider');
  }
  return context;
};
