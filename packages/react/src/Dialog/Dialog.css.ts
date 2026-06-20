import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@orchard-ui/tokens'

// ─── Enter animations ─────────────────────────────────────────────────────────

const overlayShow = keyframes({
  from: { opacity: 0 },
  to:   { opacity: 1 },
})

const contentShow = keyframes({
  from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
  to:   { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

// ─── Exit animations ──────────────────────────────────────────────────────────

const overlayHide = keyframes({
  from: { opacity: 1 },
  to:   { opacity: 0 },
})

const contentHide = keyframes({
  from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  to:   { opacity: 0, transform: 'translate(-50%, -52%) scale(0.96)' },
})

// ─── Overlay ─────────────────────────────────────────────────────────────────

export const overlayStyle = style({
  position:        'fixed',
  inset:           0,
  backgroundColor: vars.color.surface.overlay,
  zIndex:          vars.zIndex.overlay,

  // Animations run only when the user has no motion preference.
  // data-state is driven by DialogPortal to enable enter and exit animations.
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      selectors: {
        '&[data-state="open"]': {
          animation: `${overlayShow} ${vars.duration.normal} ${vars.easing.enter}`,
        },
        '&[data-state="closed"]': {
          animation: `${overlayHide} ${vars.duration.normal} ${vars.easing.exit} forwards`,
        },
      },
    },
  },
})

// ─── Content panel ────────────────────────────────────────────────────────────

export const contentStyle = style({
  position:         'fixed',
  insetBlockStart:  '50%',
  insetInlineStart: '50%',
  transform:        'translate(-50%, -50%)',
  zIndex:           vars.zIndex.modal,

  inlineSize:    '90vw',
  maxInlineSize: '520px',
  maxBlockSize:  '85vh',
  overflow:      'auto',

  backgroundColor: vars.color.surface.default,
  borderRadius:    vars.borderRadius.xl,
  boxShadow:       vars.shadow.lg,
  padding:         vars.spacing.xl,

  selectors: {
    '&:focus-visible': {
      outline:       `2px solid ${vars.color.border.focus}`,
      outlineOffset: '2px',
    },
  },

  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      selectors: {
        '&[data-state="open"]': {
          animation: `${contentShow} ${vars.duration.normal} ${vars.easing.enter}`,
        },
        '&[data-state="closed"]': {
          animation: `${contentHide} ${vars.duration.normal} ${vars.easing.exit} forwards`,
        },
      },
    },
  },
})

// ─── Header ───────────────────────────────────────────────────────────────────

export const headerStyle = style({
  display:        'flex',
  alignItems:     'flex-start',
  justifyContent: 'space-between',
  gap:            vars.spacing.md,
  marginBlockEnd: vars.spacing.md,
})

// ─── Title ────────────────────────────────────────────────────────────────────

export const titleStyle = style({
  fontFamily:  vars.fontFamily.sans,
  fontSize:    vars.fontSize.title3,
  fontWeight:  vars.fontWeight.semibold,
  lineHeight:  vars.lineHeight.title3,
  color:       vars.color.text.primary,
  margin:      0,
})

// ─── Description ─────────────────────────────────────────────────────────────

export const descriptionStyle = style({
  fontFamily:       vars.fontFamily.sans,
  fontSize:         vars.fontSize.body,
  lineHeight:       vars.lineHeight.body,
  letterSpacing:    vars.letterSpacing.body,
  color:            vars.color.text.secondary,
  marginBlockStart: vars.spacing.xs,
  marginBlockEnd:   vars.spacing.lg,
})

// ─── Footer ───────────────────────────────────────────────────────────────────

export const footerStyle = style({
  display:          'flex',
  justifyContent:   'flex-end',
  gap:              vars.spacing.sm,
  marginBlockStart: vars.spacing.xl,
})

// ─── Close button ─────────────────────────────────────────────────────────────

export const closeButtonStyle = style({
  display:         'inline-flex',
  alignItems:      'center',
  justifyContent:  'center',
  flexShrink:      0,
  width:           '2rem',
  height:          '2rem',
  borderRadius:    vars.borderRadius.md,
  border:          'none',
  backgroundColor: 'transparent',
  color:           vars.color.text.secondary,
  cursor:          'pointer',
  transition:      `background-color ${vars.duration.fast} ${vars.easing.inPlace}`,

  selectors: {
    '&:focus-visible': {
      outline:       `2px solid ${vars.color.border.focus}`,
      outlineOffset: '2px',
    },
  },

  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover': {
          backgroundColor: vars.color.background.secondary,
          color:           vars.color.text.primary,
        },
      },
    },
  },
})
