import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Button, Icon, Input, InputWithIcon } from "@/components";
import { css } from "styled-system/css";
import { FormControl } from "@/components/form-elements";
import { CheckIcon } from "@radix-ui/react-icons";
import { Flex } from "styled-system/jsx";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Checkbox from "@radix-ui/react-checkbox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import SelectBox from "../../form-elements/Selectbox";

const Step2 = ({ formData, setFormData }) => {
  const { control, register, setValue, getValues, formState: { errors } } = useFormContext();
  const [selectedDeliveryCostType, setSelectedDeliveryCostType] = useState(formData.deliveryPriceType || "LOCATION");
  const [cityCosts, setCityCosts] = useState(formData.deliveryLocationPrices || [{ city: "", price: "" }]);
  const [isChecked1, setIsChecked1] = useState(formData.canDeliver || false);
  const [isChecked2, setIsChecked2] = useState(formData.canPickup || false);
  const [radius, setRadius] = useState(formData.radius || 0);

  useEffect(() => {
    setValue("deliveryPriceType", selectedDeliveryCostType);
    setValue("deliveryLocationPrices", cityCosts);
    setValue("canDeliver", isChecked1);
    setValue("canPickup", isChecked2);
    setValue("radius", radius);
  }, [selectedDeliveryCostType, cityCosts, isChecked1, isChecked2, radius, setValue]);

  const formWhiteClasses = css({
    display: "flex",
    flexDirection: "column",
    gap: 3,
    width: "100%",
  });

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

  const handleSliderChange = (value) => {
    setRadius(value);
    setValue("radius", value);
    setFormData({ ...formData, radius: value });
  };

  const handleDeliveryCostTypeChange = (value) => {
    setSelectedDeliveryCostType(value);
    setValue("deliveryPriceType", value);
    setFormData({ ...formData, deliveryPriceType: value });
  };

  const handleCityChange = (value, index) => {
    const newCityCosts = [...cityCosts];
    newCityCosts[index].city = value;
    setCityCosts(newCityCosts);
    setValue(`deliveryLocationPrices[${index}].city`, value);
    setFormData({ ...formData, deliveryLocationPrices: newCityCosts });
  };

  const handleCostChange = (e, index) => {
    const newCityCosts = [...cityCosts];
    newCityCosts[index].price = e.target.value;
    setCityCosts(newCityCosts);
    setValue(`deliveryLocationPrices[${index}].price`, e.target.value);
    setFormData({ ...formData, deliveryLocationPrices: newCityCosts });
  };

  const deliveryCostTypes = [
    { value: "LOCATION", label: "Abhängig von der Stadt" },
    { value: "DISTANCE", label: "Abhängig von der Entfernung" },
    { value: "FIXED", label: "Fixe Lieferkosten" }
  ];

  const cities = [
    { value: "braunschweig", label: "Braunschweig" },
    { value: "berlin", label: "Berlin" },
    { value: "hamburg", label: "Hamburg" }
  ];

  return (
    <div className={`whiteCard ${formWhiteClasses}`}>
      <h4 className="whiteCardTitle">Delivery Data</h4>

      <label>Shipping Method</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox.Root
          className={`CheckboxRoot ${isChecked1 ? "checkbox-checked" : "checkbox-unchecked"}`}
          id="c1"
          checked={isChecked1}
          onCheckedChange={(checked) => {
            setIsChecked1(checked);
            setValue("canDeliver", checked);
            setFormData({ ...formData, canDeliver: checked });
          }}
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="Label" htmlFor="c1">
          Delivery
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox.Root
          className={`CheckboxRoot ${isChecked2 ? "checkbox-checked" : "checkbox-unchecked"}`}
          id="c2"
          checked={isChecked2}
          onCheckedChange={(checked) => {
            setIsChecked2(checked);
            setValue("canPickup", checked);
            setFormData({ ...formData, canPickup: checked });
          }}
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="Label" htmlFor="c2">
          Pickup
        </label>
      </div>

      <Flex className="mt-3">
        <label>Lieferadius in km</label>
        <Icon margin="auto 5px" icon="mdi:info" color={"#9A9FA5"} aria-hidden />
      </Flex>

      <Controller
        name="radius"
        control={control}
        render={({ field }) => (
          <FormControl name="radius" control={control}>
            <div
              style={{ position: "relative", width: "100%", padding: "20px 0", display: "flex", alignItems: "center" }}
            >
              <span style={{ width: "50px", textAlign: "center" }}>0 km</span>
              <Slider
                min={0}
                max={200}
                trackStyle={{ backgroundColor: "#3a86ff", height: 8 }}
                railStyle={{ backgroundColor: "#e0e0e0", height: 8 }}
                handleStyle={{
                  borderColor: "#3a86ff",
                  height: 24,
                  width: 24,
                  marginTop: -8,
                  backgroundColor: "#fff",
                }}
                style={{ flex: 1, margin: "0 10px" }}
                onChange={(value) => {
                  field.onChange(value);
                  handleSliderChange(value);
                }}
                value={field.value}
              />
              <span style={{ width: "70px", textAlign: "center" }}>ganz Ort</span>
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: `calc(${(field.value / 200) * 100}% - 30px)`,
                  transition: "left 0.1s",
                }}
              >
                {field.value} Km
              </div>
            </div>
          </FormControl>
        )}
      />

      <Flex>
        <label>Lieferkosten</label>
        <Icon margin="auto 5px" icon="mdi:info" color={"#9A9FA5"} aria-hidden />
      </Flex>

      <SelectBox
        items={deliveryCostTypes}
        ariaLabel="Delivery Cost Type"
        value={selectedDeliveryCostType}
        onValueChange={handleDeliveryCostTypeChange}
      />

      {selectedDeliveryCostType === "LOCATION" && (
        <>
          {cityCosts.map((cost, index) => (
            <Flex gap={6} className="items-center items-stretch" key={index}>
              <Flex style={{ width: "45%" }}>
                <SelectBox
                  items={cities}
                  ariaLabel="City"
                  value={cost.city}
                  onValueChange={(value) => handleCityChange(value, index)}
                />
              </Flex>
              <div style={{ width: "45%", marginTop: '9px' }}>
                <FormControl name={`deliveryLocationPrices[${index}].price`} control={control}>
                  <InputWithIcon
                    icon={<Icon fontSize="16px" color={"#ED8121"} icon="mdi:euro" />}
                    placeholder="0"
                    className={css({ width: "100%", paddingLeft: "3rem" })}
                    type="number"
                    // value={cost.price}
                  onChange={(e) => handleCostChange(e, index)}
                    {...register(`deliveryLocationPrices[${index}].price`, { required: true })}
                  />
                </FormControl>
              </div>
              {cityCosts.length - 1 === index ? (
                <button type="button" className="addBtn" onClick={addCityCost}>
                  <Icon fontSize="24px" color="white" icon="mdi:plus" />
                </button>
              ) : (
                <button type="button" onClick={() => removeCityCost(index)}>
                  <Icon fontSize="24px" color="red" icon="mdi:trash" />
                </button>
              )}
            </Flex>
          ))}
        </>
      )}

      {selectedDeliveryCostType === "DISTANCE" && (
        <>
          <Flex className="mt-3">
            <FormControl name="deliveryDistance" control={control} style={{ width: "40%" }}>
              <Input
                placeholder="1 Km"
                className={css({ width: "100%" })}
                type="number"
                {...register("deliveryDistance")}
                value={getValues("deliveryDistance")}
                onChange={(e) => {
                  setValue("deliveryDistance", e.target.value);
                  setFormData({ ...formData, deliveryDistance: e.target.value });
                }}
              />
            </FormControl>
            <FormControl name="deliveryKmPrice" control={control} style={{ width: "60%" }}>
              <InputWithIcon
                icon={<Icon fontSize="16px" color={"#ED8121"} icon="mdi:euro" />}
                placeholder="0,20"
                className={css({ width: "100%", paddingLeft: "3rem" })}
                type="number"
                {...register("deliveryKmPrice")}
                value={getValues("deliveryKmPrice")}
                onChange={(e) => {
                  setValue("deliveryKmPrice", e.target.value);
                  setFormData({ ...formData, deliveryKmPrice: e.target.value });
                }}
              />
            </FormControl>
          </Flex>
        </>
      )}

      {selectedDeliveryCostType === "FIXED" && (
        <div style={{ width: "100%" }}>
          <FormControl name="deliveryPrice" control={control}>
            <InputWithIcon
              icon={<Icon fontSize="16px" color={"#ED8121"} icon="mdi:euro" />}
              placeholder="0"
              className={css({ width: "100%", paddingLeft: "3rem" })}
              type="text"
              {...register("deliveryPrice")}
              value={getValues("deliveryPrice")}
              onChange={(e) => {
                setValue("deliveryPrice", e.target.value);
                setFormData({ ...formData, deliveryPrice: e.target.value });
              }}
            />
          </FormControl>
        </div>
      )}

      <RadioGroup.Root
        className="RadioGroupRoot"
        value={formData.canTrustDrivers ? "true" : "false"}
        onValueChange={(value) => {
          const isTrue = value === "true";
          setValue("canTrustDrivers", isTrue);
          setFormData({ ...formData, canTrustDrivers: isTrue });
        }}
        aria-label="Driver Approval"
      >
        <label>Benötigt der Fahrer Ihre Zustimmung zur Reklamation?</label>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <div className="radioBox">
            <RadioGroup.Item className="RadioGroupItem" value="true" id="r1">
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor="r1">
              Yes
            </label>
          </div>
          <div className="radioBox">
            <RadioGroup.Item className="RadioGroupItem" value="false" id="r2">
              <RadioGroup.Indicator className="RadioGroupIndicator" />
            </RadioGroup.Item>
            <label className="Label" htmlFor="r2">
              No
            </label>
          </div>
        </div>
      </RadioGroup.Root>
    </div>
  );
};

export default Step2;
