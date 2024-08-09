import { forwardRef } from 'react'
import { Trigger } from '@radix-ui/react-accordion'
import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

import { AccordionHeader } from '.'
import { Icon } from '..'

const accordionTriggerStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'full',
    gap: 4,
    padding: 4,
    color: 'textGray',
    transition: 'all 300ms ease-in-out',
    cursor: 'pointer',
    outline: 'none',

    _disabled: {
      opacity: '20%',
      cursor: 'not-allowed',
    },

    '&[data-state="open"]': {
      '& svg': {
        transition: 'transform 300ms ease-in-out',
        transform: 'rotate(180deg)',
      },
    },
  },
})

export const CustomTrigger = engine(Trigger, accordionTriggerStyles)

export const AccordionTrigger = forwardRef(({ children, open, ...props }, forwardedRef) => (
  <AccordionHeader>
    <CustomTrigger
      {...props}
      ref={forwardedRef}
    >
      {children}
      <Icon
        icon='mdi:chevron-down'
        aria-hidden
      />
    </CustomTrigger>
  </AccordionHeader>
))

AccordionTrigger.displayName = 'AccordionTrigger'
