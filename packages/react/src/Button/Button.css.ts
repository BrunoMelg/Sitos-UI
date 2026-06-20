import { createVar, keyframes, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

// ─── Intent-level CSS custom properties ──────────────────────────────────────
// Intent variants set these; form variants (solid/outline/ghost…) consume them.
// This avoids 30 compound variants (5 forms × 6 intents).

const btnBase = createVar()       // primary colour for the intent
const btnBaseStrong = createVar() // pressed / hover emphasis shade
const btnBaseSubtle = createVar() // low-opacity background tint
const btnOnBase = createVar()     // text colour on a solid background

// ─── Spinner ─────────────────────────────────────────────────────────────────

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

export const spinnerStyle = style({
  display: 'inline-block',
  width: '1em',
  height: '1em',
  flexShrink: 0,
  borderRadius: '50%',
  border: '2px solid currentColor',
  borderTopColor: 'transparent',
  animation: `${spin} ${vars.duration.fast} linear infinite`,
})

// ─── Button recipe ────────────────────────────────────────────────────────────

export const buttonRecipe = recipe({
  base: {
    // Reset
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
    userSelect: 'none',

    // Layout
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.spacing.xs,
    whiteSpace: 'nowrap',
    textDecoration: 'none',

    // Typography
    fontFamily: vars.fontFamily.sans,
    fontWeight: vars.fontWeight.medium,

    // Shape
    borderRadius: vars.borderRadius.md,

    // Transition
    transition: [
      `background-color ${vars.duration.fast} ${vars.easing.inPlace}`,
      `color ${vars.duration.fast} ${vars.easing.inPlace}`,
      `box-shadow ${vars.duration.fast} ${vars.easing.inPlace}`,
      `opacity ${vars.duration.fast} ${vars.easing.inPlace}`,
    ].join(', '),

    selectors: {
      '&:focus-visible': {
        outline: `2px solid ${vars.color.border.focus}`,
        outlineOffset: '2px',
      },
    },
  },

  variants: {
    // ── Visual form ──────────────────────────────────────────────────────────
    variant: {
      solid: {
        backgroundColor: btnBase,
        color: btnOnBase,
        border: 'none',
        selectors: {
          '&:hover:not([aria-disabled="true"])': { backgroundColor: btnBaseStrong },
          '&:active:not([aria-disabled="true"])': { backgroundColor: btnBaseStrong },
        },
      },

      outline: {
        backgroundColor: 'transparent',
        color: btnBase,
        border: 'none',
        // Box-shadow keeps the border from affecting layout
        boxShadow: `inset 0 0 0 1px ${btnBase}`,
        selectors: {
          '&:hover:not([aria-disabled="true"])': { backgroundColor: btnBaseSubtle },
          '&:active:not([aria-disabled="true"])': { backgroundColor: btnBaseSubtle },
        },
      },

      ghost: {
        backgroundColor: 'transparent',
        color: btnBase,
        border: 'none',
        selectors: {
          '&:hover:not([aria-disabled="true"])': { backgroundColor: btnBaseSubtle },
          '&:active:not([aria-disabled="true"])': { backgroundColor: btnBaseSubtle },
        },
      },

      subtle: {
        backgroundColor: btnBaseSubtle,
        color: btnBase,
        border: 'none',
        selectors: {
          '&:hover:not([aria-disabled="true"])': { color: btnBaseStrong },
        },
      },

      link: {
        backgroundColor: 'transparent',
        color: btnBase,
        border: 'none',
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
        selectors: {
          '&:hover:not([aria-disabled="true"])': { color: btnBaseStrong },
        },
      },
    },

    // ── Semantic intent ───────────────────────────────────────────────────────
    intent: {
      neutral: {
        vars: {
          [btnBase]:       vars.color.text.primary,
          [btnBaseStrong]: vars.color.text.secondary,
          [btnBaseSubtle]: vars.color.background.secondary,
          [btnOnBase]:     vars.color.text.inverse,
        },
      },
      accent: {
        vars: {
          [btnBase]:       vars.color.accent.default,
          [btnBaseStrong]: vars.color.accent.emphasis,
          [btnBaseSubtle]: vars.color.accent.subtle,
          [btnOnBase]:     vars.color.accent.foreground,
        },
      },
      danger: {
        vars: {
          [btnBase]:       vars.color.danger.default,
          [btnBaseStrong]: vars.color.danger.emphasis,
          [btnBaseSubtle]: vars.color.danger.subtle,
          [btnOnBase]:     vars.color.danger.foreground,
        },
      },
      warning: {
        vars: {
          [btnBase]:       vars.color.warning.default,
          [btnBaseStrong]: vars.color.warning.emphasis,
          [btnBaseSubtle]: vars.color.warning.subtle,
          [btnOnBase]:     vars.color.warning.foreground,
        },
      },
      success: {
        vars: {
          [btnBase]:       vars.color.success.default,
          [btnBaseStrong]: vars.color.success.emphasis,
          [btnBaseSubtle]: vars.color.success.subtle,
          [btnOnBase]:     vars.color.success.foreground,
        },
      },
      info: {
        vars: {
          [btnBase]:       vars.color.info.default,
          [btnBaseStrong]: vars.color.info.emphasis,
          [btnBaseSubtle]: vars.color.info.subtle,
          [btnOnBase]:     vars.color.info.foreground,
        },
      },
    },

    // ── Density (from DensityProvider context) ────────────────────────────────
    density: {
      compact: {
        paddingBlock:  vars.spacing.xs,
        paddingInline: vars.spacing.sm,
        fontSize:      vars.fontSize.footnote,
        lineHeight:    vars.lineHeight.footnote,
      },
      comfortable: {
        paddingBlock:  vars.spacing.sm,
        paddingInline: vars.spacing.md,
        fontSize:      vars.fontSize.body,
        lineHeight:    vars.lineHeight.body,
      },
      spacious: {
        paddingBlock:  vars.spacing.md,
        paddingInline: vars.spacing.lg,
        fontSize:      vars.fontSize.callout,
        lineHeight:    vars.lineHeight.callout,
      },
    },

    // ── State flags ───────────────────────────────────────────────────────────
    isDisabled: {
      true: {
        opacity:       0.4,
        cursor:        'not-allowed',
        pointerEvents: 'none',
      },
    },

    isLoading: {
      true: {
        cursor: 'wait',
      },
    },
  },

  // Link variant overrides density padding — links are inline text, not blocks.
  compoundVariants: [
    {
      variants: { variant: 'link' },
      style: { paddingBlock: 0, paddingInline: 0 },
    },
  ],

  defaultVariants: {
    variant:  'solid',
    intent:   'accent',
    density:  'comfortable',
  },
})
