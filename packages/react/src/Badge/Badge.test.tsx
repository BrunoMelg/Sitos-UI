import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders as a span', () => {
    render(<Badge>Draft</Badge>)
    expect(screen.getByText('Draft').tagName).toBe('SPAN')
  })

  it('merges className', () => {
    render(<Badge className="extra">Tag</Badge>)
    expect(screen.getByText('Tag').className).toContain('extra')
  })

  it('accepts all intent values', () => {
    const intents = ['neutral', 'accent', 'success', 'danger', 'warning', 'info'] as const
    for (const intent of intents) {
      const { unmount } = render(<Badge intent={intent}>{intent}</Badge>)
      expect(screen.getByText(intent)).toBeInTheDocument()
      unmount()
    }
  })

  it('accepts all variant values', () => {
    const variants = ['solid', 'subtle', 'outline'] as const
    for (const variant of variants) {
      const { unmount } = render(<Badge variant={variant}>Label</Badge>)
      expect(screen.getByText('Label')).toBeInTheDocument()
      unmount()
    }
  })

  describe('accessibility', () => {
    it('has no violations (default)', async () => {
      const { container } = render(<Badge>Active</Badge>)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no violations (solid danger)', async () => {
      const { container } = render(<Badge variant="solid" intent="danger">Error</Badge>)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
