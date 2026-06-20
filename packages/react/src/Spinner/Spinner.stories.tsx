import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Spinner size="sm" aria-label="Small spinner" />
      <Spinner size="md" aria-label="Medium spinner" />
      <Spinner size="lg" aria-label="Large spinner" />
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Spinner style={{ color: 'var(--orchard-color-accent-default)' }} aria-label="Accent spinner" />
      <Spinner style={{ color: 'var(--orchard-color-success-default)' }} aria-label="Success spinner" />
      <Spinner style={{ color: 'var(--orchard-color-danger-default)' }} aria-label="Danger spinner" />
      <Spinner style={{ color: 'var(--orchard-color-text-secondary)' }} aria-label="Muted spinner" />
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--orchard-color-text-secondary)' }}>
      <Spinner size="sm" aria-label="Loading" />
      <span style={{ fontSize: 'var(--orchard-font-size-subheadline)' }}>Loading results…</span>
    </div>
  ),
}
