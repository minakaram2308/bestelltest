import { ChildrenProp } from "@/types";
import { CookiesProvider as CookiesLibProvider } from "next-client-cookies/server";

export const CookiesProvider = ({ children }: ChildrenProp) => {
  return <CookiesLibProvider>{children}</CookiesLibProvider>;
};
export default CookiesProvider;
