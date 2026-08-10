import React from 'react';
import type { Meta } from '@storybook/react';
import { MediaProvider, useCuratedPhotos } from '../index';
import { createMockSDK } from './mockSdk';

interface CuratedPhotosProps {
  page: number;
  perPage: number;
}

const CuratedPhotosList: React.FC<CuratedPhotosProps> = ({ page, perPage }) => {
  const { data, isLoading, error } = useCuratedPhotos(page, perPage);

  if (isLoading) {
    return (
      <div className="grid-container" style={{ padding: '20px 0' }}>
        {Array.from({ length: perPage }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: '240px', borderRadius: '12px' }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px' }}>
        Failed to load: {error.message}
      </div>
    );
  }

  return (
    <div className="grid-container" style={{ padding: '20px 0' }}>
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
  );
};

const meta: Meta<CuratedPhotosProps> = {
  title: 'React SDK/useCuratedPhotos',
  decorators: [
    (Story) => (
      <MediaProvider sdk={createMockSDK()}>
        <div style={{ padding: '24px', background: '#fff', color: '#000', minHeight: '400px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: 700 }}>Curated Photos Feed</h2>
          <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '0.9rem' }}>
            Displays photos loaded via the <code>useCuratedPhotos</code> hook.
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
  render: (args: CuratedPhotosProps) => <CuratedPhotosList page={args.page} perPage={args.perPage} />,
  args: {
    page: 1,
    perPage: 3,
  },
  argTypes: {
    page: {
      control: { type: 'number', min: 1 },
      description: 'The pagination page index to request.',
    },
    perPage: {
      control: { type: 'number', min: 1, max: 4 },
      description: 'The number of media elements to show per page.',
    },
  },
};
