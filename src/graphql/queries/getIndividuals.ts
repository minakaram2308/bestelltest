import { gql } from "@apollo/client";

export const GetIndividuals = gql`
  query {
    getIndividuals {
      id
      specialCode
      customerClass {
        id
      }
      requestStatus
      isNew
      customerNumber
      requestDate
    }
  }
`;
