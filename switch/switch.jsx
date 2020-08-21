import React, { useRef } from 'react'
import { cn } from '@bem-react/classname'
import t from 'prop-types'
import './switch.scss'

export const Switch = ({
  checked,
  onChange,
  size,
  title,
  disabled,
  ...attrs
}) => {
  const ref = useRef();
  const switchClasses = cn('Switch')({ disabled })
  const wrapperClasses = cn('Switch', 'wrapper')()
  const titleClasses = cn('Switch', 'title')({ disabled })

  return (
    <span className={wrapperClasses} {...attrs}>
      <span style={{ fontSize: size, lineHeight: '10px' }}>
        <input
          type="checkbox"
          className={switchClasses}
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={disabled}
          ref={ref}
        />
        <label onClick={() => ref.current.click()}/>
      </span>
      {title && <span className={titleClasses}>{title}</span>}
    </span>
  )
}

Switch.propTypes = {
  /**
   * The height of the switch, can be passed any valid css size
   */
  size: t.oneOfType([t.string, t.number]),

  /**
   * Is switch checked
   */
  checked: t.bool,

  /**
   * Callback which triggers when value changes
   */
  onChange: t.func.isRequired,

  /**
   * Displayed title
   */
  title: t.string,

  /**
   * Is component disabled
   */
  disabled: t.bool,
}

Switch.defaultProps = {
  size: '1em',
  checked: false,
  disabled: false,
}
