'use client'

import { forwardRef } from 'react'
import {
  alertRecipe,
  alertIconStyle,
  alertBodyStyle,
  alertTitleStyle,
  alertDescriptionStyle,
  alertDismissStyle,
} from './Alert.css'
import type { AlertIntent, AlertProps } from './Alert.types'

// ─── Default intent icons ─────────────────────────────────────────────────────

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0 6a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1zm0-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  </svg>
)

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm3.78 4.72a.75.75 0 0 0-1.06-1.06l-3.47 3.47-1.47-1.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4-4z" />
  </svg>
)

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 1 .9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
)

const DangerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-7a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1z" />
  </svg>
)

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
    <line x1="1" y1="1" x2="13" y2="13" />
    <line x1="13" y1="1" x2="1" y2="13" />
  </svg>
)

const DEFAULT_ICONS: Record<AlertIntent, React.ReactNode> = {
  info:    <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  danger:  <DangerIcon />,
}

// ─── Alert role: urgent intents use role="alert", others use role="status" ────
const ROLE_MAP: Record<AlertIntent, string> = {
  info:    'status',
  success: 'status',
  warning: 'alert',
  danger:  'alert',
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert({ intent, title, children, onDismiss, icon, className, ...rest }, ref) {
    const resolvedIcon = icon === undefined ? DEFAULT_ICONS[intent] : icon

    return (
      <div
        ref={ref}
        role={ROLE_MAP[intent]}
        aria-live={ROLE_MAP[intent] === 'status' ? 'polite' : undefined}
        aria-atomic="true"
        className={[alertRecipe({ intent }), className].filter(Boolean).join(' ')}
        {...rest}
      >
        {resolvedIcon !== null && (
          <span className={alertIconStyle}>{resolvedIcon}</span>
        )}

        <div className={alertBodyStyle}>
          {title && <p className={alertTitleStyle}>{title}</p>}
          {children && <p className={alertDescriptionStyle}>{children}</p>}
        </div>

        {onDismiss && (
          <button
            type="button"
            className={alertDismissStyle}
            aria-label="Dismiss"
            onClick={onDismiss}
          >
            <XIcon />
          </button>
        )}
      </div>
    )
  },
)

Alert.displayName = 'Alert'
