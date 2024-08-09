import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRegisterFormSchema } from "../validationSchemas";
import { Button, Icon, InputWithIcon } from "@/components";
import { css } from "styled-system/css";
import { FormControl } from "@/components/form-elements";
import { Flex } from "styled-system/jsx";
import { ControlledSwitch, Switch } from "@/components/ui";

export const RegisterForm = ({
  onSubmitRegister,
}: {
  onSubmitRegister: (data: any) => void;
}) => {
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(loginRegisterFormSchema.register),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      vendorCategoryId: 1,
      title: "",
      needsAuth: true,
      state: "",
      city: "",
      street: "",
      streetNumber: "",
      postalCode: "",
      publicPrices: true,
    },
  });

  const formRootClasses = css({
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  });

  return (
    <Form.Root
      onSubmit={handleSubmitRegister(onSubmitRegister)}
      className={formRootClasses}
    >
      <Form.Field name="email">
        <FormControl name="email" control={control}>
          <InputWithIcon
            icon={<Icon fontSize="24px" icon="eva:email-outline" />}
            placeholder="E-Mail"
            className={css({ width: "100%", paddingLeft: "3rem" })}
            type="email"
            {...registerRegister("email")}
          />
        </FormControl>
        <Form.Message match="valueMissing">
          {errors?.email?.message}
        </Form.Message>
      </Form.Field>

      <Flex gap={2} alignItems="center" width="100%" flex={1}>
        <Form.Field name="firstName" className={css({ width: "100%" })}>
          <FormControl name="firstName" control={control}>
            <InputWithIcon
              icon={<Icon fontSize="24px" icon="eva:email-outline" />}
              placeholder="First Name"
              className={css({ width: "100%", paddingLeft: "3rem" })}
              {...registerRegister("firstName")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.firstName?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="lastName" className={css({ width: "100%" })}>
          <FormControl name="lastName" control={control}>
            <InputWithIcon
              icon={<Icon fontSize="24px" icon="eva:email-outline" />}
              placeholder="Last Name"
              className={css({ width: "100%", paddingLeft: "3rem" })}
              {...registerRegister("lastName")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.lastName?.message}
          </Form.Message>
        </Form.Field>
      </Flex>

      <Form.Field name="title">
        <FormControl name="title" control={control}>
          <InputWithIcon
            icon={<Icon fontSize="24px" icon="eva:email-outline" />}
            placeholder="Title"
            className={css({ width: "100%", paddingLeft: "3rem" })}
            {...registerRegister("title")}
          />
        </FormControl>
        <Form.Message match="valueMissing">
          {errors?.title?.message}
        </Form.Message>
      </Form.Field>

      <Flex gap={2} alignItems="center" width="100%" flex={1}>
        <Form.Field name="state" className={css({ width: "100%" })}>
          <FormControl name="state" control={control}>
            <InputWithIcon
              icon={<Icon fontSize="24px" icon="eva:email-outline" />}
              placeholder="state"
              className={css({ width: "100%", paddingLeft: "3rem" })}
              {...registerRegister("state")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.state?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="city" className={css({ width: "100%" })}>
          <FormControl name="city" control={control}>
            <InputWithIcon
              icon={<Icon fontSize="24px" icon="eva:email-outline" />}
              placeholder="city"
              className={css({ width: "100%", paddingLeft: "3rem" })}
              {...registerRegister("city")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.city?.message}
          </Form.Message>
        </Form.Field>
      </Flex>

      <Flex gap={2} alignItems="center" width="100%" flex={1}>
        <Form.Field name="street" className={css({ width: "100%" })}>
          <FormControl name="street" control={control}>
            <InputWithIcon
              icon={<Icon fontSize="24px" icon="eva:email-outline" />}
              placeholder="Street"
              className={css({ width: "100%", paddingLeft: "3rem" })}
              {...registerRegister("street")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.street?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="streetNumber" className={css({ width: "100%" })}>
          <FormControl name="streetNumber" control={control}>
            <InputWithIcon
              icon={<Icon fontSize="24px" icon="eva:email-outline" />}
              placeholder="Street Number"
              className={css({ width: "100%", paddingLeft: "3rem" })}
              {...registerRegister("streetNumber")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.streetNumber?.message}
          </Form.Message>
        </Form.Field>
      </Flex>

      <Flex gap={2} alignItems="center" width="100%" flex={1}>
        <Form.Field name="postalCode" className={css({ width: "100%" })}>
          <FormControl name="postalCode" control={control}>
            <InputWithIcon
              icon={<Icon fontSize="24px" icon="eva:email-outline" />}
              placeholder="PostalCode"
              className={css({ width: "100%", paddingLeft: "3rem" })}
              {...registerRegister("postalCode")}
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.postalCode?.message}
          </Form.Message>
        </Form.Field>
        <Form.Field name="publicPrices" className={css({ width: "100%" })}>
          <FormControl name="publicPrices" control={control}>
            <ControlledSwitch
              checked
              name="publicPrices"
              control={control}
              label="public prices : "
            />
          </FormControl>
          <Form.Message match="valueMissing">
            {errors?.publicPrices?.message}
          </Form.Message>
        </Form.Field>
      </Flex>
      <Form.Field name="password">
        <FormControl name="password" control={control}>
          <InputWithIcon
            icon={<Icon fontSize="24px" icon="mingcute:lock-line" />}
            placeholder="Passwort"
            className={css({ width: "100%" })}
            type="password"
            {...registerRegister("password")}
          />
        </FormControl>
        <Form.Message match="valueMissing">
          {errors?.password?.message}
        </Form.Message>
      </Form.Field>

      <Button type="submit">Register</Button>
    </Form.Root>
  );
};

export default RegisterForm;
