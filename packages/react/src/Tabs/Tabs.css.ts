import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

export const tabsRootStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
})

export const tabsListStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing['2xs'],
  borderBottom: `1px solid ${vars.color.border.default}`,
  overflowX: 'auto',
})

export const tabRecipe = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.spacing.xs,
    paddingBlock: vars.spacing.sm,
    paddingInline: vars.spacing.sm,
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.subheadline,
    lineHeight: vars.lineHeight.subheadline,
    fontWeight: vars.fontWeight.medium,
    letterSpacing: vars.letterSpacing.subheadline,
    color: vars.color.text.secondary,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: `${vars.borderRadius.sm} ${vars.borderRadius.sm} 0 0`,
    whiteSpace: 'nowrap',
    // Active indicator line
    '::after': {
      content: '""',
      position: 'absolute',
      bottom: '-1px',
      insetInline: 0,
      height: '2px',
      borderRadius: vars.borderRadius.full,
      backgroundColor: 'transparent',
    },
    selectors: {
      '&:focus-visible': {
        outline: `2px solid ${vars.color.border.focus}`,
        outlineOffset: '2px',
      },
    },
    '@media': {
      '(hover: hover)': {
        selectors: {
          '&:hover:not([aria-disabled="true"]):not([aria-selected="true"])': {
            color: vars.color.text.primary,
            backgroundColor: vars.color.background.secondary,
          },
        },
      },
    },
  },

  variants: {
    isSelected: {
      true: {
        color: vars.color.accent.default,
        '::after': {
          backgroundColor: vars.color.accent.default,
        },
      },
    },
    isDisabled: {
      true: {
        color: vars.color.text.disabled,
        cursor: 'not-allowed',
      },
    },
  },
})

export const tabsPanelStyle = style({
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.body,
  color: vars.color.text.primary,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.border.focus}`,
      outlineOffset: '2px',
      borderRadius: vars.borderRadius.sm,
    },
  },
})
