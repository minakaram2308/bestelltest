"use client";
import React from "react";

import { css } from "styled-system/css";
import { Box, Grid, VStack } from "styled-system/jsx";

import { ChildrenProp } from "@/types";
import { Logo } from "@/components/ui";

const welcomeSectionStyle = css({
  background: {
    base: "url('/images/login_bg.png')",
    _dark: "url('/images/login__dark_bg.png')",
  },
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
  position: "relative",
  // mdDown: {
  //   display: "none",
  // },
  '@media (max-width: 767px)': {
    background: "none !important",
  },
});

const overlayStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  // backgroundImage:
  //   "linear-gradient(180deg, #F0EDEB 7.68%, rgba(247, 244, 242, 0) 100%)",
  zIndex: 0,
});

const AuthLayout = ({ children }: ChildrenProp) => {
  return (
    <Grid
      gridTemplateColumns={2}
      h="100vh"
      mdDown={{ gridTemplateColumns: 1 }}
    >
      {/* Left side */}
      <Box className={welcomeSectionStyle}>
        {/* <div className={overlayStyle}></div> */}
        <VStack
          textAlign="center"
          justifyContent="center"
          height="100%"
          gap={8}
          zIndex={4}
          position="relative"
        >
          <Logo />
          <h1
        className={`xs-none ${css({
          color: "primary-background",
          fontSize: "heading",
          fontWeight: "bold",
        })}`}
      >
            Willkommen 👋
          </h1>
        </VStack>
      </Box>
      {/* Right side */}
      <VStack  overflowY='scroll'>{children}</VStack>
    </Grid>
  );
};

export default AuthLayout;
