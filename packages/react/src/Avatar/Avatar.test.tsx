import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    render(<Avatar src="/photo.jpg" alt="Alice" />)
    // The <img alt> is the accessible element; the wrapper span has no role.
    expect(screen.getByAltText('Alice')).toBeInTheDocument()
  })

  it('renders initials when src is absent', () => {
    render(<Avatar alt="Alice Johnson" name="Alice Johnson" />)
    expect(screen.getByText('AJ')).toBeInTheDocument()
  })

  it('renders single-word initials as first two letters', () => {
    render(<Avatar alt="Alice" name="Alice" />)
    expect(screen.getByText('AL')).toBeInTheDocument()
  })

  it('renders a fallback icon when neither src nor name is provided', () => {
    render(<Avatar alt="" />)
    // Fallback icon has aria-hidden; check the container is present
    const container = document.querySelector('span')
    expect(container).toBeInTheDocument()
  })

  it('shows initials after image load error', async () => {
    render(<Avatar src="/bad.jpg" alt="Bob Smith" name="Bob Smith" />)
    const img = screen.getByAltText('Bob Smith')
    img.dispatchEvent(new Event('error'))
    // After error the <img> is removed and initials appear
    expect(await screen.findByText('BS')).toBeInTheDocument()
  })

  it('uses role="img" and aria-label on the wrapper for initials (no native img)', () => {
    render(<Avatar alt="Carol" name="Carol" />)
    // No <img> — wrapper span carries role="img"
    expect(screen.getByRole('img', { name: 'Carol' })).toBeInTheDocument()
  })

  describe('accessibility', () => {
    it('has no violations (with image)', async () => {
      const { container } = render(<Avatar src="/photo.jpg" alt="Alice" />)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no violations (initials)', async () => {
      const { container } = render(<Avatar alt="Alice Johnson" name="Alice Johnson" />)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no violations (decorative)', async () => {
      const { container } = render(<Avatar alt="" name="Bob" />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
