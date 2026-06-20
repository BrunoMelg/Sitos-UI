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
  checkIconStyle,
  tagLabelStyle,
  tagRemoveStyle,
  tagSelectEmptyStyle,
  tagSelectFieldStyle,
  tagSelectInputStyle,
  tagSelectLabelStyle,
  tagSelectListboxStyle,
  tagSelectOptionRecipe,
  tagSelectRootStyle,
  tagSelectWrapperStyle,
  tagStyle,
} from './TagSelect.css'
import type { TagSelectItem, TagSelectProps } from './TagSelect.types'

// ─── Icons ────────────────────────────────────────────────────────────────────

function XSmallIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={checkIconStyle}>
      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── TagSelect ────────────────────────────────────────────────────────────────

export const TagSelect = forwardRef<HTMLDivElement, TagSelectProps>(
  function TagSelect(
    {
      label,
      placeholder,
      items,
      selectedKeys: controlledKeys,
      defaultSelectedKeys,
      onSelectionChange,
      isDisabled = false,
      isRequired = false,
      maxSelections,
      className,
      ...rest
    },
    ref,
  ) {
    const inputId        = useId()
    const listboxId      = useId()
    const optionIdPrefix = useId()

    const isControlled = controlledKeys !== undefined

    const [internalKeys, setInternalKeys] = useState<string[]>(defaultSelectedKeys ?? [])
    const selectedKeys = isControlled ? (controlledKeys ?? []) : internalKeys

    const [inputValue, setInputValue] = useState('')
    const [isOpen, setIsOpen]         = useState(false)
    const [activeIndex, setActiveIndex] = useState<number>(-1)

    const inputRef    = useRef<HTMLInputElement>(null)
    const fieldRef    = useRef<HTMLDivElement>(null)

    const atMaxCapacity = maxSelections !== undefined && selectedKeys.length >= maxSelections

    // Items not yet selected
    const filteredItems = items.filter(item => {
      const matchesFilter = item.label.toLowerCase().includes(inputValue.toLowerCase())
      return matchesFilter
    })

    const enabledVisible = filteredItems.filter(i => !i.isDisabled && !selectedKeys.includes(i.id))

    // ── Selection helpers ─────────────────────────────────────────────────────

    const addKey = useCallback(
      (id: string) => {
        if (atMaxCapacity) return
        const next = [...selectedKeys, id]
        if (!isControlled) setInternalKeys(next)
        onSelectionChange?.(next)
      },
      [selectedKeys, isControlled, onSelectionChange, atMaxCapacity],
    )

    const removeKey = useCallback(
      (id: string) => {
        const next = selectedKeys.filter(k => k !== id)
        if (!isControlled) setInternalKeys(next)
        onSelectionChange?.(next)
      },
      [selectedKeys, isControlled, onSelectionChange],
    )

    const selectItem = useCallback(
      (item: TagSelectItem) => {
        if (item.isDisabled || atMaxCapacity) return
        if (selectedKeys.includes(item.id)) {
          removeKey(item.id)
        } else {
          addKey(item.id)
        }
        setInputValue('')
        setActiveIndex(-1)
        inputRef.current?.focus()
      },
      [selectedKeys, addKey, removeKey, atMaxCapacity],
    )

    // ── Open/close ────────────────────────────────────────────────────────────

    const open  = useCallback(() => { if (!isDisabled) setIsOpen(true) }, [isDisabled])
    const close = useCallback(() => { setIsOpen(false); setActiveIndex(-1) }, [])

    useEffect(() => {
      if (!isOpen) return
      function handleClick(e: MouseEvent) {
        if (!fieldRef.current?.closest('[data-tag-select-root]')?.contains(e.target as Node)) {
          close()
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [isOpen, close])

    // ── Keyboard ──────────────────────────────────────────────────────────────

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            if (!isOpen) { open(); return }
            setActiveIndex(i => (i + 1) % enabledVisible.length)
            break
          case 'ArrowUp':
            e.preventDefault()
            if (!isOpen) { open(); return }
            setActiveIndex(i => (i - 1 + enabledVisible.length) % enabledVisible.length)
            break
          case 'Enter':
            e.preventDefault()
            if (isOpen && activeIndex >= 0 && enabledVisible[activeIndex]) {
              selectItem(enabledVisible[activeIndex])
            }
            break
          case 'Escape':
            e.preventDefault()
            close()
            break
          case 'Backspace':
            if (inputValue === '' && selectedKeys.length > 0) {
              removeKey(selectedKeys[selectedKeys.length - 1])
            }
            break
          case 'Tab':
            if (isOpen) close()
            break
        }
      },
      [isOpen, activeIndex, enabledVisible, inputValue, selectedKeys, open, close, selectItem, removeKey],
    )

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      setIsOpen(true)
      setActiveIndex(-1)
    }, [])

    // ── Active descendant ─────────────────────────────────────────────────────

    const activeDescendant =
      isOpen && activeIndex >= 0
        ? `${optionIdPrefix}-${enabledVisible[activeIndex]?.id}`
        : undefined

    // ── Render ────────────────────────────────────────────────────────────────

    const showPlaceholder = selectedKeys.length === 0 && inputValue === ''

    return (
      <div
        ref={ref}
        className={[tagSelectRootStyle, className].filter(Boolean).join(' ')}
        data-tag-select-root
        {...rest}
      >
        {label && (
          <label htmlFor={inputId} className={tagSelectLabelStyle}>
            {label}
            {isRequired && <span aria-hidden="true" style={{ marginInlineStart: '2px' }}>*</span>}
          </label>
        )}

        <div className={tagSelectWrapperStyle}>
          <div
            ref={fieldRef}
            className={tagSelectFieldStyle}
            data-disabled={isDisabled || undefined}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Selected tags */}
            {selectedKeys.map(key => {
              const item = items.find(i => i.id === key)
              if (!item) return null
              return (
                <span key={key} className={tagStyle}>
                  <span className={tagLabelStyle}>{item.label}</span>
                  {!isDisabled && (
                    <button
                      type="button"
                      className={tagRemoveStyle}
                      aria-label={`Remove ${item.label}`}
                      onClick={e => { e.stopPropagation(); removeKey(key) }}
                    >
                      <XSmallIcon />
                    </button>
                  )}
                </span>
              )
            })}

            {/* Input */}
            {(!atMaxCapacity || inputValue) && (
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
                placeholder={showPlaceholder ? placeholder : undefined}
                value={inputValue}
                disabled={isDisabled}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (!isOpen) open() }}
                className={tagSelectInputStyle}
              />
            )}
          </div>

          {isOpen && (
            <ul
              id={listboxId}
              role="listbox"
              aria-label={label ?? placeholder ?? 'Options'}
              aria-multiselectable="true"
              className={tagSelectListboxStyle}
            >
              {filteredItems.length === 0 ? (
                <li className={tagSelectEmptyStyle}>No results</li>
              ) : (
                filteredItems.map(item => {
                  const isSelected  = selectedKeys.includes(item.id)
                  const enabledIdx  = enabledVisible.findIndex(e => e.id === item.id)
                  const isFocused   = !item.isDisabled && enabledIdx === activeIndex
                  const isAtMax     = atMaxCapacity && !isSelected

                  return (
                    <li
                      key={item.id}
                      id={`${optionIdPrefix}-${item.id}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={item.isDisabled || isAtMax || undefined}
                      className={tagSelectOptionRecipe({
                        isFocused,
                        isSelected,
                        isDisabled: item.isDisabled || isAtMax,
                      })}
                      onMouseDown={e => {
                        e.preventDefault()
                        if (!item.isDisabled && !isAtMax) selectItem(item)
                      }}
                      onMouseEnter={() => {
                        if (!item.isDisabled && !isAtMax) setActiveIndex(enabledIdx)
                      }}
                    >
                      {item.label}
                      {isSelected && <CheckIcon />}
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
