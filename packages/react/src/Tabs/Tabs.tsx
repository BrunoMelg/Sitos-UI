'use client'

import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { tabsRootStyle, tabsListStyle, tabRecipe, tabsPanelStyle } from './Tabs.css'
import type { TabsListProps, TabsPanelProps, TabsRootProps, TabsTabProps } from './Tabs.types'

// ─── Context ──────────────────────────────────────────────────────────────────

interface TabsContextValue {
  selectedKey:     string | undefined
  setSelectedKey:  (key: string) => void
  isControlled:    boolean
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs sub-components must be used inside <Tabs.Root>.')
  return ctx
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function TabsRoot({
  defaultSelectedKey,
  selectedKey: controlledKey,
  onSelectionChange,
  children,
  className,
}: TabsRootProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultSelectedKey)
  const isControlled = controlledKey !== undefined
  const selectedKey  = isControlled ? controlledKey : uncontrolled

  const setSelectedKey = useCallback(
    (key: string) => {
      if (!isControlled) setUncontrolled(key)
      onSelectionChange?.(key)
    },
    [isControlled, onSelectionChange],
  )

  return (
    <TabsContext.Provider value={{ selectedKey, setSelectedKey, isControlled }}>
      <div className={[tabsRootStyle, className].filter(Boolean).join(' ')}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

// ─── List ─────────────────────────────────────────────────────────────────────

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList({ children, className, ...rest }, ref) {
    const listRef = ref ?? useRef<HTMLDivElement>(null)

    // Collect enabled tab IDs for arrow-key navigation
    const tabIds = Children.toArray(children)
      .filter((child): child is React.ReactElement<TabsTabProps> =>
        isValidElement(child) && !child.props.isDisabled,
      )
      .map(child => child.props.id)

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const el = (typeof listRef === 'object' ? listRef?.current : null)
        if (!el) return

        const active = document.activeElement as HTMLElement | null
        const idx = tabIds.findIndex(id => active?.id === id)

        let next = -1
        if (e.key === 'ArrowRight') next = (idx + 1) % tabIds.length
        if (e.key === 'ArrowLeft')  next = (idx - 1 + tabIds.length) % tabIds.length
        if (e.key === 'Home')       next = 0
        if (e.key === 'End')        next = tabIds.length - 1

        if (next !== -1) {
          e.preventDefault()
          const target = el.querySelector<HTMLElement>(`#${tabIds[next]}`)
          target?.focus()
        }
      },
      [tabIds],
    )

    return (
      <div
        ref={listRef as React.RefObject<HTMLDivElement>}
        role="tablist"
        className={[tabsListStyle, className].filter(Boolean).join(' ')}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

// ─── Tab ──────────────────────────────────────────────────────────────────────

const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(
  function TabsTab({ id, isDisabled = false, children, className, onClick, ...rest }, ref) {
    const { selectedKey, setSelectedKey } = useTabsContext()
    const isSelected = selectedKey === id

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={`panel-${id}`}
        aria-disabled={isDisabled || undefined}
        tabIndex={isSelected ? 0 : -1}
        className={[tabRecipe({ isSelected, isDisabled }), className].filter(Boolean).join(' ')}
        onClick={(e) => {
          if (!isDisabled) {
            setSelectedKey(id)
            onClick?.(e)
          }
        }}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

// ─── Panel ────────────────────────────────────────────────────────────────────

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  function TabsPanel({ id, children, className, ...rest }, ref) {
    const { selectedKey } = useTabsContext()
    if (selectedKey !== id) return null

    return (
      <div
        ref={ref}
        id={`panel-${id}`}
        role="tabpanel"
        aria-labelledby={id}
        tabIndex={0}
        className={[tabsPanelStyle, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

// ─── Compound export ──────────────────────────────────────────────────────────

export const Tabs = {
  Root:  TabsRoot,
  List:  TabsList,
  Tab:   TabsTab,
  Panel: TabsPanel,
}
