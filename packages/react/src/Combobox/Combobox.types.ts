import type { HTMLAttributes } from 'react'

export interface ComboboxItem {
  id: string
  label: string
  isDisabled?: boolean
}

export interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Visible label rendered above the input. */
  label?: string
  /** Input placeholder text. */
  placeholder?: string
  /** The list of options. */
  items: ComboboxItem[]
  /** Controlled selected key. */
  selectedKey?: string | null
  /** Uncontrolled default selection. */
  defaultSelectedKey?: string
  /** Called when the selection changes. */
  onSelectionChange?: (key: string | null) => void
  /** Controlled input value (for async filtering). */
  inputValue?: string
  /** Called when the input text changes. */
  onInputChange?: (value: string) => void
  isDisabled?: boolean
  isRequired?: boolean
}
