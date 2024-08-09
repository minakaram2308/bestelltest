import { Item } from '@radix-ui/react-accordion';
import { cva } from 'styled-system/css';
import { engine } from 'styled-system/jsx';

export const accordionItemStyles = cva({
  base: {},
});

export const AccordionItem = engine(Item, accordionItemStyles);
