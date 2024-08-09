import React from "react";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRegisterFormSchema } from "../validationSchemas";
import { Button, Icon, InputWithIcon } from "@/components";
import Link from "next/link";
import { css } from "styled-system/css";
import { FormControl } from "@/components/form-elements";

 const LoginForm = ({
  onSubmitLogin,
}: {
  onSubmitLogin: (data: any) => void;
}) => {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginRegisterFormSchema.login),
  });

  const formRootClasses = css({
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: "100%",
  });

  const linkClasses = css({
    mt: "20px",
    textAlign: "center",
    color: "teritary",
    fontWeight: "bold",
    fontSize: "sm",
  });
  return (
    <Form.Root
      onSubmit={handleSubmitLogin(onSubmitLogin)}
      className={formRootClasses}
    >
      <Form.Field name="email">
        <FormControl name="email" control={control}>
          <InputWithIcon
            icon={<Icon fontSize="24px" icon="eva:email-outline" />}
            placeholder="E-Mail oder Username eingeben"
            className={`primaryBg searchplaceholder ${css({ width: "100%", paddingLeft: "3rem" })}`}
            type="email"
            {...registerLogin("email", { required: true })}
          />
        </FormControl>
        <Form.Message match="valueMissing">
          {errors?.email?.message}
        </Form.Message>
      </Form.Field>

      <Form.Field name="password">
        <FormControl name="password" control={control}>
          <InputWithIcon
            icon={<Icon fontSize="24px" icon="mingcute:lock-line" />}
            placeholder="Passwort"
            className={`primaryBg searchplaceholder ${css({ width: "100%" })}`}
            type="password"
            {...registerLogin("password", { required: true })}
          />
        </FormControl>
        <Form.Message match="valueMissing">
          {errors?.password?.message}
        </Form.Message>
      </Form.Field>

      <Button type="submit">Login</Button>

      <Link href="/forgot-password" className={linkClasses}>
        Passwort vergessen?
      </Link>
    </Form.Root>
  );
};

export default LoginForm;
