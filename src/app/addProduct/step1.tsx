import React, { useState, useRef, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { useFormContext } from "react-hook-form";
import { Icon, Input, InputWithIcon } from "@/components";
import { css } from "styled-system/css";
import { FormControl } from "@/components/form-elements";
import { Flex } from "styled-system/jsx";
import SelectBox from "@/components/form-elements/Selectbox";
import TextArea from "@/components/wrappers/TextArea";
import InputWithText from "@/components/wrappers/InputWithText";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { useGetProductUnits } from "@/hooks/useProducts/GetProductUnits";
import InputDate from "@/components/wrappers/InputDate";

const Step1 = ({ formData, setFormData }) => {
  const { register, setValue, control } = useFormContext();
  const [imagePreview, setImagePreview] = useState(
    formData.image ? URL.createObjectURL(formData.image) : null
  );

  const [selectedPricingPolicy] = useState(formData.pricingPolicy || "default");
  const [cityCosts, setCityCosts] = useState(
    formData.deliveryLocationPrices || [{ city: "", price: "" }]
  );

  const [isChecked1, setIsChecked1] = useState(formData.canPickup || false);
  const [productUnits, setProductUnits] = useState([]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const { fetchProductUnits } = useGetProductUnits();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchProductUnits();
        setProductUnits(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [fetchProductUnits]);

  useEffect(() => {
    setValue("pricingPolicy", selectedPricingPolicy);
  }, [selectedPricingPolicy, setValue]);

  const handleImageUpload = (e, setter, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setter(URL.createObjectURL(file));
      setValue(fieldName, file);
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: file,
      }));
    }
  };

  const handleSelectChange = (field, value) => {
    setValue(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const triggerImageUpload = (e) => {
    e.preventDefault();
    imageInputRef?.current?.click();
  };

  const addCityCost = (e) => {
    e.preventDefault();
    const newCityCosts = [...cityCosts, { city: "", price: "" }];
    setCityCosts(newCityCosts);
    setFormData({ ...formData, deliveryLocationPrices: newCityCosts });
  };

  const removeCityCost = (index) => {
    const newCityCosts = cityCosts.slice();
    newCityCosts.splice(index, 1);
    setCityCosts(newCityCosts);
    setFormData({ ...formData, deliveryLocationPrices: newCityCosts });
  };

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

  return (
    <div className={`${formRootClasses}`}>
      <Flex className="whiteCard" gap={4} flexDirection="column">
        <h4 className="whiteCardTitle">Produkt informationen</h4>
        <div className="fileUpload">
          <input
            type="file"
            id="uploadImg"
            name="image"
            accept="image/*"
            className={css({ display: "none" })}
            ref={imageInputRef}
            onChange={(e) => handleImageUpload(e, setImagePreview, "image")}
          />
          <label
            htmlFor="uploadImg"
            className="uploadLabel"
            onClick={triggerImageUpload}
          >
            <div className="uploadImage">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Upload Preview"
                  width="150"
                  height="150"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <Icon
                  icon={`mdi:image`}
                  fontSize="50px"
                  margin="auto"
                  color="grey"
                  aria-hidden
                />
              )}
            </div>
            <h3 className="whiteCardTitle primaryC">Bild hochladen</h3>
            <p className="smGrey">
              Am besten verwenden Sie ein Bild mit einer Auflösung von min. 1000
              x 1000 Pixel bzw. 1:1 retio und einer Dateigröße von höchstens 2
              MB. Die datei sollte das Format JPG oder PNG haben. Das Bild muss
              den Community-Richtlinien von BestellGastro entsprechen.
            </p>
          </label>
        </div>
        <Form.Field name="singularTitle">
          <label htmlFor="singularTitle" className="formLabel">
            Bezeichnung & Gebinde
          </label>
          <FormControl name="singularTitle" control={control}>
            <Input
              placeholder="|"
              className={css({ width: "100%" })}
              {...register("singularTitle", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {/* {errors?.singularTitle?.message} */}
          </Form.Message>
        </Form.Field>
        <Form.Field name="description">
          <label htmlFor="description" className="formLabel">
            Beschreibung
          </label>
          <FormControl name="description" control={control}>
            <TextArea
              placeholder="|"
              className={css({ width: "100%" })}
              {...register("description", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {/* {errors?.firstName?.message} */}
          </Form.Message>
        </Form.Field>
        <Form.Field name="productNumber">
          <label htmlFor="productNumber" className="formLabel">
            Artikelnummer
          </label>
          <FormControl name="productNumber" control={control}>
            <Input
              placeholder="|"
              className={css({ width: "100%" })}
              {...register("productNumber", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {/* {errors?.productNumber?.message} */}
          </Form.Message>
        </Form.Field>
        <Form.Field name="manufacturer">
          <label htmlFor="manufacturer" className="formLabel">
            Hersteller
          </label>
          <FormControl name="manufacturer" control={control}>
            <Input
              placeholder="|"
              className={css({ width: "100%" })}
              {...register("manufacturer", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {/* {errors?.manufacturer?.message} */}
          </Form.Message>
        </Form.Field>
        <Form.Field name="market">
          <label htmlFor="market" className="formLabel">
            Marke
          </label>
          <FormControl name="Marke" control={control}>
            <Input
              placeholder="|"
              className={css({ width: "100%" })}
              {...register("Marke", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {/* {errors?.Marke?.message} */}
          </Form.Message>
        </Form.Field>
        <Form.Field name="Sorte">
          <label htmlFor="Sorte" className="formLabel">
            Sorte
          </label>
          <FormControl name="Sorte" control={control}>
            <Input
              placeholder="|"
              className={css({ width: "100%" })}
              {...register("Sorte", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {/* {errors?.Sorte?.message} */}
          </Form.Message>
        </Form.Field>
        <Form.Field name="Barcode">
          <label htmlFor="Barcode" className="formLabel">
            Barcode
          </label>
          <FormControl name="Barcode" control={control}>
            <Input
              placeholder="|"
              className={css({ width: "100%" })}
              {...register("Barcode", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {/* {errors?.Barcode?.message} */}
          </Form.Message>
        </Form.Field>

        <div>
          <label htmlFor="productUnitId" className="formLabel">
            Einheit
          </label>
          <SelectBox
            placeholder="- Bitte auswählen -"
            items={productUnits}
            ariaLabel="Dauer der Preisangabe"
            value={formData.productUnitId}
            // type="idandname"
            onValueChange={(value) =>
              handleSelectChange("productUnitId", value)
            }
          />
        </div>
        <Flex mt={3} flexDirection={"column"}>
          <label htmlFor="unitPrice" className="formLabel">
            Preis pro Einheit
          </label>
          <FormControl name="unitPrice" control={control}>
            <InputWithText
              text={"Netto in €"}
              placeholder="9,77"
              className={css({ width: "100%", paddingLeft: "3rem" })}
              type="number"
              {...register("unitPrice")}
              value={formData.unitPrice}
              onChange={(e) => {
                setValue("unitPrice", e.target.value);
                setFormData({ ...formData, unitPrice: e.target.value });
              }}
            />
          </FormControl>
        </Flex>
      </Flex>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Lagerbestand</h4>
        <p className="smGrey">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry`&apos;`s standard dummy
          text ever since the 1500s, when
        </p>
        <Form.Field name="minQuantity">
          <label htmlFor="minQuantity" className="formLabel">
            Verfügbare Menge
          </label>
          <FormControl name="minQuantity" control={control}>
            <Input
              placeholder="|"
              type="number"
              className={css({ width: "100%" })}
              {...register("minQuantity", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {/* {errors?.minQuantity?.message} */}
          </Form.Message>
        </Form.Field>
        <Form.Field name="threshold">
          <label htmlFor="threshold" className="formLabel">
            Mindestbestand
          </label>
          <FormControl name="threshold" control={control}>
            <Input
              placeholder="|"
              className={css({ width: "100%" })}
              type="number"
              {...register("threshold", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {/* {errors?.threshold?.message} */}
          </Form.Message>
        </Form.Field>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox.Root
            className={`CheckboxRoot ${isChecked1 ? "checkbox-checked" : "checkbox-unchecked"}`}
            id="c1"
            checked={isChecked1}
            onCheckedChange={(checked) => {
              setIsChecked1(checked);
            }}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label font-bold" htmlFor="c1">
            Möchten Sie, dass das Mindesthaltbarkeitsdatum (MHD) für den
            Käufer/Kunden einsehbar ist?
          </label>
        </div>

        {cityCosts.map((cost, index) => (
          <Flex gap={6} key={index}>
            <div>
              <label htmlFor="quantity" className="formLabel">
                Bestand
              </label>
              <InputWithIcon
                icon={
                  <Icon
                    fontSize="25px"
                    color={"#ED8121"}
                    icon="mdi:box-variant-plus"
                  />
                }
                placeholder="10"
                className={css({ width: "100%" })}
                type="number"
                {...register("quantity")}
                value={formData.quantity}
                onChange={(e) => {
                  setValue("quantity", e.target.value);
                  setFormData({ ...formData, quantity: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="Mindestbestand" className="formLabel">
                Mindesthaltbarkeitsdatum (MHD)
              </label>
              <InputDate
                type="date"
                icon={
                  <Icon icon="heroicons-outline:calendar" fontSize="20px" />
                }
                style={{ gap: "0 !important" }}
              />
            </div>
            {cityCosts.length - 1 === index ? (
              <button
                type="button"
                className="addBtn"
                onClick={addCityCost}
                style={{ marginTop: "auto", marginBottom: "12px" }}
              >
                <Icon fontSize="24px" color="white" icon="mdi:plus" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => removeCityCost(index)}
                style={{
                  marginTop: "auto",
                  marginBottom: "12px",
                  marginLeft: "5px",
                }}
              >
                <Icon
                  fontSize="24px"
                  color="red"
                  icon="mingcute:delete-2-line"
                />
              </button>
            )}
          </Flex>
        ))}
      </div>
    </div>
  );
};

export default Step1;
