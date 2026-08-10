import type { Preview } from '@storybook/react';
// Import the application global styles to style Storybook components
import '../apps/web-app/src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fcfcfc' },
        { name: 'dark', value: '#030d16' },
      ],
    },
  },
};

export default preview;
