import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Tabs } from './Tabs'

function renderTabs(defaultSelectedKey = 'tab1') {
  return render(
    <Tabs.Root defaultSelectedKey={defaultSelectedKey}>
      <Tabs.List aria-label="Test tabs">
        <Tabs.Tab id="tab1">Overview</Tabs.Tab>
        <Tabs.Tab id="tab2">Settings</Tabs.Tab>
        <Tabs.Tab id="tab3" isDisabled>Billing</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="tab1">Overview content</Tabs.Panel>
      <Tabs.Panel id="tab2">Settings content</Tabs.Panel>
      <Tabs.Panel id="tab3">Billing content</Tabs.Panel>
    </Tabs.Root>,
  )
}

describe('Tabs', () => {
  it('renders the tablist and tabs', () => {
    renderTabs()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('shows the initially selected panel', () => {
    renderTabs()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview content')
  })

  it('switches panel on tab click', async () => {
    const user = userEvent.setup()
    renderTabs()
    await user.click(screen.getByRole('tab', { name: 'Settings' }))
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Settings content')
  })

  it('marks the selected tab with aria-selected', async () => {
    const user = userEvent.setup()
    renderTabs()
    await user.click(screen.getByRole('tab', { name: 'Settings' }))
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'false')
  })

  it('does not activate a disabled tab', async () => {
    const user = userEvent.setup()
    renderTabs()
    await user.click(screen.getByRole('tab', { name: 'Billing' }))
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview content')
  })

  it('navigates with arrow keys', async () => {
    const user = userEvent.setup()
    renderTabs()
    const overview = screen.getByRole('tab', { name: 'Overview' })
    overview.focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveFocus()
  })

  it('calls onSelectionChange in controlled mode', async () => {
    const user = userEvent.setup()
    const handler = vi.fn()
    render(
      <Tabs.Root selectedKey="tab1" onSelectionChange={handler}>
        <Tabs.List aria-label="Test tabs">
          <Tabs.Tab id="tab1">One</Tabs.Tab>
          <Tabs.Tab id="tab2">Two</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="tab1">One</Tabs.Panel>
        <Tabs.Panel id="tab2">Two</Tabs.Panel>
      </Tabs.Root>,
    )
    await user.click(screen.getByRole('tab', { name: 'Two' }))
    expect(handler).toHaveBeenCalledWith('tab2')
  })

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(
        <Tabs.Root defaultSelectedKey="tab1">
          <Tabs.List aria-label="Test tabs">
            <Tabs.Tab id="tab1">One</Tabs.Tab>
            <Tabs.Tab id="tab2">Two</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel id="tab1">Panel one</Tabs.Panel>
          <Tabs.Panel id="tab2">Panel two</Tabs.Panel>
        </Tabs.Root>,
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
