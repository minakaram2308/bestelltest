import { Value } from '@radix-ui/react-select'
import { cva } from 'styled-system/css'
import { engine } from 'styled-system/jsx'

const selectValueStyles = cva({})

export const SelectValue = engine(Value, selectValueStyles)
