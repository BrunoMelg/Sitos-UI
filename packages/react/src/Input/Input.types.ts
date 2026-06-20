import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputIntent = 'neutral' | 'danger' | 'success'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /**
   * Semantic state of the field.
   * 'danger' renders error styling; 'success' renders success styling.
   * Default: 'neutral'.
   */
  intent?: InputIntent

  /** Label text. Rendered as a visually associated <label>. Required for accessibility. */
  label: string

  /** Hint text below the field. Announced by assistive technology via aria-describedby. */
  hint?: string

  /**
   * Error message. When present, overrides `hint`, sets intent to 'danger',
   * and sets aria-invalid="true".
   */
  errorMessage?: string

  /** Icon or element rendered inside the field on the leading (start) side. */
  leadingElement?: ReactNode

  /** Icon or element rendered inside the field on the trailing (end) side. */
  trailingElement?: ReactNode

  /** Prevents interaction and communicates unavailability to assistive technology. */
  isDisabled?: boolean

  /** Marks the field as read-only. */
  isReadOnly?: boolean

  /** Marks the field as required. Renders a visual indicator and sets aria-required. */
  isRequired?: boolean
}
