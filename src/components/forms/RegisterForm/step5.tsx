import React, { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useFormContext } from "react-hook-form";
import { Button, Input } from "@/components";
import { css } from "styled-system/css";
import { FormControl } from "@/components/form-elements";
import SelectBox from '../../form-elements/Selectbox'; 

const Step5 = ({ formData, setFormData }) => {
  const { register, formState: { errors }, control, setValue } = useFormContext();
  const [maxUsersNumber, setMaxUsersNumber] = useState(formData.maxUsersNumber || "1");

  useEffect(() => {
    setValue("maxUsersNumber", maxUsersNumber);
  }, [maxUsersNumber, setValue]);


  const handleSelectChange = (value) => {
    setMaxUsersNumber(value);
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

  const maxUsersItems = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "10", label: "10" },
  ];

  return (
    <div className={`${formRootClasses}`}>
      <div className={`whiteCard ${formWhiteClasses}`}>
        <h4 className="whiteCardTitle">Anzahl der User</h4>
        <FormControl name="maxUsersNumber" control={control}>
          <SelectBox
            items={maxUsersItems}
            ariaLabel="Anzahl der User"
            value={maxUsersNumber}
            onValueChange={handleSelectChange}
          />
        </FormControl>

        <h4 className="whiteCardTitle">Sicherheitseinstellungen</h4>
        <Form.Field name="personalEmail">
          <FormControl name="personalEmail" control={control}>
            <Input
              placeholder="E-mail Adresse"
              className={css({ width: "100%" })}
              {...register("personalEmail", {
                required: true,
                onChange: (e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    personalEmail: e.target.value,
                  })),
              })}
              type="email"
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.personalEmail?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="password">
          <FormControl name="password" control={control}>
            <Input
              placeholder="Passwort"
              type="password"
              className={css({ width: "100%" })}
              {...register("password", {
                required: true,
                onChange: (e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  })),
              })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.password?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="confirmPassword">
          <FormControl name="confirmPassword" control={control}>
            <Input
              type="password"
              placeholder="Passwort wiederholen"
              className={css({ width: "100%" })}
              {...register("confirmPassword", {
                required: true,
                onChange: (e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    confirmPassword: e.target.value,
                  })),
              })}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.confirmPassword?.message}
          </Form.Message>
        </Form.Field>
      </div>
    </div>
  );
};

export default Step5;
