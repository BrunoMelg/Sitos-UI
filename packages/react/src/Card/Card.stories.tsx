import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Card>

const SampleContent = () => (
  <div>
    <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--orchard-color-text-primary)' }}>Card Title</p>
    <p style={{ margin: 0, color: 'var(--orchard-color-text-secondary)', fontSize: 'var(--orchard-font-size-footnote)' }}>
      Some descriptive content inside the card.
    </p>
  </div>
)

export const Elevated: Story = { render: () => <Card variant="elevated"><SampleContent /></Card> }
export const Outlined: Story = { render: () => <Card variant="outlined"><SampleContent /></Card> }
export const Ghost:    Story = { render: () => <Card variant="ghost"><SampleContent /></Card> }

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px' }}>
      <Card variant="elevated"><SampleContent /></Card>
      <Card variant="outlined"><SampleContent /></Card>
      <Card variant="ghost"><SampleContent /></Card>
    </div>
  ),
}

export const Paddings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px' }}>
      <Card padding="sm"><SampleContent /></Card>
      <Card padding="md"><SampleContent /></Card>
      <Card padding="lg"><SampleContent /></Card>
    </div>
  ),
}
