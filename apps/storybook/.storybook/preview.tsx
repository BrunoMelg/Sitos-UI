import type { Preview } from '@storybook/react'
import React from 'react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals['theme'] as string) ?? 'light'
      return (
        <div
          data-theme={theme}
          style={{
            minHeight: '100vh',
            padding: '2rem',
            background: theme === 'dark' ? '#1C1C1E' : '#F7F6F3',
          }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
