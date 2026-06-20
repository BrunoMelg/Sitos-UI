import { forwardRef, useId } from 'react'
import {
  rootStyle,
  labelStyle,
  requiredMarkStyle,
  fieldRecipe,
  inputStyle,
  adornmentStyle,
  hintStyle,
  errorStyle,
} from './Input.css'
import type { InputProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    intent: intentProp = 'neutral',
    label,
    hint,
    errorMessage,
    leadingElement,
    trailingElement,
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    className,
    id: idProp,
    ...rest
  },
  ref,
) {
  const autoId = useId()
  const id = idProp ?? autoId
  const hintId = `${id}-hint`

  // Error message takes priority over intent prop
  const intent = errorMessage ? 'danger' : intentProp
  const description = errorMessage ?? hint

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
        className={fieldRecipe({ intent, isDisabled })}
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
          aria-describedby={description ? hintId : undefined}
          {...rest}
        />

        {trailingElement && (
          <span className={adornmentStyle} aria-hidden="true">
            {trailingElement}
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
