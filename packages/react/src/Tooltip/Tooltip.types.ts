import type { ReactElement, ReactNode } from 'react'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  /** The tooltip label. */
  content: ReactNode
  /**
   * The element that triggers the tooltip. Must be a single focusable element.
   * The tooltip is linked via aria-describedby — no need to add the id manually.
   */
  children: ReactElement
  /** Delay before the tooltip appears on hover, in milliseconds. Default: 1000. */
  delay?: number
  /** Preferred placement relative to the trigger. Default: 'top'. */
  placement?: TooltipPlacement
}

export interface TooltipPanelProps {
  children: ReactNode
  placement: TooltipPlacement
  // React Aria tooltip props passed from useTooltipTrigger
  id?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}
