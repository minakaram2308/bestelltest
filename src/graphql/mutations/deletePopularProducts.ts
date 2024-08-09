
  import { gql } from "@apollo/client";

export const DELETE_POPUALR_PRODUCTS = gql`
mutation DeletePopularProducts($productIds: [ID!]!) {
    deletePopularProducts(productIds: $productIds)
  }
  
`;
