import React, { useState } from "react";
import { css } from "styled-system/css";

interface DynamicWidgetProps {
  value: number;
  price: number;
  setPriceDiscountFn: (value: number) => number;
}

const widgetContainerStyle = css({
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(252, 252, 249, 1)",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  border: "2px solid rgba(231, 231, 225, 1)",
  width: "100%",
  height: "55px",
  cursor: "pointer",
});

const priceOptionStyle = css({
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(244, 244, 244, 1)",
  borderRadius: "12px 0px 0px 12px",
  // padding: "0px",
  padding:'0px 10px',
  height: "100%",
});

const iconContainerStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  backgroundColor: "white",
  borderRadius: "50%",
 padding:'0px 10px',
  // boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
});

const iconStyle = css({
  fontSize: "16px",
  margin:'0px!important'

});

const valueContainerStyle = css({
  display: "flex",
  alignItems: "center",
  paddingLeft: "10px",
  width: "100%",
});

const inputStyle = css({
  fontSize: "20px",
  fontWeight: "bold",
  border: "none",
  outline: "none",
  width: "100%",
  backgroundColor: "rgba(252, 252, 249, 1)",
});

const PriceBadge: React.FC<DynamicWidgetProps> = ({ value ,setPriceDiscountFn,price}) => {
  const [isPercentage, setIsPercentage] = useState(false);
  const [inputValue, setInputValue] = useState(value &&value.toFixed(2));

  const toggleMode = (mode: boolean) => {
    setIsPercentage(mode);
    setInputValue(mode ? value.toFixed(2) : (value * 100).toFixed(2));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
    setPriceDiscountFn(isPercentage === true && ((e.target.value / 100) *price) as any|| e.target.value)
  };

  return (
    <div className={widgetContainerStyle}>
      <div className={priceOptionStyle}>
        <div
          className={iconContainerStyle}
          onClick={() => toggleMode(false)}
          style={{ backgroundColor: !isPercentage ? "#fff" : "transparent" }}
        >
          <span className={iconStyle}>€</span>
        </div>
        <div
          className={iconContainerStyle}
          onClick={() => toggleMode(true)}
          style={{ backgroundColor: isPercentage ? "#fff" : "transparent" }}
        >
          <span className={iconStyle}>%</span>
        </div>
      </div>
      <div className={valueContainerStyle}>
        <input
          type="text"
          className={inputStyle}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default PriceBadge;
