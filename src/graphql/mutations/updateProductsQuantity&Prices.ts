import { gql } from "@apollo/client";

export const UPDATE_PRODUCTS_QUANTITY_PRICE = gql`
  mutation UpdateProductsQuantityAndPrice($products: [QtePriceInput!]!) {
    updateProductsQuantityAndPrice(products: $products)
  }
`;
