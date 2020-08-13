import React from 'react'
import { cn } from '@bem-react/classname'
import t from 'prop-types'
import './select.scss'
import { stringOrNumberType } from './interfaces'

const Option = ({ value, label, selected, disabled, onClick }) => {
  const inputRef = React.createRef()
  const optionClasses = cn('Select', 'option')({ selected, disabled })

  const onSelect = e => {
    e.stopPropagation()
    inputRef.current.checked = !selected
    onClick(value, !selected)
  }

  return (
    <div className={optionClasses} onClick={onSelect}>
      <input
        ref={inputRef}
        type="checkbox"
        readOnly
        checked={selected}
        disabled={disabled}
        tabIndex={-1}
      />
      {label}
    </div>
  )
}

Option.propTypes = {
  value: t.oneOfType(stringOrNumberType).isRequired,
  label: t.oneOfType(stringOrNumberType).isRequired,
  onClick: t.func.isRequired,

  selected: t.bool,
  disabled: t.bool,
}

export { Option }
