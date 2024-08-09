"use client";
import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "../../components/forms/validationSchemas";
import { Button, Icon, Link } from "@/components";
import { Box, Flex } from "styled-system/jsx";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import { H1 } from "@/components/ui/Headings";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

type FormData = {
  singularTitle: string;
  image: File | null;
  description: string;
  productNumber: string;
  manufacturer: string;
  market: string;
  sorte: string;
  Barcode: string;
  productUnitId: number;

  // streetNumber: string;
  // postalCode: string;
  // vendorCategoryId: number;
  // publicPrices: boolean;
  // canDeliver: boolean;
  // canPickup: boolean;
  // radius: number;
  // deliveryPriceType: string;
  // deliveryPrice: number;
  // deliveryKmPrice: number;
  // deliveryLocationPrices: { city: string; price: string }[];
  // canTrustDrivers: boolean;
  // hasLoans: boolean;
  // maxUsersNumber: number;
  // needsAuth: boolean;
  // paymentTypes: string[];
  // onlineDiscountType: string | null;
  // onlineDiscountValue: number;

  // logo: File | null;
  // selectedCategory: string | null;
};

const stepsComponents = [
  { stepTitle: "Produkt informationen", component: Step1 },
  { stepTitle: "Kategorie & Darstellung", component: Step2 },
  { stepTitle: "Verkaufspreis & Sonderpreis", component: Step3 },
  { stepTitle: "Aktionspreis & Mengenpreis ", component: Step4 },
  { stepTitle: "Vorschau", component: Step5 },
];

const stepFields: string[][] = [[], [], [], [], []];

const AddProduct = () => {
  const [formData, setFormData] = useState({
    singularTitle: "",
    image: null,
    description: "",
    productNumber: "",
    manufacturer: "",
    market: "",
    sorte: "",
    Barcode: "",
    productUnitId: 0,

    // vendorCategoryId: 1,
    // publicPrices: false,
    // canDeliver: false,
    // canPickup: false,
    // radius: 0,
    // deliveryPriceType: "LOCATION",
    // deliveryPrice: 0,
    // deliveryKmPrice: 0,
    // deliveryLocationPrices: [{ city: "", price: "" }],
    // canTrustDrivers: false,
    // hasLoans: false,
    // maxUsersNumber: 0,
    // needsAuth: false,
    // paymentTypes: [],
    // onlineDiscountType: null,
    // onlineDiscountValue: 0,

    // logo: null,
    // selectedCategory: null,
  });

  const methods = useForm<FormData>({
    resolver: zodResolver(addProductSchema.register),
    defaultValues: formData,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const { handleSubmit, trigger, getValues } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // await onSubmitRegister(data);
      console.log("Submitting Data:", data);
      console.log("Form submitted successfully");
    } catch (error) {
      console.log("Form submission error:", error);
    }
  };

  const handleNextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Next Click ok");
    e.preventDefault();
    const valid = await trigger(stepFields[currentStep] as any);
    console.log("Valid Data:", valid);
    if (valid) {
      setFormData((prevData: any) => ({
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

  const CurrentStepComponent = stepsComponents[currentStep].component;

  return (
    <Flex p={{ base: "20px", lg: "2.5rem" }} flexDirection="column" gap="20px">
      <Box pb={{ base: "20px", lg: "2.5rem" }}>
        <Flex justifyContent="flex-start" alignItems="center" gap="16px">
          <Link href={"/products"}>
            <ArrowLeftIcon width={32} height={32} />
          </Link>
          <H1>Artikel hinzufügen</H1>
        </Flex>
      </Box>
      <Flex position={"relative"}>
        <div className="steps-container">
          {stepsComponents.map((step, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "2rem",
              }}
              className={`step-Parent ${index <= currentStep ? "active" : ""}`}
            >
              <div className="checkStep">
                <Icon icon="mingcute:check-2-fill" />
              </div>
              {index < stepsComponents.length - 1 && (
                <div className="dashed-line" />
              )}
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                className="step"
                w={"100%"}
              >
                <div>
                  <h3>{step.stepTitle}</h3>
                  <p>
                    Display <br />
                    Keywords <br />
                    Übersetzung
                  </p>
                </div>
                <Icon
                  icon="carbon:chevron-right"
                  fontSize={"18px"}
                  fontWeight={"bold"}
                />
              </Flex>
            </div>
          ))}
          <Flex>
            {currentStep > 0 && (
              <Button
                type="button"
                className="registerBackBtn"
                onClick={handleBack}
              >
                Überspringen
              </Button>
            )}
            <Button
              type="button"
              className="registerBtn"
              onClick={handleNextClick}
            >
              {currentStep === stepsComponents.length - 1 ? "Submit" : "Weiter"}
            </Button>
          </Flex>
        </div>

        <Box w="100%" minWidth={"50%"} maxWidth={"100%"}>
          <FormProvider {...methods}>
            <Form.Root onSubmit={handleSubmit(onSubmit)}>
              <CurrentStepComponent
                formData={formData}
                setFormData={setFormData}
                onSubmitRegister={undefined}
              />
            </Form.Root>
          </FormProvider>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AddProduct;
