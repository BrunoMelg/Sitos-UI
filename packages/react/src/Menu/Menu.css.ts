import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

export const menuContentStyle = style({
  position: 'absolute',
  zIndex: vars.zIndex.dropdown,
  minWidth: '160px',
  maxWidth: '280px',
  backgroundColor: vars.color.surface.overlay,
  border: `1px solid ${vars.color.border.default}`,
  borderRadius: vars.borderRadius.lg,
  boxShadow: vars.shadow.md,
  padding: vars.spacing['2xs'],
  listStyle: 'none',
  margin: 0,
  outline: 'none',
})

export const menuItemRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: vars.spacing.sm,
    paddingBlock: vars.spacing.xs,
    paddingInline: vars.spacing.sm,
    borderRadius: vars.borderRadius.md,
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.subheadline,
    lineHeight: vars.lineHeight.subheadline,
    fontWeight: vars.fontWeight.regular,
    color: vars.color.text.primary,
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    background: 'transparent',
    width: '100%',
    textAlign: 'start',
    selectors: {
      '&:focus-visible, &[data-focused="true"]': {
        backgroundColor: vars.color.accent.subtle,
        color: vars.color.accent.emphasis,
      },
    },
    '@media': {
      '(hover: hover)': {
        selectors: {
          '&:hover:not([aria-disabled="true"])': {
            backgroundColor: vars.color.background.secondary,
          },
        },
      },
    },
  },

  variants: {
    isDisabled: {
      true: {
        color: vars.color.text.disabled,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
    isDestructive: {
      true: {
        color: vars.color.danger.default,
        selectors: {
          '&:focus-visible, &[data-focused="true"]': {
            backgroundColor: vars.color.danger.subtle,
            color: vars.color.danger.emphasis,
          },
        },
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover:not([aria-disabled="true"])': {
                backgroundColor: vars.color.danger.subtle,
              },
            },
          },
        },
      },
    },
  },
})

export const menuSeparatorStyle = style({
  height: '1px',
  backgroundColor: vars.color.border.default,
  marginBlock: vars.spacing['2xs'],
  marginInline: vars.spacing.sm,
})

export const menuWrapperStyle = style({
  position: 'relative',
  display: 'inline-block',
})
