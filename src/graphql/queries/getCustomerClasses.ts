import { gql } from "@apollo/client";

export const GetCustomerClasses = gql`
  query {
    getCustomerClasses(customerClassType: GROUP) {
      id
      name
      isGeneral
      generalDiscount
    }
  }
`;
