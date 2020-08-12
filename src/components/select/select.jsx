import React from 'react'
import { cn } from '@bem-react/classname'
import t from 'prop-types'
import './select.scss'
import { Option } from './option'
import { stringOrNumberType } from './interfaces'

const optionType = t.shape({
  /**
   * Label which displayed in component
   */
  label: t.oneOfType(stringOrNumberType).isRequired,

  /**
   * Value which associated with option
   */
  value: t.oneOfType(stringOrNumberType).isRequired,

  /**
   * Is option selected
   */
  selected: t.bool,

  /**
   * Is option disabled
   */
  disabled: t.bool,
})

/**
 * Select component
 */
const Select = ({
  placeholder,
  options,
  onChange,
  required,
  optional,
  disabled,
  multi,
  ...attrs
}) => {
  const selectClasses = cn('Select')({ required, optional, disabled })
  const contentClasses = cn('Select', 'content')()

  const [_options, setOptions] = React.useState(options)

  const [isOpen, setOpen] = React.useState(false)

  const selectItem = (value, status) => {
    let newOptions = []
    const option = optionByValue(value)

    if (multi) {
      const index = indexOfOption(value)
      newOptions = [..._options]
      newOptions[index] = { ...option, selected: status }
    } else {
      newOptions = _options.map(op => ({
        ...op,
        selected: op.value === value,
      }))
    }
    setOptions(newOptions)
    onChange(getSelected(newOptions))
  }

  const onFold = e => {
    e.stopPropagation()
    setOpen(!isOpen)
  }

  const getSelected = entries => entries.filter(entry => entry.selected)

  const indexOfOption = value => _options.findIndex(op => op.value === value)

  const optionByValue = value =>
    _options.filter(op => op.value === value)[0] || null

  const generateOptions = () =>
    _options.map(option => (
      <li key={option.value}>
        <Option {...option} onClick={selectItem} />
      </li>
    ))

  const title =
    getSelected(_options)
      .map(opt => opt.label)
      .join(', ') || placeholder

  return (
    <div className="Select-wrapper">
      <div className={selectClasses} onClick={onFold}>
        {title}
      </div>
      <ul className={contentClasses} {...attrs}>
        {isOpen && generateOptions()}
      </ul>
    </div>
  )
}

Select.propTypes = {
  /**
   * Placeholder
   */
  placeholder: t.string.isRequired,
  /**
   * List of displayed options
   */
  options: t.arrayOf(optionType),

  /**
   * Callback which triggers when value changed
   */
  onChange: t.func.isRequired,

  /**
   * Is multiple selection enabled
   */
  multi: t.bool,

  /**
   * Is field required to be filled
   */
  required: t.bool,

  /**
   * Is field optional
   */
  optional: t.bool,

  /**
   * Is element disabled
   */
  disabled: t.bool,
}

Select.defaultProps = {
  optional: true,
  required: false,
  multi: false,
  disabled: false,
}

export { Select }
