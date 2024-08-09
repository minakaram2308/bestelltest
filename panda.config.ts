import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  "html, body": {
    scrollBehavior: "smooth",
  },
});

export default defineConfig({
  preflight: true,

  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/features/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],

  exclude: [],

  jsxFramework: "react",
  jsxFactory: "engine",

  outdir: "styled-system",

  globalCss,

  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 0 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-10px)" },
        },
      },
      breakpoints: {
        xs: "430px",
        sm: "640px",
        md: "833px",
        lg: "1025px",
        xl: "1280px",
        "2xl": "1536px",
      },

      tokens: {
        shadows: {},

        animations: {
          "fade-in": { value: "fade-in 0.3s ease-in-out" },
          "fade-out": { value: "fade-out 0.3s ease-in-out" },
          "slide-down": { value: "slide-down 0.3s ease-in-out" },
          "slide-up": { value: "slide-up 0.3s ease-in-out" },
        },
        radii: {
          "image-container": { value: "60px" },
          "hero-image": { value: "75px" },
          hug: { value: "4px" },
          "hug-md": { value: "8px" },
          "hug-lg": { value: "12px" },
          "hug-xl": { value: "16px" },
        },
        fontSizes: {
          heading: { value: "64px" },
        },
        colors: {
          "body-background": {
            light: { value: "#F4F4F4" },
            dark: { value: "#000" },
          },
          "components-background": {
            light: { value: "#fdfcfc" },
            dark: { value: "##1D1D25" },
          },
          "wrappers-background": {
            light: { value: "#F4F4F4" },
            dark: { value: "#19171E" },
          },
          "primary-background": { value: "#121327" },
          primary: { value: "#ED8121" },
          "priamry-hover": {
            light: { value: "red" },
            dark: { value: "green" },
          },
          secondary: { value: "#22252D" },
          teritary: { value: "#4F5BF3" },
          "gray-text": { 400: { value: "#E7E7E1" }, 500: { value: "#6A6F79" } },

          //
          "gray-border": {
            400: { value: "#181A37" },
            800: { value: "#31343F" },
          },

          "disabled-background": { value: "#E7E7E1" },
          "disabled-text": { value: "#7F8596" },
          // old
          lightPrimary: { value: "#135D75" },
          transparentWhite: { value: "#ffffff1a" },
          placeholder: { value: "#BEBEBE" },
          textGray: { value: "#5C6374" },
          borderGray: { value: "#EDEDED" },
          darkGray: { value: "#F4F4F4" },
          success: { value: "#419D3E" },
          lightSuccess: { value: "#14ae5c4d" },
          danger: { value: "#F24822" },
        },
      },
    },
  },
});
