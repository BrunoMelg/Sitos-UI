import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tabs } from './Tabs'

const meta: Meta = {
  title: 'Components/Tabs',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tabs.Root defaultSelectedKey="overview" style={{ maxWidth: '480px' }}>
      <Tabs.List aria-label="Account sections">
        <Tabs.Tab id="overview">Overview</Tabs.Tab>
        <Tabs.Tab id="activity">Activity</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
        <Tabs.Tab id="billing" isDisabled>Billing</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="overview">Your account overview appears here.</Tabs.Panel>
      <Tabs.Panel id="activity">Recent activity will be displayed here.</Tabs.Panel>
      <Tabs.Panel id="settings">Settings panel content.</Tabs.Panel>
      <Tabs.Panel id="billing">Billing information (coming soon).</Tabs.Panel>
    </Tabs.Root>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [key, setKey] = useState('tab1')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: 'var(--orchard-color-text-secondary)', margin: 0, fontSize: 'var(--orchard-font-size-footnote)' }}>
          Selected: <strong>{key}</strong>
        </p>
        <Tabs.Root selectedKey={key} onSelectionChange={setKey}>
          <Tabs.List aria-label="Demo tabs">
            <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab id="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel id="tab1">Content for tab 1</Tabs.Panel>
          <Tabs.Panel id="tab2">Content for tab 2</Tabs.Panel>
          <Tabs.Panel id="tab3">Content for tab 3</Tabs.Panel>
        </Tabs.Root>
      </div>
    )
  },
}
