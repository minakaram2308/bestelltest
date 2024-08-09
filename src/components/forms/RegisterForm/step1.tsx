import React, { useState, useRef, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { useFormContext } from "react-hook-form";
import { Button, Icon, Input } from "@/components";
import { css } from "styled-system/css";
import { FormControl } from "@/components/form-elements";
import { Flex } from "styled-system/jsx";
import * as RadioGroup from "@radix-ui/react-radio-group";
import SelectBox from "@/components/form-elements/Selectbox";
import { useVendorCategories } from "@/hooks/useRegister/userVendorCatagories";

const Step1 = () => {
  const { register, formState: { errors }, setValue, control } = useFormContext();
  const [imagePreview, setImagePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedPricingPolicy, setSelectedPricingPolicy] = useState("default");

  const imageInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const { fetchVendorCategories, loading, error, data } = useVendorCategories("EN");

  useEffect(() => {
    setValue("pricingPolicy", selectedPricingPolicy);
  }, [selectedPricingPolicy, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchVendorCategories();
        console.log("Fetched Data:", data);  
      } catch (error) {
        console.error("Error fetching vendor categories:", error);
      }
    };

    fetchData();
  }, [fetchVendorCategories]);

  const handleImageUpload = (e, setter, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setter(URL.createObjectURL(file));
      setValue(fieldName, file);
    }
  };

  const triggerImageUpload = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  };

  const triggerLogoUpload = (e) => {
    e.preventDefault();
    logoInputRef.current.click();
  };

  const handleRemoveLogo = (e) => {
    e.preventDefault();
    setLogoPreview(null);
    setValue("logo", null);
  };

  const handleCategoryChange = (selectedCategory) => {
    setValue("selectedCategory", selectedCategory);
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


  const categoryOptions = data ? data.map(category => ({
    value: category.id,
    label: category.translate,
  })) : [];

  return (
    <div className={`${formRootClasses}`}>
      <div className="whiteCard">
        <h4 className="whiteCardTitle">Geschäftsart</h4>
        {loading ? (
          <p>Loading...</p>  
        ) : error ? (
          <p>Error loading categories</p>  
        ) : (
          <SelectBox
            items={categoryOptions}
            aria_label={"vendor-category"}
            onValueChange={handleCategoryChange}
          />
        )}
      </div>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Preispolitik</h4>

        <RadioGroup.Root
          className="RadioGroupRoot"
          value={selectedPricingPolicy}
          onValueChange={(value) => {
            setSelectedPricingPolicy(value);
            setValue("pricingPolicy", value);
          }}
          aria-label="View density"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="radioBox">
              <RadioGroup.Item
                className="RadioGroupItem"
                value="default"
                id="r1"
                {...register("pricingPolicy", { required: true })}
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="r1">
                Alle preise sind Sichtbar
              </label>
            </div>

            <div className="radioBox">
              <RadioGroup.Item
                className="RadioGroupItem"
                value="comfortable"
                id="r2"
                {...register("pricingPolicy", { required: true })}
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="r2">
                Jeder sieht nur seine Preise
              </label>
            </div>
          </div>
        </RadioGroup.Root>
      </div>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Nutzerdaten</h4>
        <Form.Field name="firstName">
          <FormControl name="firstName" control={control}>
            <Input
              placeholder="Vorname"
              className={css({ width: "100%" })}
              {...register("firstName", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.firstName?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="lastName">
          <FormControl name="lastName" control={control}>
            <Input
              placeholder="Nachname"
              className={css({ width: "100%" })}
              {...register("lastName", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.lastName?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="personalEmail">
          <FormControl name="personalEmail" control={control}>
            <Input
              placeholder="Private E-Mail Adresse"
              className={css({ width: "100%" })}
              {...register("personalEmail", { required: true })}
              type="email"
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.personalEmail?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="personalPhone">
          <FormControl name="personalPhone" control={control}>
            <Input
              placeholder="Private Telefonnummer"
              className={css({ width: "100%" })}
              {...register("personalPhone", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.personalPhone?.message}
          </Form.Message>
        </Form.Field>
      </div>

      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Firmendaten</h4>

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
            <h3 className="whiteCardTitle primaryC">Upload Title Image</h3>
            <p className="smGrey">
              It is best to use an image with a resolution of at least 1728 x
              500 pixels and a file size of no more than 4 MB. The file should
              be in PNG or GIF format (but not animated GIFs). Your image must
              comply with the BestellGastro community guidelines.
            </p>
          </label>
        </div>
        <div className="logoUpload">
          <Flex alignItems={"center"} gap={4} margin={"1rem 0"}>
            <input
              type="file"
              id="uploadLogo"
              name="logo"
              accept="image/*"
              className={css({ display: "none" })}
              ref={logoInputRef}
              onChange={(e) => handleImageUpload(e, setLogoPreview, "logo")}
            />
            <div
              className="logoUploadLabel"
              style={{ display: "flex", alignItems: "center", gap: "15px" }}
            >
              <div className="userIcon" style={{ borderRadius: "50%", overflow: "hidden" }}>
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    width="40"
                    height="40"
                    style={{ borderRadius: "50%", objectFit: "cover", width: '80px' }}
                  />
                ) : (
                  <Icon
                    icon={`mdi:user`}
                    fontSize="40px"
                    margin="auto"
                    color="grey"
                    aria-hidden
                  />
                )}
              </div>
              <div className="logoUploadContainer">
                <Button className="logoUploadBtn" onClick={triggerLogoUpload}>
                  <Icon
                    icon={`mdi:plus`}
                    fontSize="20px"
                    margin="auto"
                    color="white"
                    aria-hidden
                  />
                  Upload Logo
                </Button>
                <Button className="logoUploadBtn2" onClick={handleRemoveLogo}>
                  Remove
                </Button>
              </div>
            </div>
          </Flex>
          <p className="smGrey">
            It is best to use an image with a resolution of at least 1000 x 1000
            pixels and a file size of no more than 4 MB. The file should be in
            PNG or GIF format (but not animated GIFs). Your image must comply
            with the BestellGastro community guidelines.
          </p>
        </div>

        <Form.Field name="title" className="mt-3 mb-5">
          <FormControl name="title" control={control}>
            <Input
              placeholder="Firmenname"
              className={css({ width: "100%" })}
              {...register("title")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.companyName?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="description">
          <FormControl name="description" control={control}>
            <Input
              placeholder="Beschreibung über das Geschäft"
              className={css({ width: "100%" })}
              {...register("description")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.description?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="email">
          <FormControl name="email" control={control}>
            <Input
              placeholder="E-Mail Adresse"
              className={css({ width: "100%" })}
              {...register("email", { required: true })}
              type="email"
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.email?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="phone">
          <FormControl name="phone" control={control}>
            <Input
              placeholder="Telefonnummer"
              className={css({ width: "100%" })}
              {...register("phone")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.phone?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="website">
          <FormControl name="website" control={control}>
            <Input
              placeholder="URL-Webseite"
              className={css({ width: "100%" })}
              {...register("website")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.website?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="country">
          <FormControl name="country" control={control}>
            <Input
              placeholder="Land"
              className={css({ width: "100%" })}
              {...register("country", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.country?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="state">
          <FormControl name="state" control={control}>
            <Input
              placeholder="Bundesland"
              className={css({ width: "100%" })}
              {...register("state", { required: true })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.state?.message}
          </Form.Message>
        </Form.Field>

        <Flex gap={2} alignItems="center" width="100%" flex={1}>
          <Form.Field name="street" className="w-70">
            <FormControl name="street" control={control}>
              <Input
                placeholder="Straße"
                className={css({ width: "100%" })}
                {...register("street", { required: true })}
              />
            </FormControl>
            <Form.Message match="valueMissing">
              {errors?.street?.message}
            </Form.Message>
          </Form.Field>
          <Form.Field name="streetNumber" className="w-30">
            <FormControl name="streetNumber" control={control}>
              <Input
                placeholder="Haus-Nr."
                className={css({ width: "100%" })}
                {...register("streetNumber", { required: true })}
              />
            </FormControl>
            <Form.Message match="valueMissing">
              {errors?.streetNumber?.message}
            </Form.Message>
          </Form.Field>
        </Flex>

        <Flex gap={2} alignItems="center" width="100%" flex={1}>
          <Form.Field name="postalCode" className="w-30">
            <FormControl name="postalCode" control={control}>
              <Input
                placeholder="Postleitzahl"
                className={css({ width: "100%" })}
                {...register("postalCode", { required: true })}
              />
            </FormControl>
            <Form.Message match="valueMissing">
              {errors?.postalCode?.message}
            </Form.Message>
          </Form.Field>
          <Form.Field name="city" className="w-70">
            <FormControl name="city" control={control}>
              <Input
                placeholder="Stadt"
                className={css({ width: "100%" })}
                {...register("city", { required: true })}
              />
            </FormControl>
            <Form.Message match="valueMissing">
              {errors?.city?.message}
            </Form.Message>
          </Form.Field>
        </Flex>
      </div>
    </div>
  );
};

export default Step1;
