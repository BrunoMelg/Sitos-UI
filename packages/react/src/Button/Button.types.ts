import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'subtle' | 'link'

export type ButtonIntent =
  | 'neutral'
  | 'accent'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual form of the button. Default: 'solid'. */
  variant?: ButtonVariant

  /**
   * Semantic purpose of the button.
   * Controls the colour palette applied to the chosen variant.
   * Default: 'accent'.
   */
  intent?: ButtonIntent

  /** Prevents interaction and communicates unavailability to assistive technology. */
  isDisabled?: boolean

  /**
   * Shows a loading spinner and sets aria-busy.
   * The button remains in the tab order so the user knows the action is pending.
   */
  isLoading?: boolean

  /** Icon or content before the label. */
  leadingElement?: ReactNode

  /** Icon or content after the label. */
  trailingElement?: ReactNode

  /**
   * When true, the Button renders no DOM element of its own.
   * Instead it clones its single child and merges behaviour into it.
   * The child element owns the DOM node; Button contributes props and ref.
   *
   * @example
   * <Button asChild>
   *   <a href="/dashboard">Dashboard</a>
   * </Button>
   */
  asChild?: boolean
}
