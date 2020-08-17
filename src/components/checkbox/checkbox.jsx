import React, { useRef } from 'react'
import { cn } from '@bem-react/classname'
import t from 'prop-types'
import './_variants/index.scss'

const variants = ['checkbox', 'toggle', 'radio']

export const Checkbox = ({
  value,
  onChange,
  variant,
  size,
  title,
  disabled,
  ...attrs
}) => {
  const ref = useRef()
  const checkboxClasses = cn('Checkbox')({ variant, disabled })
  const wrapperClasses = cn('Checkbox', 'wrapper')()
  const titleClasses = cn('Checkbox', 'title')({ disabled })

  return (
    <span className={wrapperClasses} {...attrs}>
      <span style={{ fontSize: size, lineHeight: '10px' }}>
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
      {title && <span className={titleClasses}>{title}</span>}
    </span>
  )
}

Checkbox.propTypes = {
  /**
   * The height of the checkbox, can be passed any valid css size
   */
  size: t.oneOfType([t.string, t.number]),

  /**
   * Is checkbox checked
   */
  value: t.bool,

  /**
   * Callback which triggers when value changes
   */
  onChange: t.func.isRequired,

  /**
   * Displayed title
   */
  title: t.string,

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
  size: '1em',
  value: false,
  variant: 'checkbox',
  disabled: false,
}
