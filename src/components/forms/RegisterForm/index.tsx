import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRegisterFormSchema } from "../validationSchemas";
import { Button } from "@/components";
import { Flex } from "styled-system/jsx";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";

const stepsComponents = [Step1, Step2, Step3, Step4, Step5];

const stepFields = [
  ["firstName", "lastName", "personalEmail", "personalPhone", "email", "country", "state", "city", "street", "streetNumber", "postalCode"],
  ["canDeliver", "canPickup", "radius", "deliveryPriceType", "canTrustDrivers"],
  [],
  ["paymentTypes", "hasLoans", "minOrderLoan", "maxLoanValue"],
  ["maxUsersNumber", "needsAuth", "password", "personalEmail"]
];

export const RegisterForm = ({ onSubmitRegister }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    personalEmail: "",
    personalPhone: "",
    password: "",
    title: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    state: "",
    city: "",
    street: "",
    streetNumber: "",
    postalCode: "",
    vendorCategoryId: 1,
    publicPrices: false,
    canDeliver: false,
    canPickup: false,
    radius: 0,
    deliveryPriceType: "LOCATION",
    deliveryPrice: 0,
    deliveryKmPrice: 0,
    deliveryLocationPrices: [{city: "",price: ""}],
    canTrustDrivers: false,
    hasLoans: false,
    maxUsersNumber: 0,
    needsAuth: false,
    paymentTypes: [],
    onlineDiscountType: null,
    onlineDiscountValue: 0,
    image: null,
    logo: null,
    selectedCategory: null,
  });

  const methods = useForm({
    resolver: zodResolver(loginRegisterFormSchema.register),
    defaultValues: formData,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const { handleSubmit, trigger, getValues, setValue } = methods;

  const onSubmit = async (data) => {
    try {
      await onSubmitRegister(data);
      console.log("Submitting Data:", data);
      console.log("Form submitted successfully");
    } catch (error) {
      console.log("Form submission error:", error);
    }
  };

  const handleNextClick = async (e) => {
    e.preventDefault();
    const valid = await trigger(stepFields[currentStep]);
    console.log("Valid Data:", valid);
    if (valid) {
  
      setFormData((prevData) => ({
        ...prevData,
        ...getValues(),
      }));
      if (currentStep === stepsComponents.length - 1) {
        console.log("Submitting form", getValues());
        onSubmit(getValues());
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const CurrentStepComponent = stepsComponents[currentStep];

  return (
    <FormProvider {...methods}>
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <CurrentStepComponent formData={formData} setFormData={setFormData} />
        <div className="dots-container">
          {stepsComponents.map((_, index) => (
            <div key={index} className={`dot ${index === currentStep ? "active" : ""}`} />
          ))}
        </div>
        <Flex>
          {currentStep > 0 && (
            <Button type="button" className="registerBackBtn" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button type="button" className="registerBtn" onClick={handleNextClick}>
            {currentStep === stepsComponents.length - 1 ? "Submit" : "Next"}
          </Button>
        </Flex>
      </Form.Root>
    </FormProvider>
  );
};

export default RegisterForm;
