import React, { useRef } from 'react'
import { cn } from '@bem-react/classname'
import t from 'prop-types'
import './checkbox.scss'

const variants = ['checkbox', 'toggle', 'radio']

export const Checkbox = ({
  value,
  onChange,
  variant,
  size,
  label,
  disabled,
  ...attrs
}) => {
  const ref = useRef()
  const checkboxClasses = cn('Checkbox')({ variant, size, disabled })
  const wrapperClasses = cn('Checkbox', 'wrapper')()
  const labelClasses = cn('Checkbox', 'label')({ size, disabled })

  return (
    <span className={wrapperClasses} {...attrs}>
      <span>
        <input
          type="checkbox"
          className={checkboxClasses}
          checked={value}
          onChange={e => onChange(e.target.checked)}
          disabled={disabled}
          ref={ref}
        />
        <label onClick={() => ref.current.click()} />
      </span>
      {label && <span className={labelClasses}>{label}</span>}
    </span>
  )
}

Checkbox.propTypes = {
  /**
   * The height of the checkbox, can be passed any valid css size
   */
  size: t.oneOf(['xs', 's', 'm', 'l', 'xl']),

  /**
   * Is checkbox checked
   */
  value: t.bool,

  /**
   * Callback which triggers when value changes
   */
  onChange: t.func.isRequired,

  /**
   * Displayed label
   */
  label: t.string,

  /**
   * Visual representation of checkbox, can be _checkbox_, _toggle_ or _radio_
   */
  variant: t.oneOf(variants),
  /**
   * Is component disabled
   */
  disabled: t.bool,
}

Checkbox.defaultProps = {
  size: 'm',
  value: false,
  variant: 'checkbox',
  disabled: false,
}
