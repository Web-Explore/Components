import React from 'react'
import { cn } from '@bem-react/classname'
import t from 'prop-types'
import './button.scss'

const button = cn('Button')

export const Button = props => {
  return (
    <button
      data-testid="button"
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className={button({ disabled: props.disabled })}>
      <div data-testid="button__icon" className={'Icon'}>
        {props.icon}
      </div>
      <div data-testid="button__text" className={'Text'}>
        {props.text}
      </div>
    </button>
  )
}

Button.propTypes = {
  text: t.string,
  icon: t.arrayOf(t.string),
  onClick: t.func.isRequired,
  disabled: t.bool,
}

Button.defaultProps = {
  required: false,
  optional: true,
  disabled: false,
  text: 'Click Me!',
}
