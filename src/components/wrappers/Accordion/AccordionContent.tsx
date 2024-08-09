import { forwardRef } from 'react'
import { Content } from '@radix-ui/react-accordion'
import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

const accordionContentStyles = cva({
  base: {
    padding: 4,
    backgroundColor: 'lightGray',
    color: 'textGray',
    transition: 'all 300ms ease-in-out',

    '&[data-state="open"]': {
      animation: 'slide-down 300ms ease-in-out',
    },

    "&[data-state='closed']": {
      animation: 'slide-up 300ms ease-in-out',
    },
  },
})

export const CustomAccordionContent = engine(Content, accordionContentStyles)

export const AccordionContent = forwardRef(({ children, ...props }, forwardedRef) => (
  <CustomAccordionContent
    {...props}
    ref={forwardedRef}
  >
    {children}
  </CustomAccordionContent>
))

AccordionContent.displayName = 'AccordionContent'
