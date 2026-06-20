import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders as div by default', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card').tagName).toBe('DIV')
  })

  it('renders as the child element with asChild', () => {
    render(
      <Card asChild>
        <article data-testid="article">Content</article>
      </Card>,
    )
    expect(screen.getByTestId('article').tagName).toBe('ARTICLE')
  })

  it('accepts all variant values', () => {
    const variants = ['elevated', 'outlined', 'ghost'] as const
    for (const variant of variants) {
      const { unmount } = render(<Card variant={variant} data-testid="card">Content</Card>)
      expect(screen.getByTestId('card')).toBeInTheDocument()
      unmount()
    }
  })

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Card><p>Card content</p></Card>)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
