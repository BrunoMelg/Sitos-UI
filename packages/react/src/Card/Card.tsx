'use client'

import { forwardRef, type ElementType } from 'react'
import { Slot } from '@orchard-ui/primitives'
import { cardRecipe } from './Card.css'
import type { CardProps } from './Card.types'

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card({ variant, padding, asChild = false, className, children, ...rest }, ref) {
    const Comp = (asChild ? Slot : 'div') as ElementType

    return (
      <Comp
        ref={ref}
        className={[cardRecipe({ variant, padding }), className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </Comp>
    )
  },
)

Card.displayName = 'Card'
