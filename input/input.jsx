import React from 'react'
import { cn } from '@bem-react/classname'
import t from 'prop-types'
import './input.scss'

const Types = {
  text: 'text',
  password: 'password',
}

const input = cn('Input')

export const Input = p => {
  const { value, onChange, placeholder, type, ...mods } = p

  return (
    <input
      className={input({ ...mods })}
      value={value}
      onChange={e => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      disabled={mods.disabled}
    />
  )
}

Input.propTypes = {
  value: t.string.isRequired,
  onChange: t.func.isRequired,

  required: t.bool,
  optional: t.bool,
  disabled: t.bool,

  type: t.oneOf(Object.values(Types)),
  placeholder: t.string,
}

Input.defaultProps = {
  required: false,
  optional: true,
  disabled: false,
  placeholder: 'Hint text',
}
