import type { HTMLAttributes } from 'react'

export type CardVariant = 'elevated' | 'outlined' | 'ghost'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
  /** Render the card as the child element (Slot pattern). */
  asChild?: boolean
}
