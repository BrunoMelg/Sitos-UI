'use client'

import { forwardRef } from 'react'
import { badgeRecipe } from './Badge.css'
import type { BadgeProps } from './Badge.types'

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ variant, intent, size, className, children, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className={[badgeRecipe({ variant, intent, size }), className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
