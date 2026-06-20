import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { TagSelect } from './TagSelect'

const ITEMS = [
  { id: 'react',   label: 'React' },
  { id: 'vue',     label: 'Vue' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte',  label: 'Svelte', isDisabled: true },
]

function renderTagSelect(overrides?: Partial<Parameters<typeof TagSelect>[0]>) {
  return render(
    <TagSelect
      label="Frameworks"
      placeholder="Select frameworks…"
      items={ITEMS}
      {...overrides}
    />,
  )
}

describe('TagSelect', () => {
  it('renders label and input', () => {
    renderTagSelect()
    expect(screen.getByLabelText('Frameworks')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Select frameworks…')).toBeInTheDocument()
  })

  it('does not show listbox initially', () => {
    renderTagSelect()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('opens listbox on input focus', async () => {
    const user = userEvent.setup()
    renderTagSelect()
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })

  it('filters options as user types', async () => {
    const user = userEvent.setup()
    renderTagSelect()
    await user.click(screen.getByRole('combobox'))
    await user.type(screen.getByRole('combobox'), 'ue')
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0]).toHaveTextContent('Vue')
  })

  it('selects an option and renders it as a tag', async () => {
    const user = userEvent.setup()
    renderTagSelect()
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'React' }))
    // The remove button confirms a tag was created (listbox may still be open)
    expect(screen.getByRole('button', { name: 'Remove React' })).toBeInTheDocument()
  })

  it('removes a tag when clicking its remove button', async () => {
    const user = userEvent.setup()
    renderTagSelect({ defaultSelectedKeys: ['react'] })
    expect(screen.getByText('React')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove React' }))
    expect(screen.queryByText('React')).not.toBeInTheDocument()
  })

  it('removes the last tag on Backspace when input is empty', async () => {
    const user = userEvent.setup()
    renderTagSelect({ defaultSelectedKeys: ['react', 'vue'] })
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('{Backspace}')
    // Vue was last added, should be removed
    expect(screen.queryByRole('button', { name: 'Remove Vue' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove React' })).toBeInTheDocument()
  })

  it('calls onSelectionChange with updated keys', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()
    renderTagSelect({ onSelectionChange })
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Vue' }))
    expect(onSelectionChange).toHaveBeenCalledWith(['vue'])
  })

  it('supports multiple selections', async () => {
    const user = userEvent.setup()
    renderTagSelect()
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'React' }))
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Angular' }))
    expect(screen.getByRole('button', { name: 'Remove React' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove Angular' })).toBeInTheDocument()
  })

  it('does not select disabled options', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()
    renderTagSelect({ onSelectionChange })
    await user.click(screen.getByRole('combobox'))
    const svelte = screen.getByRole('option', { name: 'Svelte' })
    expect(svelte).toHaveAttribute('aria-disabled', 'true')
    await user.click(svelte)
    expect(onSelectionChange).not.toHaveBeenCalled()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    renderTagSelect()
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('respects maxSelections', async () => {
    const user = userEvent.setup()
    renderTagSelect({ maxSelections: 1 })
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'React' }))
    // Input should no longer appear (at max)
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  describe('accessibility', () => {
    it('has no violations when closed', async () => {
      const { container } = renderTagSelect()
      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no violations when open', async () => {
      const user = userEvent.setup()
      const { container } = renderTagSelect()
      await user.click(screen.getByRole('combobox'))
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
