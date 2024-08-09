import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

export const CarouseItemStyles = cva({
  base: {
    minWidth: 0,
    flex: '0 0 100%'
  }
})

export const CarouselItem = engine('div', CarouseItemStyles)
