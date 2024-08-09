import { Icon } from '@radix-ui/react-select'
import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

const selectIconStyles = cva({})

export const SelectIcon = engine(Icon, selectIconStyles)
