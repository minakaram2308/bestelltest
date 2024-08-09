
import { gql } from "@apollo/client";

export const GetPopularProducts = gql`
query GetPopularProducts($pageNo: Int = 0, $pageSize: Int = 100) {
  getPopularProducts(pageNo: $pageNo, pageSize: $pageSize) {
    id
    title
    price
    image
  }
}

`;