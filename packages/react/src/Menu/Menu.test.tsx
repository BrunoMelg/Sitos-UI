import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Menu } from './Menu'

function renderMenu({
  onAction,
  disableDelete,
}: { onAction?: (key: string) => void; disableDelete?: boolean } = {}) {
  return render(
    <Menu.Root onAction={onAction}>
      <Menu.Trigger>
        <button>Options</button>
      </Menu.Trigger>
      <Menu.Content aria-label="Options menu">
        <Menu.Item id="edit">Edit</Menu.Item>
        <Menu.Item id="duplicate">Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Item id="delete" isDestructive isDisabled={disableDelete}>
          Delete
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>,
  )
}

describe('Menu', () => {
  it('renders trigger but not menu content initially', () => {
    renderMenu()
    expect(screen.getByRole('button', { name: 'Options' })).toBeInTheDocument()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens menu on trigger click', async () => {
    const user = userEvent.setup()
    renderMenu()
    await user.click(screen.getByRole('button', { name: 'Options' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(3)
  })

  it('closes menu when an item is clicked', async () => {
    const user = userEvent.setup()
    renderMenu()
    await user.click(screen.getByRole('button', { name: 'Options' }))
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('calls onAction with the item id when clicked', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    renderMenu({ onAction })
    await user.click(screen.getByRole('button', { name: 'Options' }))
    await user.click(screen.getByRole('menuitem', { name: 'Duplicate' }))
    expect(onAction).toHaveBeenCalledWith('duplicate')
  })

  it('does not call onAction for disabled items', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    renderMenu({ onAction, disableDelete: true })
    await user.click(screen.getByRole('button', { name: 'Options' }))
    await user.click(screen.getByRole('menuitem', { name: 'Delete' }))
    expect(onAction).not.toHaveBeenCalled()
  })

  it('closes menu on Escape key', async () => {
    const user = userEvent.setup()
    renderMenu()
    await user.click(screen.getByRole('button', { name: 'Options' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('navigates items with ArrowDown/ArrowUp', async () => {
    const user = userEvent.setup()
    renderMenu()
    await user.click(screen.getByRole('button', { name: 'Options' }))
    // First item should be focused
    const items = screen.getAllByRole('menuitem').filter(el => !el.hasAttribute('aria-disabled'))
    expect(items[0]).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(items[1]).toHaveFocus()
    await user.keyboard('{ArrowUp}')
    expect(items[0]).toHaveFocus()
  })

  it('sets aria-expanded on the trigger', async () => {
    const user = userEvent.setup()
    renderMenu()
    const trigger = screen.getByRole('button', { name: 'Options' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders separator with role="separator"', async () => {
    const user = userEvent.setup()
    renderMenu()
    await user.click(screen.getByRole('button', { name: 'Options' }))
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  describe('accessibility', () => {
    it('has no violations when menu is open', async () => {
      const user = userEvent.setup()
      const { container } = renderMenu()
      await user.click(screen.getByRole('button', { name: 'Options' }))
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
