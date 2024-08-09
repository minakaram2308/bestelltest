import { Root } from '@radix-ui/react-select'
import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

const selectRootStyles = cva({})

export const SelectRoot = engine(Root, selectRootStyles)
