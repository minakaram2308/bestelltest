import React, { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRegisterFormSchema } from "../validationSchemas";
import { Button, Input } from "@/components";
import { css } from "styled-system/css";
import { FormControl } from "@/components/form-elements";
import { Flex } from "styled-system/jsx";
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useForm, useFormContext } from 'react-hook-form';
import SelectBox from '../../form-elements/Selectbox'; 

const Step3 = ({ formData, setFormData, onSubmitRegister }) => {
  const { handleSubmit: handleSubmitRegister, control } = useForm({
    resolver: zodResolver(loginRegisterFormSchema.register),
  });
  const { register, setValue, getValues, formState: { errors } } = useFormContext();

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

  const handleSelectChange = (field, value) => {
    setValue(field, value);
  
  };

  const handleRadioChange = (field, value) => {
    setValue(field, value);
   
  };

 
  const formWhiteClasses = css({
    display: "flex",
    flexDirection: "column",
    gap: 3,
    width: "100%",
  });

  const weeks = [
    { value: "1 Woche", label: "1 Woche" },
    { value: "2 Wochen", label: "2 Wochen" },
    { value: "3 Wochen", label: "3 Wochen" },
    { value: "4 Wochen", label: "4 Wochen" }
  ];

  const processingTimes = [
    { value: "5 Minuten", label: "5 Minuten" },
    { value: "10 Minuten", label: "10 Minuten" },
    { value: "15 Minuten", label: "15 Minuten" },
    { value: "20 Minuten", label: "20 Minuten" }
  ];

  const pickupTimes = [
    { value: "15 Minuten", label: "15 Minuten" },
    { value: "30 Minuten", label: "30 Minuten" },
    { value: "45 Minuten", label: "45 Minuten" },
    { value: "60 Minuten", label: "60 Minuten" }
  ];

  const blockingTimes = [
    { value: "6:00 Uhr", label: "6:00 Uhr" },
    { value: "6:30 Uhr", label: "6:30 Uhr" },
    { value: "7:00 Uhr", label: "7:00 Uhr" },
    { value: "7:30 Uhr", label: "7:30 Uhr" }
  ];

  const priceQuotes = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "100", label: "100" }
  ];

  const quoteDurations = [
    { value: "1 Tag", label: "1 Tag" },
    { value: "2 Tage", label: "2 Tage" },
    { value: "3 Tage", label: "3 Tage" },
    { value: "Dauerhaft", label: "Dauerhaft" }
  ];

  const reasons = [
    { value: "Sofort einkaufen", label: "Sofort einkaufen" },
    { value: "Nur anfragen", label: "Nur anfragen" },
    { value: "Voraussichtlich planen", label: "Voraussichtlich planen" }
  ];

  const purchaseValues = [
    { value: "20.000 €", label: "20.000 €" },
    { value: "30.000 €", label: "30.000 €" },
    { value: "50.000 €", label: "50.000 €" },
    { value: "100.000 €", label: "100.000 €" }
  ];

  const creditLimits = [
    { value: "20.000 €", label: "20.000 €" },
    { value: "30.000 €", label: "30.000 €" },
    { value: "50.000 €", label: "50.000 €" },
    { value: "Je nach Anfrage", label: "Je nach Anfrage" }
  ];

  return (
    <>
      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Orders</h4>

        <Form.Field name="minimumOrderQuantity">
          <FormControl name="minimumOrderQuantity" control={control}>
            <Input
              placeholder="Enter Minimum Order Quantity"
              className={css({ width: "100%" })}
              {...register("minimumOrderQuantity")}
              type="number"
              onChange={(e) => handleSelectChange("minimumOrderQuantity", e.target.value)}
              value={getValues("minimumOrderQuantity")}
            />
          </FormControl>
        </Form.Field>

        <SelectBox
          items={weeks}
          ariaLabel="Maximale Anzahl von Wochen, um eine Vorbestellung anzufordern"
          value={formData.selectedWeek}
          onValueChange={(value) => handleSelectChange("selectedWeek", value)}
        />

        <SelectBox
          items={processingTimes}
          ariaLabel="Die Maximale Zeit, die zur Bearbeitung einer Bestellung benötigt wird"
          value={formData.selectedProcessingTime}
          onValueChange={(value) => handleSelectChange("selectedProcessingTime", value)}
        />

        <SelectBox
          items={pickupTimes}
          ariaLabel="Die Zeit, die zur Vorbereitung einer Bestellung bei Abholung benötigt wird"
          value={formData.selectedPickupTime}
          onValueChange={(value) => handleSelectChange("selectedPickupTime", value)}
        />

        <SelectBox
          items={blockingTimes}
          ariaLabel="Wann wird die Bestellaufnahme an der Lieferung blockiert?"
          value={formData.selectedBlockingTime}
          onValueChange={(value) => handleSelectChange("selectedBlockingTime", value)}
        />

        <SelectBox
          items={priceQuotes}
          ariaLabel="Maximale Anzahl der Automatische Preisangaben"
          value={formData.selectedPriceQuote}
          onValueChange={(value) => handleSelectChange("selectedPriceQuote", value)}
        />

        <Flex gap={6} className="mt-3">
          <div style={{ width: '50%' }}>
            <SelectBox
              items={quoteDurations}
              ariaLabel="Dauer der Preisangabe"
              value={formData.selectedQuoteDuration}
              onValueChange={(value) => handleSelectChange("selectedQuoteDuration", value)}
            />
          </div>
          <div style={{ width: '50%' }}>
            <SelectBox
              items={reasons}
              ariaLabel="Grund auswählen"
              value={formData.selectedReason}
              onValueChange={(value) => handleSelectChange("selectedReason", value)}
            />
          </div>
        </Flex>

        <RadioGroup.Root
          className="RadioGroupRoot"
          value={formData.creditOffer || "default"}
          onValueChange={(value) => handleRadioChange("creditOffer", value)}
          aria-label="View density"
          style={{ marginTop: '1.5rem' }}
        >
          <label>Bieten Sie Kredite für Ihre Kunden an?</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <div className="radioBox">
              <RadioGroup.Item className="RadioGroupItem" value="default" id="r1">
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="r1">
                Ja
              </label>
            </div>
            <div className="radioBox">
              <RadioGroup.Item className="RadioGroupItem" value="comfortable" id="r2">
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="r2">
                Nein
              </label>
            </div>
          </div>
        </RadioGroup.Root>

        <Flex gap={6} className="mt-3">
          <div style={{ width: '50%' }}>
            <SelectBox
              items={purchaseValues}
              ariaLabel="Einkaufswert ab"
              value={formData.selectedPurchaseValue}
              onValueChange={(value) => handleSelectChange("selectedPurchaseValue", value)}
            />
          </div>
          <div style={{ width: '50%' }}>
            <SelectBox
              items={creditLimits}
              ariaLabel="Maximales Kreditlimit"
              value={formData.selectedCreditLimit}
              onValueChange={(value) => handleSelectChange("selectedCreditLimit", value)}
            />
          </div>
        </Flex>

        <RadioGroup.Root
          className="RadioGroupRoot"
          value={formData.customerApproval || "default"}
          onValueChange={(value) => handleRadioChange("customerApproval", value)}
          aria-label="View density"
          style={{ marginTop: '1.5rem' }}
        >
          <label>Wird eine Freigabe bei Neuen Kunden benötigt?</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <div className="radioBox">
              <RadioGroup.Item className="RadioGroupItem" value="default" id="r1">
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="r1">
                Ja
              </label>
            </div>
            <div className="radioBox">
              <RadioGroup.Item className="RadioGroupItem" value="comfortable" id="r2">
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="r2">
                Nein
              </label>
            </div>
          </div>
        </RadioGroup.Root>
      </div>
    </>
  );
};

export default Step3;
