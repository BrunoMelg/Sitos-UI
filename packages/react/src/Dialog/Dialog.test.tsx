import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from './Dialog'

// ─── Test helpers ─────────────────────────────────────────────────────────────

function renderDialog(props?: { defaultOpen?: boolean; onOpenChange?: (v: boolean) => void }) {
  return render(
    <Dialog.Root {...props}>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
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
      // Overlay is the sibling before the dialog panel — click outside the panel
      const overlay = document.querySelector('[aria-hidden="true"]')
      await user.click(overlay!)
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
      const user = userEvent.setup()
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

    it('is labelled by the title', async () => {
      const user = userEvent.setup()
      renderDialog()
      await user.click(screen.getByRole('button', { name: 'Open dialog' }))
      const dialog = screen.getByRole('dialog')
      const title = screen.getByText('Confirm action')
      expect(dialog).toHaveAttribute('aria-labelledby', title.id)
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
          <Dialog.Content>
            <Dialog.Title>Hello</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

      rerender(
        <Dialog.Root isOpen={true}>
          <Dialog.Content>
            <Dialog.Title>Hello</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>,
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
})
