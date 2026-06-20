import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@orchard-ui/tokens'

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(2px)' },
  to:   { opacity: 1, transform: 'translateY(0)' },
})

export const tooltipWrapperStyle = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
})

export const tooltipContentStyle = style({
  position: 'absolute',
  zIndex: vars.zIndex.popover,
  // Center horizontally over the trigger
  left: '50%',
  transform: 'translateX(-50%)',

  // Visual appearance
  backgroundColor: vars.color.text.primary,
  color: vars.color.text.inverse,
  fontSize: vars.fontSize.caption1,
  lineHeight: vars.lineHeight.caption1,
  fontFamily: vars.fontFamily.sans,
  fontWeight: vars.fontWeight.medium,
  paddingBlock: vars.spacing['2xs'],
  paddingInline: vars.spacing.xs,
  borderRadius: vars.borderRadius.md,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  maxWidth: '240px',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',

  // Placement via data attribute
  selectors: {
    '&[data-placement="top"]':    { bottom: `calc(100% + ${vars.spacing.xs})` },
    '&[data-placement="bottom"]': { top:    `calc(100% + ${vars.spacing.xs})` },
    '&[data-placement="left"]': {
      top:       '50%',
      left:      'auto',
      right:     `calc(100% + ${vars.spacing.xs})`,
      transform: 'translateY(-50%)',
    },
    '&[data-placement="right"]': {
      top:       '50%',
      left:      `calc(100% + ${vars.spacing.xs})`,
      transform: 'translateY(-50%)',
    },
  },

  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${fadeIn} ${vars.duration.fast} ${vars.easing.enter}`,
    },
  },
})
