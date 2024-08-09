
import { gql } from "@apollo/client";

export const GetNewProducts = gql`
query GetNewProducts($pageNo: Int = 0, $pageSize: Int = 100) {
  getNewProducts(pageNo: $pageNo, pageSize: $pageSize) {
    id
    title
    price
    image
  }
}


`;