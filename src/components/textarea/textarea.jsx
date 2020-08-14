import React, { useEffect } from 'react'
import { cn } from '@bem-react/classname'
import t from 'prop-types'
import './textarea.scss'

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
    ...attrs
  } = p
  const areaClasses = cn('TextArea')({
    resize: resizing,
    required,
    optional,
    readonly,
    disabled,
  })

  console.log(areaClasses)
  return (
    <textarea
      className={areaClasses}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      required={required}
      readOnly={readonly}
      disabled={disabled}
      {...attrs}></textarea>
  )
}

TextArea.propTypes = {
  value: t.string.isRequired,
  onChange: t.func.isRequired,
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
