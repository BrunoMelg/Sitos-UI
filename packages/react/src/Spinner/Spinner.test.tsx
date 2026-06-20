import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('has role="status" by default', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has default aria-label "Loading"', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading')
  })

  it('accepts a custom aria-label', () => {
    render(<Spinner aria-label="Saving changes" />)
    expect(screen.getByRole('status')).toHaveAccessibleName('Saving changes')
  })

  it('silences AT when aria-label is empty string', () => {
    render(<Spinner aria-label="" />)
    // aria-label={undefined} means no label — element has no accessible name
    const el = document.querySelector('[role="status"]')
    expect(el).toBeInTheDocument()
    expect(el).not.toHaveAttribute('aria-label')
  })

  it('accepts size prop without error', () => {
    const { rerender } = render(<Spinner size="sm" />)
    rerender(<Spinner size="md" />)
    rerender(<Spinner size="lg" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('merges className', () => {
    render(<Spinner className="extra" />)
    expect(screen.getByRole('status').className).toContain('extra')
  })

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Spinner />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
