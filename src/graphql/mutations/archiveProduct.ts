
  import { gql } from "@apollo/client";

export const ARCHIVE_PRODUCT = gql`
mutation ToggleArchiveProduct($productId: ID!) {
  toggleArchiveProduct(productId: $productId)
}

`;
