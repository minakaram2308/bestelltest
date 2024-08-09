
import { gql } from "@apollo/client";

export const GetNonNewProducts = gql`
query GetNonNewProducts($pageNo: Int = 0, $pageSize: Int = 100) {
  getNonNewProducts(pageNo: $pageNo, pageSize: $pageSize) {
    id
    title
    price
    image
  }
}

`;