import { ChevronDownIcon, BoxIcon, CalendarIcon } from '@radix-ui/react-icons';
import React from 'react';
import { css } from 'styled-system/css';


// Styles for the badges and icons
const badgeStyle = css({
  display: 'flex',
  alignItems: 'center', // Ensure children align center vertically
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '0px 12px',
  gap: '8px',
  justifyContent: 'space-between',
  position: 'relative', // Required for positioning pseudo-elements
  minWidth: '100px',
  minHeight: '40px'
});

const textStyle = css({
  display: 'flex', 
  alignItems: 'center', 
  fontSize: '1rem',
  fontWeight: '500',
  color: '#555',
  paddingRight: '8px',
  position: 'relative',
});

const iconStyle = css({
  display: 'flex', 
  alignItems: 'center', // Center icon vertically
  justifyContent: 'center',
  height: '100%', // Fill the height of the parent container
  paddingRight: '8px',
  position: 'relative',
  minWidth: '20px', // Ensures the icon has minimum width
});

// PriceBadge Component
const PriceBadge = ({ label, price }) => (
  <div className={badgeStyle}>
    <div className={`${textStyle} with-line`}>{label}</div>
    <div className={textStyle}>{price}</div>
  </div>
);

// QuantityBadge Component
const QuantityBadge = ({ quantity }) => (
  <div className={badgeStyle}>
    <div className={`${iconStyle} with-line`}>
      <BoxIcon />
    </div>
    <div className={textStyle}>{quantity}</div>
  </div>
);

// DateBadge Component
const DateBadge = ({ date }) => (
  <div className={badgeStyle}>
    <div className={`${iconStyle} with-line`}>
      <CalendarIcon />
    </div>
    <div className={textStyle}>{date}</div>
    <div className={iconStyle}>
      <ChevronDownIcon />
    </div>
  </div>
);

export { PriceBadge, QuantityBadge, DateBadge };
