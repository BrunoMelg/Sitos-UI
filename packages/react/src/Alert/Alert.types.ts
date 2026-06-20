import type { HTMLAttributes, ReactNode } from 'react'

export type AlertIntent = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  intent: AlertIntent
  /** Bold title line. Optional — description alone is valid. */
  title?: string
  /** Description content. */
  children?: ReactNode
  /**
   * When provided, renders a close button.
   * The consumer controls visibility via this callback (e.g. setVisible(false)).
   */
  onDismiss?: () => void
  /** Override the default intent icon. Pass null to suppress the icon entirely. */
  icon?: ReactNode | null
}
