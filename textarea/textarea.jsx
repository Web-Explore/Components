import React, { useEffect } from 'react'
import { cn, classNames } from '@bem-react/classname'
import t from 'prop-types'
import './textarea.scss'

/**
 * Throws error when required prop was undefined, but prop was missed.
 * @param {t.Validator} propType
 * @param {t.string} required
 */
const onPropUndefined = (propType, required) => (
  props,
  propName,
  componentName,
  ...other
) => {
  if (props[required] != undefined && props[propName] == null)
    return new Error(
      `Prop '${propName}' of component '${componentName}' ` +
        `was not provided when prop '${required}' was passed.`
    )
  return propType(props, propName, componentName, ...other)
}

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
  onChange: onPropUndefined(t.func, 'readonly'),
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
