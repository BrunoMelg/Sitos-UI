import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Intents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '520px' }}>
      <Alert intent="info"    title="Information" >Your session expires in 30 minutes.</Alert>
      <Alert intent="success" title="Saved"        >Your changes have been saved.</Alert>
      <Alert intent="warning" title="Low storage"  >You have less than 500 MB remaining.</Alert>
      <Alert intent="danger"  title="Upload failed">The file could not be processed. Try again.</Alert>
    </div>
  ),
}

export const WithoutTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '520px' }}>
      <Alert intent="info">Your session expires in 30 minutes.</Alert>
      <Alert intent="success">Saved successfully.</Alert>
    </div>
  ),
}

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true)
    return visible ? (
      <Alert
        intent="warning"
        title="Review required"
        onDismiss={() => setVisible(false)}
        style={{ maxWidth: '520px' }}
      >
        Two items need your attention before publishing.
      </Alert>
    ) : (
      <p style={{ color: 'var(--orchard-color-text-secondary)' }}>Alert dismissed.</p>
    )
  },
}
