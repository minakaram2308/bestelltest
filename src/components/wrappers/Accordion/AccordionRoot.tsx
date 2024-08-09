import { Root } from '@radix-ui/react-accordion'
import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

export const accordionRootStyle = cva({
  base: {},
})

export const AccordionRoot = engine(Root, accordionRootStyle)
