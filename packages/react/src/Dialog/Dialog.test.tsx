import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from './Dialog'

// ─── Test helpers ─────────────────────────────────────────────────────────────

function renderDialog(props?: { defaultOpen?: boolean; onOpenChange?: (v: boolean) => void }) {
  return render(
    <Dialog.Root {...props}>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Confirm action</Dialog.Title>
            <Dialog.Close />
          </Dialog.Header>
          <Dialog.Description>Are you sure you want to continue?</Dialog.Description>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <button>Cancel</button>
            </Dialog.Close>
            <button>Confirm</button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>,
  )
}

describe('Dialog', () => {
  describe('open / close', () => {
    it('is closed by default', () => {
      renderDialog()
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('opens when the trigger is clicked', async () => {
      const user = userEvent.setup()
      renderDialog()
      await user.click(screen.getByRole('button', { name: 'Open dialog' }))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('renders defaultOpen=true immediately', () => {
      renderDialog({ defaultOpen: true })
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('closes when the overlay is clicked', async () => {
      const user = userEvent.setup()
      renderDialog({ defaultOpen: true })
      const overlay = document.querySelector('[aria-hidden="true"]')
      await user.click(overlay!)
      // Portal stays mounted for EXIT_DURATION_MS (350ms) to play exit animation;
      // waitFor polls until the dialog unmounts (default timeout: 1000ms).
      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
      )
    })

    it('closes when Escape is pressed', async () => {
      const user = userEvent.setup()
      renderDialog({ defaultOpen: true })
      await user.keyboard('{Escape}')
      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
      )
    })

    it('closes when the close button is clicked', async () => {
      const user = userEvent.setup()
      renderDialog({ defaultOpen: true })
      await user.click(screen.getByRole('button', { name: 'Close dialog' }))
      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
      )
    })

    it('calls onOpenChange when state changes', async () => {
      const user    = userEvent.setup()
      const handler = vi.fn()
      renderDialog({ onOpenChange: handler })
      await user.click(screen.getByRole('button', { name: 'Open dialog' }))
      expect(handler).toHaveBeenCalledWith(true)
    })
  })

  describe('accessibility', () => {
    it('has role="dialog"', async () => {
      const user = userEvent.setup()
      renderDialog()
      await user.click(screen.getByRole('button', { name: 'Open dialog' }))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('has aria-modal="true"', async () => {
      const user = userEvent.setup()
      renderDialog()
      await user.click(screen.getByRole('button', { name: 'Open dialog' }))
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    })

    it('is labelled by the title when Dialog.Title is rendered', async () => {
      const user = userEvent.setup()
      renderDialog()
      await user.click(screen.getByRole('button', { name: 'Open dialog' }))
      const dialog = screen.getByRole('dialog')
      const title  = screen.getByText('Confirm action')
      expect(dialog).toHaveAttribute('aria-labelledby', title.id)
    })

    it('omits aria-labelledby when Dialog.Title is absent', () => {
      render(
        <Dialog.Root isOpen>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content aria-label="Standalone dialog">
              <p>Content without a title element.</p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      )
      expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-labelledby')
    })

    it('trigger has aria-haspopup="dialog"', () => {
      renderDialog()
      expect(screen.getByRole('button', { name: 'Open dialog' })).toHaveAttribute(
        'aria-haspopup',
        'dialog',
      )
    })
  })

  describe('controlled mode', () => {
    it('respects the controlled isOpen prop', () => {
      const { rerender } = render(
        <Dialog.Root isOpen={false}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Hello</Dialog.Title>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      )
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

      rerender(
        <Dialog.Root isOpen={true}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Hello</Dialog.Title>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('open dialog has no violations', async () => {
      render(
        <Dialog.Root isOpen>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Confirm action</Dialog.Title>
                <Dialog.Close />
              </Dialog.Header>
              <Dialog.Description>Are you sure you want to continue?</Dialog.Description>
              <Dialog.Footer>
                <button>Cancel</button>
                <button>Confirm</button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      )
      // axe checks document.body because createPortal renders outside the React root container
      expect(await axe(document.body)).toHaveNoViolations()
    })
  })
})
