import { Box } from 'styled-system/jsx'

export const Spinner = () => {
  return (
    <Box
      display='inline-block'
      borderTop='2px solid currentColor'
      borderRight='2px solid currentColor'
      borderBottom='2px solid transparent'
      borderLeft='2px solid transparent'
      borderRadius='full'
      width='1em'
      height='1em'
      animation='spin .4s linear infinite'
    >
      <span aria-label='Loading...' />
    </Box>
  )
}
