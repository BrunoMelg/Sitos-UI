'use client'

import { cloneElement, useRef } from 'react'
import { useTooltip, useTooltipTrigger } from '@react-aria/tooltip'
import { useTooltipTriggerState } from '@react-stately/tooltip'
import { Slot } from '@orchard-ui/primitives'
import { tooltipWrapperStyle, tooltipContentStyle } from './Tooltip.css'
import type { TooltipPlacement, TooltipProps } from './Tooltip.types'

// ─── Tooltip panel ────────────────────────────────────────────────────────────
// Separate component so useTooltip can access the tooltip element's ref/props.

interface TooltipPanelProps {
  children: React.ReactNode
  placement: TooltipPlacement
  state: ReturnType<typeof useTooltipTriggerState>
  id?: string
}

function TooltipPanel({ children, placement, state, ...rest }: TooltipPanelProps) {
  const { tooltipProps } = useTooltip(rest, state)

  return (
    <span
      {...tooltipProps}
      data-placement={placement}
      className={tooltipContentStyle}
    >
      {children}
    </span>
  )
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

export function Tooltip({
  content,
  children,
  delay = 1000,
  placement = 'top',
}: TooltipProps) {
  const state      = useTooltipTriggerState({ delay })
  const triggerRef = useRef<HTMLElement>(null)

  const { triggerProps, tooltipProps: tooltipIdProps } = useTooltipTrigger(
    {},
    state,
    triggerRef,
  )

  // Slot merges triggerProps (onFocus, onBlur, onMouseEnter, etc.) with any
  // existing handlers on the child, and forwards the ref.
  return (
    <span className={tooltipWrapperStyle}>
      <Slot ref={triggerRef} {...triggerProps}>
        {children}
      </Slot>
      {state.isOpen && (
        <TooltipPanel placement={placement} state={state} {...tooltipIdProps}>
          {content}
        </TooltipPanel>
      )}
    </span>
  )
}

Tooltip.displayName = 'Tooltip'
