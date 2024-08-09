import React from 'react';
import { css } from 'styled-system/css';
import { Box, Flex } from 'styled-system/jsx';

interface GastronomBadgeProps {
  logoSrc: string;
  customerNumber: string;
}

const badgeStyle = css({
  base: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  md: {
    padding: '20px',
  },
});

const logoStyle = css({
  width: '40px',
  height: '40px',
  marginRight: '10px',
});

const titleStyle = css({
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333',
});

const customerNumberStyle = css({
  fontSize: '14px',
  color: '#666',
});

const iconStyle = css({
  backgroundColor: '#f5a623',
  borderRadius: '50%',
  width: '16px',
  height: '16px',
  marginLeft: '5px',
});

const GastronomBadge: React.FC<GastronomBadgeProps> = ({ logoSrc, customerNumber }) => {
  return (
    <Flex className={badgeStyle}>
      <Box as="img" src={logoSrc} alt="Logo" className={logoStyle} />
      <Box>
        <Box as="span" className={titleStyle}>
          Gastronom
        </Box>
        <Box as="span" className={customerNumberStyle}>
          Kunden Nr: {customerNumber}
        </Box>
      </Box>
      <Box className={iconStyle} />
    </Flex>
  );
};

export default GastronomBadge;
