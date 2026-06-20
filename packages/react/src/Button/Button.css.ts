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
  from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
  to:   { transform: 'translate(-50%, -50%) rotate(360deg)' },
})

export const spinnerStyle = style({
  // Absolute-positioned so the button width never changes during loading
  position: 'absolute',
  top:      '50%',
  left:     '50%',
  // Rotation uses translate(-50%,-50%) baked into the keyframe to stay centred
  display:      'inline-block',
  width:        '1em',
  height:       '1em',
  borderRadius: '50%',
  border:       '2px solid currentColor',
  borderTopColor: 'transparent',
  animation:    `${spin} ${vars.duration.fast} linear infinite`,

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
      opacity:   0.6,
    },
  },
})

// ─── Content wrapper ──────────────────────────────────────────────────────────
// Wraps leadingElement + children + trailingElement.
// When loading: opacity:0 hides content while preserving layout width.

export const buttonContentStyle = style({
  display:    'inline-flex',
  alignItems: 'center',
  gap:        vars.spacing.xs,
})

// ─── Button recipe ────────────────────────────────────────────────────────────

export const buttonRecipe = recipe({
  base: {
    // Reset
    appearance:       'none',
    WebkitAppearance: 'none',
    cursor:           'pointer',
    userSelect:       'none',
    position:         'relative',

    // Layout — gap lives in buttonContentStyle; the button holds a single flex child
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    whiteSpace:     'nowrap',
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
    ].join(', '),

    selectors: {
      '&:focus-visible': {
        outline:       `2px solid ${vars.color.border.focus}`,
        outlineOffset: '2px',
      },
    },
  },

  variants: {
    // ── Visual form ──────────────────────────────────────────────────────────
    variant: {
      solid: {
        backgroundColor: btnBase,
        color:           btnOnBase,
        border:          'none',
        selectors: {
          '&:active:not([aria-disabled="true"])': { backgroundColor: btnBaseStrong },
        },
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover:not([aria-disabled="true"])': { backgroundColor: btnBaseStrong },
            },
          },
        },
      },

      outline: {
        backgroundColor: 'transparent',
        color:           btnBase,
        border:          'none',
        boxShadow:       `inset 0 0 0 1px ${btnBase}`,
        selectors: {
          '&:active:not([aria-disabled="true"])': { backgroundColor: btnBaseSubtle },
        },
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover:not([aria-disabled="true"])': { backgroundColor: btnBaseSubtle },
            },
          },
        },
      },

      ghost: {
        backgroundColor: 'transparent',
        color:           btnBase,
        border:          'none',
        selectors: {
          '&:active:not([aria-disabled="true"])': { backgroundColor: btnBaseSubtle },
        },
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover:not([aria-disabled="true"])': { backgroundColor: btnBaseSubtle },
            },
          },
        },
      },

      subtle: {
        backgroundColor: btnBaseSubtle,
        color:           btnBase,
        border:          'none',
        selectors: {
          '&:active:not([aria-disabled="true"])': { color: btnBaseStrong },
        },
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover:not([aria-disabled="true"])': { color: btnBaseStrong },
            },
          },
        },
      },

      link: {
        backgroundColor:     'transparent',
        color:               btnBase,
        border:              'none',
        textDecoration:      'underline',
        textUnderlineOffset: '2px',
        selectors: {
          '&:active:not([aria-disabled="true"])': { color: btnBaseStrong },
        },
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover:not([aria-disabled="true"])': { color: btnBaseStrong },
            },
          },
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
        paddingBlock:   vars.spacing.xs,
        paddingInline:  vars.spacing.sm,
        fontSize:       vars.fontSize.subheadline,
        lineHeight:     vars.lineHeight.subheadline,
        letterSpacing:  vars.letterSpacing.subheadline,
      },
      comfortable: {
        paddingBlock:   vars.spacing.sm,
        paddingInline:  vars.spacing.md,
        fontSize:       vars.fontSize.body,
        lineHeight:     vars.lineHeight.body,
        letterSpacing:  vars.letterSpacing.body,
      },
      spacious: {
        paddingBlock:   vars.spacing.md,
        paddingInline:  vars.spacing.lg,
        fontSize:       vars.fontSize.callout,
        lineHeight:     vars.lineHeight.callout,
        letterSpacing:  vars.letterSpacing.callout,
      },
    },

    // ── State flags ───────────────────────────────────────────────────────────
    isDisabled: {
      true: {
        cursor: 'not-allowed',
        // Mute intent vars instead of dimming the entire element.
        // This preserves the focus ring at full opacity (WCAG 1.4.11).
        vars: {
          [btnBase]:       vars.color.text.disabled,
          [btnBaseStrong]: vars.color.text.disabled,
          [btnBaseSubtle]: vars.color.background.secondary,
          [btnOnBase]:     vars.color.text.disabled,
        },
      },
    },

    isLoading: {
      true: {
        cursor: 'wait',
      },
    },
  },

  compoundVariants: [
    // Link variant: remove block padding — links are inline text, not blocks
    {
      variants: { variant: 'link' },
      style: { paddingBlock: 0, paddingInline: 0 },
    },
    // Solid + disabled: override background so bg ≠ text (both would be text.disabled otherwise)
    {
      variants: { variant: 'solid', isDisabled: true },
      style: {
        backgroundColor: vars.color.background.secondary,
        color:           vars.color.text.tertiary,
      },
    },
  ],

  defaultVariants: {
    variant:  'solid',
    intent:   'accent',
    density:  'comfortable',
  },
})
