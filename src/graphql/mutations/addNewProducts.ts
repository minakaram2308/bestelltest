import { gql } from "@apollo/client";

export const ADD_NEW_PRODUCTS = gql`
mutation AddNewProducts($productIds: [ID!]!) {
  addNewProducts(productIds: $productIds)
}

`;
