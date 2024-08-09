import React from 'react';
import { BoxIcon } from '@radix-ui/react-icons';
import { css } from 'styled-system/css';

const badgeStyle = css({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '0px 12px',
  gap: '8px',
  justifyContent: 'space-between',
  position: 'relative',
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
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  paddingRight: '8px',
  position: 'relative',
  minWidth: '20px',
});

interface EditableQuantityBadgeProps {
  quantity: string;
  onChange: (value: string) => void;
}

const EditableQuantityBadge: React.FC<EditableQuantityBadgeProps> = ({ quantity, onChange }) => (
  <div className={badgeStyle}>
    <div className={`${iconStyle} with-line`}>
      <BoxIcon />
    </div>
    <input
      type="text"
      value={quantity}
      onChange={(e) => onChange(e.target.value)}
      className={textStyle}
      style={{ border: 'none', background: 'transparent', width: '50px', textAlign: 'center' }}
    />
  </div>
);

export default EditableQuantityBadge;
