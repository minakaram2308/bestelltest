"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { useCookies } from "next-client-cookies";

function makeClient({ token }: { token: string }) {
  console.log("🚀 ~ makeClient ~ token:", token);
  const httpLink = new HttpLink({
    uri: "https://api1.bestellgastro.de/graphql",
    fetchOptions: { cache: "no-store" },
    headers: {
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
      Authorization: `Bearer: ${token}`,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const cookies = useCookies();
  return (
    <ApolloNextAppProvider
      makeClient={() => makeClient({ token: cookies.get("token") ?? "" })}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
