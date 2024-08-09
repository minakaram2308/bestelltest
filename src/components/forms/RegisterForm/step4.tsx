import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { css } from "styled-system/css";
import { Box, Flex } from "styled-system/jsx";
import * as RadioGroup from "@radix-ui/react-radio-group";
import SelectBox from "@/components/form-elements/Selectbox";
import EditableDateBadge from "@/components/ui/badges/dateBadge";
import InputWithText from "@/components/wrappers/InputWithText";

import DiscountGroups from "@/features/dashboard/sections/discountList/discountList";

const Step4 = ({ formData, setFormData }) => {
  const { register, formState: { errors }, control, setValue } = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState(formData.selectedCategory || "");
  const [selectedSubCategory, setSelectedSubCategory] = useState(formData.selectedSubCategory || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedSaleOption, setSelectedSaleOption] = useState(formData.creditOffer || "karton");
  const [selectedDiscountOption, setSelectedDiscountOption] = useState(formData.discountType || "percent");
  const [sonderpreis, setSonderpreis] = useState("7,50 €");

  useEffect(() => {
    setValue("selectedCategory", selectedCategory);
  
  }, [selectedCategory, setValue, setFormData]);

  useEffect(() => {
    setValue("selectedSubCategory", selectedSubCategory);
 
  }, [selectedSubCategory, setValue, setFormData]);

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
  };

  const handleRadioChange = (field, value) => {
    
    if (field === "creditOffer") {
      setSelectedSaleOption(value);
    } else if (field === "discountType") {
      setSelectedDiscountOption(value);
    }
    calculateSonderpreis(value);
  };

  const calculateSonderpreis = () => {
    let price = 999.99;
    let discount = 2.27;

    if (selectedSaleOption === "stuck") {
      price = 999.99;
    }

    if (selectedDiscountOption === "euro") {
      discount = 2.27;
    } else {
      discount = (price * 2.27) / 100;
    }

    const newPrice = (price - discount).toFixed(2).replace('.', ',') + ' €';
    setSonderpreis(newPrice);
  };

  useEffect(() => {
    calculateSonderpreis();
  }, [selectedSaleOption, selectedDiscountOption]);

  const formWhiteClasses = css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
  });

  const sectionTitleStyle = css({
    fontSize: "14px",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#333",
    textAlign: "center",
  });

  const oldPriceStyle = css({
    fontSize: "14px",
    color: "#999",
    textDecoration: "line-through",
    width: "100px",
    marginLeft: "20px",
  });

  const newPriceStyle = css({
    fontSize: "22px",
    fontWeight: "bold",
    color: "#0070f3",
    marginLeft: "20px",
    textDecoration: "none",
  });

  const sectionTitleStyleHead = css({
    fontSize: '18px',
    fontWeight: 'bold'
  });

  const categories = [
    { value: "Aktionspreis", label: "Aktionspreis" },
    { value: "Mengenpreis", label: "Mengenpreis" },
  ];

  const subCategories = [
    { value: "Highlight der Woche", label: "Highlight der Woche" },
    { value: "Individuell", label: "Individuell" },
    { value: "Gruppenrabatt", label: "Gruppenrabatt" },
    { value: "Artikelgruppen", label: "Artikelgruppen" },
  ];

  const saleOptions = [
    { value: "karton", label: "Karton", price: "999.99 €" },
    { value: "stuck", label: "Stück", price: "999.99 €" },
  ];

  const discountOptions = [
    { value: "percent", label: "%", amount: "2,27" },
    { value: "euro", label: "€", amount: "2,27" },
  ];

  return (
    <div className={`gap-20 ${formWhiteClasses}`}>
      <div className="whiteCard">
        <h4 className="whiteCardTitle">Aktionsart</h4>
        <SelectBox
          items={categories}
          aria_label={"category"}
          onValueChange={handleCategoryChange}
          value={selectedCategory}
        />
      </div>

      {selectedCategory === "Aktionspreis" && (
        <>
          <div className="whiteCard">
            <h4 className="whiteCardTitle">Zielgruppe</h4>
            <SelectBox
              items={subCategories}
              aria_label={"subCategory"}
              onValueChange={handleSubCategoryChange}
              value={selectedSubCategory}
            />
          </div>

          {selectedSubCategory === "Highlight der Woche" && (
            <div>
              <div className="whiteCard">
                <h4 className="whiteCardTitle">Aktionsdatum</h4>
                <Flex className="w-100 gap-20">
                  <EditableDateBadge date={startDate} placeholder="Startdatum" onChange={setStartDate} />
                  <EditableDateBadge date={endDate} placeholder="Enddatum" onChange={setEndDate} />
                </Flex>
              </div>
          
              <div className="whiteCard mt-20">
                <h3 className={sectionTitleStyleHead}>Aktionspreis</h3>
                <Flex className="gap-20 flex-wrap">
                  <Box className="gap-20 mt-30 flex flexCol justifyBetween">
                    <h5 className={sectionTitleStyle}>Verkaufspreis</h5>
                    <RadioGroup.Root
                      className="categoryContainer"
                      value={selectedSaleOption}
                      onValueChange={(value) => handleRadioChange("creditOffer", value)}
                    >
                      {saleOptions.map((option, index) => (

                        <Flex
                          key={index}
                          alignItems="center"
                          className={`gap-10 mb-10 ${selectedSaleOption === option.value ? "active-row" : "inactive-row"}`}
                        >
                          <p>{option.value}</p>
                          <RadioGroup.Item
                            value={option.value}
                            className={`radio-input ${selectedSaleOption === option.value ? "checked-radio" : ""}`}
                            disabled={index !== 0 && selectedSaleOption === ""}
                            style={{ opacity: index !== 0 && selectedSaleOption === "" ? 0.5 : 1 }}
                          >
                            <RadioGroup.Indicator />
                          </RadioGroup.Item>
                          <InputWithText text={option.label} />
                          <span>{option.price}</span>
                        </Flex>
                      ))}
                    </RadioGroup.Root>
                  </Box>
                  <Box className="gap-20 mb-10 flex flexCol justifyBetween">
                    <h5 className={sectionTitleStyle}>Rabattwert</h5>
                    <RadioGroup.Root
                      className="categoryContainer"
                      value={selectedDiscountOption}
                      onValueChange={(value) => handleRadioChange("discountType", value)}
                    >
                      {discountOptions.map((option, index) => (
                        <Flex
                          key={index}
                          alignItems="center"
                          className={`gap-10 mb-10 ${selectedDiscountOption === option.value ? "active-row" : "inactive-row"}`}
                        >
                          <RadioGroup.Item
                            value={option.value}
                            className={`radio-input ${selectedDiscountOption === option.value ? "checked-radio" : ""}`}
                            disabled={index !== 0 && selectedDiscountOption === ""}
                            style={{ opacity: index !== 0 && selectedDiscountOption === "" ? 0.5 : 1 }}
                          >
                            <RadioGroup.Indicator />
                          </RadioGroup.Item>
                          <InputWithText text={option.label} />
                          <span>{option.amount}</span>
                        </Flex>
                      ))}
                    </RadioGroup.Root>
                  </Box>
                  <Box>
                    <h5 className={sectionTitleStyle}>Sonderpreis</h5>
                    <Flex alignItems="center" className="gap-10 mt-25">
                      <span className={newPriceStyle}>{sonderpreis}</span>
                      <span className={oldPriceStyle}>10,50 €</span>
                    </Flex>
                  </Box>
                </Flex>
              </div>
            </div>
          )}

          {selectedSubCategory === "Individuell" && (
            <div>
              <div className="whiteCard">
                <h3 className={sectionTitleStyleHead}>Kunden auswählen</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`&apos;`s standard dummy text ever since the 1500s, when</p>
                <input type="text" placeholder="Kundenname oder Kunden-Nr." className="input-search" />
              </div>
              <div className="whiteCard mt-20">
                <h3 className={sectionTitleStyleHead}>Artikel auswählen (1)</h3>
                <Flex className="gap-20 flex-wrap">
                  <RadioGroup.Root
                    className="categoryContainer"
                    value={formData.selectedCustomer || ""}
                    onValueChange={(value) => handleRadioChange("selectedCustomer", value)}
                  >
                    <Box className="gap-20 mb-10 flex flexCol justifyBetween">
                      <h5 className={sectionTitleStyle}>Rabattwert</h5>
                      {discountOptions.map((option, index) => (
                        <Flex
                          key={index}
                          alignItems="center"
                          className={`gap-10 mb-10 ${formData.selectedCustomer === option.value ? "active-row" : "inactive-row"}`}
                        >
                          <h2>{option.value}</h2>
                          <RadioGroup.Item
                            value={option.value}
                            className={`radio-input ${formData.selectedCustomer === option.value ? "checked-radio" : ""}`}
                            disabled={index !== 0 && formData.selectedCustomer === ""}
                            style={{ opacity: index !== 0 && formData.selectedCustomer === "" ? 0.5 : 1 }}
                          >
                            <RadioGroup.Indicator />
                          </RadioGroup.Item>
                          <InputWithText text={option.label} />
                          <span>{formData.selectedCustomer === option.value ? option.amount : null}</span>
                        </Flex>
                      ))}
                    </Box>
                  </RadioGroup.Root>
                  <Box>
                    <h5 className={sectionTitleStyle}>Sonderpreis</h5>
                    <Flex alignItems="center" className="gap-10 mt-25">
                      <span className={newPriceStyle}>7,50 €</span>
                      <span className={oldPriceStyle}>10,50 €</span>
                    </Flex>
                  </Box>
                </Flex>
              </div>
            </div>
          )}
          {selectedSubCategory === 'Artikelgruppen' && (
            <div className="whiteCard">
              <DiscountGroups />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Step4;
