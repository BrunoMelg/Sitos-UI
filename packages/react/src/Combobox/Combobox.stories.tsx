import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Combobox } from './Combobox'

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: { layout: 'padded' },
  args: {
    label: 'Country',
    placeholder: 'Search countries…',
    items: [
      { id: 'au',  label: 'Australia' },
      { id: 'br',  label: 'Brazil' },
      { id: 'ca',  label: 'Canada' },
      { id: 'de',  label: 'Germany' },
      { id: 'fr',  label: 'France' },
      { id: 'gb',  label: 'United Kingdom' },
      { id: 'jp',  label: 'Japan' },
      { id: 'us',  label: 'United States' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Combobox>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultSelectedKey: 'br',
  },
}

export const WithDisabledOption: Story = {
  args: {
    items: [
      { id: 'au',  label: 'Australia' },
      { id: 'br',  label: 'Brazil' },
      { id: 'cu',  label: 'Cuba', isDisabled: true },
      { id: 'de',  label: 'Germany' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultSelectedKey: 'ca',
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | null>(null)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}>
        <Combobox
          {...args}
          selectedKey={selected}
          onSelectionChange={setSelected}
        />
        {selected && (
          <p style={{ margin: 0, fontSize: 'var(--orchard-font-size-footnote)', color: 'var(--orchard-color-text-secondary)' }}>
            Selected: <strong>{args.items?.find(i => i.id === selected)?.label}</strong>
          </p>
        )}
      </div>
    )
  },
}
