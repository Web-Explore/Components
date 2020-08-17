import { cn } from '@bem-react/classname'
import t from 'prop-types'
import React, { useEffect } from 'react'
import { stringOrNumberType } from './interfaces'
import { Checkbox } from '../checkbox'
import './switch.scss'

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
 * Switch component
 */
const Switch = ({
  placeholder,
  options,
  onChange,
  radio,
  required,
  optional,
  disabled,
  multi,
  ...attrs
}) => {
  const state = required || !optional
  const selectClasses = cn('Switch')({
    required: state,
    optional: !state,
    disabled,
  })

  const [_options, setOptions] = React.useState(options)

  useEffect(() => {
    if (!Object.is(_options, options)) setOptions(options)
  }, [options])

  const selectItem = value => status => {
    let newOptions = []
    const option = optionByValue(value)

    newOptions = _options.map(op => ({
      ...op,
      selected: op.value === value,
    }))
    setOptions(newOptions)
    onChange({ value: option.value, label: option.label })
  }

  const optionByValue = value =>
    _options.filter(op => op.value === value)[0] || null

  const generateOptions = () =>
    _options.map(option => (
      <li key={option.value}>
        <Checkbox
          title={option.label}
          value={option.selected}
          disabled={option.disabled}
          onChange={selectItem(option.value)}
          variant={radio ? 'radio' : 'checkbox'}
        />
      </li>
    ))

  return (
    <ul className={selectClasses} {...attrs}>
      {generateOptions()}
    </ul>
  )
}

Switch.propTypes = {
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
   * Replace checkboxes with radio buttons
   */
  radio: t.bool,

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

Switch.defaultProps = {
  placeholder: 'Switch',
  optional: true,
  required: false,
  multi: false,
  disabled: false,
}

export { Switch }
