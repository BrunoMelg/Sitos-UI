import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders title and description', () => {
    render(<Alert intent="info" title="Heads up">Something changed.</Alert>)
    expect(screen.getByText('Heads up')).toBeInTheDocument()
    expect(screen.getByText('Something changed.')).toBeInTheDocument()
  })

  it('renders without title (description only)', () => {
    render(<Alert intent="success">Saved.</Alert>)
    expect(screen.getByText('Saved.')).toBeInTheDocument()
  })

  it('uses role="alert" for warning and danger', () => {
    const { rerender } = render(<Alert intent="warning">Watch out.</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    rerender(<Alert intent="danger">Error occurred.</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('uses role="status" for info and success', () => {
    const { rerender } = render(<Alert intent="info">Note.</Alert>)
    expect(screen.getByRole('status')).toBeInTheDocument()
    rerender(<Alert intent="success">Done.</Alert>)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders dismiss button when onDismiss is provided', () => {
    render(<Alert intent="info" onDismiss={vi.fn()}>Info.</Alert>)
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<Alert intent="warning" onDismiss={onDismiss}>Warning.</Alert>)
    await user.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('suppresses the icon when icon={null}', () => {
    render(<Alert intent="info" icon={null}>No icon.</Alert>)
    // No SVG icon should be in the document
    expect(document.querySelector('svg')).not.toBeInTheDocument()
  })

  it('allows a custom icon', () => {
    render(<Alert intent="info" icon={<span data-testid="custom-icon" />}>Custom.</Alert>)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  describe('accessibility', () => {
    it('info alert has no violations', async () => {
      const { container } = render(<Alert intent="info" title="FYI">Some information.</Alert>)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('danger alert has no violations', async () => {
      const { container } = render(<Alert intent="danger" title="Error" onDismiss={vi.fn()}>Something went wrong.</Alert>)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
