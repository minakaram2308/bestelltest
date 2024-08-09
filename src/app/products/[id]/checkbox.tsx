// CustomCheckbox.jsx
import React from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

const checkboxContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const checkboxStyle = css({
  width: '16px',
  height: '16px',
  border: '2px solid #666',
  borderRadius: '3px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '8px',
  backgroundColor: '#fff',
});

const checkmarkStyle = css({
  content: '""',
  width: '10px',
  height: '10px',
  display: 'block',
  backgroundColor: '#333',
  clipPath: 'polygon(14% 44%, 0% 65%, 50% 100%, 100% 14%, 80% 0%, 46% 59%)'
});

const CustomCheckbox = ({ checked, onChange, label }) => (
  <Box className={checkboxContainerStyle} onClick={() => onChange(!checked)}>
    <Box className={checkboxStyle}>
      {checked && <Box className={checkmarkStyle} />}
    </Box>
    <Box>{label}</Box>
  </Box>
);

export default CustomCheckbox;
