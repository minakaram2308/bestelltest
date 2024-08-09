// "use client";

import { ChildrenProp } from "@/types";
import React from "react";
import { ApolloWrapper } from "./ApolloProvider";
import { CookiesProvider } from "next-client-cookies/server";

// wrap children with all general wrappers
export const Providers = ({ children }: ChildrenProp) => {
  return (
    <CookiesProvider>
      <ApolloWrapper>{children}</ApolloWrapper>
    </CookiesProvider>
  );
};

export default Providers;
