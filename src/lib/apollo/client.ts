import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { getCookies } from "next-client-cookies/server";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const token = getCookies().get("token");

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://api1.bestellgastro.de/graphql",
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
        Authorization: `Bearer: ${token}`,
      },
    }),
  });
});
