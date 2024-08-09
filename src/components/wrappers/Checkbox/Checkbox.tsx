import React from 'react'
import { engine, HStack } from 'styled-system/jsx'

import { CheckboxIndicator, CheckboxRoot } from '.'
import { Icon } from '..'

interface Props {
  name: string
  checked?: boolean
  onChange?: (checkedState: boolean) => void
  disabled?: boolean
  children?: React.ReactNode
  variant?: 'dark' | 'light'
}

export const Checkbox = ({ name, checked, onChange, disabled, variant, children }: Props) => {
  return (
    <HStack>
      <CheckboxRoot
        name={name}
        id={name}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        varaiant={variant}
      >
        <CheckboxIndicator>
          <Icon
            icon='jam:check'
            color='white'
          />
        </CheckboxIndicator>
      </CheckboxRoot>
      <engine.label htmlFor={name}>{children}</engine.label>
    </HStack>
  )
}
