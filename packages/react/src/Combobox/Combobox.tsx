'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react'
import {
  comboboxEmptyStyle,
  comboboxFieldStyle,
  comboboxInputStyle,
  comboboxLabelStyle,
  comboboxListboxStyle,
  comboboxOptionRecipe,
  comboboxRootStyle,
  comboboxTriggerStyle,
  comboboxWrapperStyle,
} from './Combobox.css'
import type { ComboboxItem, ComboboxProps } from './Combobox.types'

// ─── Chevron icon ─────────────────────────────────────────────────────────────

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{ transition: 'transform 150ms ease', transform: open ? 'rotate(180deg)' : 'none' }}
    >
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Combobox ─────────────────────────────────────────────────────────────────

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  function Combobox(
    {
      label,
      placeholder,
      items,
      selectedKey: controlledKey,
      defaultSelectedKey,
      onSelectionChange,
      inputValue: controlledInput,
      onInputChange,
      isDisabled = false,
      isRequired = false,
      className,
      ...rest
    },
    ref,
  ) {
    const inputId   = useId()
    const listboxId = useId()
    const optionIdPrefix = useId()

    const isControlled = controlledKey !== undefined

    // Selection state
    const [internalKey, setInternalKey] = useState<string | null>(defaultSelectedKey ?? null)
    const selectedKey = isControlled ? (controlledKey ?? null) : internalKey

    // Input state
    const isInputControlled = controlledInput !== undefined
    const [internalInput, setInternalInput] = useState(() => {
      const initKey = defaultSelectedKey ?? controlledKey ?? null
      return initKey ? (items.find(i => i.id === initKey)?.label ?? '') : ''
    })
    const inputValue = isInputControlled ? (controlledInput ?? '') : internalInput

    // Open/focus state
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number>(-1)

    const inputRef = useRef<HTMLInputElement>(null)
    const listRef  = useRef<HTMLUListElement>(null)

    // Filtered items
    const filteredItems = items.filter(item =>
      item.label.toLowerCase().includes(inputValue.toLowerCase()),
    )

    // ── Helpers ───────────────────────────────────────────────────────────────

    const updateInput = useCallback(
      (value: string) => {
        if (!isInputControlled) setInternalInput(value)
        onInputChange?.(value)
      },
      [isInputControlled, onInputChange],
    )

    const selectItem = useCallback(
      (item: ComboboxItem) => {
        if (item.isDisabled) return
        if (!isControlled) setInternalKey(item.id)
        updateInput(item.label)
        onSelectionChange?.(item.id)
        setIsOpen(false)
        setActiveIndex(-1)
      },
      [isControlled, updateInput, onSelectionChange],
    )

    const clearSelection = useCallback(() => {
      if (!isControlled) setInternalKey(null)
      updateInput('')
      onSelectionChange?.(null)
    }, [isControlled, updateInput, onSelectionChange])

    // ── Open/close ────────────────────────────────────────────────────────────

    const open = useCallback(() => {
      if (isDisabled) return
      setIsOpen(true)
      setActiveIndex(-1)
    }, [isDisabled])

    const close = useCallback(() => {
      setIsOpen(false)
      setActiveIndex(-1)
      // Restore input to selected label (or clear if nothing selected)
      const label = selectedKey ? (items.find(i => i.id === selectedKey)?.label ?? '') : ''
      updateInput(label)
    }, [selectedKey, items, updateInput])

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return
      function handleClick(e: MouseEvent) {
        const root = inputRef.current?.closest('[data-combobox-root]')
        if (!root?.contains(e.target as Node)) close()
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [isOpen, close])

    // ── Keyboard ──────────────────────────────────────────────────────────────

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        const enabled = filteredItems.filter(i => !i.isDisabled)

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            if (!isOpen) { open(); return }
            setActiveIndex(i => (i + 1) % enabled.length)
            break
          case 'ArrowUp':
            e.preventDefault()
            if (!isOpen) { open(); return }
            setActiveIndex(i => (i - 1 + enabled.length) % enabled.length)
            break
          case 'Enter':
            e.preventDefault()
            if (isOpen && activeIndex >= 0) {
              selectItem(enabled[activeIndex])
            }
            break
          case 'Escape':
            e.preventDefault()
            if (isOpen) close()
            else clearSelection()
            break
          case 'Tab':
            if (isOpen) close()
            break
        }
      },
      [filteredItems, isOpen, activeIndex, open, close, selectItem, clearSelection],
    )

    // ── Input change ──────────────────────────────────────────────────────────

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        updateInput(value)
        if (!isControlled) setInternalKey(null)
        onSelectionChange?.(null)
        setIsOpen(true)
        setActiveIndex(-1)
      },
      [updateInput, isControlled, onSelectionChange],
    )

    // ── Active descendant id ──────────────────────────────────────────────────

    const enabled = filteredItems.filter(i => !i.isDisabled)
    const activeDescendant =
      isOpen && activeIndex >= 0
        ? `${optionIdPrefix}-${enabled[activeIndex]?.id}`
        : undefined

    // ── Render ────────────────────────────────────────────────────────────────

    return (
      <div
        ref={ref}
        className={[comboboxRootStyle, className].filter(Boolean).join(' ')}
        data-combobox-root
        {...rest}
      >
        {label && (
          <label htmlFor={inputId} className={comboboxLabelStyle}>
            {label}
            {isRequired && <span aria-hidden="true" style={{ color: 'inherit', marginInlineStart: '2px' }}>*</span>}
          </label>
        )}

        <div className={comboboxWrapperStyle}>
          <div
            className={comboboxFieldStyle}
            data-disabled={isDisabled || undefined}
          >
            <input
              ref={inputRef}
              id={inputId}
              role="combobox"
              aria-expanded={isOpen}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={activeDescendant}
              aria-required={isRequired || undefined}
              autoComplete="off"
              spellCheck={false}
              placeholder={placeholder}
              value={inputValue}
              disabled={isDisabled}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (!isOpen) open() }}
              className={comboboxInputStyle}
            />
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              disabled={isDisabled}
              className={comboboxTriggerStyle}
              onClick={() => (isOpen ? close() : open())}
            >
              <ChevronDownIcon open={isOpen} />
            </button>
          </div>

          {isOpen && (
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label={label ?? placeholder ?? 'Options'}
              className={comboboxListboxStyle}
            >
              {filteredItems.length === 0 ? (
                <li className={comboboxEmptyStyle} aria-live="polite">
                  No results
                </li>
              ) : (
                filteredItems.map(item => {
                  const isSelected  = item.id === selectedKey
                  const isEnabledIdx = enabled.findIndex(e => e.id === item.id)
                  const isFocused   = !item.isDisabled && isEnabledIdx === activeIndex
                  return (
                    <li
                      key={item.id}
                      id={`${optionIdPrefix}-${item.id}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={item.isDisabled || undefined}
                      className={comboboxOptionRecipe({ isFocused, isSelected, isDisabled: item.isDisabled })}
                      onMouseDown={e => {
                        e.preventDefault() // keep input focused
                        if (!item.isDisabled) selectItem(item)
                      }}
                      onMouseEnter={() => {
                        if (!item.isDisabled) setActiveIndex(isEnabledIdx)
                      }}
                    >
                      {item.label}
                    </li>
                  )
                })
              )}
            </ul>
          )}
        </div>
      </div>
    )
  },
)
