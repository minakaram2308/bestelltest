import React from 'react';
import { css } from 'styled-system/css';

const badgeStyle = css({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(252, 252, 249, 1)',
  borderRadius: '8px',
  padding: '0px 12px',
  gap: '8px',
  justifyContent: 'space-between',
  position: 'relative',
  minWidth: '100px',
  minHeight: '48px',
  border: '2px solid rgba(231, 231, 225, 1)',
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

const inputStyle = css({
  border: 'none',
  background: 'transparent',
  width: '50px',
  textAlign: 'center',
  fontSize: '1rem',
  fontWeight: '500',
  color: '#555',
});

interface EditablePriceBadgeProps {
  label: string;
  price: string;
  onChange: (value: string) => void;
}

const EditablePriceBadge: React.FC<EditablePriceBadgeProps> = ({ label, price,className,onChange }) => (
  <div className={`${badgeStyle} ${className}`}>
    <div className={`${textStyle} with-line`}>{label}</div>
    <input
      type="number"
      value={price}
      onChange={(e) => onChange(e.target.value)}
      className={inputStyle}
    />
  </div>
);

export default EditablePriceBadge;
