import { ReactNode } from 'react'
import { engine } from 'styled-system/jsx'

import { Icon } from '..'

type Props = {
  children?: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export const CarouselButton = ({ children, disabled, onClick }: Props) => {
  return (
    <engine.button
      type='button'
      disabled={disabled}
      onClick={onClick}
      background='#F4F4F4'
      borderRadius='full'
      color='primary'
      padding={4}
      transition='all 300ms ease-in-out'
      _hover={{
        cursor: 'pointer',
        background: 'secondary',

        _disabled: {
          cursor: 'not-allowed',
          background: 'gray.400',
        },
      }}
      _disabled={{
        opacity: 0.5,
      }}
    >
      {children}
    </engine.button>
  )
}

export const NextButton = ({ children, disabled, onClick }: Props) => {
  return (
    <CarouselButton
      disabled={disabled}
      onClick={onClick}
    >
      <Icon
        icon='iconamoon:arrow-right-2'
        width={6}
        height={6}
      />
      {children}
    </CarouselButton>
  )
}

export const PrevButton = ({ children, disabled, onClick }: Props) => {
  return (
    <CarouselButton
      disabled={disabled}
      onClick={onClick}
    >
      <Icon
        icon='iconamoon:arrow-left-2'
        width={6}
        height={6}
      />
      {children}
    </CarouselButton>
  )
}
