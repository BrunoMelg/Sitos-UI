import type { HTMLAttributes, ReactNode } from 'react'

export interface TabsRootProps {
  /** The key of the initially selected tab (uncontrolled). */
  defaultSelectedKey?: string
  /** The key of the selected tab (controlled). */
  selectedKey?: string
  onSelectionChange?: (key: string) => void
  children: ReactNode
  className?: string
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the tablist. Required when there is no visible heading above it. */
  'aria-label'?: string
  children: ReactNode
}

export interface TabsTabProps extends HTMLAttributes<HTMLButtonElement> {
  /** Unique key identifying this tab. Connects it to the corresponding TabsPanel. */
  id: string
  isDisabled?: boolean
  children: ReactNode
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Must match the id of the corresponding TabsTab. */
  id: string
  children: ReactNode
}
