import type { Meta, StoryObj } from '@storybook/react';
import { MediaProvider, useMediaSDK } from '../index';
import { createMockSDK, MockMediaCore } from './mockSdk';

// Helper child component to visualize context availability
const SDKContextInspector = () => {
  const sdk = useMediaSDK();
  return (
    <div style={{
      padding: '24px',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: '400px'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 600 }}>SDK Active Context</h3>
      <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
        <strong>Mock API Key:</strong> <code>{sdk.getApiKey()}</code>
      </p>
      <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
        <strong>Status:</strong> <span style={{ color: '#10b981', fontWeight: 600 }}>Initialized</span>
      </p>
    </div>
  );
};

const meta: Meta<typeof MediaProvider> = {
  title: 'React SDK/MediaProvider',
  component: MediaProvider,
  tags: ['autodocs'],
  argTypes: {
    sdk: {
      control: false,
      description: 'The instantiated MediaCore SDK instance.',
    },
    children: {
      control: false,
      description: 'React child components that consume the SDK context.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaProvider>;

export const Default: Story = {
  args: {
    sdk: createMockSDK(),
    children: <SDKContextInspector />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default example of the `MediaProvider` wrapping components to supply the headless SDK context.',
      },
    },
  },
};

export const CustomAPIKey: Story = {
  args: {
    sdk: new (class extends MockMediaCore {
      override getApiKey() {
        return 'custom-pexels-token-999';
      }
    })(),
    children: <SDKContextInspector />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates provider encapsulation using an SDK instance configured with a custom API token.',
      },
    },
  },
};
