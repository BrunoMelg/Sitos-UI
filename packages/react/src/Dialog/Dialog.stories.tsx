import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { Dialog } from './Dialog'

const meta: Meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

// ─── Basic (uncontrolled) ─────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Delete project</Dialog.Title>
            <Dialog.Close />
          </Dialog.Header>
          <Dialog.Description>
            This action cannot be undone. The project and all its data will be permanently deleted.
          </Dialog.Description>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="ghost" intent="neutral">Cancel</Button>
            </Dialog.Close>
            <Button intent="danger">Delete project</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
}

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => setIsOpen(true)}>Open</Button>
          <Button variant="outline" intent="neutral" onClick={() => setIsOpen(false)}>
            Force close
          </Button>
        </div>
        <Dialog.Root isOpen={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Controlled dialog</Dialog.Title>
                <Dialog.Close />
              </Dialog.Header>
              <Dialog.Description>
                This dialog's open state is controlled externally.
              </Dialog.Description>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="ghost" intent="neutral">Cancel</Button>
                </Dialog.Close>
                <Button>Save changes</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </>
    )
  },
}

// ─── With form ────────────────────────────────────────────────────────────────

export const WithForm: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Close />
          </Dialog.Header>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>

          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            onSubmit={(e) => e.preventDefault()}
          >
            <Input label="Name" defaultValue="Alex Johnson" />
          </form>

          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="ghost" intent="neutral">Cancel</Button>
            </Dialog.Close>
            <Button type="submit">Save changes</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
}
