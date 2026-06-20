'use client'

import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type Key,
  type KeyboardEvent,
  type ReactElement,
} from 'react'
import { Slot } from '@orchard-ui/primitives'
import {
  menuContentStyle,
  menuItemRecipe,
  menuSeparatorStyle,
  menuWrapperStyle,
} from './Menu.css'
import type {
  MenuContentProps,
  MenuItemProps,
  MenuRootProps,
  MenuSeparatorProps,
  MenuTriggerProps,
} from './Menu.types'

// ─── Context ──────────────────────────────────────────────────────────────────

interface MenuContextValue {
  isOpen:      boolean
  open:        () => void
  close:       () => void
  onAction?:   (key: Key) => void
  triggerId:   string
  contentId:   string
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenuContext() {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error('Menu sub-components must be used inside <Menu.Root>.')
  return ctx
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function MenuRoot({ onAction, children }: MenuRootProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerId = useId()
  const contentId = useId()

  const open  = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <MenuContext.Provider value={{ isOpen, open, close, onAction, triggerId, contentId }}>
      <div className={menuWrapperStyle}>
        {children}
      </div>
    </MenuContext.Provider>
  )
}

// ─── Trigger ─────────────────────────────────────────────────────────────────

function MenuTrigger({ children }: MenuTriggerProps) {
  const { isOpen, open, close, triggerId, contentId } = useMenuContext()

  return (
    <Slot
      id={triggerId}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={isOpen ? contentId : undefined}
      onClick={() => (isOpen ? close() : open())}
    >
      {children}
    </Slot>
  )
}

// ─── Content ─────────────────────────────────────────────────────────────────
// Implements roving tabindex + type-ahead + Escape/outside-click close.

const MenuContent = forwardRef<HTMLUListElement, MenuContentProps>(
  function MenuContent({ children, className, ...rest }, ref) {
    const { isOpen, close, contentId, triggerId, onAction } = useMenuContext()
    const listRef = useRef<HTMLUListElement | null>(null)

    // Collect enabled item IDs for keyboard navigation
    const itemIds = Children.toArray(children)
      .filter(
        (child): child is ReactElement<MenuItemProps> =>
          isValidElement(child) &&
          'id' in child.props &&
          !child.props.isDisabled,
      )
      .map(child => child.props.id)

    // Focus first item on open
    useEffect(() => {
      if (!isOpen) return
      const timer = setTimeout(() => {
        const first = listRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled])')
        first?.focus()
      }, 0)
      return () => clearTimeout(timer)
    }, [isOpen])

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return
      function handleClick(e: MouseEvent) {
        if (!listRef.current?.contains(e.target as Node)) close()
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [isOpen, close])

    // Return focus to trigger on close
    useEffect(() => {
      if (isOpen) return
      document.getElementById(triggerId)?.focus()
    }, [isOpen, triggerId])

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLUListElement>) => {
        const active = document.activeElement as HTMLElement | null
        const idx = itemIds.findIndex(id => active?.getAttribute('data-item-id') === id)

        if (e.key === 'Escape') { e.preventDefault(); close(); return }
        if (e.key === 'Tab')    { e.preventDefault(); close(); return }

        let next = -1
        if (e.key === 'ArrowDown')  next = (idx + 1) % itemIds.length
        if (e.key === 'ArrowUp')    next = (idx - 1 + itemIds.length) % itemIds.length
        if (e.key === 'Home')       next = 0
        if (e.key === 'End')        next = itemIds.length - 1

        if (next !== -1) {
          e.preventDefault()
          listRef.current
            ?.querySelector<HTMLElement>(`[data-item-id="${itemIds[next]}"]`)
            ?.focus()
        }

        // Type-ahead: jump to first item starting with the pressed character
        if (e.key.length === 1) {
          const char = e.key.toLowerCase()
          const match = itemIds.find((id, i) => {
            if (i <= idx) return false
            const el = listRef.current?.querySelector<HTMLElement>(`[data-item-id="${id}"]`)
            return el?.textContent?.trimStart().toLowerCase().startsWith(char)
          }) ?? itemIds.find(id => {
            const el = listRef.current?.querySelector<HTMLElement>(`[data-item-id="${id}"]`)
            return el?.textContent?.trimStart().toLowerCase().startsWith(char)
          })
          if (match) {
            listRef.current?.querySelector<HTMLElement>(`[data-item-id="${match}"]`)?.focus()
          }
        }
      },
      [itemIds, close],
    )

    if (!isOpen) return null

    return (
      <ul
        ref={(node) => {
          (listRef as React.MutableRefObject<HTMLUListElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLUListElement | null>).current = node
        }}
        id={contentId}
        role="menu"
        aria-labelledby={triggerId}
        className={[menuContentStyle, className].filter(Boolean).join(' ')}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {Children.map(children, child =>
          isValidElement<MenuItemProps>(child) && 'id' in child.props
            ? cloneWithOnAction(child, onAction, close)
            : child,
        )}
      </ul>
    )
  },
)

function cloneWithOnAction(
  child: ReactElement<MenuItemProps>,
  onAction: ((key: Key) => void) | undefined,
  close: () => void,
) {
  const original = child.props.onClick
  return {
    ...child,
    props: {
      ...child.props,
      onClick: (e: React.MouseEvent<HTMLLIElement>) => {
        original?.(e)
        if (!child.props.isDisabled) {
          onAction?.(child.props.id)
          close()
        }
      },
    },
  }
}

// ─── Item ─────────────────────────────────────────────────────────────────────

const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  function MenuItem({ id, isDisabled, isDestructive, children, className, onClick, ...rest }, ref) {
    return (
      <li
        ref={ref}
        role="menuitem"
        data-item-id={id}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? undefined : -1}
        className={[menuItemRecipe({ isDisabled, isDestructive }), className].filter(Boolean).join(' ')}
        onClick={onClick}
        {...rest}
      >
        {children}
      </li>
    )
  },
)

// ─── Separator ────────────────────────────────────────────────────────────────

const MenuSeparator = forwardRef<HTMLLIElement, MenuSeparatorProps>(
  function MenuSeparator({ className, ...rest }, ref) {
    return (
      <li
        ref={ref}
        role="separator"
        className={[menuSeparatorStyle, className].filter(Boolean).join(' ')}
        {...rest}
      />
    )
  },
)

// ─── Compound export ──────────────────────────────────────────────────────────

export const Menu = {
  Root:      MenuRoot,
  Trigger:   MenuTrigger,
  Content:   MenuContent,
  Item:      MenuItem,
  Separator: MenuSeparator,
}
