import { type HTMLEngineProps, engine } from 'styled-system/jsx';
import { Icon } from '../Icon/Icon';

interface Props extends HTMLEngineProps<'button'> {
  icon: string;
}

export const IconButton = ({ icon, ...rest }: Props) => {
  return (
    <engine.button
      background='white'
      borderRadius='full'
      padding={2}
      color='primary'
      transition='all 0.3s ease-in-out'
      _hover={{
        color: 'white',
        background: 'primary',
      }}
      {...rest}
    >
      <Icon icon={icon} />
    </engine.button>
  );
};
