"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { css } from "styled-system/css";
import { Flex } from "styled-system/jsx";

import { LoginForm, RegisterForm } from "@/components/forms";
import { TabsTrigger } from "@/components";
import { useLogin, useRegister } from "@/hooks";
import { MutationSignUpArgs } from "@/graphql/generated/graphql";

interface LoginData {
  email: string;
  password: string;
}
const LoginRegister: React.FC = () => {
  const { login } = useLogin();
  const { register } = useRegister();

  const onSubmitLogin = async (data: LoginData) => {
    await login({
      email: data.email,
      password: data.password,
    });
  };

  const onSubmitRegister = async (data: MutationSignUpArgs) => {

    const response = await register({
      vendor: { ...data },
    });
    console.log("Registration successful:", response);
  };


  return (
    <Tabs.Root
      defaultValue="login"
      className={css({
        width: "100%",
        padding: { base: "2rem 1rem", md: "2rem 4rem", xl: "2rem 6rem" },
        margin: "auto 0",
      })}
    >
      <Tabs.List
        className={css({ base: { mb: "3rem" }, md: { marginBottom: "4rem" } })}
      >
        <Flex
          gap={4}
          alignItems="center"
          background="#E7E7E1"
          borderRadius="hug-lg"
          transition="colors 150ms ease-in-out"
          padding="4px"
        >
          <TabsTrigger className="h45" value="login">
            Log in
          </TabsTrigger>
          <TabsTrigger className="h45" value="register">
            Registrieren
          </TabsTrigger>
        </Flex>
      </Tabs.List>
      <Tabs.Content value="login">
        <LoginForm onSubmitLogin={onSubmitLogin} />
      </Tabs.Content>
      <Tabs.Content value="register">
        <RegisterForm onSubmitRegister={onSubmitRegister} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default LoginRegister;
