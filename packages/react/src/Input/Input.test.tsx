import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders a labelled text field', () => {
    render(<Input label="Email" />)
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
  })

  it('associates label with input via htmlFor', () => {
    render(<Input label="Email" />)
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email')
    expect(label).toHaveAttribute('for', input.id)
  })

  it('forwards value and onChange', async () => {
    const user = userEvent.setup()
    const handler = vi.fn()
    render(<Input label="Search" onChange={handler} />)
    await user.type(screen.getByRole('textbox'), 'hello')
    expect(handler).toHaveBeenCalled()
  })

  describe('hint', () => {
    it('renders hint text and links it via aria-describedby', () => {
      render(<Input label="Email" hint="We'll never share your email." />)
      const input = screen.getByRole('textbox')
      const hint = screen.getByText("We'll never share your email.")
      expect(input).toHaveAttribute('aria-describedby', hint.id)
    })
  })

  describe('errorMessage', () => {
    it('renders the error message', () => {
      render(<Input label="Email" errorMessage="Invalid email address." />)
      expect(screen.getByText('Invalid email address.')).toBeInTheDocument()
    })

    it('sets aria-invalid="true"', () => {
      render(<Input label="Email" errorMessage="Required." />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('links the error via aria-describedby', () => {
      render(<Input label="Email" errorMessage="Required." />)
      const input = screen.getByRole('textbox')
      const error = screen.getByText('Required.')
      expect(input).toHaveAttribute('aria-describedby', error.id)
    })

    it('takes priority over hint', () => {
      render(<Input label="Email" hint="Hint text." errorMessage="Error text." />)
      expect(screen.getByText('Error text.')).toBeInTheDocument()
      expect(screen.queryByText('Hint text.')).not.toBeInTheDocument()
    })
  })

  describe('isDisabled', () => {
    it('disables the input', () => {
      render(<Input label="Email" isDisabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('isRequired', () => {
    it('sets aria-required="true"', () => {
      render(<Input label="Email" isRequired />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true')
    })

    it('shows a visual required indicator', () => {
      const { container } = render(<Input label="Email" isRequired />)
      expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('*')
    })
  })

  describe('isReadOnly', () => {
    it('sets the readOnly attribute', () => {
      render(<Input label="Email" isReadOnly defaultValue="user@example.com" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    })
  })

  describe('adornments', () => {
    it('renders leadingElement', () => {
      render(<Input label="Search" leadingElement={<span data-testid="icon" />} />)
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('renders trailingElement', () => {
      render(<Input label="Search" trailingElement={<span data-testid="icon" />} />)
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })
  })
})
