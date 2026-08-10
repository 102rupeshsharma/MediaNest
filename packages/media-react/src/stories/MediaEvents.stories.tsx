import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { MediaProvider, useMediaEvents, useMediaSDK } from '../index';
import { createMockSDK, mockPhotos } from './mockSdk';

const MediaEventsConsole = () => {
  const sdk = useMediaSDK();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 9)]);
  };

  useMediaEvents({
    onView: (item) => addLog(`Viewed: "${item.title}" (ID: ${item.id})`),
    onDownload: (item) => addLog(`Downloaded: "${item.title}" (ID: ${item.id})`),
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
        {mockPhotos.slice(0, 3).map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => sdk.trackView(item)}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#f9fafb',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.2s'
            }}
          >
            <img src={item.previewUrl} alt={item.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
            <div style={{ padding: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#111827' }}>
                {item.title}
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>Hover to view</span>
                <button
                  onClick={() => sdk.trackDownload(item)}
                  style={{
                    background: '#2dc4de',
                    border: 'none',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    fontWeight: 500,
                    outline: 'none'
                  }}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: '#1e293b',
        color: '#38bdf8',
        fontFamily: 'monospace',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #334155',
        minHeight: '120px',
        boxSizing: 'border-box'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#94a3b8', fontSize: '0.85rem', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
          Event Log Console (React Hooks Listener)
        </h4>
        {logs.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
            No events tracked yet. Hover over the cards above or click "Download" to trigger hooks events.
          </div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} style={{ fontSize: '0.8rem', lineHeight: '1.4', margin: '4px 0' }}>{log}</div>
          ))
        )}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'React SDK/useMediaEvents',
  decorators: [
    (Story) => (
      <MediaProvider sdk={createMockSDK()}>
        <div style={{ padding: '24px', background: '#fff', color: '#000', minHeight: '400px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: 700 }}>SDK Event Tracker</h2>
          <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '0.9rem' }}>
            Demonstrates hook subscriptions to SDK-level analytics events. Hover over cards to dispatch a <code>view</code> event or click Download to dispatch a <code>download</code> event.
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
  render: () => <MediaEventsConsole />,
};
