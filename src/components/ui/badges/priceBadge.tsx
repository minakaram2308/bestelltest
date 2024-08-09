import React from 'react';
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

interface EditablePriceBadgeProps {
  label: string;
  price: string;
  onChange: (value: string) => void;
}

const EditablePriceBadge: React.FC<EditablePriceBadgeProps> = ({ label, price, onChange }) => (
  <div className={badgeStyle}>
    <div className={textStyle}>{label}</div>
    <input
      type="text"
      value={price}
      onChange={(e) => onChange(e.target.value)}
      className={textStyle}
      style={{ border: 'none', background: 'transparent', width: '50px', textAlign: 'center' }}
    />
  </div>
);

export default EditablePriceBadge;
