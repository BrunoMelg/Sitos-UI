import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react'

// ─── Controlled / uncontrolled API (Type A) ───────────────────────────────────

export interface DialogRootProps {
  /** Controlled open state. */
  isOpen?: boolean

  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean

  /** Called when the open state changes. */
  onOpenChange?: (isOpen: boolean) => void

  children: ReactNode
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** @see Button asChild for polymorphism */
  asChild?: boolean
  children: ReactNode
}

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Accessible description for the dialog announced by screen readers.
   * Pass when the dialog has no visible description element.
   */
  'aria-label'?: string
  children: ReactNode
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children?: ReactNode
}
