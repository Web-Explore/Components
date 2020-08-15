import React from 'react'
import { cn } from '@bem-react/classname'
import t from 'prop-types'
import './link.scss'

export const Link = ({
  href,
  title,
  visited,
  disabled,
  as,
  onClick,
  className,
  ...attrs
}) => {
  const linkClasses = cn('Link')({ visited }, (className || '').split(' '))
  const Component = as || (href ? 'a' : 'span')

  return (
    <Component
      className={linkClasses}
      href={href}
      onClick={e => onClick && onClick(e.target.value)}
      disabled={disabled}
      {...attrs}>
      {title || href}
    </Component>
  )
}

Link.propTypes = {
  href: t.string,
  title: t.string,
  visited: t.bool,
  disabled: t.bool,
  as: t.element,
  onClick: t.func,
  className: t.string,
}

Link.defaultProps = {
  visited: false,
}
