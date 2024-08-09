import { gql } from "@apollo/client";

export const Get_INDIVIDUAL_Categories = gql`

query GetIndividual($customerId: ID!) {
  getIndividual(customerId: $customerId) {
    id
    name
    email
    phone
    address
  }
}


`;