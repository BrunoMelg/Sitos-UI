import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

const alertBase   = 'var(--alert-base)'
const alertSubtle = 'var(--alert-subtle)'
const alertText   = 'var(--alert-text)'
const alertBorder = 'var(--alert-border)'

export const alertRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: vars.spacing.sm,
    padding: vars.spacing.md,
    borderRadius: vars.borderRadius.lg,
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: alertSubtle,
    borderColor: alertBorder,
  },

  variants: {
    intent: {
      info: {
        vars: {
          [alertSubtle]: vars.color.info.subtle,
          [alertText]:   vars.color.info.emphasis,
          [alertBorder]: vars.color.info.default,
          [alertBase]:   vars.color.info.default,
        },
      },
      success: {
        vars: {
          [alertSubtle]: vars.color.success.subtle,
          [alertText]:   vars.color.success.emphasis,
          [alertBorder]: vars.color.success.default,
          [alertBase]:   vars.color.success.default,
        },
      },
      warning: {
        vars: {
          [alertSubtle]: vars.color.warning.subtle,
          [alertText]:   vars.color.warning.emphasis,
          [alertBorder]: vars.color.warning.default,
          [alertBase]:   vars.color.warning.default,
        },
      },
      danger: {
        vars: {
          [alertSubtle]: vars.color.danger.subtle,
          [alertText]:   vars.color.danger.emphasis,
          [alertBorder]: vars.color.danger.default,
          [alertBase]:   vars.color.danger.default,
        },
      },
    },
  },
})

export const alertIconStyle = style({
  color: alertBase,
  flexShrink: 0,
  marginTop: '1px',
})

export const alertBodyStyle = style({
  flex: 1,
  minWidth: 0,
})

export const alertTitleStyle = style({
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.subheadline,
  fontWeight: vars.fontWeight.semibold,
  lineHeight: vars.lineHeight.subheadline,
  color: alertText,
  margin: 0,
})

export const alertDescriptionStyle = style({
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.footnote,
  lineHeight: vars.lineHeight.footnote,
  color: alertText,
  margin: 0,
  marginTop: vars.spacing['2xs'],
  selectors: {
    '&:first-child': { marginTop: 0 },
  },
})

export const alertDismissStyle = style({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.spacing['2xs'],
  border: 'none',
  background: 'transparent',
  borderRadius: vars.borderRadius.sm,
  cursor: 'pointer',
  color: alertText,
  marginInlineStart: 'auto',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.border.focus}`,
      outlineOffset: '1px',
    },
  },
  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover': {
          backgroundColor: vars.color.background.secondary,
        },
      },
    },
  },
})
