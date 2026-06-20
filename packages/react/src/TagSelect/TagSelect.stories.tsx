import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TagSelect } from './TagSelect'

const TECH = [
  { id: 'react',      label: 'React' },
  { id: 'vue',        label: 'Vue' },
  { id: 'angular',    label: 'Angular' },
  { id: 'svelte',     label: 'Svelte' },
  { id: 'solid',      label: 'SolidJS' },
  { id: 'next',       label: 'Next.js' },
  { id: 'remix',      label: 'Remix' },
  { id: 'astro',      label: 'Astro', isDisabled: true },
]

const meta: Meta<typeof TagSelect> = {
  title: 'Components/TagSelect',
  component: TagSelect,
  parameters: { layout: 'padded' },
  args: {
    label: 'Frameworks',
    placeholder: 'Add frameworks…',
    items: TECH,
  },
}

export default meta
type Story = StoryObj<typeof TagSelect>

export const Default: Story = {}

export const WithDefaultValues: Story = {
  args: {
    defaultSelectedKeys: ['react', 'next'],
  },
}

export const WithMaxSelections: Story = {
  args: {
    maxSelections: 3,
    label: 'Top 3 Frameworks',
    placeholder: 'Pick up to 3…',
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultSelectedKeys: ['react', 'vue'],
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [keys, setKeys] = useState<string[]>(['react'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        <TagSelect {...args} selectedKeys={keys} onSelectionChange={setKeys} />
        <p style={{ margin: 0, fontSize: 'var(--orchard-font-size-footnote)', color: 'var(--orchard-color-text-secondary)' }}>
          Selected: <strong>{keys.join(', ') || '—'}</strong>
        </p>
      </div>
    )
  },
}
