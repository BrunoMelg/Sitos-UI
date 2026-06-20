'use client'

import { forwardRef, useId } from 'react'
import {
  rootStyle,
  labelStyle,
  requiredMarkStyle,
  fieldRecipe,
  inputStyle,
  adornmentStyle,
  errorIconStyle,
  hintStyle,
  errorStyle,
} from './Input.css'
import type { InputProps } from './Input.types'

// Inline SVG kept local — avoids a dependency on an icon package.
// aria-hidden: the adjacent error text is the accessible description.
function ErrorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    intent: intentProp = 'neutral',
    label,
    hint,
    errorMessage,
    leadingElement,
    trailingElement,
    isDisabled  = false,
    isReadOnly  = false,
    isRequired  = false,
    className,
    id: idProp,
    ...rest
  },
  ref,
) {
  const autoId = useId()
  const id     = idProp ?? autoId
  const hintId = `${id}-hint`

  const intent      = errorMessage ? 'danger' : intentProp
  const description = errorMessage ?? hint

  // Error icon fills the trailing slot; explicit trailingElement takes precedence.
  const trailingContent = trailingElement ?? (errorMessage
    ? <span className={errorIconStyle}><ErrorIcon /></span>
    : null)

  return (
    <div className={rootStyle}>
      <label htmlFor={id} className={labelStyle}>
        {label}
        {isRequired && (
          <span className={requiredMarkStyle} aria-hidden="true">
            {' *'}
          </span>
        )}
      </label>

      <div
        className={fieldRecipe({ intent, isDisabled, isReadOnly })}
        data-invalid={errorMessage ? true : undefined}
        data-disabled={isDisabled || undefined}
        data-readonly={isReadOnly || undefined}
      >
        {leadingElement && (
          <span className={adornmentStyle} aria-hidden="true">
            {leadingElement}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          className={[inputStyle, className].filter(Boolean).join(' ')}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          aria-invalid={errorMessage ? true : undefined}
          aria-required={isRequired ? true : undefined}
          aria-readonly={isReadOnly ? true : undefined}
          aria-describedby={description ? hintId : undefined}
          {...rest}
        />

        {trailingContent && (
          <span className={adornmentStyle} aria-hidden="true">
            {trailingContent}
          </span>
        )}
      </div>

      {description && (
        <span
          id={hintId}
          className={errorMessage ? errorStyle : hintStyle}
          role={errorMessage ? 'alert' : undefined}
        >
          {description}
        </span>
      )}
    </div>
  )
})

Input.displayName = 'Input'
