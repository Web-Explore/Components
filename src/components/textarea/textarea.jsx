import React, { useEffect } from 'react'
import { cn, classNames } from '@bem-react/classname'
import t from 'prop-types'
import './textarea.scss'

/**
 * Concat generated BEM styles with user defined
 * @param {string} bem
 * @param {string} custom
 */
const concatClasses = (bem, custom) => (custom || '') + ' ' + bem

const resizeTypes = ['both', 'horizontal', 'vertical', 'lock']

export const TextArea = p => {
  const {
    value,
    onChange,
    placeholder,
    resizing,
    required,
    optional,
    readonly,
    disabled,
    className,
    ...attrs
  } = p

  const areaClasses = cn('TextArea')(
    {
      resize: resizing,
      required,
      optional,
      readonly,
      disabled,
    },
    (className || '').split(' ')
  )

  return (
    <textarea
      className={areaClasses}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange != null && onChange(e.target.value)}
      required={required}
      readOnly={readonly}
      disabled={disabled}
      {...attrs}></textarea>
  )
}

TextArea.propTypes = {
  value: t.string.isRequired,
  onChange: t.func,
  placeholder: t.string,

  resizing: t.oneOf(resizeTypes),
  required: t.bool,
  optional: t.bool,
  readonly: t.bool,
  disabled: t.bool,
}

TextArea.defaultProps = {
  value: '',
  resizing: 'both',
  required: false,
  readonly: false,
  optional: true,
  disabled: false,
}
