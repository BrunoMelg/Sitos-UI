import type { HTMLAttributes } from 'react'

export type BadgeVariant = 'solid' | 'subtle' | 'outline'
export type BadgeIntent  = 'neutral' | 'accent' | 'success' | 'danger' | 'warning' | 'info'
export type BadgeSize    = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  intent?:  BadgeIntent
  size?:    BadgeSize
}
