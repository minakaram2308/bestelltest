
  import { gql } from "@apollo/client";

export const GetNonPopularProducts = gql`
query GetNonPopularProducts($pageNo: Int = 0, $pageSize: Int = 100) {
    getNonPopularProducts(pageNo: $pageNo, pageSize: $pageSize) {
      id
      title
      price
      image
    }
  }
`;