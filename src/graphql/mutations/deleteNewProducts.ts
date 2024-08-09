
import { gql } from "@apollo/client";

export const DELETE_NEW_PRODUCTS = gql`
mutation DeleteNewProducts($productIds: [ID!]!) {
  deleteNewProducts(productIds: $productIds)
}

`;
