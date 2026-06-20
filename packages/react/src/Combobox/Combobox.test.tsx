import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Combobox } from './Combobox'

const ITEMS = [
  { id: 'apple',  label: 'Apple' },
  { id: 'banana', label: 'Banana' },
  { id: 'cherry', label: 'Cherry' },
  { id: 'grape',  label: 'Grape', isDisabled: true },
]

function renderCombobox(overrides?: Parameters<typeof Combobox>[0]) {
  return render(
    <Combobox
      label="Fruit"
      placeholder="Select a fruit"
      items={ITEMS}
      {...overrides}
    />,
  )
}

describe('Combobox', () => {
  it('renders label and input', () => {
    renderCombobox()
    expect(screen.getByLabelText('Fruit')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Select a fruit')).toBeInTheDocument()
  })

  it('does not show listbox initially', () => {
    renderCombobox()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('opens listbox on input focus', async () => {
    const user = userEvent.setup()
    renderCombobox()
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })

  it('filters options as user types', async () => {
    const user = userEvent.setup()
    renderCombobox()
    await user.click(screen.getByRole('combobox'))
    await user.type(screen.getByRole('combobox'), 'an')
    const options = screen.getAllByRole('option')
    // "Banana" contains "an"; Apple/Cherry/Grape do not
    expect(options).toHaveLength(1)
    expect(options[0]).toHaveTextContent('Banana')
  })

  it('selects an option on click', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()
    renderCombobox({ onSelectionChange })
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Apple' }))
    expect(onSelectionChange).toHaveBeenCalledWith('apple')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('selects an option with ArrowDown + Enter', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()
    renderCombobox({ onSelectionChange })
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')
    expect(onSelectionChange).toHaveBeenCalledWith('apple')
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    renderCombobox()
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('does not select disabled options', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()
    renderCombobox({ onSelectionChange })
    await user.click(screen.getByRole('combobox'))
    const grape = screen.getByRole('option', { name: 'Grape' })
    expect(grape).toHaveAttribute('aria-disabled', 'true')
    await user.click(grape)
    expect(onSelectionChange).not.toHaveBeenCalled()
  })

  it('shows "No results" when filter finds nothing', async () => {
    const user = userEvent.setup()
    renderCombobox()
    await user.click(screen.getByRole('combobox'))
    await user.type(screen.getByRole('combobox'), 'zzz')
    expect(screen.getByText('No results')).toBeInTheDocument()
    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })

  it('is disabled when isDisabled=true', () => {
    renderCombobox({ isDisabled: true })
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  describe('accessibility', () => {
    it('has no violations when closed', async () => {
      const { container } = renderCombobox()
      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no violations when open', async () => {
      const user = userEvent.setup()
      const { container } = renderCombobox()
      await user.click(screen.getByRole('combobox'))
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
