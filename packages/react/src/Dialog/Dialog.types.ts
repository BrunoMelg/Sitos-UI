import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react'

// ─── Controlled / uncontrolled API ───────────────────────────────────────────

export interface DialogRootProps {
  isOpen?:        boolean
  defaultOpen?:   boolean
  onOpenChange?:  (isOpen: boolean) => void
  children:       ReactNode
}

// ─── Composition sub-components ───────────────────────────────────────────────

export interface DialogPortalProps {
  children: ReactNode
}

export interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {}

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?:  boolean
  children:  ReactNode
}

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide when Dialog.Title is not rendered — gives the dialog an accessible name.
   */
  'aria-label'?: string
  children:      ReactNode
}

export interface DialogHeaderProps      extends HTMLAttributes<HTMLDivElement>       { children: ReactNode }
export interface DialogTitleProps       extends HTMLAttributes<HTMLHeadingElement>   { children: ReactNode }
export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> { children: ReactNode }
export interface DialogFooterProps      extends HTMLAttributes<HTMLDivElement>       { children: ReactNode }

export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?:  boolean
  children?: ReactNode
}
