import React, { useState, useRef } from 'react';
import type { Meta } from '@storybook/react';
import { MediaProvider, useSearchVideos } from '../index';
import { createMockSDK } from './mockSdk';

interface SearchVideosProps {
  defaultQuery: string;
  perPage: number;
}

const VideoCardStory = ({ item }: { item: any }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '12px',
      background: '#000',
      height: '350px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <video
        ref={videoRef}
        src={item.url}
        loop
        muted
        playsInline
        poster={item.previewUrl}
        onClick={handleTogglePlay}
        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', display: 'block' }}
      />
      <button
        onClick={handleTogglePlay}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.6)',
          border: 'none',
          color: '#fff',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          transition: 'all 0.2s',
          outline: 'none'
        }}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
        padding: '16px',
        color: '#fff',
        boxSizing: 'border-box'
      }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 600, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
          {item.title}
        </h3>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#ccc', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
          by {item.photographer}
        </p>
      </div>
    </div>
  );
};

const SearchVideosDemo: React.FC<SearchVideosProps> = ({ defaultQuery, perPage }) => {
  const [query, setQuery] = useState(defaultQuery);
  const { data, isLoading, error } = useSearchVideos(query, 1, perPage);

  return (
    <div>
      <div style={{ margin: '0 0 20px 0' }}>
        <input
          type="text"
          placeholder="Type to search videos (e.g. nature, ocean)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '10px 16px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '100%',
            maxWidth: '500px',
            boxSizing: 'border-box',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
      </div>

      {isLoading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {Array.from({ length: perPage }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '350px', borderRadius: '12px' }} />
          ))}
        </div>
      )}

      {error && (
        <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px' }}>
          Error: {error.message}
        </div>
      )}

      {!isLoading && !error && data?.items.length === 0 && (
        <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>No videos found matching "{query}"</div>
      )}

      {!isLoading && !error && (data?.items.length ?? 0) > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {data?.items.map((item) => (
            <VideoCardStory key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const meta: Meta<SearchVideosProps> = {
  title: 'React SDK/useSearchVideos',
  decorators: [
    (Story) => (
      <MediaProvider sdk={createMockSDK()}>
        <div style={{ padding: '24px', background: '#fff', color: '#000', minHeight: '400px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: 700 }}>Search Videos Feed</h2>
          <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '0.9rem' }}>
            Demonstrates search query fetching for reels and video assets via the <code>useSearchVideos</code> hook.
          </p>
          <Story />
        </div>
      </MediaProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  render: (args: SearchVideosProps) => <SearchVideosDemo defaultQuery={args.defaultQuery} perPage={args.perPage} />,
  args: {
    defaultQuery: 'nature',
    perPage: 2,
  },
  argTypes: {
    defaultQuery: {
      control: 'text',
      description: 'The query to search videos.',
    },
    perPage: {
      control: { type: 'number', min: 1, max: 2 },
      description: 'Number of videos to fetch.',
    },
  },
};
