import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { MediaProvider, useSearchPhotos } from '../index';
import { createMockSDK } from './mockSdk';

interface SearchPhotosProps {
  defaultQuery: string;
  perPage: number;
}

const SearchPhotosDemo: React.FC<SearchPhotosProps> = ({ defaultQuery, perPage }) => {
  const [query, setQuery] = useState(defaultQuery);
  const { data, isLoading, error } = useSearchPhotos(query, 1, perPage);

  return (
    <div>
      <div style={{ margin: '0 0 20px 0' }}>
        <input
          type="text"
          placeholder="Type to search (e.g. Mountain, Forest, Ocean)..."
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
        <div className="grid-container">
          {Array.from({ length: perPage }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '240px', borderRadius: '12px' }} />
          ))}
        </div>
      )}

      {error && (
        <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px' }}>
          Error: {error.message}
        </div>
      )}

      {!isLoading && !error && data?.items.length === 0 && (
        <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>No photos found matching "{query}"</div>
      )}

      {!isLoading && !error && (data?.items.length ?? 0) > 0 && (
        <div className="grid-container">
          {data?.items.map((item) => (
            <div key={item.id} className="grid-item">
              <img src={item.previewUrl} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="grid-item-info">
                <h3>{item.title}</h3>
                <p>by {item.photographer}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const meta: Meta<SearchPhotosProps> = {
  title: 'React SDK/useSearchPhotos',
  decorators: [
    (Story) => (
      <MediaProvider sdk={createMockSDK()}>
        <div style={{ padding: '24px', background: '#fff', color: '#000', minHeight: '400px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: 700 }}>Search Photos Interface</h2>
          <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '0.9rem' }}>
            Demonstrates searching photos using the <code>useSearchPhotos</code> hook.
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
  render: (args: SearchPhotosProps) => <SearchPhotosDemo defaultQuery={args.defaultQuery} perPage={args.perPage} />,
  args: {
    defaultQuery: 'Mountain',
    perPage: 3,
  },
  argTypes: {
    defaultQuery: {
      control: 'text',
      description: 'The initial query string for search operations.',
    },
    perPage: {
      control: { type: 'number', min: 1, max: 4 },
      description: 'The maximum results count to fetch.',
    },
  },
};
