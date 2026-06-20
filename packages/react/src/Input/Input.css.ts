import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

// ─── Root (wrapper) ───────────────────────────────────────────────────────────

export const rootStyle = style({
  display:       'flex',
  flexDirection: 'column',
  gap:           vars.spacing['2xs'],
})

// ─── Label ────────────────────────────────────────────────────────────────────

export const labelStyle = style({
  fontFamily:    vars.fontFamily.sans,
  fontSize:      vars.fontSize.footnote,
  fontWeight:    vars.fontWeight.medium,
  lineHeight:    vars.lineHeight.footnote,
  letterSpacing: vars.letterSpacing.footnote,
  color:         vars.color.text.primary,
  userSelect:    'none',
})

export const requiredMarkStyle = style({
  color:             vars.color.danger.default,
  marginInlineStart: vars.spacing['2xs'],
})

// ─── Field wrapper (border + slotted elements) ────────────────────────────────

export const fieldRecipe = recipe({
  base: {
    display:         'flex',
    alignItems:      'center',
    gap:             vars.spacing.xs,
    paddingBlock:    vars.spacing.xs,
    paddingInline:   vars.spacing.sm,
    borderRadius:    vars.borderRadius.md,
    backgroundColor: vars.color.surface.default,
    transition: [
      `box-shadow ${vars.duration.fast} ${vars.easing.inPlace}`,
      `background-color ${vars.duration.fast} ${vars.easing.inPlace}`,
    ].join(', '),

    boxShadow: `inset 0 0 0 1px ${vars.color.border.default}`,

    selectors: {
      '&:focus-within': {
        boxShadow: `inset 0 0 0 2px ${vars.color.border.focus}`,
        outline:   'none',
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
        // Mute selectively — no opacity on the whole component (preserves focus ring).
        backgroundColor: vars.color.background.secondary,
        boxShadow:       `inset 0 0 0 1px ${vars.color.border.default}`,
        cursor:          'not-allowed',
        // The native <input disabled> blocks interaction; no pointerEvents: none needed.
      },
    },

    isReadOnly: {
      true: {
        backgroundColor: vars.color.background.secondary,
        cursor:          'default',
        selectors: {
          '&:focus-within': {
            // Suppress the focus ring change — readonly fields are not editable
            boxShadow: `inset 0 0 0 1px ${vars.color.border.default}`,
          },
        },
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
  letterSpacing:   vars.letterSpacing.body,
  color:           vars.color.text.primary,

  selectors: {
    '&::placeholder': {
      color: vars.color.text.tertiary,
    },
    '&[readonly]': {
      cursor: 'default',
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

export const errorIconStyle = style({
  display:    'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  color:      vars.color.danger.default,
  fontSize:   vars.fontSize.body,
})

// ─── Hint / error message ─────────────────────────────────────────────────────

export const hintStyle = style({
  fontFamily:    vars.fontFamily.sans,
  fontSize:      vars.fontSize.caption1,
  lineHeight:    vars.lineHeight.caption1,
  letterSpacing: vars.letterSpacing.caption1,
  color:         vars.color.text.secondary,
})

export const errorStyle = style({
  fontFamily:    vars.fontFamily.sans,
  fontSize:      vars.fontSize.caption1,
  lineHeight:    vars.lineHeight.caption1,
  letterSpacing: vars.letterSpacing.caption1,
  color:         vars.color.danger.default,
})
