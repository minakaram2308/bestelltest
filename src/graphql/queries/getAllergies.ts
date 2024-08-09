
import { gql } from "@apollo/client";

export const GetAllergies = gql`
query GetAllergies($language: Language!) {
  getAllergies {
    id
    translate(language: $language)
  }
}

`;