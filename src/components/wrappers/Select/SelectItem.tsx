import { Item } from '@radix-ui/react-select'
import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

const SelectItemStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'full',
    cursor: 'pointer',
    rounded: 'sm',
    py: 2,
    pl: 2,
    pr: 8,
    fontSize: 'sm',
    color: 'secondary',
    transition: 'all 0.3s ease-in-out',

    _hover: {
      outline: 'none',
      backgroundColor: 'secondary',
      color: 'white',
    },
  },
})

export const SelectItem = engine(Item, SelectItemStyles)
