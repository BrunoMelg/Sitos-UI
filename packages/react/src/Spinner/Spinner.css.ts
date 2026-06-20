import { keyframes } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to:   { transform: 'rotate(360deg)' },
})

export const spinnerRecipe = recipe({
  base: {
    display: 'inline-block',
    flexShrink: 0,
    boxSizing: 'border-box',
    borderRadius: vars.borderRadius.full,
    borderStyle: 'solid',
    // Track uses the standard border token so it adapts to light/dark automatically.
    borderColor: vars.color.border.default,
    borderTopColor: 'currentColor',
    verticalAlign: 'middle',
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        animation: `${spin} ${vars.duration.normal} linear infinite`,
      },
      '(prefers-reduced-motion: reduce)': {
        animation: 'none',
        opacity: 0.5,
      },
    },
  },
  variants: {
    size: {
      sm: { width: vars.spacing.md,  height: vars.spacing.md,  borderWidth: '2px' },
      md: { width: vars.spacing.lg,  height: vars.spacing.lg,  borderWidth: '2px' },
      lg: { width: vars.spacing.xl,  height: vars.spacing.xl,  borderWidth: '2.5px' },
    },
  },
  defaultVariants: { size: 'md' },
})
