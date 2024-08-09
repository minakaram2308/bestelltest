import React, { useState, useEffect, useRef, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "../../components/forms/validationSchemas";
import { Icon, Input, InputWithIcon } from "@/components";
import { css } from "styled-system/css";
import { FormControl } from "@/components/form-elements";
import { Flex } from "styled-system/jsx";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useForm, useFormContext } from "react-hook-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import InputWithText from "@/components/wrappers/InputWithText";
import TabsList from "@/components/ui/tabs/tabsList";
import TabsTrigger from "@/components/ui/tabs/tabsTriggers";
import * as Tabs from "@radix-ui/react-tabs";
import classNames from "classnames";
import uploadImage from "../../../public/images/p2.png";
import Image from "next/image";
import { useGetIndividuals } from "@/hooks/useRegister/GetIndividuals";
import { useGetCustomerClasses } from "@/hooks/useRegister/GetCustomerClasses";

const Step3 = ({ formData, setFormData, onSubmitRegister }) => {
  const { handleSubmit: handleSubmitRegister, control } = useForm({
    resolver: zodResolver(addProductSchema.register),
  });
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const [individuals, setIndividuals] = useState([]);
  const [customerClasses, setCustomerClasses] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Individuell");

  const { fetchtIndividuals, loading, error, data } = useGetIndividuals("EN");
  const { fetchCustomerClasses, loading2, error2, data2 } =
    useGetCustomerClasses("EN");

  const [checkedStates, setCheckedStates] = useState(
    individuals.map(() => false)
  );

  useEffect(() => {
    const loadIndividuals = async () => {
      try {
        const res = await fetchtIndividuals();
        setIndividuals(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadIndividuals();
  }, [loading]);

  useEffect(() => {
    const loadCustomerClasses = async () => {
      try {
        const res = await fetchCustomerClasses();
        setCustomerClasses(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCustomerClasses();
  }, [loading2]);

  const handleCheckedChange = (index, checked) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = checked;
    setCheckedStates(newCheckedStates);
  };
  useEffect(() => {
    setValue("minimumOrderQuantity", formData.minimumOrderQuantity || "");
    setValue("selectedWeek", formData.selectedWeek || "");
    setValue("selectedProcessingTime", formData.selectedProcessingTime || "");
    setValue("selectedPickupTime", formData.selectedPickupTime || "");
    setValue("selectedBlockingTime", formData.selectedBlockingTime || "");
    setValue("selectedPriceQuote", formData.selectedPriceQuote || "");
    setValue("selectedQuoteDuration", formData.selectedQuoteDuration || "");
    setValue("selectedReason", formData.selectedReason || "");
    setValue("creditOffer", formData.creditOffer || "default");
    setValue("selectedPurchaseValue", formData.selectedPurchaseValue || "");
    setValue("selectedCreditLimit", formData.selectedCreditLimit || "");
    setValue("customerApproval", formData.customerApproval || "default");
  }, [formData, setValue]);


  const searchClasses = css({
    borderRadius: "12px",
    padding: "16px",
    minWidth: { base: "auto", lg: "500px" },
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    fontSize: "1rem",
    margin: "1.5rem 0",
  });
  const formRootClasses = css({
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  });

  const formWhiteClasses = css({
    display: "flex",
    flexDirection: "column",
    gap: 3,
    width: "100%",
  });

  const tabs = useMemo(
    () => [
      { label: "Individuell", value: "Individuell", Component: <></> },
      {
        label: "Artikelgruppen",
        value: "Artikelgruppen",
        Component: <></>,
      },
    ],
    []
  );
  const [selectedValue, setSelectedValue] = useState("");
  const inputRef = useRef(null);

  const handleRadioChange = (key, value) => {
    setSelectedValue(value);
    setValue(key, value);
  };

  const handleInputFocus = () => {
    setSelectedValue("other");
  };

  const handleInputChange = (key, event) => {
    const { value } = event.target;
    setValue(key, value);
  };

  return (
    <div className={`${formRootClasses}`}>
      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Steuersatz</h4>
        <RadioGroup.Root
          className="categoryContainer"
          value={selectedValue}
          onValueChange={(value) => handleRadioChange("tax", value)}
          aria-label="View density"
        >
          <div className="radioBox">
            <RadioGroup.Item className="RadioGroupItem" value="7" id="r1">
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor="r1">
              7 %
            </label>
          </div>
          <div className="radioBox">
            <RadioGroup.Item className="RadioGroupItem" value="19" id="r2">
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor="r2">
              19 %
            </label>
          </div>
          <div className="radioBox">
            <RadioGroup.Item className="RadioGroupItem" value="other" id="r3">
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <Input
              className={css({ width: "100%" })}
              placeholder="Sonstige"
              ref={inputRef}
              onFocus={handleInputFocus}
              onChange={(value) => handleInputChange("tax", value)}
              value={formData.tax === "other" ? "" : formData.tax}
            />
          </div>
        </RadioGroup.Root>
      </div>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox.Root
            className={`CheckboxRoot ${formData.hasSingular ? "checkbox-checked" : "checkbox-unchecked"}`}
            id="hasSingular"
            checked={formData.hasSingular}
            onCheckedChange={(checked) => {
              setValue("hasSingular", checked);
              setFormData({ ...formData, hasSingular: checked });
            }}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>

          <h2 className="Label">
            Dieses Artikel kann einzeln verkauft werden.
          </h2>
        </div>
      </div>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Verkaufspreis</h4>
        <label htmlFor="deliveryPrice" className="formLabel mb-0">
          Standard
        </label>
        <Flex gap={3} mb={3}>
          <div style={{ width: "50%" }}>
            <FormControl name="deliveryPrice" control={control}>
              <InputWithText
                text={"Netto in €"}
                placeholder="9,77"
                className={css({ width: "100%", paddingLeft: "3rem" })}
                type="text"
                {...register("deliveryPrice")}
                value={0}
                onChange={(e) => {
                  setValue("deliveryPrice", e.target.value);
                  setFormData({ ...formData, deliveryPrice: e.target.value });
                }}
              />
            </FormControl>
          </div>
          <div style={{ width: "50%" }}>
            <FormControl name="deliveryPrice" control={control}>
              <InputWithText
                text={"Brutto in €"}
                placeholder="9,77"
                className={css({ width: "100%", paddingLeft: "3rem" })}
                type="text"
                {...register("deliveryPrice")}
                value={0}
              />
            </FormControl>
          </div>
        </Flex>
        <label htmlFor="deliveryPrice" className="formLabel mb-0">
          Mindestverkaufspreis Description
        </label>
        <Flex gap={3}>
          <div style={{ width: "50%" }}>
            <FormControl name="deliveryPrice" control={control}>
              <InputWithText
                text={"Netto in €"}
                placeholder="9,77"
                className={css({ width: "100%", paddingLeft: "3rem" })}
                type="text"
                {...register("deliveryPrice")}
                value={0}
              />
            </FormControl>
          </div>
          <div style={{ width: "50%" }}>
            <FormControl name="deliveryPrice" control={control}>
              <InputWithText
                text={"Brutto in €"}
                placeholder="9,77"
                className={css({ width: "100%", paddingLeft: "3rem" })}
                type="text"
                {...register("deliveryPrice")}
                value={0}
              />
            </FormControl>
          </div>
        </Flex>
      </div>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">XXX</h4>
        <h2>Preisangabe</h2>
        <RadioGroup.Root
          className="categoryContainer"
          value={formData.publicPrice}
          onValueChange={(value) => handleRadioChange("publicPrice", value)}
          aria-label="View density"
        >
          <div className="radioBox">
            <RadioGroup.Item className="RadioGroupItem" value={false} id="r1">
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor="r1">
            Geschlossen
            </label>
          </div>
          <div className="radioBox">
            <RadioGroup.Item className="RadioGroupItem" value={true} id="r2">
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor="r2">
            Sichtbar für alle
            </label>
          </div>
        </RadioGroup.Root>

        <h2 className={css({ marginTop: "1rem" })}>Preisanzeigen</h2>
        <RadioGroup.Root
          className="categoryContainer"
          value={formData.needsAuth}
          onValueChange={(value) => handleRadioChange("needsAuth", value)}
          aria-label="View density"
        >
          <div className="radioBox">
            <RadioGroup.Item className="RadioGroupItem" value={true} id="r3">
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor="r3">
            Mit Bestätigung
            </label>
          </div>
          <div className="radioBox">
            <RadioGroup.Item className="RadioGroupItem" value={false} id="r4">
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor="r4">
            Ohne Bestätigung
            </label>
          </div>
        </RadioGroup.Root>

      </div>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Sonderpreis</h4>
        <Tabs.Root defaultValue={tabs[0].value} onValueChange={setSelectedTab}>
          <Flex justifyContent="center" alignItems="center" gap="32px">
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    label={tab.label}
                  />
                ))}
              </TabsList>
            </div>
          </Flex>
          {/* {selectedTab === "Individuell" ? (
            <IndividuellTab />
          ) : (
            <ArtikelgruppenTab />
          )} */}
        </Tabs.Root>

        <InputWithIcon
          placeholder="Kundenname oder Kunden-Nr."
          icon={<Icon icon="mingcute:search-line" />}
          className={classNames(
            "primaryBg searchplaceholder b-none",
            searchClasses
          )}
        />
        <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          Ausgewählte Kunden ({individuals?.length})
        </h2>
        <div className="scrollbar" id="style-1">
          <div className="force-overflow">
            <Flex flexDirection="column" gap={5}>
              {selectedTab === "Individuell"
                ? individuals.map((product, index) => (
                    <div key={index}>
                      <div className="recomProduct">
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

                        <Image
                          src={uploadImage}
                          alt={product.id}
                          width={50}
                          height={50}
                        />

                        <div>
                          <h2>{product.id}</h2>
                          <p>{product.specialCode}</p>
                        </div>
                      </div>

                      {checkedStates[index] && (
                        <Flex justifyContent="space-between" marginTop={4}>
                          <Flex gap={4} marginRight={6}>
                            <InputWithText
                              text={
                                <div>
                                  <span className="euroIcon">€</span>%
                                </div>
                              }
                              placeholder="9,77"
                              className={css({
                                width: "100%",
                                paddingLeft: "3rem",
                              })}
                              type="text"
                              {...register(`deliveryPrice-${index}`)}
                            />
                            <div
                              className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              })}
                            >
                              <del className="smGrey">9,77€</del>
                              <p className="smBlue">9,77€</p>
                            </div>
                          </Flex>

                          <Flex gap={4} marginRight={6}>
                            <InputWithText
                              text={
                                <div>
                                  <span className="euroIcon">€</span>%
                                </div>
                              }
                              placeholder="9,77"
                              className={css({
                                width: "100%",
                                paddingLeft: "3rem",
                              })}
                              type="text"
                              {...register(`deliveryPrice-${index}`)}
                            />
                            <div
                              className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              })}
                            >
                              <del className="smGrey">9,77€</del>
                              <p className="smBlue">9,77€</p>
                            </div>
                          </Flex>
                        </Flex>
                      )}
                    </div>
                  ))
                : customerClasses.map((product, index) => (
                    <div key={index}>
                      <div className="recomProduct">
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

                        <Image
                          src={uploadImage}
                          alt={product.id}
                          width={50}
                          height={50}
                        />

                        <div>
                          <h2>{product.id}</h2>
                          <p>{product.generalDiscount}</p>
                        </div>
                      </div>

                      {checkedStates[index] && (
                        <Flex justifyContent="space-between" marginTop={4}>
                          <Flex gap={4} marginRight={6}>
                            <InputWithText
                              text={
                                <div>
                                  <span className="euroIcon">€</span>%
                                </div>
                              }
                              placeholder="9,77"
                              className={css({
                                width: "100%",
                                paddingLeft: "3rem",
                              })}
                              type="text"
                              {...register(`deliveryPrice-${index}`)}
                            />
                            <div
                              className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              })}
                            >
                              <del className="smGrey">9,77€</del>
                              <p className="smBlue">9,77€</p>
                            </div>
                          </Flex>

                          <Flex gap={4} marginRight={6}>
                            <InputWithText
                              text={
                                <div>
                                  <span className="euroIcon">€</span>%
                                </div>
                              }
                              placeholder="9,77"
                              className={css({
                                width: "100%",
                                paddingLeft: "3rem",
                              })}
                              type="text"
                              {...register(`deliveryPrice-${index}`)}
                            />
                            <div
                              className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              })}
                            >
                              <del className="smGrey">9,77€</del>
                              <p className="smBlue">9,77€</p>
                            </div>
                          </Flex>
                        </Flex>
                      )}
                    </div>
                  ))}
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
