import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@orchard-ui/tokens'

// CSS custom properties allow intent colours to be overridden per-variant
// without N×M compound variants.
const badgeBase    = 'var(--badge-base)'
const badgeSubtle  = 'var(--badge-subtle)'
const badgeText    = 'var(--badge-text)'
const badgeBorder  = 'var(--badge-border)'

export const badgeRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.spacing['2xs'],
    fontFamily: vars.fontFamily.sans,
    fontWeight: vars.fontWeight.medium,
    borderRadius: vars.borderRadius.full,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },

  variants: {
    // ── Size ──────────────────────────────────────────────────────────────
    size: {
      sm: {
        fontSize: vars.fontSize.caption1,
        lineHeight: vars.lineHeight.caption1,
        letterSpacing: vars.letterSpacing.caption1,
        paddingBlock: vars.spacing['2xs'],
        paddingInline: vars.spacing.xs,
      },
      md: {
        fontSize: vars.fontSize.footnote,
        lineHeight: vars.lineHeight.footnote,
        letterSpacing: vars.letterSpacing.footnote,
        paddingBlock: vars.spacing['2xs'],
        paddingInline: vars.spacing.sm,
      },
    },

    // ── Variant ───────────────────────────────────────────────────────────
    variant: {
      solid: {
        backgroundColor: badgeBase,
        color: vars.color.text.inverse,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'transparent',
      },
      subtle: {
        backgroundColor: badgeSubtle,
        color: badgeText,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'transparent',
      },
      outline: {
        backgroundColor: 'transparent',
        color: badgeText,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: badgeBorder,
      },
    },

    // ── Intent ────────────────────────────────────────────────────────────
    intent: {
      neutral: {
        vars: {
          [badgeBase]:   vars.color.text.secondary,
          [badgeSubtle]: vars.color.background.secondary,
          [badgeText]:   vars.color.text.secondary,
          [badgeBorder]: vars.color.border.default,
        },
      },
      accent: {
        vars: {
          [badgeBase]:   vars.color.accent.default,
          [badgeSubtle]: vars.color.accent.subtle,
          [badgeText]:   vars.color.accent.emphasis,
          [badgeBorder]: vars.color.accent.default,
        },
      },
      success: {
        vars: {
          [badgeBase]:   vars.color.success.default,
          [badgeSubtle]: vars.color.success.subtle,
          [badgeText]:   vars.color.success.emphasis,
          [badgeBorder]: vars.color.success.default,
        },
      },
      danger: {
        vars: {
          [badgeBase]:   vars.color.danger.default,
          [badgeSubtle]: vars.color.danger.subtle,
          [badgeText]:   vars.color.danger.emphasis,
          [badgeBorder]: vars.color.danger.default,
        },
      },
      warning: {
        vars: {
          [badgeBase]:   vars.color.warning.default,
          [badgeSubtle]: vars.color.warning.subtle,
          [badgeText]:   vars.color.warning.emphasis,
          [badgeBorder]: vars.color.warning.default,
        },
      },
      info: {
        vars: {
          [badgeBase]:   vars.color.info.default,
          [badgeSubtle]: vars.color.info.subtle,
          [badgeText]:   vars.color.info.emphasis,
          [badgeBorder]: vars.color.info.default,
        },
      },
    },
  },

  defaultVariants: {
    variant: 'subtle',
    intent:  'neutral',
    size:    'md',
  },
})
