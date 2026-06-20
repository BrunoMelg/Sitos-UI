import type { HTMLAttributes } from 'react'

export interface TagSelectItem {
  id: string
  label: string
  isDisabled?: boolean
}

export interface TagSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Visible label rendered above the field. */
  label?: string
  /** Placeholder shown when nothing is selected and input is empty. */
  placeholder?: string
  /** The full list of options. */
  items: TagSelectItem[]
  /** Controlled selection. */
  selectedKeys?: string[]
  /** Uncontrolled default selection. */
  defaultSelectedKeys?: string[]
  /** Called with the full updated array of selected keys. */
  onSelectionChange?: (keys: string[]) => void
  isDisabled?: boolean
  isRequired?: boolean
  /** Max number of items that may be selected. */
  maxSelections?: number
}
