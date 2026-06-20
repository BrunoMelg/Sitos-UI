'use client'

import { forwardRef, type Ref } from 'react'
import { Slot } from '@orchard-ui/primitives'
import { useDensity } from '../providers/Density'
import { buttonRecipe, buttonContentStyle, spinnerStyle } from './Button.css'
import type { ButtonProps } from './Button.types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    intent,
    isDisabled = false,
    isLoading = false,
    leadingElement,
    trailingElement,
    asChild = false,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const density = useDensity()

  const classes = [
    buttonRecipe({
      variant,
      intent,
      density,
      // isDisabled and isLoading are semantically distinct:
      //   isDisabled → muted colors, not-allowed cursor (permanent)
      //   isLoading  → full intent colors, wait cursor, spinner (temporary)
      // aria-disabled and onClick guard cover both; the recipe covers only actual disabled.
      isDisabled,
      isLoading,
    }),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const sharedProps = {
    className:        classes,
    'aria-disabled':  isDisabled || isLoading ? (true as const) : undefined,
    'aria-busy':      isLoading ? (true as const) : undefined,
    'data-disabled':  isDisabled || undefined,
    'data-loading':   isLoading || undefined,
    onClick:          isDisabled || isLoading ? undefined : onClick,
    ...rest,
  }

  // asChild: Slot must receive exactly one ReactElement child.
  if (asChild) {
    return (
      <Slot ref={ref as Ref<HTMLElement>} {...sharedProps}>
        {children}
      </Slot>
    )
  }

  return (
    <button ref={ref} type="button" {...sharedProps}>
      {isLoading && <span className={spinnerStyle} aria-hidden="true" />}
      {/*
       * Content wrapper preserves the button's natural width during loading.
       * The spinner is absolute-positioned; opacity:0 hides content without
       * collapsing layout, keeping the button stable (no layout shift).
       */}
      <span
        className={buttonContentStyle}
        style={isLoading ? { opacity: 0 } : undefined}
      >
        {leadingElement}
        {children}
        {trailingElement}
      </span>
    </button>
  )
})

Button.displayName = 'Button'
