import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { css } from "styled-system/css";
import { Box, Flex } from "styled-system/jsx";
import * as RadioGroup from "@radix-ui/react-radio-group";
import SelectBox from "../../components/form-elements/Selectbox";
import EditableDateBadge from "@/components/ui/badges/dateBadge";
import InputWithText from "@/components/wrappers/InputWithText";
import PriceBadge from "@/components/ui/priceWidget";
import AvatarBadge from "@/components/ui/badges/avatarBadge";
import { InputWithIcon, Icon } from "@/components";
import Component from "@/features/dashboard/sections/users/user";
import classNames from "classnames";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import * as Form from "@radix-ui/react-form";
import { FormControl } from "@/components/form-elements";
import InputDate from "@/components/wrappers/InputDate";

const sales = {
  saleOptions: [
    { value: "karton", label: "Karton", price: "999.99 €" },
    { value: "stuck", label: "Stück", price: "999.99 €" },
  ],
  discountOptions: [
    { value: "percent", label: "%", amount: "2,27" },
    { value: "euro", label: "€", amount: "2,27" },
  ],
};
const searchClasses = css({
  borderRadius: "12px",
  padding: "16px",
  minWidth: { base: "auto", lg: "500px" },
  border: "1px solid #ddd",
  backgroundColor: "#f9f9f9",
  fontSize: "1rem",
});
const Step4 = ({ formData, setFormData }) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState(
    formData.selectedCategory || ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    formData.selectedSubCategory || ""
  );
  const [priceFn, setPriceFn] = useState(formData.priceFn || 0);
  const [priceDiscountFn, setPriceDiscountFn] = useState(
    formData.priceDiscountFn || 0
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [creditOffer, setCreditOffer] = useState(sales.saleOptions[0].value);
  const GruppenrabattList = [
    { label: "Restaurants", customers: 50, articles: 70 },
    { label: "Cafés", customers: 50, articles: 70 },
    { label: "Hotels", customers: 50, articles: 70 },
    { label: "Kantinen", customers: 50, articles: 70 },
    { label: "Mitarbeiter", customers: 50, articles: 70 },
    { label: "Einzelhandel", customers: 50, articles: 70 },
    { label: "Großverbraucher", customers: 50, articles: 70 },
    { label: "Einzelhandel", customers: 50, articles: 70 },
  ];
  const ArtikelgruppentList = [
    { label: "Restaurants", customers: 50, articles: 70 },
    { label: "Cafés", customers: 50, articles: 70 },
    { label: "Hotels", customers: 50, articles: 70 },
    { label: "Kantinen", customers: 50, articles: 70 },
    { label: "Mitarbeiter", customers: 50, articles: 70 },
    { label: "Einzelhandel", customers: 50, articles: 70 },
    { label: "Großverbraucher", customers: 50, articles: 70 },
    { label: "Einzelhandel", customers: 50, articles: 70 },
  ];

  const [checkedStates, setCheckedStates] = useState(
    GruppenrabattList.map(() => false)
  );

  useEffect(() => {
    setValue("selectedCategory", selectedCategory);
    setFormData((prevData) => ({
      ...prevData,
      selectedCategory,
    }));
  }, [selectedCategory, setValue, setFormData]);

  useEffect(() => {
    setValue("selectedSubCategory", selectedSubCategory);
    setFormData((prevData) => ({
      ...prevData,
      selectedSubCategory,
    }));
  }, [selectedSubCategory, setValue, setFormData]);

  useEffect(() => {
    setValue("creditOffer", creditOffer);
    setFormData((prevData) => ({
      ...prevData,
      creditOffer,
    }));
  }, [creditOffer, setValue, setFormData]);

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
  };

  const handleRadioChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

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
    fontSize: "18px",
    fontWeight: "bold",
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

  const radioItemStyle = css({
    width: "20px",
    height: "20px",
    border: "1px solid #0070f3",
    borderRadius: "50%",
    marginRight: "10px",
    position: "relative",
  });

  const radioIndicatorStyle = css({
    display: "block",
    width: "12px",
    height: "12px",
    backgroundColor: "#0070f3",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });

  const radioGroupItemStyle = (isActive) =>
    css({
      opacity: isActive ? 1 : 0.5,
      pointerEvents: isActive ? "auto" : "none",
    });

  const cardStyle = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "24px",
    gap: "32px",
    position: "relative",
    width: "672px",
    backgroundColor: "rgba(247, 247, 240, 1)",
    borderRadius: "16px",
  });

  const checkboxContainerStyle = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "16px",
    backgroundColor: "rgba(247, 247, 240, 1)",
    borderRadius: "8px",
  });

  const labelStyle = css({
    display: "flex",
    alignItems: "center",
  });

  const percentageStyle = css({
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  });

  const customerCountStyle = css({
    marginLeft: "8px",
    color: "#666",
    textDecoration: "underline",
  });

  const handleCheckedChange = (index, checked) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = checked;
    setCheckedStates(newCheckedStates);
  };

  return (
    <div className={`gap-20 ${formWhiteClasses}`}>
      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Aktionsart</h4>
        <SelectBox
          items={categories}
          aria_label={"category"}
          onValueChange={handleCategoryChange}
          value={selectedCategory}
        />
      </div>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Zielgruppe</h4>
        <SelectBox
          items={subCategories}
          aria_label={"subCategory"}
          onValueChange={handleSubCategoryChange}
          value={selectedSubCategory}
        />
      </div>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Aktionsdatum</h4>
        <Flex className="w-100 gap-20">
          <Box width={"50%"}>
            <label htmlFor="Mindestbestand" className="formLabel">
              Startdatum
            </label>
            <Form.Field name="Marke">
              <FormControl name="Marke" control={control}>
                <InputDate
                  type="date"
                  icon={
                    <Icon icon="heroicons-outline:calendar" fontSize="20px" />
                  }
                />
              </FormControl>
              <Form.Message match="valueMissing">
                {errors?.Marke?.message}
              </Form.Message>
            </Form.Field>
          </Box>
          <Box width={"50%"}>
            <label htmlFor="Mindestbestand" className="formLabel">
              Enddatum
            </label>
            <Form.Field name="Enddatum">
              <FormControl name="Enddatum" control={control}>
                <InputDate
                  type="date"
                  icon={
                    <Icon icon="heroicons-outline:calendar" fontSize="20px" />
                  }
                />
              </FormControl>
              <Form.Message match="valueMissing">
                {errors?.Enddatum?.message}
              </Form.Message>
            </Form.Field>
          </Box>
        </Flex>
      </div>

      {selectedCategory && (
        <div className={`whiteCard ${formWhiteClasses}`}>
          <h4 className="whiteCardTitle">{selectedCategory}</h4>
          <RadioGroup.Root
            className="categoryContainer"
            value={creditOffer}
            onValueChange={(value) => setCreditOffer(value)}
          >
            <Flex className="gap-20 flex-wrap">
              <Box className="gap-20 mb-10 flex flexCol justifyBetween">
                <h5 className={sectionTitleStyle}>
                  {selectedCategory === "Aktionspreis"
                    ? "Verkaufspreis"
                    : "Menge"}
                </h5>
                {sales.saleOptions.map((option, index) => (
                  <div className="flex gap-20" key={index}>
                    <Flex alignItems="center" className="mb-10">
                      <RadioGroup.Item
                        value={option.value}
                        className="RadioGroupItem"
                      >
                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                      </RadioGroup.Item>
                    </Flex>
                    <Box
                      className={`${radioGroupItemStyle(creditOffer === option.value)}`}
                    >
                      <InputWithText
                        text={`${option.label}`}
                        setPriceFn={setPriceFn}
                        disabled={creditOffer !== option.value}
                      />
                    </Box>
                  </div>
                ))}
              </Box>
              <Box className="flex flexCol justifyBetween">
                <h5 className={sectionTitleStyle}>Rabattwert</h5>
                {sales.discountOptions.map((option, index) => (
                  <Flex
                    key={index}
                    alignItems="center"
                    className="gap-10 mb-10"
                  >
                    <Box
                      className={`${radioGroupItemStyle(creditOffer === sales.saleOptions[index].value)}`}
                    >
                      <PriceBadge
                        value={0}
                        price={priceFn}
                        setPriceDiscountFn={setPriceDiscountFn}
                        disabled={
                          creditOffer !== sales.saleOptions[index].value
                        }
                      />
                    </Box>
                  </Flex>
                ))}
              </Box>
              <Box>
                <h5 className={sectionTitleStyle}>Sonderpreis</h5>
                <Flex alignItems="center" className="gap-10 mt-25">
                  <span className={newPriceStyle}>
                    {creditOffer && priceDiscountFn
                      ? priceFn - priceDiscountFn
                      : priceFn || 0}
                  </span>
                  <span className={oldPriceStyle}>{priceFn || 0}</span>
                </Flex>
              </Box>
            </Flex>
          </RadioGroup.Root>
        </div>
      )}
      {selectedSubCategory === "Individuell" && (
        <div className={`whiteCard ${formWhiteClasses}`}>
          <h3 className={`${sectionTitleStyleHead} mb-20`}>Kunden auswählen</h3>
          <p className="smGrey">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry`&apos;`s standard dummy text
            ever since the 1500s, when
          </p>
          <InputWithIcon
            placeholder="Kundenname oder Kunden-Nr."
            icon={<Icon icon="mingcute:search-line" />}
            className={classNames(
              "primaryBg searchplaceholder b-none",
              searchClasses
            )}
          />
          <Flex className="flex-col w-100 gap-20">
            {[
              {
                name: "Gastronom",
                customerNo: "123456",
                discount: "10 %",
                originalPrice: "10,50 €",
                discountedPrice: "7,50 €",
                checked: true,
              },
              {
                name: "Gastronom",
                customerNo: "123456",
                discount: "10 %",
                originalPrice: "10,50 €",
                discountedPrice: "7,50 €",
                checked: true,
              },
              {
                name: "Gastronom",
                customerNo: "123456",
                discount: "0",
                originalPrice: "10,50 €",
                discountedPrice: "10,50 €",
                checked: false,
              },
              // Add more entries as needed
            ].map((customer, index) => (
              <Box
                key={index}
                className={`flex items-center w-100 mb-10 ${checkboxContainerStyle}`}
              >
                <div className={labelStyle}>
                  <input
                    type="checkbox"
                    id={`customer-${index}`}
                    checked={customer.checked}
                  />
                  {/* <Component user={customer}/> */}
                </div>
                <span className={`ml-auto ${percentageStyle}`}>
                  {customer.discount}
                </span>
                <span className={oldPriceStyle}>{customer.originalPrice}</span>
                <span className={newPriceStyle}>
                  {customer.discountedPrice}
                </span>
              </Box>
            ))}
          </Flex>
        </div>
      )}

      {selectedSubCategory === "Gruppenrabatt" && (
        <div className={`whiteCard ${formWhiteClasses}`}>
          <h4 className="whiteCardTitle">Rabattgruppen auswählen</h4>
          <p className="smGrey">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry`&apos;`s standard dummy text
            ever since the 1500s, when
          </p>
          <Flex className="flex-wrap flexCol w-100 gap-20 mt-3">
            {[
              { label: "Restaurants", customers: 50, articles: 70 },
              { label: "Cafés", customers: 50, articles: 70 },
              { label: "Hotels", customers: 50, articles: 70 },
              { label: "Kantinen", customers: 50, articles: 70 },
              { label: "Mitarbeiter", customers: 50, articles: 70 },
              { label: "Einzelhandel", customers: 50, articles: 70 },
              { label: "Großverbraucher", customers: 50, articles: 70 },
              { label: "Einzelhandel", customers: 50, articles: 70 },
            ].map((group, index) => (
              <Box
                key={index}
                className={`flex items-center w-100 ${checkboxContainerStyle}`}
              >
                <div className={labelStyle}>
                  <Checkbox.Root
                    className={`CheckboxRoot ${checkedStates[index] ? "checkbox-checked" : "checkbox-unchecked"}`}
                    id={`c2-${index}`}
                    checked={checkedStates[index]}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(index, checked)
                    }
                  >
                    <Checkbox.Indicator className="CheckboxIndicator">
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label htmlFor={`group-${index}`} className="text-bold ml-4">
                    {group.label} |
                  </label>
                  <span
                    className={customerCountStyle}
                  >{`${group.customers} Kunden`}</span>
                </div>
                <span className={`ml-auto ${percentageStyle}`}>20 %</span>
              </Box>
            ))}
          </Flex>
        </div>
      )}

      {selectedSubCategory === "Artikelgruppen" && (
        <div className={`whiteCard ${formWhiteClasses}`}>
          <h3 className={`${sectionTitleStyleHead} mb-20`}>
            Rabattgruppen auswählen
          </h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry`&apos;`s standard dummy text
            ever since the 1500s, when
          </p>
          <Flex className="flex-wrap flexCol w-100 gap-20">
            {ArtikelgruppentList.map((group, index) => (
              <Box
                key={index}
                className={`flex items-center w-100 mb-10 ${checkboxContainerStyle}`}
              >
                <div className={labelStyle}>
                  <Checkbox.Root
                    className={`CheckboxRoot ${checkedStates[index] ? "checkbox-checked" : "checkbox-unchecked"}`}
                    id={`c2-${index}`}
                    checked={checkedStates[index]}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(index, checked)
                    }
                  >
                    <Checkbox.Indicator className="CheckboxIndicator">
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label htmlFor={`group-${index}`} className="text-bold ml-4">
                    {group.label} |
                  </label>
                  <span
                    className={customerCountStyle}
                  >{`${group.customers} Kunden`}</span>
                </div>
                <span className={`ml-auto ${percentageStyle}`}>70 Artikle</span>
              </Box>
            ))}
          </Flex>
        </div>
      )}
    </div>
  );
};

export default Step4;
