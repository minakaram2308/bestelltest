import { Header } from '@radix-ui/react-accordion'
import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

const accordionHeaderStyles = cva({})

export const AccordionHeader = engine(Header, accordionHeaderStyles)
