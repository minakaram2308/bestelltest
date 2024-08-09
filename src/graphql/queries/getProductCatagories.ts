import { gql } from "@apollo/client";

export const GetProductCategories = gql`
query GetProductCategories($language: Language!) {
  getProductCategories {
    id
    icon
    isFood
    count
    translate(language: $language)
  }
}
`;