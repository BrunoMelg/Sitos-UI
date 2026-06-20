import type { HTMLAttributes, Key, ReactNode } from 'react'

export interface MenuRootProps {
  /** Called when a menu item is selected. */
  onAction?: (key: Key) => void
  children: ReactNode
}

export interface MenuTriggerProps {
  children: ReactNode
}

export interface MenuContentProps extends HTMLAttributes<HTMLUListElement> {
  /** Accessible label for the menu. */
  'aria-label'?: string
  children: ReactNode
}

export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Unique key identifying this item. Passed to onAction. */
  id: string
  isDisabled?: boolean
  /** Renders the item in a destructive style (e.g. Delete action). */
  isDestructive?: boolean
  children: ReactNode
}

export interface MenuSeparatorProps extends HTMLAttributes<HTMLLIElement> {}
