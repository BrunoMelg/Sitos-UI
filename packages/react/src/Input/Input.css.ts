import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

// ─── Root (wrapper) ───────────────────────────────────────────────────────────

export const rootStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing['2xs'],
})

// ─── Label ────────────────────────────────────────────────────────────────────

export const labelStyle = style({
  fontFamily:   vars.fontFamily.sans,
  fontSize:     vars.fontSize.footnote,
  fontWeight:   vars.fontWeight.medium,
  lineHeight:   vars.lineHeight.footnote,
  color:        vars.color.text.primary,
  userSelect:   'none',
})

export const requiredMarkStyle = style({
  color:             vars.color.danger.default,
  marginInlineStart: vars.spacing['2xs'],
})

// ─── Field wrapper (border + slotted elements) ────────────────────────────────

export const fieldRecipe = recipe({
  base: {
    display:        'flex',
    alignItems:     'center',
    gap:            vars.spacing.xs,
    paddingBlock:   vars.spacing.xs,
    paddingInline:  vars.spacing.sm,
    borderRadius:   vars.borderRadius.md,
    backgroundColor: vars.color.surface.default,
    transition: [
      `box-shadow ${vars.duration.fast} ${vars.easing.inPlace}`,
      `background-color ${vars.duration.fast} ${vars.easing.inPlace}`,
    ].join(', '),

    // Default border via box-shadow (doesn't affect layout)
    boxShadow: `inset 0 0 0 1px ${vars.color.border.default}`,

    selectors: {
      '&:focus-within': {
        boxShadow: `inset 0 0 0 2px ${vars.color.border.focus}`,
        outline: 'none',
      },
    },
  },

  variants: {
    intent: {
      neutral: {},
      danger: {
        boxShadow: `inset 0 0 0 1px ${vars.color.danger.default}`,
        selectors: {
          '&:focus-within': {
            boxShadow: `inset 0 0 0 2px ${vars.color.danger.default}`,
          },
        },
      },
      success: {
        boxShadow: `inset 0 0 0 1px ${vars.color.success.default}`,
        selectors: {
          '&:focus-within': {
            boxShadow: `inset 0 0 0 2px ${vars.color.success.default}`,
          },
        },
      },
    },

    isDisabled: {
      true: {
        opacity:       0.4,
        cursor:        'not-allowed',
        pointerEvents: 'none',
        backgroundColor: vars.color.background.secondary,
      },
    },
  },

  defaultVariants: {
    intent: 'neutral',
  },
})

// ─── Native <input> ───────────────────────────────────────────────────────────

export const inputStyle = style({
  flex:            1,
  minWidth:        0,
  border:          'none',
  outline:         'none',
  backgroundColor: 'transparent',
  fontFamily:      vars.fontFamily.sans,
  fontSize:        vars.fontSize.body,
  lineHeight:      vars.lineHeight.body,
  color:           vars.color.text.primary,

  selectors: {
    '&::placeholder': {
      color: vars.color.text.tertiary,
    },
  },
})

// ─── Adornment slots ──────────────────────────────────────────────────────────

export const adornmentStyle = style({
  display:    'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  color:      vars.color.text.secondary,
  fontSize:   vars.fontSize.body,
})

// ─── Hint / error message ─────────────────────────────────────────────────────

export const hintStyle = style({
  fontFamily: vars.fontFamily.sans,
  fontSize:   vars.fontSize.caption1,
  lineHeight: vars.lineHeight.caption1,
  color:      vars.color.text.secondary,
})

export const errorStyle = style({
  fontFamily: vars.fontFamily.sans,
  fontSize:   vars.fontSize.caption1,
  lineHeight: vars.lineHeight.caption1,
  color:      vars.color.danger.default,
})
