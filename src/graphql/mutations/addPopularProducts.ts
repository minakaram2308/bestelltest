
  
import { gql } from "@apollo/client";

export const ADD_POPULAR_PRODUCTS = gql`
mutation AddPopularProducts($productIds: [ID!]!) {
    addPopularProducts(productIds: $productIds)
  }

`;
