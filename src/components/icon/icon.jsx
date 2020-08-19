import React from 'react'
import { cn } from '@bem-react/classname'
import DefaultIcon from '../../assets/icons/default-icon.svg'

const icon = cn("Icon")

export const Icon = props => {
  return (
    <>
      <img src={DefaultIcon} alt=""/>
    </>
  )
}

