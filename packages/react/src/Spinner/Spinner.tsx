'use client'

import { forwardRef } from 'react'
import { spinnerRecipe } from './Spinner.css'
import type { SpinnerProps } from './Spinner.types'

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    { size = 'md', className, role = 'status', 'aria-label': ariaLabel = 'Loading', ...rest },
    ref,
  ) {
    return (
      <span
        ref={ref}
        role={role}
        aria-label={ariaLabel || undefined}
        className={[spinnerRecipe({ size }), className].filter(Boolean).join(' ')}
        {...rest}
      />
    )
  },
)

Spinner.displayName = 'Spinner'
