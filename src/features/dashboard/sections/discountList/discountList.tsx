import React from "react";
import { css } from "styled-system/css";

const containerStyle = css({
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  fontFamily: "Arial, sans-serif",
});

const titleStyle = css({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "8px",
});

const descriptionStyle = css({
  fontSize: "14px",
  marginBottom: "16px",
});

const optionStyle = css({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fcfcf9",
  borderRadius: "12px",
  border: "2px solid #e7e7e1",
  padding: "12px",
  marginBottom: "8px",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
});

const checkboxStyle = css({
  marginRight: "16px",
});

const labelStyle = css({
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  fontSize: "16px",
});

const PriceBadge = ({ option, checked, onChange }) => {
  return (
    <div className={optionStyle} onClick={() => onChange(option)}>
      <input type="checkbox" checked={checked} className={checkboxStyle} />
      <label className={labelStyle}>
        <span>{option.name}</span>
        <span>{option.customers} Kunden</span>
        <span>{option.articles} Artikel</span>
      </label>
    </div>
  );
};

const DiscountGroups = () => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const options = [
    { name: "Restaurants", customers: 50, articles: 70 },
    { name: "Cafés", customers: 50, articles: 70 },
    { name: "Hotels", customers: 50, articles: 70 },
    { name: "Kantinen", customers: 50, articles: 70 },
    { name: "Mitarbeiter", customers: 50, articles: 70 },
    { name: "Einzelhandel", customers: 50, articles: 70 },
    { name: "Großverbraucher", customers: 50, articles: 70 },
  ];

  const handleOptionChange = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((o) => o !== option)
        : [...prevOptions, option]
    );
  };

  return (
    <div className={containerStyle}>
      <h1 className={titleStyle}>Rabattgruppen auswählen</h1>
      <p className={descriptionStyle}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry`&apos;`s standard dummy text ever
        since the 1500s, when
      </p>
      {options.map((option) => (
        <PriceBadge
          key={option.name}
          option={option}
          checked={selectedOptions.includes(option)}
          onChange={handleOptionChange}
        />
      ))}
    </div>
  );
};

export default DiscountGroups;
