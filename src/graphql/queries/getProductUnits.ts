import { gql } from "@apollo/client";

export const GetProductUnits = gql`
query {
  getProductUnits {
    id
    name
  }
}

`;