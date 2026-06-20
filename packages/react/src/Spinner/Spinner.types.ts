import type { HTMLAttributes } from 'react'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  /**
   * Accessible label announced by screen readers.
   * Default: "Loading". Pass '' to suppress when the
   * loading state is already announced by a parent (e.g. aria-busy on a Button).
   */
  'aria-label'?: string
}
