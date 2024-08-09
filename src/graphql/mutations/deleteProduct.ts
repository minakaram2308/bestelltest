
import { gql } from "@apollo/client";

export const DELETE_PRODUCT = gql`
mutation DeleteProduct($productId: ID!) {
  deleteProduct(productId: $productId)
}

`;
