import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

export const tagSelectRootStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing['2xs'],
})

export const tagSelectLabelStyle = style({
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.footnote,
  fontWeight: vars.fontWeight.medium,
  lineHeight: vars.lineHeight.footnote,
  color: vars.color.text.primary,
  userSelect: 'none',
})

export const tagSelectWrapperStyle = style({
  position: 'relative',
})

export const tagSelectFieldStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.spacing['2xs'],
  minHeight: '40px',
  paddingBlock: vars.spacing['2xs'],
  paddingInline: vars.spacing['2xs'],
  borderRadius: vars.borderRadius.md,
  backgroundColor: vars.color.surface.default,
  boxShadow: `inset 0 0 0 1px ${vars.color.border.default}`,
  cursor: 'text',
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

export const tagStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing['2xs'],
  paddingBlock: '2px',
  paddingInlineStart: vars.spacing.xs,
  paddingInlineEnd: '2px',
  borderRadius: vars.borderRadius.sm,
  backgroundColor: vars.color.accent.subtle,
  color: vars.color.accent.emphasis,
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.footnote,
  fontWeight: vars.fontWeight.medium,
  lineHeight: vars.lineHeight.footnote,
  userSelect: 'none',
  maxWidth: '180px',
})

export const tagLabelStyle = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const tagRemoveStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '16px',
  height: '16px',
  borderRadius: vars.borderRadius.full,
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  padding: 0,
  outline: 'none',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.accent.default,
      color: vars.color.background.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.border.focus}`,
      outlineOffset: '1px',
    },
  },
})

export const tagSelectInputStyle = style({
  flex: '1 1 80px',
  minWidth: '80px',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.body,
  color: vars.color.text.primary,
  padding: `${vars.spacing['2xs']} ${vars.spacing.xs}`,
  selectors: {
    '&::placeholder': {
      color: vars.color.text.tertiary,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
})

export const tagSelectListboxStyle = style({
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

export const tagSelectOptionRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: vars.spacing.xs,
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
        color: vars.color.text.secondary,
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

export const tagSelectEmptyStyle = style({
  paddingBlock: vars.spacing.sm,
  paddingInline: vars.spacing.sm,
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.subheadline,
  color: vars.color.text.tertiary,
  textAlign: 'center',
})

export const checkIconStyle = style({
  marginInlineStart: 'auto',
  color: vars.color.accent.default,
})
