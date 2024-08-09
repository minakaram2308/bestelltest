import { gql } from "@apollo/client";

export const GetVendorCategories = gql`
  query GetVendorCategories($language: Language!) {
    getVendorCategories {
      id
      icon
      image
      translate(language: $language)
    }
  }
`;
