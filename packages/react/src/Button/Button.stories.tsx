import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { DensityProvider } from '../providers/Density'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'solid',
    intent: 'accent',
    isDisabled: false,
    isLoading: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'subtle', 'link'],
    },
    intent: {
      control: 'select',
      options: ['neutral', 'accent', 'danger', 'warning', 'success', 'info'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── All variants, accent intent ─────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

// ─── All intents, solid variant ───────────────────────────────────────────────

export const Intents: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button intent="neutral">Neutral</Button>
      <Button intent="accent">Accent</Button>
      <Button intent="danger">Danger</Button>
      <Button intent="warning">Warning</Button>
      <Button intent="success">Success</Button>
      <Button intent="info">Info</Button>
    </div>
  ),
}

// ─── Density ─────────────────────────────────────────────────────────────────

export const Density: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['compact', 'comfortable', 'spacious'] as const).map((d) => (
        <DensityProvider key={d} density={d}>
          <Button>{d.charAt(0).toUpperCase() + d.slice(1)}</Button>
        </DensityProvider>
      ))}
    </div>
  ),
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button isDisabled variant="solid">Solid</Button>
      <Button isDisabled variant="outline">Outline</Button>
      <Button isDisabled variant="ghost">Ghost</Button>
      <Button isDisabled variant="subtle">Subtle</Button>
      <Button isDisabled variant="link">Link</Button>
    </div>
  ),
}

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button isLoading>Loading…</Button>
      <Button isLoading variant="outline">Loading…</Button>
      <Button isLoading variant="ghost">Loading…</Button>
    </div>
  ),
}

// ─── With icons ───────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button leadingElement={<PlusIcon />}>New item</Button>
      <Button trailingElement={<PlusIcon />} variant="outline">
        New item
      </Button>
      <Button leadingElement={<PlusIcon />} isLoading>
        Creating…
      </Button>
    </div>
  ),
}

// ─── As anchor ────────────────────────────────────────────────────────────────

export const AsAnchor: Story = {
  render: () => (
    <Button asChild variant="link" intent="accent">
      <a href="#top">Back to top</a>
    </Button>
  ),
}
