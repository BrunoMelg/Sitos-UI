import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  args: { children: 'Label' },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Intents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Badge intent="neutral">Neutral</Badge>
      <Badge intent="accent">Accent</Badge>
      <Badge intent="success">Success</Badge>
      <Badge intent="danger">Danger</Badge>
      <Badge intent="warning">Warning</Badge>
      <Badge intent="info">Info</Badge>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {(['neutral', 'accent', 'success', 'danger', 'warning', 'info'] as const).map(intent => (
        <div key={intent} style={{ display: 'flex', gap: '8px' }}>
          <Badge variant="solid"   intent={intent}>Solid</Badge>
          <Badge variant="subtle"  intent={intent}>Subtle</Badge>
          <Badge variant="outline" intent={intent}>Outline</Badge>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Badge size="sm" intent="accent">Small</Badge>
      <Badge size="md" intent="accent">Medium</Badge>
    </div>
  ),
}
