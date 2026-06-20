import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('has type="button" by default to prevent accidental form submission', () => {
    render(<Button>Cancel</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('respects an explicit type override', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handler = vi.fn()
    render(<Button onClick={handler}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledOnce()
  })

  describe('isDisabled', () => {
    it('sets aria-disabled="true"', () => {
      render(<Button isDisabled>Save</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
    })

    it('does not set the HTML disabled attribute (keeps element in tab order)', () => {
      render(<Button isDisabled>Save</Button>)
      expect(screen.getByRole('button')).not.toBeDisabled()
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handler = vi.fn()
      render(
        <Button isDisabled onClick={handler}>
          Save
        </Button>,
      )
      // onClick guard (isDisabled ? undefined : onClick) prevents handler call
      await user.click(screen.getByRole('button'))
      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('isLoading', () => {
    it('sets aria-busy="true"', () => {
      render(<Button isLoading>Save</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('renders a spinner (aria-hidden)', () => {
      const { container } = render(<Button isLoading>Save</Button>)
      const spinner = container.querySelector('[aria-hidden="true"]')
      expect(spinner).toBeInTheDocument()
    })

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup()
      const handler = vi.fn()
      render(
        <Button isLoading onClick={handler}>
          Save
        </Button>,
      )
      await user.click(screen.getByRole('button'))
      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('leadingElement / trailingElement', () => {
    it('renders leadingElement before children', () => {
      render(
        <Button leadingElement={<span data-testid="icon" />}>Save</Button>,
      )
      const btn = screen.getByRole('button')
      const icon = screen.getByTestId('icon')
      expect(btn).toContainElement(icon)
    })

    it('replaces leadingElement with spinner when loading', () => {
      const { container } = render(
        <Button isLoading leadingElement={<span data-testid="icon" />}>
          Save
        </Button>,
      )
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
      expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
    })
  })

  describe('asChild', () => {
    it('renders the child element instead of a button', () => {
      render(
        <Button asChild>
          <a href="/home">Home</a>
        </Button>,
      )
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    })

    it('merges className onto the child element', () => {
      render(
        <Button asChild className="extra">
          <a href="/home">Home</a>
        </Button>,
      )
      const link = screen.getByRole('link')
      expect(link.className).toContain('extra')
    })
  })
})
