import React from 'react';
import { css } from 'styled-system/css';

const textStyle = css({


// color:'rgba(154, 159, 165, 1)',
  lineHeight: '1.2',
 
  fonSize:'15px',
  '& span': {
    display: 'block',
   
    fontSize: '14px',
 
  },
});

const CustomText = () => {
  return (
    <div className={textStyle}>
      <p>Verkaufspreis Einzel z.B Stück,</p>
      <span>Kg, Dosen etc. (Netto)</span>
    </div>
  );
};

export default CustomText;
