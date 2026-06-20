import { forwardRef, type Ref } from 'react'
import { Slot } from '@orchard-ui/primitives'
import { useDensity } from '../providers/Density'
import { buttonRecipe, spinnerStyle } from './Button.css'
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
      isDisabled: isDisabled || isLoading,
      isLoading,
    }),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const sharedProps = {
    className: classes,
    'aria-disabled': isDisabled || isLoading ? (true as const) : undefined,
    'aria-busy': isLoading ? (true as const) : undefined,
    onClick: isDisabled || isLoading ? undefined : onClick,
    ...rest,
  }

  // asChild: Slot must receive exactly one ReactElement child.
  // leadingElement/trailingElement are not applicable — the child owns its content.
  if (asChild) {
    return (
      <Slot ref={ref as Ref<HTMLElement>} {...sharedProps}>
        {children}
      </Slot>
    )
  }

  const leading = isLoading
    ? <span className={spinnerStyle} aria-hidden="true" />
    : leadingElement

  return (
    <button ref={ref} type="button" {...sharedProps}>
      {leading}
      {children}
      {trailingElement}
    </button>
  )
})

Button.displayName = 'Button'
