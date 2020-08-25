import React from 'react'
import { Button } from '../'
import {
  render as domRender,
  act as domAct,
  fireEvent,
} from '@testing-library/react' // for real dom testing
import { create as testRender, act as testAct } from 'react-test-renderer' // for snapshot testing
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('button', () => {
  let container = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    cleanup()
  })

  it('renders without crushing', async () => {
    const text = 'click me'
    const onClick = jest.fn()
    let component = null
    await domAct(async () => {
      component = await domRender(<Button text={text} onClick={onClick} />, {
        container,
      }).findByTestId('button')
    })
    expect(component).not.toBeNull()
  })

  it('calls onClick', async () => {
    const text = 'click me'
    const onClick = jest.fn()
    let component = null
    await domAct(async () => {
      component = await domRender(<Button text={text} onClick={onClick} />, {
        container,
      }).findByTestId('button')

      for (let i = 0; i < 3; i++)
        component.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(onClick).toBeCalledTimes(3)
  })

  it('renders text', async () => {
    const text = 'click me'
    const onClick = jest.fn()
    let component = null
    await domAct(async () => {
      component = await domRender(<Button text={text} onClick={onClick} />, {
        container,
      }).findByTestId('button__text')
    })
    expect(component).toHaveTextContent(text)
  })

  it('renders icon', async () => {
    const text = 'click me'
    const onClick = jest.fn()
    const img = <svg></svg>
    let component = null
    await domAct(async () => {
      component = domRender(
        <Button text={text} onClick={onClick} icon={img} />,
        {
          container,
        }
      ).findByTestId('button__icon')
    })
    expect(component).not.toBeNull()
  })

  it('disabled button', async () => {
    const text = 'click me'
    const onClick = jest.fn()
    let component = null
    await domAct(async () => {
      component = await domRender(
        <Button text={text} onClick={onClick} disabled />,
        {
          container,
        }
      ).findByTestId('button')
    })

    expect(component).toBeDisabled()
    expect(component).toHaveClass('Button_disabled')

    await domAct(async () => {
      fireEvent(component, new MouseEvent('click'))
    })

    expect(onClick).toBeCalledTimes(0)
  })

  // snapshot test
  it('has text', async () => {
    const text = 'click me'
    const onClick = jest.fn()
    let component = null
    await testAct(async () => {
      component = testRender(<Button text={text} onClick={onClick} />)
    })
    const element = component.root
    expect(element.findByProps({ className: 'Text' }).children).toStrictEqual([
      text,
    ])
  })
})
