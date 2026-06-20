import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

export const comboboxRootStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing['2xs'],
})

export const comboboxLabelStyle = style({
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.footnote,
  fontWeight: vars.fontWeight.medium,
  lineHeight: vars.lineHeight.footnote,
  color: vars.color.text.primary,
  userSelect: 'none',
})

export const comboboxWrapperStyle = style({
  position: 'relative',
})

export const comboboxFieldStyle = style({
  display: 'flex',
  alignItems: 'center',
  borderRadius: vars.borderRadius.md,
  backgroundColor: vars.color.surface.default,
  boxShadow: `inset 0 0 0 1px ${vars.color.border.default}`,
  transition: `box-shadow ${vars.duration.fast} ${vars.easing.inPlace}`,
  selectors: {
    '&:focus-within': {
      boxShadow: `inset 0 0 0 2px ${vars.color.border.focus}`,
    },
    '&[data-disabled="true"]': {
      backgroundColor: vars.color.background.secondary,
      cursor: 'not-allowed',
    },
  },
})

export const comboboxInputStyle = style({
  flex: 1,
  minWidth: 0,
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.body,
  color: vars.color.text.primary,
  paddingBlock: vars.spacing.xs,
  paddingInlineStart: vars.spacing.sm,
  paddingInlineEnd: 0,
  selectors: {
    '&::placeholder': {
      color: vars.color.text.tertiary,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
})

export const comboboxTriggerStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '32px',
  height: '100%',
  border: 'none',
  background: 'transparent',
  color: vars.color.text.secondary,
  cursor: 'pointer',
  outline: 'none',
  borderRadius: `0 ${vars.borderRadius.md} ${vars.borderRadius.md} 0`,
  selectors: {
    '&:focus-visible': {
      backgroundColor: vars.color.background.secondary,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
})

export const comboboxListboxStyle = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  zIndex: vars.zIndex.dropdown,
  maxHeight: '240px',
  overflowY: 'auto',
  backgroundColor: vars.color.surface.overlay,
  border: `1px solid ${vars.color.border.default}`,
  borderRadius: vars.borderRadius.lg,
  boxShadow: vars.shadow.md,
  padding: vars.spacing['2xs'],
  listStyle: 'none',
  margin: 0,
  outline: 'none',
})

export const comboboxOptionRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    paddingBlock: vars.spacing.xs,
    paddingInline: vars.spacing.sm,
    borderRadius: vars.borderRadius.md,
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.subheadline,
    lineHeight: vars.lineHeight.subheadline,
    color: vars.color.text.primary,
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    listStyle: 'none',
  },
  variants: {
    isFocused: {
      true: {
        backgroundColor: vars.color.accent.subtle,
        color: vars.color.accent.emphasis,
      },
    },
    isSelected: {
      true: {
        fontWeight: vars.fontWeight.semibold,
      },
    },
    isDisabled: {
      true: {
        color: vars.color.text.disabled,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
})

export const comboboxEmptyStyle = style({
  paddingBlock: vars.spacing.sm,
  paddingInline: vars.spacing.sm,
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.subheadline,
  color: vars.color.text.tertiary,
  textAlign: 'center',
})
