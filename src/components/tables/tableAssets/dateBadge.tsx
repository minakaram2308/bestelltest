import React, { useRef } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
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
  minWidth: '130px', 
  minHeight: '48px',
  fontSize: '0.875rem', 
  color: '#333333', 
  cursor: 'pointer', 
  border: '2px solid rgba(231, 231, 225, 1)',
});

const inputStyle = css({
  border: 'none',
  background: 'transparent',
  width: '100%',
  fontSize: 'inherit',
  color: 'inherit',
  textAlign: 'center',
  cursor: 'pointer',
  '&::-webkit-calendar-picker-indicator': {
    display: 'none',
  },
});

const iconStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  position: 'relative',
  minWidth: '20px',
});

interface EditableDateBadgeProps {
  date: string;
  onChange: (value: string) => void;
}

const EditableDateBadge: React.FC<EditableDateBadgeProps> = ({ date, onChange,className }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className={`${badgeStyle} ${className}`} onClick={handleClick}>
      <div className={iconStyle}>
        <CalendarIcon />
      </div>
      <input
        type="date"
        // value={date}
        onChange={(e) => onChange(e.target.value)}
        className={inputStyle}
        ref={inputRef}
      />
    </div>
  );
};

export default EditableDateBadge;
