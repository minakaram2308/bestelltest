import React from 'react';
import { CalendarIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { css } from 'styled-system/css';

const badgeStyle = css({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff', // Background color to match the image
  borderRadius: '8px',
  padding: '0px 12px',
  gap: '8px',
  justifyContent: 'space-between',
  position: 'relative',
  minWidth: '200px', // Adjusted width to better match the example
  minHeight: '40px',
  width: '100%',
  border: '1px solid #d1d5db', // Added border to match the example
  fontSize: '0.875rem', // Adjusted font size
  color: '#1f2937', // Adjusted text color
});

const inputStyle = css({
  border: 'none',
  background: 'transparent',
  width: '100%',
  fontSize: 'inherit',
  color: 'inherit',
  textAlign: 'left', // Align the text to the left
  cursor: 'pointer', // Change cursor to pointer for better UX
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
  placeholder: string;
  onChange: (value: string) => void;
}

const EditableDateBadge: React.FC<EditableDateBadgeProps> = ({ date, placeholder, onChange }) => (
  <div className={badgeStyle}>
    <div className={iconStyle}>
      <CalendarIcon />
    </div>
    <input
      type="date"
      value={date}
      onChange={(e) => onChange(e.target.value)}
      className={inputStyle}
    />
    {!date && (
      <label style={{ position: 'absolute', left: '40px', color: '#1f2937' }}>
        {placeholder}
      </label>
    )}
    <div className={iconStyle}>
      <ChevronDownIcon />
    </div>
  </div>
);

export default EditableDateBadge;
