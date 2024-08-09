import React from "react";
import { css } from "styled-system/css";
import { Box, Flex } from "styled-system/jsx";
import Input, { InputWithText } from "@/components/wrappers/InputWithText"; // Adjust the import path as necessary
import { Checkbox } from "@/components"; // Adjust the import path as necessary
import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import CustomCheckbox from "./checkbox";

const containerStyle = css({
  display: "flex",
  flexDirection: "column",

  padding: "20px",
  borderRadius: "8px",
  // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
});

const sectionStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
});

const labelStyle = css({
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
});

const valueStyle = css({
  fontSize: "14px",
  color: "#666",
});

const checkboxStyle = css({
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  color: "#666",
  marginTop: "10px",
});

const dividerStyle = css({
  height: "1px",
  backgroundColor: "#e0e0e0",
  margin: "40px 0",
});

const inputContainerStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
});

const inputLabelStyle = css({
  fontSize: "12px",
  color: "#666",
  marginBottom: "20px",
});
const boxInputs = css({
  gap: "40px",
  flexDirection: "column",
  display: "flex",
});
const boxInput = css({
  maxWidth: "320px",
});

interface PriceSectionProps {
  title: string;
  standardLabel: string;
  minPriceLabel: string;
  netPrice: string;
  grossPrice: string;
  titleInputs: string;
}

interface ComponentProps {
  mainTitle: string;
  priceLabel: string;
  visibleToAllLabel: string;
  priceDisplayLabel: string;
  withoutConfirmationLabel: string;
  checkboxLabel: string;
  priceSections: PriceSectionProps[];
}

const PriceSection: React.FC<PriceSectionProps> = ({
  title,
  standardLabel,
  minPriceLabel,
  netPrice,
  grossPrice,
  titleInputs,
}) => (
  <Box>
    <Box className={labelStyle}>{titleInputs}</Box>
    <Box className={inputLabelStyle}>{standardLabel}</Box>
    <Box className={boxInputs}>
      <div>
        <h5>Standard</h5>
        <Flex className={inputContainerStyle}>
          <Box className={boxInput}>
            <InputWithText value={"34"} text={"Netto in €"} />
          </Box>
          <Box className={boxInput}>
            <InputWithText value={"34"} text={"Brutto in €"} />
          </Box>
        </Flex>
      </div>
      <div>
        <h5>Mindestverkaufspreis</h5>
        <Flex className={inputContainerStyle}>
          <Box className={boxInput}>
            <InputWithText value={"34"} text={"Netto in €"} />
          </Box>
          <Box className={boxInput}>
            <InputWithText value={"34"} text={"Brutto in €"} />
          </Box>
        </Flex>
      </div>
    </Box>
  </Box>
);

const Component: React.FC<ComponentProps> = ({
  mainTitle,
  priceLabel,
  visibleToAllLabel,
  priceDisplayLabel,
  withoutConfirmationLabel,
  checkboxLabel,
  priceSections,
}) => {
  return (
    <Box className={containerStyle}>
      <Box className={labelStyle}>{mainTitle || "xxx"}</Box>
      <Flex className={sectionStyle}>
        <Box className={valueStyle}>{"Preisangabe"}</Box>
        <Box className={valueStyle}>{"Sichtbar für alle"}</Box>
      </Flex>
      <Flex className={sectionStyle}>
        <Box className={valueStyle}>{"Preisanzeigen"}</Box>
        <Box className={valueStyle}>{"Ohne Bestätigung "}</Box>
      </Flex>
      <Flex className={checkboxStyle}>
        <CustomCheckbox
          checked={undefined}
          onChange={undefined}
          label={"Dieses Artikel kann einzeln verkauft werden."}
        />
      </Flex>
      <Box className={dividerStyle} />

      <PriceSection
        titleInputs={"Verkaufspreis (Karton)"}
        title={""}
        standardLabel={""}
        minPriceLabel={""}
        netPrice={""}
        grossPrice={""}
      />
      <Box className={dividerStyle} />
      <PriceSection
        titleInputs={"Verkaufspreis (Stück)"}
        title={""}
        standardLabel={""}
        minPriceLabel={""}
        netPrice={""}
        grossPrice={""}
      />
    
    </Box>
  );
};

export default Component;
