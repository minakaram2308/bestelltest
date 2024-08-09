// Card.tsx
import React from 'react';
import { css } from 'styled-system/css';
import { Box, Flex } from 'styled-system/jsx';
import {
  ArchiveIcon,
  BellIcon,
  ArrowDownIcon,
  AllSidesIcon,
  HeartIcon,
  StarIcon,
} from '@radix-ui/react-icons';

interface CardProps {
  category: string;
  value: number;
  icon: string;
  isActive?: boolean;
  index?:number
}

const cardStyle = css({
  backgroundColor: 'rgba(244, 244, 244, 1)',
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  boxSizing: 'border-box',
  border: '2px solid transparent',
  "&:hover": {
    backgroundColor: 'rgba(237, 129, 33, 0.2)',
    border: '2px solid rgba(237, 129, 33, 1)',
  },
  "&:active": {
    backgroundColor: 'rgba(237, 129, 33, 0.2)',
    border: '2px solid rgba(237, 129, 33, 1)',
  },
});

const activeCardStyle = css({
  backgroundColor: 'rgba(237, 129, 33, 0.2)',
  border: '2px solid rgba(237, 129, 33, 1)',
});

const cardHeaderStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#000',
});

const cardBodyStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '24px',
  fontWeight: '700',
  color: '#000',
});

const cardValueStyle = css({
  fontSize: '24px',
});

const iconMap: { [key: string]: JSX.Element } = {
  'icon-all': <AllSidesIcon width={40} height={40} />,
  'icon-refill': <BellIcon width={40} height={40} />,
  'icon-soldout': <ArrowDownIcon width={40} height={40} />,
  'icon-archive': <ArchiveIcon width={40} height={40} />,
  'icon-popular': <HeartIcon width={40} height={40} />,
  'icon-new': <StarIcon width={40} height={40} />,
};
// const catagories =[
//   'Erhätlich',
//   "Niedrig",
//   "Ausverkauft",
//  "Ausgeblendet",
 
// ]
const Card: React.FC<CardProps> = ({ category, value, icon, isActive,index }) => {
  return (
    <Box className={`${cardStyle} ${isActive === true ? activeCardStyle : ''}`}>
      <Flex className={cardHeaderStyle}>
        <p>{category}</p>
      </Flex>
      <Flex className={cardBodyStyle}>
        <p className={cardValueStyle}>{value}</p>
        <Box>{iconMap[icon]}</Box>
      </Flex>
    </Box>
  );
};

export default Card;
