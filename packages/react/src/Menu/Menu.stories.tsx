import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { Menu } from './Menu'

const meta: Meta = {
  title: 'Components/Menu',
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger>
        <Button variant="secondary">Options</Button>
      </Menu.Trigger>
      <Menu.Content aria-label="Options">
        <Menu.Item id="new">New File</Menu.Item>
        <Menu.Item id="open">Open…</Menu.Item>
        <Menu.Item id="save">Save</Menu.Item>
        <Menu.Separator />
        <Menu.Item id="delete" isDestructive>Delete</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger>
        <Button variant="secondary">Edit</Button>
      </Menu.Trigger>
      <Menu.Content aria-label="Edit options">
        <Menu.Item id="cut">Cut</Menu.Item>
        <Menu.Item id="copy">Copy</Menu.Item>
        <Menu.Item id="paste" isDisabled>Paste</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  ),
}

export const WithOnAction: Story = {
  render: () => {
    const [last, setLast] = useState<string | null>(null)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        {last && (
          <p style={{ color: 'var(--orchard-color-text-secondary)', margin: 0, fontSize: 'var(--orchard-font-size-footnote)' }}>
            Last action: <strong>{last}</strong>
          </p>
        )}
        <Menu.Root onAction={(key) => setLast(String(key))}>
          <Menu.Trigger>
            <Button>Actions</Button>
          </Menu.Trigger>
          <Menu.Content aria-label="Actions">
            <Menu.Item id="rename">Rename</Menu.Item>
            <Menu.Item id="duplicate">Duplicate</Menu.Item>
            <Menu.Separator />
            <Menu.Item id="archive" isDestructive>Archive</Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </div>
    )
  },
}
