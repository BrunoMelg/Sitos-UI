/**
 * CSS variable references for use in Vanilla Extract styles and component code.
 *
 * Values resolve at runtime via CSS Custom Properties. The actual values are
 * declared in the token CSS files — import them in your app's entry point:
 *
 *   import '@orchard-ui/tokens/css'           // light theme + all primitives
 *   import '@orchard-ui/tokens/css/dark'      // dark theme overrides
 */
export const vars = {
  color: {
    background: {
      primary:   'var(--orchard-color-background-primary)',
      secondary: 'var(--orchard-color-background-secondary)',
    },
    surface: {
      default: 'var(--orchard-color-surface-default)',
      raised:  'var(--orchard-color-surface-raised)',
      overlay: 'var(--orchard-color-surface-overlay)',
    },
    border: {
      default: 'var(--orchard-color-border-default)',
      strong:  'var(--orchard-color-border-strong)',
      focus:   'var(--orchard-color-border-focus)',
    },
    text: {
      primary:   'var(--orchard-color-text-primary)',
      secondary: 'var(--orchard-color-text-secondary)',
      tertiary:  'var(--orchard-color-text-tertiary)',
      disabled:  'var(--orchard-color-text-disabled)',
      inverse:   'var(--orchard-color-text-inverse)',
      link:      'var(--orchard-color-text-link)',
    },
    accent: {
      default:             'var(--orchard-color-accent-default)',
      subtle:              'var(--orchard-color-accent-subtle)',
      emphasis:            'var(--orchard-color-accent-emphasis)',
      foreground:          'var(--orchard-color-accent-foreground)',
      emphasisForeground:  'var(--orchard-color-accent-emphasis-foreground)',
    },
    success: {
      default:    'var(--orchard-color-success-default)',
      subtle:     'var(--orchard-color-success-subtle)',
      emphasis:   'var(--orchard-color-success-emphasis)',
      foreground: 'var(--orchard-color-success-foreground)',
    },
    danger: {
      default:    'var(--orchard-color-danger-default)',
      subtle:     'var(--orchard-color-danger-subtle)',
      emphasis:   'var(--orchard-color-danger-emphasis)',
      foreground: 'var(--orchard-color-danger-foreground)',
    },
    warning: {
      default:    'var(--orchard-color-warning-default)',
      subtle:     'var(--orchard-color-warning-subtle)',
      emphasis:   'var(--orchard-color-warning-emphasis)',
      foreground: 'var(--orchard-color-warning-foreground)',
    },
    info: {
      default:    'var(--orchard-color-info-default)',
      subtle:     'var(--orchard-color-info-subtle)',
      emphasis:   'var(--orchard-color-info-emphasis)',
      foreground: 'var(--orchard-color-info-foreground)',
    },
  },

  spacing: {
    '2xs': 'var(--orchard-spacing-2xs)',
    xs:    'var(--orchard-spacing-xs)',
    sm:    'var(--orchard-spacing-sm)',
    md:    'var(--orchard-spacing-md)',
    lg:    'var(--orchard-spacing-lg)',
    xl:    'var(--orchard-spacing-xl)',
    '2xl': 'var(--orchard-spacing-2xl)',
    '3xl': 'var(--orchard-spacing-3xl)',
  },

  // SD generates: --orchard-font-size-* (from JSON key "font-size")
  fontSize: {
    caption2:    'var(--orchard-font-size-caption2)',
    caption1:    'var(--orchard-font-size-caption1)',
    footnote:    'var(--orchard-font-size-footnote)',
    subheadline: 'var(--orchard-font-size-subheadline)',
    callout:     'var(--orchard-font-size-callout)',
    body:        'var(--orchard-font-size-body)',
    title3:      'var(--orchard-font-size-title3)',
    title2:      'var(--orchard-font-size-title2)',
    title1:      'var(--orchard-font-size-title1)',
    largeTitle:  'var(--orchard-font-size-large-title)',
  },

  fontWeight: {
    regular:  'var(--orchard-font-weight-regular)',
    medium:   'var(--orchard-font-weight-medium)',
    semibold: 'var(--orchard-font-weight-semibold)',
    bold:     'var(--orchard-font-weight-bold)',
  },

  lineHeight: {
    caption2:    'var(--orchard-line-height-caption2)',
    caption1:    'var(--orchard-line-height-caption1)',
    footnote:    'var(--orchard-line-height-footnote)',
    subheadline: 'var(--orchard-line-height-subheadline)',
    callout:     'var(--orchard-line-height-callout)',
    body:        'var(--orchard-line-height-body)',
    title3:      'var(--orchard-line-height-title3)',
    title2:      'var(--orchard-line-height-title2)',
    title1:      'var(--orchard-line-height-title1)',
    largeTitle:  'var(--orchard-line-height-large-title)',
  },

  letterSpacing: {
    caption2:    'var(--orchard-letter-spacing-caption2)',
    caption1:    'var(--orchard-letter-spacing-caption1)',
    footnote:    'var(--orchard-letter-spacing-footnote)',
    subheadline: 'var(--orchard-letter-spacing-subheadline)',
    callout:     'var(--orchard-letter-spacing-callout)',
    body:        'var(--orchard-letter-spacing-body)',
    title3:      'var(--orchard-letter-spacing-title3)',
    title2:      'var(--orchard-letter-spacing-title2)',
    title1:      'var(--orchard-letter-spacing-title1)',
    largeTitle:  'var(--orchard-letter-spacing-large-title)',
  },

  fontFamily: {
    sans: 'var(--orchard-font-family-sans)',
    mono: 'var(--orchard-font-family-mono)',
  },

  duration: {
    instant:    'var(--orchard-duration-instant)',
    fast:       'var(--orchard-duration-fast)',
    normal:     'var(--orchard-duration-normal)',
    slow:       'var(--orchard-duration-slow)',
    deliberate: 'var(--orchard-duration-deliberate)',
  },

  // SD generates: --orchard-easing-in-place (from JSON key "in-place")
  easing: {
    enter:   'var(--orchard-easing-enter)',
    exit:    'var(--orchard-easing-exit)',
    inPlace: 'var(--orchard-easing-in-place)',
  },

  borderRadius: {
    none:  'var(--orchard-border-radius-none)',
    sm:    'var(--orchard-border-radius-sm)',
    md:    'var(--orchard-border-radius-md)',
    lg:    'var(--orchard-border-radius-lg)',
    xl:    'var(--orchard-border-radius-xl)',
    '2xl': 'var(--orchard-border-radius-2xl)',
    full:  'var(--orchard-border-radius-full)',
  },

  shadow: {
    sm: 'var(--orchard-shadow-sm)',
    md: 'var(--orchard-shadow-md)',
    lg: 'var(--orchard-shadow-lg)',
  },

  zIndex: {
    base:     'var(--orchard-z-index-base)',
    raised:   'var(--orchard-z-index-raised)',
    dropdown: 'var(--orchard-z-index-dropdown)',
    sticky:   'var(--orchard-z-index-sticky)',
    overlay:  'var(--orchard-z-index-overlay)',
    modal:    'var(--orchard-z-index-modal)',
    popover:  'var(--orchard-z-index-popover)',
    toast:    'var(--orchard-z-index-toast)',
  },
} as const

export type Vars = typeof vars

export type SpacingToken       = keyof typeof vars.spacing
export type FontSizeToken      = keyof typeof vars.fontSize
export type FontWeightToken    = keyof typeof vars.fontWeight
export type LineHeightToken    = keyof typeof vars.lineHeight
export type LetterSpacingToken = keyof typeof vars.letterSpacing
export type FontFamilyToken    = keyof typeof vars.fontFamily
export type BorderRadiusToken  = keyof typeof vars.borderRadius
export type ShadowToken        = keyof typeof vars.shadow
export type ZIndexToken        = keyof typeof vars.zIndex
export type DurationToken      = keyof typeof vars.duration
export type EasingToken        = keyof typeof vars.easing

export type ColorTextToken    = keyof typeof vars.color.text
export type ColorAccentToken  = keyof typeof vars.color.accent
export type ColorStatusKey    = 'success' | 'danger' | 'warning' | 'info'
export type ColorStatusToken  = keyof typeof vars.color.success
