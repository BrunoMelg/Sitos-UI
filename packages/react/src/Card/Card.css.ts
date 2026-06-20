import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

export const cardRecipe = recipe({
  base: {
    display: 'block',
    borderRadius: vars.borderRadius.xl,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },

  variants: {
    variant: {
      elevated: {
        backgroundColor: vars.color.surface.raised,
        boxShadow: vars.shadow.sm,
        border: 'none',
      },
      outlined: {
        backgroundColor: vars.color.surface.default,
        border: `1px solid ${vars.color.border.default}`,
        boxShadow: 'none',
      },
      ghost: {
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
      },
    },

    padding: {
      none: { padding: 0 },
      sm:   { padding: vars.spacing.sm },
      md:   { padding: vars.spacing.md },
      lg:   { padding: vars.spacing.lg },
    },
  },

  defaultVariants: {
    variant: 'elevated',
    padding: 'md',
  },
})
