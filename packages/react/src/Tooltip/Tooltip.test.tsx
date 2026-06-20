import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { forwardRef } from 'react'
import { describe, expect, it } from 'vitest'
import { Tooltip } from './Tooltip'

// Must use forwardRef + spread props so Slot can merge Tooltip's event handlers
const TriggerButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function TriggerButton(props, ref) {
    return <button ref={ref} type="button" {...props}>Hover me</button>
  },
)

describe('Tooltip', () => {
  it('does not show tooltip content initially', () => {
    render(<Tooltip content="Save changes"><TriggerButton /></Tooltip>)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Save changes" delay={0}><TriggerButton /></Tooltip>)
    await user.tab()
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toHaveTextContent('Save changes'),
    )
  })

  it('hides tooltip after blur', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Save changes" delay={0}><TriggerButton /></Tooltip>)
    await user.tab()
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument())
    await user.tab() // move focus away
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('links trigger to tooltip via aria-describedby', async () => {
    const user = userEvent.setup()
    render(<Tooltip content="Tooltip label" delay={0}><TriggerButton /></Tooltip>)
    await user.tab()
    await waitFor(() => {
      const tooltip  = screen.getByRole('tooltip')
      const trigger  = screen.getByRole('button')
      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
    })
  })

  describe('accessibility', () => {
    it('trigger alone has no violations', async () => {
      const { container } = render(
        <Tooltip content="Save changes"><TriggerButton /></Tooltip>
      )
      expect(await axe(container)).toHaveNoViolations()
    })

    it('open tooltip has no violations', async () => {
      const user = userEvent.setup()
      const { container } = render(<Tooltip content="Save changes" delay={0}><TriggerButton /></Tooltip>)
      await user.tab()
      await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument())
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
