import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

export const avatarRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    userSelect: 'none',
    fontFamily: vars.fontFamily.sans,
    fontWeight: vars.fontWeight.medium,
    backgroundColor: vars.color.background.secondary,
    color: vars.color.text.secondary,
  },

  variants: {
    size: {
      xs: { width: vars.spacing.lg,  height: vars.spacing.lg,  fontSize: vars.fontSize.caption2 },
      sm: { width: vars.spacing.xl,  height: vars.spacing.xl,  fontSize: vars.fontSize.caption1 },
      md: { width: vars.spacing['2xl'], height: vars.spacing['2xl'], fontSize: vars.fontSize.footnote },
      lg: { width: vars.spacing['3xl'], height: vars.spacing['3xl'], fontSize: vars.fontSize.subheadline },
      xl: { width: '64px',           height: '64px',           fontSize: vars.fontSize.title3 },
    },

    shape: {
      circle: { borderRadius: vars.borderRadius.full },
      square: { borderRadius: vars.borderRadius.md },
    },
  },

  defaultVariants: {
    size:  'md',
    shape: 'circle',
  },
})

export const avatarImgStyle = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
})

// Fallback icon — a simple person silhouette rendered via CSS mask
export const avatarIconStyle = style({
  width: '55%',
  height: '55%',
  opacity: 0.5,
})
